import { getRequest, postRequest } from "../config/api/apiCaller";
import { ApiUrl } from "../config/api/apiConst";

export const getExamListByCategory = async (
  categoryId,
  successCallback,
  errorCallback
) => {
  await getRequest(
    ApiUrl.exam + `/getListExamByCategory/${categoryId}`,
    {},
    successCallback,
    errorCallback
  );
};

export const getExamList = async (successCallback, errorCallback) => {
  await getRequest(ApiUrl.exam, {}, successCallback, errorCallback);
};

export const createExam = async (params, successCallback, errorCallback) => {
  await postRequest(ApiUrl.exam, params, successCallback, errorCallback);
};
