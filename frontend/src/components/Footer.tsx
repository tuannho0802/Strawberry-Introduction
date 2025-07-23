import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background:
          "linear-gradient(to right, #EF4444, #DC2626)",
      }}
      className=" text-white p-4 mt-8"
    >
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()}{" "}  
          Strawberry World. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
