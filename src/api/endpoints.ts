import { getPnlByAddressPayload, getTokenPnlByAddressPayload } from "@/types";

const endpoints = {
  getAssetsByWallet: '/assets_by_wallet',
  gethNFTsByWallet: '/nfts_by_wallet',
  getStonfiInfo: '/stonfi_info',
  getDedustInfo: '/dedust_info/',
  getChart: '/jetton_worth_chart/',
  getJettonInfo: '/jetton_extended_info/',
  getMarketCap: '/market_capital',
  login: '/telegram_login/',
  getAdditionalNftInfo: '/additional_nft_info/',
  getAssetsPnl: (wallet_address: string, start_s = 60) => `/assets_total_pnl/${wallet_address}/${start_s}`,
  addWallet: '/add_wallet/',
  getPnlByAddress: ({ wallet_address, interval, period}: getPnlByAddressPayload) => `wallet_parser/pnl/${wallet_address}?period=${period}&interval=${interval}`,
  getTokenPnlByAddress: ({ wallet_address, token_address, interval, period }: getTokenPnlByAddressPayload ) => `wallet_parser/pnl/${wallet_address}/${token_address}?period=${period}&interval=${interval}`,
  getUserWalletCreationDate: (wallet_address: string) => `transactions?account=${wallet_address}&limit=1&offset=0&sort=asc`
};

export const userServiceEndpoints = {
  connectReferral: '/connect',
  getUser: '/user',
  auth: '/auth/login',
  addWallet: '/wallet/add',
  removeWallet: '/wallet/remove'
}

export const settleTonEndpoints = {
  apr: "/apr",
  jettons: "/jettons"
}

export default endpoints;