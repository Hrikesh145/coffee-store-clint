import React, { use } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Swal from "sweetalert2";

const Signup = () => {
  const { createUser } = use(AuthContext);
  console.log(createUser);

  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...userProfile } = Object.fromEntries(
      formData.entries()
    );
    console.log(email, password, userProfile);

    //Create User in firebase
    createUser(email, password)
      .then((result) => {
        console.log(result.user);

        //Save user to DB
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userProfile }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedIdj) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
              });
                form.reset();
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto max-w-sm shrink-0 shadow-2xl mt-30">
      <div className="card-body">
        <form onSubmit={handleSignup} className="fieldset">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <label className="label">Name</label>
          <input type="text" name="name" className="input" placeholder="Name" />
          <label className="label">Address</label>
          <input
            type="text"
            name="address"
            className="input"
            placeholder="Address"
          />
          <label className="label">Phone Number</label>
          <input
            type="text"
            name="phone"
            className="input"
            placeholder="Phone Number"
          />
          <label className="label">Photo</label>
          <input
            type="text"
            name="photo"
            className="input"
            placeholder="Photo URL"
          />
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
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
