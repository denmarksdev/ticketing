import React from "react";
import { orderService } from "../../services/order-client";

const Status = ({ status }) => {
  switch (status) {
    case "created":
      return <span className="badge bg-primary">{status}</span>;
    case "cancelled":
      return <span className="badge bg-danger">{status}</span>;
    case "awaiting:payment":
      return <span className="badge bg-Warning">{status}</span>;
    case "complete":
      return <span className="badge bg-success">{status}</span>;
    default:
      return <span className="badge bg-secondary">{status}</span>;
  }
};

const ShowOrders = ({ orders }) => {
  return (
    <div>
      <h1>Orders</h1>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.ticket.title}</td>
              <td>
                <Status status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ShowOrders.getInitialProps = async (context, client, currentUser) => {
  const orders = await orderService(context).list();

  console.log(orders);

  return { orders };
};

export default ShowOrders;
