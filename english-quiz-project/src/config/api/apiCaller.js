import axios from "axios";
import { getToken } from "../../utils/GetData";

axios.interceptors.request.use((config) => {
  const token = getToken();
  const tokenType = "Bearer";
  if (token) {
    config.headers.Authorization = `${tokenType} ${token}`;
  }
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Access-Control-Allow-Methods"] = "*";
  config.headers["Access-Control-Max-Age"] = 3600;
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return new Promise((resolve, reject) => {
      const originalReq = error.config;
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config.__isRetryRequest
      ) {
        originalReq._retry = true;

        //requestNewToken();
      }
      return reject(error);
    });
  }
);

export const getRequest = (
  url = "",
  params,
  successCallback,
  errorCallback,
) => {
  return axios
    .get(url, params)
    .then((response) => {
      if (successCallback) {
        try {
          successCallback(response);
        } catch (error) {
          console.log(error);
        }
      }
    })
    .catch((error) => {
      if (errorCallback)
        try {
          errorCallback(error);
        } finally {
          console.log(error);
        }
    });
};

export const postRequest = async (
  url = "",
  params,
  successCallback,
  errorCallback
) => {
  return await axios
    .post(url, params)
    .then((response) => {
      if (successCallback) {
        try {
          successCallback(response);
        } catch (error) {
          console.log("error", error);
        }
      }
    })
    .catch((error) => {
      if (errorCallback)
        try {
          errorCallback(error);
        } finally {
          console.log(error);
        }
    });
};

export const putRequest = (
  url = "",
  params = {},
  successCallback,
  errorCallback,
  headers = {},
  timeout
) => {
  return axios
    .put(url, params, {
      headers,
      timeout,
    })
    .then((response) => {
      if (successCallback) {
        try {
          successCallback(response);
        } catch (error) {
          console.log(error);
        }
      }
    })
    .catch((error) => {
      if (errorCallback)
        try {
          errorCallback(error);
        } finally {
          console.log(error);
        }
    });
};

export const deleteRequest = (
  url = "",
  params = {},
  successCallback,
  errorCallback,
  headers = {},
  timeout
) => {
  return axios
    .delete(url, params, {
      headers,
      timeout,
    })
    .then((response) => {
      if (successCallback) {
        try {
          successCallback(response);
        } catch (error) {
          console.log(error);
        }
      }
    })
    .catch((error) => {
      if (errorCallback)
        try {
          errorCallback(error);
        } finally {
          console.log(error);
        }
    });
};
