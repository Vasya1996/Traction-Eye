import { TIMELINES_PERIOD_SECONDS, TIMELINES_INTERVALS_SECONDS } from "@/constants";
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
  getPnlByAddress: ({ wallet_address, interval }: getPnlByAddressPayload) => `wallet_parser/pnl/${wallet_address}?period=${TIMELINES_PERIOD_SECONDS[interval]}&interval=${TIMELINES_INTERVALS_SECONDS[interval]}`,
  getTokenPnlByAddress: ({ wallet_address, token_address, interval }: getTokenPnlByAddressPayload ) => `wallet_parser/pnl/${wallet_address}/${token_address}?period=${TIMELINES_PERIOD_SECONDS[interval]}&interval=${TIMELINES_INTERVALS_SECONDS[interval]}`
};

export default endpoints;