import React from "react";
import Link from "next/link";
import { UserResponse } from "../services/user-client";
import styles from "./style.module.css";

interface Props {
  currentUser?: UserResponse;
}

export default function Header(props: Props) {
  const links = [
    !props.currentUser && {
      label: "Sign Up",
      href: "/auth/signup",
      class: "btn btn-outline-success",
    },
    !props.currentUser && {
      label: "Sign In",
      href: "/auth/signin",
      class: "btn btn-outline-info",
    },
    props.currentUser && {
      label: "Sell Tickets",
      href: "/tickets/new",
      class: "btn btn-outline-info",
    },
    props.currentUser && {
      label: "My Orders",
      href: "/orders",
      class: "btn btn-outline-info",
    },
    props.currentUser && {
      label: "Sign Out",
      href: "/auth/signout",
      class: "btn btn-outline-danger",
    },
  ]
    .filter((link) => link)
    .map((link) => (
      <Link href={link.href} key={link.href}>
        <button className={link.class}>{link.label}</button>
      </Link>
    ));

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          GitTix
        </Link>

        <div
          className={`d-flex justify-content-end ${styles.headerButtonLink}`}
        >
          {links}
        </div>
      </div>
    </nav>
  );
}
