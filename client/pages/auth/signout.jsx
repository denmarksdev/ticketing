import { useEffect } from "react";
import Router from "next/router";
import userService from "../../services/user-client";

import React from "react";

export default function Signout() {
  useEffect(() => {
    userService()
      .signout()
      .then((data) => {
        Router.push("/");
      });
  });

  return <div>Signing you out ...</div>;
}
