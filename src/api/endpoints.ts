const endpoints = {
  getAssetsByWallet: '/assets_by_wallet',
  gethNFTsByWallet: '/nfts_by_wallet',
  getStonfiInfo: '/stonfi_info',
  getDedustInfo: '/dedust_info/',
  getChart: '/jetton_worth_chart/',
  getJettonInfo: '/jetton_extended_info/',
  login: '/telegram_login/',
  getAssetsPnl: (wallet_address: string, start_s = 60) => `/assets_total_pnl/${wallet_address}/${start_s}`,
};

export default endpoints;