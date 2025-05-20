import React from "react";
import { Dialog } from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";

interface TokenInfo {
  tokenAddress: string;
  balance: number;
  tokenSymbol: string;
  network?: string;
  networks?: string[];
}

interface TokenListItem {
  img: string;
  symbol: string;
  title: string;
  token: TokenInfo;
  isAggregated: boolean;
}

export const TokenDetails: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  token: TokenListItem | null;
  allTokens: TokenInfo[];
}> = ({ isOpen, onClose, token, allTokens }) => {
  if (!token) return null;

  const relevantTokens = allTokens.filter(
    (t) => t.tokenSymbol === token.symbol,
  );

  const tokensByNetwork: Record<string, TokenInfo[]> = {};
  relevantTokens.forEach((t) => {
    if (!t.network) return;
    if (!tokensByNetwork[t.network]) {
      tokensByNetwork[t.network] = [];
    }
    tokensByNetwork[t.network].push(t);
  });

  return (
    <Dialog
      open={isOpen}
      handler={onClose}
      className="min-w-[300px] max-w-[480px] rounded-lg bg-white p-6 shadow-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={token.img} alt={token.symbol} className="h-8 w-8" />
          <h3 className="text-xl font-semibold text-text1">
            {token.title} Details
          </h3>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1 hover:bg-gray-100"
        >
          <IoMdClose size={24} className="text-text2" />
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-text1">
          {token.title} balances across networks:
        </p>
      </div>

      {Object.entries(tokensByNetwork).length > 0 ? (
        Object.entries(tokensByNetwork).map(([network, tokens]) => (
          <div
            key={network}
            className="mb-3 rounded-lg border border-gray-200 p-3"
          >
            <h4 className="mb-2 font-medium text-text4">{network}</h4>
            {tokens.map((t, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-t border-gray-100 py-2 first:border-0"
              >
                <span className="text-sm text-text1">{t.tokenSymbol}</span>
                <span className="font-medium text-text1">
                  {t.balance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })}
                </span>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="flex h-24 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
          No detailed network information available.
        </div>
      )}
    </Dialog>
  );
};
