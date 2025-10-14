import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useLoaderData } from "react-router";

const CoffeeDetails = () => {
  const coffee = useLoaderData();
  const { name, chef, supplier, taste, details, photo, price } = coffee;
  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-info hover:text-info/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>

        {/* Card */}
        <div className="card lg:card-side bg-base-100 shadow-xl border overflow-hidden">
          <figure className="lg:w-1/2 bg-gray-100">
            <img
              src={photo}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
          </figure>

          <div className="card-body lg:w-1/2 p-6 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
            <p className="text-gray-600">
              <span className="font-medium">Chef:</span> {chef}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Supplier:</span> {supplier}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Taste:</span> {taste}
            </p>
            <p className="text-gray-600 leading-relaxed">{details}</p>
            <p className="text-xl font-semibold text-info">Price: ${price}</p>

            <div className="card-actions mt-4">
              <button className="btn btn-outline btn-info w-32">Buy Now</button>
              <button className="btn btn-outline btn-warning w-32">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;
