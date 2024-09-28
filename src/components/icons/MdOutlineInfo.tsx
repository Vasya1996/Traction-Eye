import { Colors } from '@/constants';
import React from 'react';

interface MdOutlineInfoProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Optional size prop
  color?: string;
}

export const MdOutlineInfo: React.FC<MdOutlineInfoProps> = ({ size = 14, color = Colors.grayLight, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    {...props}
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
    <rect x="11" y="11" width="2" height="6" fill={color} />
    <rect x="11" y="7" width="2" height="2" fill={color} />
  </svg>
);

