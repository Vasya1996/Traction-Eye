import { useState } from "react";
import { Box, Button, Divider, IconButton, Typography, Paper } from '@mui/material';
import { SwapToken, FilterIcon, WalletIcon, ThinArrowIcon } from '@/components/icons';
import { SwapArrows } from '@/components/icons/SwapArrows';
import { Colors } from '@/constants';
import { SelectTokenDrawer } from "./components";
import { useSwapAssets } from "@/hooks";

export const SwapPage = () => {
  const swapData = useSwapAssets();

  console.log('---swapData',swapData);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

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
                <Box onClick={handleDrawerOpen} className="flex items-center">
                  <Typography variant="body1" sx={{fontSize: "1.875rem"}} className="font-semibold">TON</Typography>
                  <ThinArrowIcon className="ml-2"/>
                </Box>
                <Box className="text-right">
                <Box className="flex items-center justify-end">
                  <WalletIcon/>
                  <Typography sx={{marginLeft: 0.625, color: Colors.blue, fontWeight: 100}}> 3.981</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontSize: '2rem' }} className="font-semibold">1</Typography>
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
            >
                <SwapArrows />
            </IconButton>

            {/* Receive Section */}
            <Box className="flex justify-between items-center p-4 mb-3">
                <Box className="flex items-center">
                  <Typography variant="body1" sx={{fontSize: "1.875rem"}} className="font-semibold">USDT</Typography>
                  <ThinArrowIcon className="ml-2"/>
                </Box>
                <Box className="text-right">
                  <Box className="flex items-center justify-end">
                    <WalletIcon color={Colors.textGray}/>
                    <Typography sx={{marginLeft: 0.625, fontWeight: 100}}> 3.981</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontSize: '2rem' }} className="font-semibold">5.125873</Typography>
                  <Typography variant="body1" color="textSecondary">$5.13 (-0.66%)</Typography>
                </Box>
            </Box>
          </Box>
          <Divider className="my-1 w-full" />
          {/* Rate Information */}
          <Paper className="p-3 m-4" sx={{backgroundColor: "#D9D9D9", borderRadius: 5}}>
            <Box className="flex justify-between mb-3">
              <Typography variant="body1" color="#0E0E0E">Rate</Typography>
              <Typography variant="body1" color="#0E0E0E">1 TON ≈ 5.12587 USDT</Typography>
            </Box>
            <Box className="flex justify-between mb-3">
              <Typography variant="body1" color="#0E0E0E">Slippage</Typography>
              <Typography variant="body1" color="#0E0E0E">5%</Typography>
            </Box>
            <Box className="flex justify-between">
              <Typography variant="body1" color="#0E0E0E">Network fee</Typography>
              <Typography variant="body1" color="#0E0E0E">≤ 0.2 TON</Typography>
            </Box>
          </Paper>

          {/* Swap Button */}
          <Button
            variant="contained"
            color="primary"
            className="w-full py-3 rounded-full text-white font-semibold"
            startIcon={<SwapToken />}
          >
            Swap token
          </Button>
        </Box>
      </Box>
      <SelectTokenDrawer open={drawerOpen} onClose={handleDrawerClose} />
    </>
  );
};
