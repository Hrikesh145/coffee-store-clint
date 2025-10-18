import React, { useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Users = () => {
  const initialUsers = useLoaderData();
  const [users, setUsers] = useState(initialUsers);
  // console.log(users);\

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/users/${id}`, {
          method: "DELETE",
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
              });

              //remove deleted user from UI
              const userRemaining = users.filter(us => us._id !== id);
              setUsers(userRemaining);
            }
          })
          .catch((err) => console.error("Delete failed:", err));
      }
    });
  };

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">
        Total Users: {users.length}
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-md bg-base-100">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-base-300 text-gray-800">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.userProfile.photo}
                          alt={user.userProfile.name}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.userProfile.name}</div>
                      <div className="text-sm opacity-50">
                        {user.userProfile.address}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.userProfile.phone}</td>
                <td>{user.userProfile.email}</td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <button className="btn btn-xs btn-outline btn-info">
                      V
                    </button>
                    <button className="btn btn-xs btn-outline btn-warning">
                      E
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      X
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
