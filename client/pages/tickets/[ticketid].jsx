import { ticketService } from "../../services/ticket-client";
import { orderService } from "../../services/order-client";
import { useState } from "react";
import Router from "next/router";

export default function TicketShow({ ticket }) {
  const [error, setError] = useState(null);

  const onPurchase = async () => {
    try {
      const { id } = await orderService().create(ticket.id);

      Router.push("/orders/[orderId]", `/orders/${id}`);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>

      {error}

      <button className="btn btn-primary" onClick={onPurchase}>
        Purchase
      </button>
    </div>
  );
}

TicketShow.getInitialProps = async (context, client) => {
  const { ticketid } = context.query;

  console.log("Query", context.query);

  const ticket = await ticketService(context).find(ticketid);

  return { ticket };
};
