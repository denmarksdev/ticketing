import axios from "axios";

export const buildClient = (context) => {
  if (typeof window === "undefined") {
    const { req } = context;

    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req?.headers,
    });
  } else {
    return axios;
  }
};
