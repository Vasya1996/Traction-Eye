import { FC } from "react";
import { TokenItem, Token } from "./TokenItem";

interface TokenListProps {
  title: string;
  tokens: Token[];
}

export const TokenList: FC<TokenListProps> = ({ title, tokens }) => {
  if (!tokens?.length) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-3 text-gray-500 text-sm">
        <p className="py-2 px-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <p className="py-2 px-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
          AMOUNT
        </p>
        <p className="py-2 px-3 text-sm font-medium text-gray-400 uppercase tracking-wider text-right">
          USD VALUE
        </p>
      </div>
      {tokens
        .filter(token => parseFloat(token.usd_value) > 0) // Filter tokens with USD value > 0
        .sort((a, b) => parseFloat(b.usd_value) - parseFloat(a.usd_value)) // Sort by USD value in descending order
        .map(token => (
          <TokenItem key={token.token_name} token={token} />
        ))}
    </div>
  );
};
