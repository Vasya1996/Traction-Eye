import React from 'react';

interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Optional size prop
}

export const CloseIcon: React.FC<CloseIconProps> = ({ size = 35, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="17.5" cy="17.5" r="17.5" transform="rotate(180 17.5 17.5)" fill="#E1E1E1"/>
        <path d="M12 23.5109L23.5109 12" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 12L23.5109 23.5109" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
