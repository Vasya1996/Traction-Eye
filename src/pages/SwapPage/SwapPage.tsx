import { useState, useEffect, useMemo } from "react";
import { Box, Button, Divider, IconButton, Typography, Paper, Avatar, TextField, Skeleton } from '@mui/material';
import { Blockchain, SettlementMethod, useOmniston, useTrackTrade } from "@ston-fi/omniston-sdk-react";
import { useTonAddress, useTonConnectUI, THEME} from "@tonconnect/ui-react";
import { SwapToken, FilterIcon, WalletIcon, ThinArrowIcon } from '@/components/icons';
import { SwapArrows } from '@/components/icons/SwapArrows';
import { Colors } from '@/constants';
import { SelectTokenDrawer, SlippageSettingsDrawer } from "./components";
import { setLocalStorageWithEvent, SwapAsset, useLocalStorageSubscription, useQuote, useSwapAssets } from "@/hooks";
import { formatNumber } from "@/utils";
import { Spinner } from "@/components/ui/spinner";
import toast from "react-hot-toast";
import { LocalStorageKeys } from "@/constants/localStorage";
import { useAuthStore } from "@/store/store";

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
export const SLIPPAGE_MULTIPLIER = 100;
export const DEFAULT_SLIPPAGE = 5;
export const TRADE_RESULT_FULLY_FILLED = "TRADE_RESULT_FULLY_FILLED";
export const TRADE_RESULT_ABORTED ="TRADE_RESULT_ABORTED"


export const SwapPage = () => {
  const omniston = useOmniston();
  const {assets: swapData, refetchBalances } = useSwapAssets();
  const userFriendlyAddress = useTonAddress();
  const [tonConnect] = useTonConnectUI();
  const swapQuoteId = useLocalStorageSubscription(LocalStorageKeys.quoteId);

  const[sendToken, setSendToken] = useState<SwapAsset | null>(swapData[0]);
  const [sendTokenAmount, setSendTokenAmount] = useState("");

  const[receiveToken, setReceiveToken] = useState<SwapAsset | null>(swapData[1]);

  const [slippageDrawerOpen, setSlippageDrawerOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSendTokenMode, setIsSendTokenMode] = useState(false);
  const [slippage, setSlippage] = useState<number>(DEFAULT_SLIPPAGE);

  const [quoteRequest, setQuoteRequest] = useState(INIT_SWAP);
  const { quote, omnistonQuote } = useQuote({
    quoteRequest,
    sendToken,
    receiveToken,
    sendTokenAmount
  });


  const {
    data: status,
  } = useTrackTrade({
      quoteId: swapQuoteId,
      traderWalletAddress: {
      blockchain: Blockchain.TON,
      address: userFriendlyAddress
    },
  });
  const [isLoadingTransaction, SetIsLoadingTransaction] = useState(false);

  useEffect(() => {
    const result = status?.status?.tradeSettled?.result;
    if (result === TRADE_RESULT_FULLY_FILLED) {
      refetchBalances();
      SetIsLoadingTransaction(false);
      setLocalStorageWithEvent(LocalStorageKeys.quoteId, "");
    } else if (result === TRADE_RESULT_ABORTED) {
      refetchBalances();
      SetIsLoadingTransaction(false);
      toast.error('Something went wrong!');
      setLocalStorageWithEvent(LocalStorageKeys.quoteId, "");
    }
    
    
  },[status])

  useEffect(() => {
    if(sendToken && receiveToken) {
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
          offerUnits: String(Number(sendTokenAmount || 1) * Math.pow(10, sendToken.decimals)), // 1 TON,
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

  const handleSlippageDrawerOpen = () => {
    setSlippageDrawerOpen(true);
  };
  
  const handleSlippageDrawerClose = () => {
    setSlippageDrawerOpen(false);
  };

  const onSelectSendToken = (token: SwapAsset) => {
    setSendToken(token)
    setDrawerOpen(false);
  }

  const onSelectReceiveToken = (token: SwapAsset) => {
    setReceiveToken(token)
    setDrawerOpen(false);
  }

  const handleSlippage = (newSlippage: number) => {
    setSlippage(newSlippage);
    handleSlippageDrawerClose();
  }

  const handleSwap = async () => {
    try {
      SetIsLoadingTransaction(true);
      setLocalStorageWithEvent(LocalStorageKeys.quoteId, String(omnistonQuote?.quoteId));
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
        maxSlippageBps: slippage * SLIPPAGE_MULTIPLIER,
      });
      
      const messages = tx.transaction!.ton!.messages;
  
      tonConnect.uiOptions = {
        uiPreferences: {
            theme: THEME.LIGHT
        }
      };
      await tonConnect.sendTransaction({
        validUntil: Date.now() + 1000000,
        messages: messages.map((message: Record<string, string>) => ({
          address: message.targetAddress,
          amount: message.sendAmount,
          payload: message.payload,
        })),
      });
    } catch (err) {
      toast.error('Something went wrong!');
      SetIsLoadingTransaction(false);
      setLocalStorageWithEvent(LocalStorageKeys.quoteId, "");
    }
  }

  const canDoSwap = useMemo(() => Number(sendToken?.amount) >= Number(sendTokenAmount), [sendToken?.amount, sendTokenAmount]);

  const [showConnectBtn, setShowConnectBtn] = useState(false);
  const { isAuthenticated } = useAuthStore();


	useEffect(() => {
		console.log("showConnectBtn", showConnectBtn);
		console.log(
			"LocalStorageKeys.firstLogin",
			localStorage.getItem(LocalStorageKeys.firstLogin),
			!localStorage.getItem(LocalStorageKeys.firstLogin)
		);
		console.log("userFriendlyAddress.length", userFriendlyAddress.length);
		console.log("location?.pathname", location.pathname);
		console.log(
			"show on index",
			(location?.pathname !== "/connect" && location?.pathname === "/friend") ||
				showConnectBtn
		);
		if (!userFriendlyAddress.length) {
			setShowConnectBtn(true);
			return;
		}
		setShowConnectBtn(false);
	}, [location?.pathname]);


  return (
      <Box className="flex flex-col items-center bg-gray-100 h-screen w-full">
        {/* Header */}
        <Box className="flex w-full items-center justify-between px-4 mt-10 mb-2">
            <Typography sx={{fontSize: 24, color: "#1F2937"}} className="font-semibold">
                Swap tokens
            </Typography>
            <IconButton onClick={handleSlippageDrawerOpen}>
                <FilterIcon />
            </IconButton>
        </Box>


        <Box className="flex flex-1 flex-col justify-between w-full max-w-md rounded-lg" sx={{height: "calc(100% - 200px)"}}>
          {/* Send Section */}
          <Box>
            <Box sx={{
              position: "relative"
            }}>
              {sendToken ? (
                <Box className="flex justify-between items-center p-4">
                  <Box onClick={handleDrawerOpen(true)} className="flex items-center">
                    <Avatar sx={{ height: 32, width: 32, marginRight: "6px" }} src={sendToken?.imageUrl} alt={sendToken?.symbol} />
                    <Typography variant="body1" sx={{fontSize: "1.875rem"}} className="font-semibold">{sendToken?.symbol}</Typography>
                    <ThinArrowIcon className="ml-2"/>
                  </Box>
                  <Box className="text-right">
                  <Box className="flex items-center justify-end">
                    <WalletIcon/>
                    <Typography onClick={() => setSendTokenAmount(String(sendToken?.amount ?? 0))} sx={{marginLeft: 0.625, color: Colors.blue, fontWeight: 100}}> {sendToken?.amount ?? 0}</Typography>
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
                        color: (canDoSwap || sendTokenAmount === "") ? "rgba(0, 0, 0, 0.87)" : "red",
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none'
                      }
                    }}
                  />
                  {/* <Typography variant="body1" color="textSecondary">$5.16</Typography> */}
                  </Box>
              </Box>
              ) : (
                <Skeleton animation="wave" variant="rectangular" width="100%" height={119} />
              )}
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
              {receiveToken ? (
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
                    <Typography variant="body1" sx={{ padding: "7.5px 0px", fontSize: '2rem', color: sendTokenAmount && quote?.askUnits ? "rgba(0, 0, 0, 0.87)" : "rgba(0, 0, 0, 0.4)"}} className="font-semibold">{(sendTokenAmount && receiveToken?.decimals && quote?.askUnits) ? (quote.askUnits / Math.pow(10, receiveToken?.decimals)) : 0}</Typography>
                    {/* <Typography variant="body1" color="textSecondary">$5.13 (-0.66%)</Typography> */}
                  </Box>
                </Box>
              ) : (
                <Skeleton animation="wave" variant="rectangular" width="100%" height={119} />
              )}
            </Box>
            <Divider className="my-1 w-full" />
            {/* Rate Information */}
            {(!quote && !sendTokenAmount) ? <></>: (
              <>
                {quote && sendToken && receiveToken ? (
                  <Paper className="p-3 m-4" sx={{backgroundColor: "#D9D9D9", borderRadius: 5}}>
                    <Box className="flex justify-between mb-3">
                      <Typography variant="body1" color="#0E0E0E">Rate</Typography>
                      <Typography variant="body1" color="#0E0E0E">1 {quote?.offerSymbol} ≈ {formatNumber(quote.conversionRate)} {quote.askSymbol}</Typography>
                    </Box>
                    <Box className="flex justify-between mb-3">
                      <Typography variant="body1" color="#0E0E0E">Slippage</Typography>
                      <Typography variant="body1" color="#0E0E0E">{slippage}%</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography variant="body1" color="#0E0E0E">Network fee</Typography>
                      <Typography variant="body1" color="#0E0E0E">≤ {quote.gasFee / Math.pow(10, TON_DECIMALS)} TON</Typography>
                    </Box>
                  </Paper>
                ) : (
                  <Skeleton animation="wave" variant="rectangular" width="100%" height={119} />
                )}
              </>
            )}
          </Box>

          {/* Swap Button */}
          {isAuthenticated ? <Box className="flex items-end mx-4 mb-30">
            <Button
              disabled={!sendTokenAmount || !quote || !userFriendlyAddress || !canDoSwap}
              variant="contained"
              color="primary"
              className="w-full py-3 rounded-full text-white font-semibold normal-case"
              sx={{height: "52px", backgroundColor: "#FFD235", color: "#1F2937", textTransform: "none", borderRadius: "12px", fontSize: 18}}
              startIcon={(sendTokenAmount && !isLoadingTransaction) && <SwapToken />}
              onClick={handleSwap}
            >
              {isLoadingTransaction ? <Spinner/> : (canDoSwap && sendTokenAmount ? "Swap token" : !sendTokenAmount ? "Enter an amount" :`Insufficient ${sendToken?.symbol ?? ""} balance`)}
            </Button>
          </Box> : null}
        </Box>
      <SelectTokenDrawer assets={swapData} open={drawerOpen} onClose={handleDrawerClose} filteredTokenAddress={isSendTokenMode ? receiveToken?.address : sendToken?.address} onSelect={isSendTokenMode ? onSelectSendToken : onSelectReceiveToken} />
      <SlippageSettingsDrawer open={slippageDrawerOpen} onClose={handleSlippageDrawerClose} onSave={handleSlippage} />
    </Box>
  );
};
