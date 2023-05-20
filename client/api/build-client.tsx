import axios from "axios";

export const buildClient = (context) => {
  if (typeof window === "undefined") {
    const { req } = context;

    return axios.create({
      baseURL: "www.marksdev-app-prod.online",
      headers: req?.headers,
    });
  } else {
    return axios;
  }
};
