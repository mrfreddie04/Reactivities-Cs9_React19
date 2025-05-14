type Activity = {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  isCancelled: boolean;
  city: string;
  venue: string;
  latitude: number;
  longitude: number;
};

type CreateActivityDto = {
  title: string;
  date: Date;
  description: string;
  category: string;
  city?: string;
  venue: string;
  latitude: number;
  longitude: number;
};

type EditActivityDto = {
  id: string;
} & CreateActivityDto;

type LocationIQSuggestion = {
  place_id: string
  osm_id: string
  osm_type: string
  licence: string
  lat: string
  lon: string
  boundingbox: string[]
  class: string
  type: string
  display_name: string
  display_place: string
  display_address: string
  address: LocationIQAddress
};

type LocationIQAddress = {
  name: string
  road: string
  neighbourhood: string
  suburb?: string
  town?: string
  city?: string
  village?: string
  county: string
  state: string
  postcode: string
  country: string
  country_code: string
};

type SelectItem = {
  text: string,
  value: string
};
