import { getRequest } from "../config/api/apiCaller";
import { ApiUrl } from "../config/api/apiConst";

export const getExamList = async (
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
