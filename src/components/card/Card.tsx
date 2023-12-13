import React from "react";
import "./Card.scss";

function Card() {
  return (
    <>
      <div className="relative flex  flex-col mx-auto mt-11 w-[300px] transform overflow-hidden rounded-lg bg-white  shadow-md duration-300 hover:scale-105 hover:shadow-lg h-[331px] w-[271px]">
        <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
          <img 
            className="h-[202px] w-[247px]"
            src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="ui/ux review check"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
          <button
            className="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-dark="true"
          >
            <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform bg-white rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
              >
                <path
                  d="M14.4569 2.74707C16.9676 2.74707 19.0023 4.81315 19.0023 7.70567C19.0023 13.4907 12.804 16.7964 10.738 18.0361C8.67188 16.7964 2.47363 13.4907 2.47363 7.70567C2.47363 4.81315 4.53972 2.74707 7.01902 2.74707C8.55618 2.74707 9.91153 3.5735 10.738 4.39994C11.5644 3.5735 12.9198 2.74707 14.4569 2.74707ZM11.5099 15.6427C12.2379 15.1832 12.895 14.7262 13.5098 14.237C15.9734 12.2783 17.3494 10.1379 17.3494 7.70567C17.3494 5.75529 16.0792 4.39994 14.4569 4.39994C13.5677 4.39994 12.6057 4.871 11.9065 5.56851L10.738 6.73709L9.56939 5.56851C8.87023 4.871 7.90826 4.39994 7.01902 4.39994C5.41574 4.39994 4.1265 5.76851 4.1265 7.70567C4.1265 10.1387 5.50334 12.2783 7.96528 14.237C8.58098 14.7262 9.23799 15.1832 9.96608 15.6419C10.2132 15.7981 10.4578 15.9477 10.738 16.1146C11.0181 15.9477 11.2628 15.7981 11.5099 15.6427Z"
                  fill="#722ECC"
                />
              </svg>
            </span>
          </button>
        </div>
        <div className="p-4">
          <h2 className="mb-2 text-lg font-medium ">Product Name</h2>
          <p className="mb-2 text-base ">Product description goes here.</p>
          <div className="flex items-center">
            <p className="mr-2 text-lg font-[700] ">$47,00,000</p>
            <p className="text-base  font-medium  line-through ">$47,00,000</p>
            <p className="ml-auto text-base font-medium text-[#722ECC]">
              ( 50% off )
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
