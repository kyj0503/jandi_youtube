import axios from "axios";
import { authRequiredRoutes } from "../constants/api";
import { YOUTUBE_API_KEY } from "../constants/config";
import AuthService from "./auth";

const { redirectGoogleLogin, refreshAccessToken } = AuthService;

const youtubeAPI = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
});

youtubeAPI.defaults.params = {};
youtubeAPI.defaults.params["key"] = YOUTUBE_API_KEY;

//요청 중 인증이 필요한 경로일 경우 헤더에 액세스 토큰을 추가합니다.
youtubeAPI.interceptors.request.use((config) => {
  const requestUrl = config.url;
  const isRequiredAuth = authRequiredRoutes.some((route) =>
    requestUrl.includes(route)
  );

  if (isRequiredAuth) {
    const accessToken = localStorage.getItem("access-token");
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

// 응답이 인증이 필요한 경우인 401에러가 발생
// 리프레쉬 토큰이 있다면 액세스 토큰 재발행후 재요청, 없다면 구글 로그인 페이지로 이동합니다.
youtubeAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refresh-token");
      if (refreshToken) {
        const { accessToken } = await refreshAccessToken(refreshToken);

        if (!accessToken) {
          return Promise.reject(
            "리프레쉬 토큰으로 액세스토큰 재발행 실패",
            error
          );
        }

        localStorage.setItem("access-token", accessToken);
        error.config.headers["Authorization"] = `Bearer ${accessToken}`;
        return axios.request(error.config);
      } else {
        redirectGoogleLogin();
      }
    }
    return Promise.reject(error);
  }
);

export default youtubeAPI;
