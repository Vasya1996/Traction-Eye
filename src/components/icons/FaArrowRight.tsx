import React from 'react';

interface FaArrowRightProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Optional size prop
}

export const FaArrowRight: React.FC<FaArrowRightProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
    width={size}
    height={size}
    {...props}
  >
    <path d="M502.6 233.4l-176-176c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L430.1 232H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H430.1L292.7 421.7c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l176-176c9.4-9.4 9.4-24.6 0-33.9z"/>
  </svg>
);
