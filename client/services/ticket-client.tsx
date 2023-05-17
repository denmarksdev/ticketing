import { AxiosInstance } from "axios";
import { getErrorsComponent } from "../components/Error";
import { buildClient } from "../api/build-client";

interface TicketCreateRequest {
  title: string;
  price: number;
}

class TicketService {
  _axios: AxiosInstance;

  constructor(context: any = null) {
    this._axios = buildClient(context);
  }


  create(request: TicketCreateRequest) {
    return this._axios
      .post("/api/tickets", request)
      .then((response) => response.data)
      .catch((err) => {
        throw getErrorsComponent(err);
      });
  }

  list() {
    return this._axios
      .get("/api/tickets")
      .then((response) => response.data)
      .catch((err) => {
        throw getErrorsComponent(err);
      });
  }

  find(id:string) {
    return this._axios
      .get(`/api/tickets/${id}`)
      .then((response) => response.data)
      .catch((err) => {
        throw getErrorsComponent(err);
      });
  }
}

const service = (context = null) => new TicketService(context);

export { service as ticketService };
