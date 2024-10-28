import { ProtocolTypes } from "@/constants";

export const getAPYLabel = (poolType: ProtocolTypes): string => {
  switch (poolType) {
    case ProtocolTypes.Vault:
      return "APR";
    case ProtocolTypes.Lending:
      return "Supply APY";
    case ProtocolTypes.Borrowed:
      return "Borrowed APY";
    default:
      return "APY";
  }
};