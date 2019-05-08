import { ReactNode } from "react";
import ReactDOM from "react-dom";

export default (children: ReactNode) =>
  ReactDOM.createPortal(children, document.getElementById("portal")!);
