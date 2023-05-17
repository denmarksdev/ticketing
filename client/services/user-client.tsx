import axios, { AxiosInstance } from "axios";
import { getErrorsComponent } from "../components/Error";
import { buildClient } from "../api/build-client";

interface UserRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  email: string;
}

class userService {
  _axios: AxiosInstance;

  constructor(context: any = null) {
    this._axios = buildClient(context);
  }

  signup(request: UserRequest) {
    return this._axios
      .post("/api/users/signup", request)
      .then((response) => response.data)
      .catch((err) => {
        throw getErrorsComponent(err);
      });
  }

  signin(request: UserRequest) {
    return this._axios
      .post("/api/users/signin", request)
      .then((response) => response.data)
      .catch((err) => {
        throw getErrorsComponent(err);
      });
  }

  signout() {
    return this._axios
      .post("/api/users/signout", {})
      .then((response) => response.data)
      .catch((err) => {
        throw getErrorsComponent(err);
      });
  }

  getCurrentUser() {
    return this._axios
      .get("/api/users/currentuser")
      .then((response) => response.data);
  }
}

const service = (context = null) => new userService(context);

export default service;
