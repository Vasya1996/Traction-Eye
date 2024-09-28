import React from 'react';

interface IoDiamondOutlineProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Optional size prop
  color?: string; // Optional color prop
}

export const IoDiamondOutline: React.FC<IoDiamondOutlineProps> = ({ size = 24, color = "currentColor", ...props }) => (
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
    <path d="m35.42 188.21 207.75 269.46a16.17 16.17 0 0 0 25.66 0l207.75-269.46a16.52 16.52 0 0 0 .95-18.75L407.06 55.71A16.22 16.22 0 0 0 393.27 48H118.73a16.22 16.22 0 0 0-13.79 7.71L34.47 169.46a16.52 16.52 0 0 0 .95 18.75zM48 176h416"></path>
    <path d="m400 64-48 112-96-128M112 64l48 112 96-128m0 400-96-272m96 272 96-272"></path>
  </svg>
);

export default IoDiamondOutline;
