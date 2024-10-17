import React from 'react';

interface InfoIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Optional size prop
}

export const InfoIcon: React.FC<InfoIconProps> = ({ size = 14, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="7" cy="7" r="6.5" fill="#F7F8FA" stroke="#616B84"/>
        <path d="M6.84162 11V5.54545H7.47727V11H6.84162ZM7.16477 4.60795C7.03456 4.60795 6.9233 4.56416 6.83097 4.47656C6.73864 4.3866 6.69247 4.27888 6.69247 4.15341C6.69247 4.02794 6.73864 3.9214 6.83097 3.83381C6.9233 3.74384 7.03456 3.69886 7.16477 3.69886C7.29498 3.69886 7.40625 3.74384 7.49858 3.83381C7.59091 3.9214 7.63707 4.02794 7.63707 4.15341C7.63707 4.27888 7.59091 4.3866 7.49858 4.47656C7.40625 4.56416 7.29498 4.60795 7.16477 4.60795Z" fill="#616B84"/>
    </svg>
);

