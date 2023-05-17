import React, { useEffect, useState } from "react";
import { orderService } from "../../services/order-client";
import { paymentService } from "../../services/payement-client";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";


export default function OrderShow({ order, currentUser }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();

    const timerId = setInterval(findTimeLeft, 1 * 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }

  return (
    <div>
      <h1>Order Detail</h1>

      <p>{timeLeft} seconds until order expires</p>

      {error}

      <StripeCheckout
        token={async ({ id }) => {
          try {
            const payment = await paymentService().create({
              token: id,
              orderId: order.id,
            });

            Router.push('/orders')
          } catch (error) {
            setError(error);
          }
        }}
        stripeKey="pk_test_51N7xSpD6dKzT03RjGmT1EcV7uXVFF6YF551YQWMsmNM5mRTl56IhVlqGaDbGlQ6uIMfF8nfCLwhRDctxsnMY9QmG00aFGjY0uN"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
    </div>
  );
}

OrderShow.getInitialProps = async (context, client) => {
  const { orderid } = context.query;
  const order = await orderService(context).find(orderid);

  return { order };
};
