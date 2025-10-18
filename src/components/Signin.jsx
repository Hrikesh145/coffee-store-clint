import React, { use } from "react";
import { AuthContext } from "./contexts/AuthContext";

const Signin = () => {
  const { signInUser } = use(AuthContext);
  const handleSignin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    //firebase sign in logic here
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);

        //update LastTimeLogin
        const signInInfo = {
          email,
          lastSignInTIme: result.user?.metadata?.lastSignInTime,
        };
        fetch("http://localhost:3000/users", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signInInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("After patch", data);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-100 mx-auto max-w-sm shrink-0 shadow-2xl mt-30">
      <div className="card-body">
        <form onSubmit={handleSignin} className="fieldset">
          <h1 className="text-5xl font-bold">Sign In!</h1>

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
