import React from 'react';

interface IoIosArrowDownProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Optional size prop
}

export const IoIosArrowDown: React.FC<IoIosArrowDownProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
    width={size}
    height={size}
    {...props} // Spread any additional props like className or onClick
  >
    <path d="M256 294.1L383.6 166.4c9.3-9.3 24.3-9.3 33.6 0s9.3 24.3 0 33.6l-144 144c-9.3 9.3-24.3 9.3-33.6 0l-144-144c-9.3-9.3-9.3-24.3 0-33.6s24.3-9.3 33.6 0L256 294.1z"/>
  </svg>
);

