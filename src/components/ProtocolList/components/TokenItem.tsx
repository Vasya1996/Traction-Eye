import { FC } from "react";
import { formatNumber } from "@/utils";

export interface Token {
  token_name: string;
  token_image_url: string;
  amount: string;
  decimals: string;
  usd_value: string;
}

interface TokenItemProps {
    token: Token;
}

export const TokenItem: FC<TokenItemProps> = ({ token }) => {
  return (
    <div className="flex justify-between items-center mt-2">
      <div className="flex items-center w-[40%]">
        <img
          src={token.token_image_url}
          alt={token.token_name}
          className="h-6 w-6 mr-2 rounded-full"
        />
        <span className="text-black text-xs">{token.token_name}</span>
      </div>
      <p className="w-[30%] ml-3 text-left text-black text-xs">
        {formatNumber((+token.amount / Math.pow(10, +token.decimals)))}
      </p>
      <p className="w-[30%] text-right text-black text-xs">
        ${formatNumber(parseFloat(token.usd_value), false)}
      </p>
    </div>
  );
};
