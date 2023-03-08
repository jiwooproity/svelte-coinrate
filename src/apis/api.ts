import request from "./request";
import { HTTP, URL } from "./url";

import type { CoinsResponseIF, CoinsRequestIF } from "../typescript/coins";

const API = {
  getAllCoin: (): Promise<CoinsResponseIF> => {
    return request(<CoinsRequestIF>{
      url: URL.GET.COINS,
      method: HTTP.METHOD.GET,
    });
  },

  getCoinDetail: ({ id }) => {
    return request({
      url: `${URL.GET.COINS}/${id}`,
      method: HTTP.METHOD.GET,
    });
  },
};

export default API;
