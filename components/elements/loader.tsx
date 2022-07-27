import React from "react";
import cn from "classnames";

interface Props {
  type?: "white" | "primary";
  className?: string;
  widthClassName?: string;
}

const Loader: React.FC<Props> = ({
  type = "primary",
  className = "w-8 h-8",
  widthClassName = " border-[0.22rem]",
}) => {
  return (
    <div className={"relative w-full flex items-center justify-center"}>
      <div
        style={{ textIndent: "-9999em" }}
        className={cn(
          "after:rounded-full rounded-full  animate-spin relative border-l-transparent  border-solid ",
          type === "white"
            ? " border-r-white border-t-white  border-b-white  border-opacity-50"
            : "border-r-primary  border-t-primary border-b-primary  border-opacity-50",
          className,
          widthClassName
        )}
      >
        <span aria-label="Loading" className="sr-only">
          Loading
        </span>
      </div>
    </div>
  );
};

export default Loader;
