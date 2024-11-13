import TonWeb from 'tonweb';

const tonweb = new TonWeb();

export const convertToUserFriendlyAddress = (rawAddress: string): string => {
  try {
    const address = new tonweb.utils.Address(rawAddress);
    return address.toString(true, true, true); // Use the options for user-friendly formatting
  } catch (error) {
    console.error('Invalid TON address:', rawAddress);
    return rawAddress; // Return raw address if parsing fails
  }
};