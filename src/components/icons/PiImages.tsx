import React from 'react';

interface PiImagesProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Optional size prop
}

export const PiImages: React.FC<PiImagesProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    width={size}
    height={size}
    {...props}
  >
    <rect width="256" height="256" fill="none"/>
    <path d="M224,40H80A16,16,0,0,0,64,56V184H48V72A16,16,0,0,0,32,56H224a16,16,0,0,0,16-16V184a16,16,0,0,0-16-16H80V56H224A16,16,0,0,0,240,40Z"/>
    <path d="M104,208a24,24,0,1,1-24-24A24,24,0,0,1,104,208ZM40,232H200a8,8,0,0,0,8-8v-8H40v8A8,8,0,0,0,40,232Z"/>
    <path d="M184,136h48a16,16,0,0,1,16,16v80a16,16,0,0,1-16,16H184a16,16,0,0,1-16-16V152A16,16,0,0,1,184,136Z"/>
  </svg>
);
