import type { SVGProps, FC } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Close: FC<Props> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20.828"
      height="20.828"
      viewBox="0 0 20.828 20.828"
      {...props}
    >
      <line
        x2="18"
        y2="18"
        transform="translate(1.414 1.414)"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="18"
        y2="18"
        transform="translate(1.414 1.414)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Close;
