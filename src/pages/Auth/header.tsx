import React from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <>
      <h1 className="text-[#4CC35E] text-center text-[32px] font-extrabold mb-5 max-md:text-[28px] max-sm:text-2xl">
        {title.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </h1>
      <p className="text-white text-center text-lg font-normal leading-7 mb-10 max-md:text-base max-sm:text-sm">
        {subtitle}
      </p>
    </>
  );
};

export default header;
