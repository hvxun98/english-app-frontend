import { postRequest } from "../config/api/apiCaller";
import { ApiUrl } from "../config/api/apiConst";

export const loginRequest = async (params, successCallback, errorCallback) => {
  return await postRequest(
    ApiUrl.login,
    params,
    successCallback(),
    errorCallback()
  );
};
