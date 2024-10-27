import { FC, ReactElement } from "react";

interface PoolHeaderProps {
  icon: string | ReactElement;
  poolName: string;
}

export const PoolHeader: FC<PoolHeaderProps> = ({ icon, poolName }) => {

  console.log('--icon',icon);
  return (
    <div className="flex items-center min-h-8">
      {(typeof icon === "string") ? <img src={icon} alt={poolName} className="rounded-lg h-8 w-8 mr-2" /> :  icon}
      <p className="text-gray-400 font-semibold text-xl">{poolName}</p>
    </div>
  );
};
