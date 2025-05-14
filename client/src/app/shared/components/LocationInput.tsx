import { Box, debounce, List, ListItemButton, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form"
import axios from "axios";
import { ActivitySchema } from "../../../lib/schemas/activitySchema";

type Props<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T> ;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({...props});
  const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState(field?.value?.venue || '');

  useEffect(() => {
    if(field.value && typeof field.value === 'object') {
      setInputValue(field.value.venue || '');
    }
  },[field.value]);

  const accessToken = 'pk.ab90d044c636dca6ac756fc6d3452dad';
  const locationUrl = `https://api.locationiq.com/v1/autocomplete?key=${accessToken}&limit=5&dedupe=1&`;

  //useMemo to prevent recreation of the function upon rerender
  const fetchSuggestions = useMemo(
    () => debounce(async (query: string) => {
      if(!query || query.length < 3) {
        setSuggestions([]);
        return;
      }
      
      setIsLoading(true);

      try {
        const response = await axios.get<LocationIQSuggestion[]>(`${locationUrl}q=${query}`);
        setSuggestions(response.data);
      } catch(error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }

    }, 500),
  [locationUrl]);

  const handleChange = async (value: string) => {
    //field.onChange(value);
    setInputValue(value);
    await fetchSuggestions(value);
  }  

  const handleSelectLocation = (suggestion: LocationIQSuggestion) => {    
    const city = suggestion.address?.city || suggestion.address?.town || suggestion.address?.village || '';
    const location: ActivitySchema['location'] = {
      venue: suggestion.display_name,
      city: city,
      latitude: parseFloat(suggestion.lat),
      longitude: parseFloat(suggestion.lon),
    };
    field.onChange(location);
    setInputValue(location.venue);
    setSuggestions([]);
  }

  return (
    <Box >
      <TextField 
        {...props}
        value={inputValue}
        fullWidth
        onChange={(e)=>handleChange(e.target.value)}
        variant="outlined"
        error = {!!fieldState.error}
        helperText = {fieldState.error?.message}
      />
      { isLoading && (<Typography>Loading...</Typography>)}
      { suggestions.length > 0 && (
        <List sx={{ border: 1}}>
          {suggestions.map( suggestion => (
            <ListItemButton
              key={suggestion.place_id}
              divider
              onClick={() => handleSelectLocation(suggestion)}
            >
              {suggestion.display_name}
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  )
}
