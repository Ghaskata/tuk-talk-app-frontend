import React, { useEffect } from "react";
import { authStore } from "../contexts/authStore";
import { AUTH_API_URL, axiosPrivate } from "./axios";

const useAxiosPrivate = () => {
  const {
    isAuthenticated,
    isRefreshing,
    userData,
    sessionId,
    accessToken,
    refreshToken,
    setIsRefreshing,
    removeUserData,
    setAccessToken,
  } = authStore();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (isAuthenticated) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
          config.headers["session"] = sessionId;
        }
        return config;
      },
      (error) => {
        console.error("Request error >>> ", error);
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;
        if (
          error?.response?.status === 401 &&
          !prevRequest._retry &&
          !isRefreshing
        ) {
          prevRequest._retry = true;
          try {
            setIsRefreshing(true);
            const response = await axiosPrivate.post(
              AUTH_API_URL.refreshToken,
              JSON.stringify(refreshToken)
            );
            const { accessToken: newAccessToken, refreshToken } =
              response.data.tokenData;
            setAccessToken(newAccessToken);

            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            removeUserData();
            //redirect to login page
            return Promise.reject(refreshError);
          } finally {
            setIsRefreshing(false);
          }
        }

        console.log("respone intercept errror >>> ", error);
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [isRefreshing, isAuthenticated, accessToken, refreshToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
