import React from 'react';

interface CustomTooltipProps {
    active: boolean;
    payload: Array<{ value: number }>;
    label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (
        <div className="custom-tooltip bg-white border border-gray-300 p-2 rounded shadow-lg">
            <p className="label">Price: ${payload[0].value.toFixed(2)}</p>
        </div>
    );
};

export default CustomTooltip;
