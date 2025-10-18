import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee,coffees,setCoffees  }) => {
  const { _id, name, chef, price, photo } = coffee;

  const handleDelete = (_id) => {
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
        fetch(`http://localhost:3000/coffees/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your coffee has been deleted.",
                icon: "success",
              });

              //remove deleted coffee from UI
              const remaining=coffees.filter(cof=>cof._id !==_id);
              setCoffees(remaining);
            }
          })
          .catch((err) => console.error("Delete failed:", err));
      }
    });
  };

  return (
    <div className="card card-side bg-base-100 shadow-md hover:shadow-lg transition-all duration-300">
      <figure className="w-48">
        <img
          src={photo}
          alt={`Coffee: ${name}`}
          className="object-cover w-full h-full rounded-l-lg"
        />
      </figure>

      <div className="flex justify-between items-center w-full p-4">
        {/* Coffee Details */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-600">
            Price: <span className="font-medium">{price} Tk</span>
          </p>
          <p className="text-gray-600">
            Chef: <span className="font-medium">{chef}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="card-actions flex flex-col gap-2">
          <Link
            to={`/coffee/${_id}`}
            className="btn btn-sm btn-outline btn-info w-20"
          >
            View
          </Link>

          <Link
            to={`/updateCoffee/${_id}`}
            className="btn btn-sm btn-outline btn-warning w-20"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-sm btn-outline btn-error w-20"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
