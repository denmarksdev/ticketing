import { useState } from "react";
import Router from "next/router";
import userService from "../../services/user-client";

export default function Signup() {
  const [email, setEmail] = useState("teste@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();

    setError(null);

    try {
      await userService().signup({
        email,
        password,
      });

      Router.push("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form className="container" onSubmit={onSubmit}>
      <h1>Sign up</h1>

      <div className="mb-3">
        <label className="form-label">Email Address</label>
        <input
          className="form-control"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      {error}

      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}
