import axios from "axios";
import { sleep } from "../util/util.ts";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes.tsx";

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

agent.interceptors.request.use ( config => {
  store.uiStore.isBusy();
  return config;
});

agent.interceptors.response.use( 
  async (response) => {
    await sleep(1000);
    store.uiStore.isIdle();
    return response;
  },
  async (error) => {
    await sleep(1000);
    store.uiStore.isIdle();

    const {status, data }  = error.response;
    switch( status) {
      case 400:
        if(data?.errors) {
          const modalStateErrors = Object.values<string[]>(data.errors)
            .filter((errorList) => errorList && errorList.length > 0)
            .flat();
          return Promise.reject(modalStateErrors);  
          //throw modalStateErrors;
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("Unauthorized");
        break;        
      case 404:
        router.navigate("/not-found");
        break;        
      case 500:
        router.navigate("/server-error", { state: {error: data} });
        break;        
      default :
        toast.error("Undexpected error");
    }
    
    return Promise.reject(error);  //will be returned to the RQ
  }
);

export default agent;