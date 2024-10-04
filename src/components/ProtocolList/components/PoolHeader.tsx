import { FC } from "react";

interface PoolHeaderProps {
  icon: string;
  poolName: string;
}

export const PoolHeader: FC<PoolHeaderProps> = ({ icon, poolName }) => {
  return (
    <div className="flex items-center min-h-8">
      <img src={icon} alt={poolName} className="rounded-lg h-8 w-8 mr-2" />
      <p className="text-gray-400 font-semibold text-xl">{poolName}</p>
    </div>
  );
};
