import { AxiosInstance } from "axios";
import { getErrorsComponent } from "../components/Error";
import { buildClient } from "../api/build-client";

interface PaymentCreateRequest {
  token: string;
  orderId: string;
}

class PaymentService {
  _axios: AxiosInstance;

  constructor(context: any = null) {
    this._axios = buildClient(context);
  }

  create(request: PaymentCreateRequest) {
    return this._axios
      .post("/api/payments", request)
      .then((response) => response.data)
      .catch((err) => {
        throw getErrorsComponent(err);
      });
  }
}

const service = (context = null) => new PaymentService(context);

export { service as paymentService };
