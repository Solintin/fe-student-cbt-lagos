import React from "react";

const Container = (props) => {
  return (
    <div className="md:ml-[17%] px-6 md:px-0 pt-28 md:pt-0 font-body  w-[100%] md:w-[81%] min-h-full  cursor-default">
      {props.children}
    </div>
  );
};

export default Container;
 