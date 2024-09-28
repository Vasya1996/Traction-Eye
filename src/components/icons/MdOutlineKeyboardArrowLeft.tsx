import React from 'react';

interface MdOutlineKeyboardArrowLeftProps extends React.SVGProps<SVGSVGElement> {
    size?: number; // Optional size prop
}

export const MdOutlineKeyboardArrowLeft: React.FC<MdOutlineKeyboardArrowLeftProps> = ({ size = 24, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height={size}
        viewBox="0 0 24 24"
        width={size}
        {...props}
    >
        <rect fill="none" height="24" width="24" />
        <g>
            <polygon points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12" />
        </g>
    </svg>
);

