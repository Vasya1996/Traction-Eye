import React from 'react';

interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Optional size prop
  color?: string
}

export const SearchIcon: React.FC<SearchIconProps> = ({ size = 24, color="currentColor",  ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="min-h-6 min-w-6" {...props}>
        <path 
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.4996 3.09998C6.4127 3.09998 3.09961 6.41307 3.09961 10.5C3.09961 14.5869 6.4127 17.9 10.4996 17.9C12.2189 17.9 13.8012 17.3136 15.0576 16.33L19.364 20.6364C19.7155 20.9879 20.2853 20.9879 20.6368 20.6364C20.9883 20.285 20.9883 19.7151 20.6368 19.3636L16.3303 15.0572C17.3135 13.8009 17.8996 12.2189 17.8996 10.5C17.8996 6.41307 14.5865 3.09998 10.4996 3.09998ZM4.89961 10.5C4.89961 7.40718 7.40681 4.89998 10.4996 4.89998C13.5924 4.89998 16.0996 7.40718 16.0996 10.5C16.0996 13.5928 13.5924 16.1 10.4996 16.1C7.40681 16.1 4.89961 13.5928 4.89961 10.5Z"
            fill={color}>
        </path>
    </svg>
);
