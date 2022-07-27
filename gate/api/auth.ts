import gate from "../gate";
import client from "../http-clients/api";

const auth = {
  refresh: (params: any) =>
    gate.post<any, never, any>({
      client,
      url: "/TokenAuth/RefreshToken",
      data: undefined,
      params: params,
    }),

  login: (data: any) =>
    gate.post<any, any, never>({
      client,
      url: "/login",
      data,
    }),
};

export default auth;
