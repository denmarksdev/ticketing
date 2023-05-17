import axios from "axios";
import { useState } from "react";

interface IRequest {
  url: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  body?: object;
}

export default (params: IRequest) => {
  const [error, setError] = useState(null);

  const doRequest = async () => {
    try {
      const response = await axios[params.method](params.url, params.body);
      return response.data;
    } catch (err) {
      setError(
        <div className="alert alert-danger">
          <h4>Ops....</h4>
          <ul>
            {err.response.data.errors.map((e) => (
              <li key={e.message}>{e.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, error };
};
