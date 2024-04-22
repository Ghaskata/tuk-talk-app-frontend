import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import Cookies from "js-cookie";

const middleware_ = (f) =>
  create(devtools(persist(f, { name: "auth-storage" })));

const authStore = middleware_((set, get) => ({
  isAuthenticated: false,
  isRefreshing: false,
  userData: "",
  sessionId: "",
  accessToken: "",
  refreshToken: "",
  setAccessToken: (data) => set({ accessToken: data }),
  setIsRefreshing: (data) => {
    set({ isRefreshing: data });
    console.log("isRefreshing : ", data);
  },
  setUserData: async (data) => {
    try {
      set({
        accessToken: data?.accessToken,
        refreshToken: data?.refreshToken,
        userData: data?.userData,
        isAuthenticated: true,
        sessionId: data?.sessionId,
      });
      Cookies.set("accessToken", data?.accessToken);
      Cookies.set("refreshToken", data?.refreshToken);
    } catch (error) {
      console.error("Error setting user data:", error);
    }
  },
  removeUserData: async () => {
    try {
      console.log(":Enter Data ---------remove userData in AuthStore");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      set({
        accessToken: "",
        refreshToken: "",
        userData: "",
        isAuthenticated: false,
        sessionId: "",
      });
    } catch (error) {
      console.error("Error removing user data:", error);
    }
  },
  setState: set,
  getState: get,
  destroy: () => {},
}));

export { authStore };
