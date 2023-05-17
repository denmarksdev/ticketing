import { useState } from "react";
import { ticketService } from "../../services/ticket-client";
import Router from "next/router";

export default function New() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(null);

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

      await ticketService().create({
        title,
        price,
      });

      Router.push('/');

    } catch (error) {
      setError(error);
    }
  };

  const hasValidData = title && price;

  return (
    <div>
      <h1>Create a ticket</h1>

      <form>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            className="form-control"
            onBlur={onBlur}
            value={price}
            onChange={({ target }) => setPrice(target.value)}
          />
        </div>

        {error}

        <button
          disabled={!hasValidData}
          className="btn btn-primary"
          onClick={onSubmit}
        >
          Submit
        </button>

      </form>
    </div>
  );
}
