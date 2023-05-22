import React from "react";

const Button = ({children,func,id,type,hidden}) => {
  return <button hidden={hidden} type={type} id={id} className="button-add" onClick={func}>{children}</button>;
};

export default Button;
