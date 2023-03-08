import request from "./request";
import { HTTP, URL } from "./url";

import type { CoinsResponseIF, CoinsRequestIF, CoinIF, CoinsDetail } from "../typescript/coins";

const API = {
  getAllCoin: (): Promise<CoinsResponseIF<CoinIF[]>> => {
    return request(<CoinsRequestIF>{
      url: URL.GET.COINS,
      method: HTTP.METHOD.GET,
    });
  },

  getCoinDetail: ({ id }: { id: string }): Promise<CoinsResponseIF<CoinsDetail>> => {
    return request(<CoinsRequestIF>{
      url: `${URL.GET.COINS}/${id}`,
      method: HTTP.METHOD.GET,
    });
  },
};

export default API;
