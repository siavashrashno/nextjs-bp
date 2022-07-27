import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  onClose: () => void;
}

const Sidebar: React.FC<Props> = ({ children }) => {
  return <div className="">{children}</div>;
};

export default Sidebar;
