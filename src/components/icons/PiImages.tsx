import React from 'react';

interface PiImagesProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Optional size prop
  color?: string; // Optional color prop
}

export const PiImages: React.FC<PiImagesProps> = ({ size = 16, color = "currentColor", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke={color}
    fill={color}
    strokeWidth="0"
    viewBox="0 0 256 256"
    height={size}
    width={size}
    {...props}
  >
    <path d="M216,40H72A16,16,0,0,0,56,56V72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V184h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM72,56H216v62.75l-10.07-10.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L72,109.37ZM184,200H40V88H56v80a16,16,0,0,0,16,16H184Zm32-32H72V132l36-36,49.66,49.66a8,8,0,0,0,11.31,0L194.63,120,216,141.38V168ZM160,84a12,12,0,1,1,12,12A12,12,0,0,1,160,84Z"></path>
  </svg>
);

export default PiImages;
