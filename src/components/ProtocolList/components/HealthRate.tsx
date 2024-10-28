import { FC } from "react";

interface HealthRateProps {
  healthRate?: number;
}

export const HealthRate: FC<HealthRateProps> = ({ healthRate }) => {
  if (!healthRate) return null;

  return (
    <div className="bg-gradient-to-r from-sky-50 text-gray-600 font-medium px-4 py-2 ml-[-16px] mr-[-16px] rounded-none my-4">
      <p>
        <span className="text-gray-400 font-light">Health rate</span>
        <span className="text-gray-500 font-light">&nbsp;&nbsp;&gt;{healthRate}</span>
      </p>
    </div>
  );
};
