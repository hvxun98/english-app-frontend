import { getRequest } from "../config/api/apiCaller";
import { ApiUrl } from "../config/api/apiConst";

export const fetchCategories = async (successCallback, errorCallback) => {
  await getRequest(ApiUrl.categories, {}, successCallback, errorCallback);
};
