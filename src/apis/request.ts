import axios from "axios";
import { HTTP } from "./url";

interface HttpRequestIF {
  url: string;
  method: string;
  params?: any;
  data?: any;
}

interface RequestIF {
  url: string;
}

interface RequestParamsIF extends RequestIF {
  params?: any;
}

interface ReuqestBodyIF extends RequestIF {
  data?: any;
}

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const getAxios = ({ url, params }: RequestParamsIF) => {
  return instance.get(url, { params });
};

const request = async ({ url, method, params, data }: HttpRequestIF) => {
  let response: any = "";

  switch (method) {
    case HTTP.METHOD.GET:
      response = await getAxios({ url, params });
      break;
    case HTTP.METHOD.POST:
      break;
    default:
      break;
  }

  return {
    data: response.data,
    status: response.status,
  };
};

export default request;
