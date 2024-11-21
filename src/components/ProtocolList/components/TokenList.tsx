import { FC, useMemo } from "react";
import { TokenItem, Token } from "./TokenItem";

interface TokenListProps {
  title: string;
  tokens: Token[];
}

export const TokenList: FC<TokenListProps> = ({ title, tokens }) => {
  const filteredToken = useMemo(() => (tokens ?? []).filter(token => parseFloat(token.usd_value) > 0), [tokens])
  
  if(filteredToken.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-3 text-gray-500 text-sm">
        <p className="py-2 px-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
          {title}
        </p>
        <p className="py-2 pl-5 pr-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
          AMOUNT
        </p>
        <p className="py-2 px-3 text-sm font-medium text-gray-400 uppercase tracking-wider text-right whitespace-nowrap">
          USD VALUE
        </p>
      </div>
      {filteredToken
        .sort((a, b) => parseFloat(b.usd_value) - parseFloat(a.usd_value)) // Sort by USD value in descending order
        .map(token => (
          <TokenItem key={token.token_name} token={token} />
        ))}
    </div>
  );
};
