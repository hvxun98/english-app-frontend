import { getRequest } from "../config/api/apiCaller";
import { ApiUrl } from "../config/api/apiConst";

export const getResults = async (successCallback, errorCallback) => {
  await getRequest(ApiUrl.results, {}, successCallback, errorCallback);
};
