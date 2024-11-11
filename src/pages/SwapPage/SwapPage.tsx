import { useState, useEffect } from "react";
import { Box, Button, Divider, IconButton, Typography, Paper, Avatar, TextField } from '@mui/material';
import { Blockchain, SettlementMethod, useOmniston, useTrackTrade } from "@ston-fi/omniston-sdk-react";
import { useTonAddress, useTonConnectUI} from "@tonconnect/ui-react";
import { SwapToken, FilterIcon, WalletIcon, ThinArrowIcon } from '@/components/icons';
import { SwapArrows } from '@/components/icons/SwapArrows';
import { Colors } from '@/constants';
import { SelectTokenDrawer } from "./components";
import { SwapAsset, useQuote, useSwapAssets } from "@/hooks";

const INIT_SWAP = {
  settlementMethods: [SettlementMethod.SETTLEMENT_METHOD_SWAP],
  offerAssetAddress: {
    blockchain: Blockchain.TON,
    address: "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c", // TON
  },
  askAssetAddress: {
    blockchain: Blockchain.TON,
    address: "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs", // USDT
  },
  amount: {
    offerUnits: "1000000000", // 1 TON,
  },
}

const TON_DECIMALS = 9;

export const SwapPage = () => {
  const omniston = useOmniston();
  const swapData = useSwapAssets();
  const userFriendlyAddress = useTonAddress();
  const [tonConnect] = useTonConnectUI();

  const[sendToken, setSendToken] = useState<SwapAsset | null>(swapData[0]);
  const [sendTokenAmount, setSendTokenAmount] = useState("");

  const[receiveToken, setReceiveToken] = useState<SwapAsset | null>(swapData[1]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSendTokenMode, setIsSendTokenMode] = useState(false);

  const [quoteRequest, setQuoteRequest] = useState(INIT_SWAP);
  const { quote, omnistonQuote } = useQuote({
    quoteRequest,
    sendToken,
    receiveToken,
  });


  const {
    data: status,
  } = useTrackTrade({
    quoteId: quote?.quoteId,
      traderWalletAddress: {
      blockchain: Blockchain.TON,
      address: userFriendlyAddress
    },
  });

  console.log('--status',status);
  // console.log('---quote',quote);

  useEffect(() => {
    if(sendToken && receiveToken && Number(sendTokenAmount) > 0) {
      console.log('---String(Number(sendTokenAmount) * sendToken.decimals)',String(Number(sendTokenAmount) * sendToken.decimals));
      setQuoteRequest({
        settlementMethods: [SettlementMethod.SETTLEMENT_METHOD_SWAP],
        offerAssetAddress: {
          blockchain: Blockchain.TON,
          address: sendToken.address,
        },
        askAssetAddress: {
          blockchain: Blockchain.TON,
          address: receiveToken.address
        },
        amount: {
          offerUnits: String(Number(sendTokenAmount) * Math.pow(10, sendToken.decimals)), // 1 TON,
        },
      })
    }
  },[sendToken, receiveToken, sendTokenAmount])
  
  useEffect(() => {
    if(swapData.length > 0) {
      setSendToken(swapData[0]);
      setReceiveToken(swapData[1]);
    }
  },[swapData]);

  const handleSwapQuoteTokens = () => {
    setSendToken(receiveToken);
    setReceiveToken(sendToken);
  }

  const handleDrawerOpen = (isSendToken: boolean) => () => {
    setDrawerOpen(true);
    if(isSendToken) {
      setIsSendTokenMode(true);
    } else {
      setIsSendTokenMode(false);
    }
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  
  const onSelectSendToken = (token: SwapAsset) => {
    setSendToken(token)
    setDrawerOpen(false);
  }

  const onSelectReceiveToken = (token: SwapAsset) => {
    setReceiveToken(token)
    setDrawerOpen(false);
  }

  const handleSwap = async () => {
    try {
      console.log('---omnistonQuote',omnistonQuote, "--userFriendlyAddress",userFriendlyAddress);
      const tx = await omniston.buildTransfer({
        quote: omnistonQuote,
        sourceAddress: {
          blockchain: Blockchain.TON,
          address: userFriendlyAddress, // sender wallet address on `offerBlockchain`
        },
        destinationAddress: {
          blockchain: Blockchain.TON,
          address: userFriendlyAddress, // receiver wallet address on `askBlockchain`
        },
        maxSlippageBps: 500, // 5%
      });
      
      const messages = tx.transaction!.ton!.messages;
  
      console.log('--messages',messages);
      await tonConnect.sendTransaction({
        validUntil: Date.now() + 1000000,
        messages: messages.map((message: Record<string, string>) => ({
          address: message.targetAddress,
          amount: message.sendAmount,
          payload: message.payload,
        })),
      });
      console.log('---messages',messages);
    } catch (err) {
      console.log('-e-rr',err);
    }
  }

  return (
    <>
      <Box className="flex flex-col items-center bg-gray-100 h-screen w-full">
                  {/* Header */}
            <Box className="flex w-full items-center justify-between px-4 mt-2">
                <Typography variant="h6" className="font-semibold">
                    Swap tokens
                </Typography>
                <IconButton>
                    <FilterIcon />
                </IconButton>
            </Box>

          <Divider className="my-1 w-full" />

        <Box className="w-full h-full max-w-md rounded-lg">
          {/* Send Section */}
          <Box sx={{
            position: "relative"
          }}>
            <Box className="flex justify-between items-center p-4">
                <Box onClick={handleDrawerOpen(true)} className="flex items-center">
                  <Avatar sx={{ height: 32, width: 32, marginRight: "6px" }} src={sendToken?.imageUrl} alt={sendToken?.symbol} />
                  <Typography variant="body1" sx={{fontSize: "1.875rem"}} className="font-semibold">{sendToken?.symbol}</Typography>
                  <ThinArrowIcon className="ml-2"/>
                </Box>
                <Box className="text-right">
                <Box className="flex items-center justify-end">
                  <WalletIcon/>
                  <Typography sx={{marginLeft: 0.625, color: Colors.blue, fontWeight: 100}}> {sendToken?.amount}</Typography>
                </Box>
                <TextField
                  value={sendTokenAmount}
                  placeholder="0"
                  onChange={(e) => setSendTokenAmount(e.target.value)}
                  type="number"
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '2rem',
                      textAlign: 'right',
                      paddingRight: 0,
                      marginLeft: 1.5,
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    }
                  }}
                />
                <Typography variant="body1" color="textSecondary">$5.16</Typography>
                </Box>
            </Box>
            <Divider className="my-1 w-full" />
            {/* Swap Icon */}
            <IconButton sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    border: '1px solid',
                    borderColor: 'gray.300',
                    borderRadius: '50%', // Full circular shape
                    backgroundColor: "#fff"
                }} 
                className="bg-gray-200 p-2 rounded-full h-[37px] w-[37px]"
                onClick={handleSwapQuoteTokens}
            >
                <SwapArrows />
            </IconButton>

            {/* Receive Section */}
            <Box className="flex justify-between items-center p-4 mb-3">
                <Box onClick={handleDrawerOpen(false)} className="flex items-center">
                  <Avatar sx={{ height: 32, width: 32, marginRight: "6px" }} src={receiveToken?.imageUrl} alt={receiveToken?.symbol} />
                  <Typography variant="body1" sx={{fontSize: "1.875rem"}} className="font-semibold">{receiveToken?.symbol}</Typography>
                  <ThinArrowIcon className="ml-2"/>
                </Box>
                <Box className="text-right">
                  <Box className="flex items-center justify-end">
                    <WalletIcon color={Colors.textGray}/>
                    <Typography sx={{marginLeft: 0.625, fontWeight: 100}}> {receiveToken?.amount ?? 0}</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontSize: '2rem', color: sendTokenAmount && quote?.askUnits ? "rgba(0, 0, 0, 0.87)" : "rgba(0, 0, 0, 0.4)"}} className="font-semibold">{(sendTokenAmount && receiveToken?.decimals && quote?.askUnits) ? (quote.askUnits / Math.pow(10, receiveToken?.decimals)) : 0}</Typography>
                  <Typography variant="body1" color="textSecondary">$5.13 (-0.66%)</Typography>
                </Box>
            </Box>
          </Box>
          <Divider className="my-1 w-full" />
          {/* Rate Information */}
          {quote && sendToken && receiveToken && (
            <Paper className="p-3 m-4" sx={{backgroundColor: "#D9D9D9", borderRadius: 5}}>
              <Box className="flex justify-between mb-3">
                <Typography variant="body1" color="#0E0E0E">Rate</Typography>
                <Typography variant="body1" color="#0E0E0E">1 {quote?.offerSymbol} ≈ {quote.conversionRate} {quote.askSymbol}</Typography>
              </Box>
              <Box className="flex justify-between mb-3">
                <Typography variant="body1" color="#0E0E0E">Slippage</Typography>
                <Typography variant="body1" color="#0E0E0E">5%</Typography>
              </Box>
              <Box className="flex justify-between">
                <Typography variant="body1" color="#0E0E0E">Network fee</Typography>
                <Typography variant="body1" color="#0E0E0E">≤ {quote.gasFee / Math.pow(10, TON_DECIMALS)} TON</Typography>
              </Box>
            </Paper>
          )}

          {/* Swap Button */}
          <Button
            disabled={!sendTokenAmount || !quote || !userFriendlyAddress}
            variant="contained"
            color="primary"
            className="w-full py-3 rounded-full text-white font-semibold"
            startIcon={<SwapToken />}
            onClick={handleSwap}
          >
            Swap token
          </Button>
        </Box>
      </Box>
      <SelectTokenDrawer assets={swapData} open={drawerOpen} onClose={handleDrawerClose} onSelect={isSendTokenMode ? onSelectSendToken : onSelectReceiveToken} />
    </>
  );
};
