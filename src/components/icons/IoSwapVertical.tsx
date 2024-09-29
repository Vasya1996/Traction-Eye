import React from 'react';

interface IoSwapVerticalProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Optional size prop
  color?: string; // Optional color prop
}

export const IoSwapVertical: React.FC<IoSwapVerticalProps> = ({ size = 36, color = "currentColor", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke={color}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="32"
    viewBox="0 0 512 512"
    height={size}
    width={size}
    {...props}
  >
    <path d="M464 208 352 96 240 208m112-94.87V416M48 304l112 112 112-112m-112 94V96" />
  </svg>
);

export default IoSwapVertical;
