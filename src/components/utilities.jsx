import axios from 'axios';

const API_TONCENTER_URL = 'https://toncenter.com/api/v3';

const API_KEY_TONCENTER = "afa9bd2544ffe2f5c34ee99bd6da147d808c8089a6e74d7b6c6d1d3e1076e2e5";

export const shortenWallet = (address, length = 4) => {
  if (!address || length <= 0 || address.length <= 2 * length) {
    return address;
  }
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};


export const fetchWalletInfo = async (walletAddress) => {
  try {
    const response = await axios.get(`${API_TONCENTER_URL}/wallet`, {
      params: {
        address: walletAddress,
        api_key: API_KEY_TONCENTER
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet info:', error);
    throw error; 
  }
};
