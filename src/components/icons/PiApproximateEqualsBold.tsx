import React from 'react';

interface PiApproximateEqualsBoldProps extends React.SVGProps<SVGSVGElement> {
    size?: number; // Optional size prop
}

export const PiApproximateEqualsBold: React.FC<PiApproximateEqualsBoldProps> = ({ size = 10, ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width={size}
        height={size}
        fill="none"
        {...props}
    >
        <rect width="256" height="256" fill="none" />
        <path
            d="M40,161.61c72-59.69,104,56.47,176-3.22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
        />
        <path
            d="M40,97.61c72-59.69,104,56.47,176-3.22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
        />
    </svg>
);

export default PiApproximateEqualsBold;
