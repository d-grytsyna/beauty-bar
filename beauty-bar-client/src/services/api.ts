import axios from "axios";
import TokenService from "./token.service";
import authService from "./auth.service";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      if (config.url !== "/auth/refreshtoken") {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/signin" && err.response) {
      if (err.response.status === 401  && originalConfig.url !== "/auth/refreshtoken" && !originalConfig._retry) {

        try {
          const rs = await instance.post("/auth/refreshtoken", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });
          originalConfig._retry = true;
          
          TokenService.updateLocalAccessToken(rs.data.accessToken);
          return instance(originalConfig);

        } catch (_error) {
          authService.logout();
          return;
        }
  
      }

    }
    return Promise.reject(err);
  }
);

export default instance;