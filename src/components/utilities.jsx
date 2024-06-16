export const shortenWallet = (address, length = 4) => {
  if (!address || length <= 0 || address.length <= 2 * length) {
    return address;
  }
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};
