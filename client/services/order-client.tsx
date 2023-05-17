import { AxiosInstance } from "axios";
import { getErrorsComponent } from "../components/Error";
import { buildClient } from "../api/build-client";


class OrderService {
  _axios: AxiosInstance;

  constructor(context: any = null) {
    this._axios = buildClient(context);
  }

  create(ticketId: string) {
    return this._axios
      .post("/api/orders", {
        ticketId,
      })
      .then((response) => response.data)
      .catch((err) => {
        throw getErrorsComponent(err);
      });
  }

  list() {
    return this._axios
      .get("/api/orders")
      .then((response) => response.data)
      .catch((err) => {
        throw getErrorsComponent(err);
      });
  }

  find(id: string) {
    return this._axios
      .get(`/api/orders/${id}`)
      .then((response) => response.data)
      .catch((err) => {
        throw getErrorsComponent(err);
      });
  }
}

const service = (context = null) => new OrderService(context);

export { service as orderService };
