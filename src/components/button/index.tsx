import { ReactElement, ReactNode } from "react";
import "./button.css";

interface IButton {
  children: ReactNode;
  onClick: ()=>void;
}

const Button = ({ children, onClick }: IButton): ReactElement => {
  return (
    <div className="center">
      <button className="fancy" onClick={onClick}>
        <span className="top-key"></span>
        <span>{children}</span>
        <span className="bottom-key-1"></span>
        <span className="bottom-key-2"></span>
      </button>
    </div>
  );
};

export default Button;
