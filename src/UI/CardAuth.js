import React from "react";

const CardAuth = (props) => {
  return (
    <div className="shadow-blue-1xl rounded-lg w-[20.4rem] md:w-[36.5rem] pb-10 md:px-10 px-4">
      <div className=" bg-portal w-[3.75rem]  h-[3.75rem] md:w-[8rem] md:h-[8rem] bg-no-repeat bg-cover absolute left-[45%] top-36 md:top-32 items-center text-center"></div>
      {props.children}
    </div>
  );
};

export default CardAuth;
