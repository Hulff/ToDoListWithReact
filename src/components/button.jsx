import React from "react";

const Button = ({children,func,id,type}) => {
  return <button type={type} id={id} className="button-add" onClick={func}>{children}</button>;
};

export default Button;
