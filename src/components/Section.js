import React from "react";

const Section = (props) => {
  return (
    <div className="px-[1rem] pt-[2.75rem] md:px-[6.25rem] md:pt-7 pb-14 ">
      {props.children}
    </div>
  );
};

export default Section;
