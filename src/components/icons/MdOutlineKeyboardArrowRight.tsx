import React from 'react';

interface MdOutlineKeyboardArrowRightProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Optional size prop
  color?: string; // Optional color prop
}

export const MdOutlineKeyboardArrowRight: React.FC<MdOutlineKeyboardArrowRightProps> = ({ size = 24, color = "currentColor", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 0 24 24"
    transform="rotate(180)"
    width={size}
    fill={color}
    {...props}
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
  </svg>
);

export default MdOutlineKeyboardArrowRight;
