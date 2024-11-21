import React, { useState } from 'react';
import { Box, Drawer, Typography, Button, IconButton, Tooltip } from '@mui/material';
import { CloseIcon, InfoIcon, NetWorthBonus, BlockIcon } from '@/components/icons';
import { useTelegramShare } from '@/hooks';
// import InviteBonus from "../InviteBonus.png";
import InviteBonus from "./InviteBonus.svg";

interface SocialScoreDrawerProps {
  open: boolean;
  onClose: () => void;
  referral_link?: string;
}

const SOCIAL_SCORE_INFO = [{
    icon: <img src={InviteBonus} style={{height: 57, width: 57,}} alt="invite bonus"/>,
    title: "Invite friends",
    text: "For each invited friend, you receive a social score equal to 10% of the invited friends NetWorth and a friend receives 10% of your NetWorth",
    isDisabled: false
}, {
  icon: <NetWorthBonus />,
  title: "Boost your NetWorth",
  text: "Your social score is updated daily equally to your NetWorth, which is taken from the protocols you invested in and wallet balance",
  isDisabled: false
},{
  icon: <BlockIcon />,
  title: "Soon...",
  text: "Over time, the number of criteria considered that influence the social score will increase",
  isDisabled: true
}]

export const SocialScoreDrawer: React.FC<SocialScoreDrawerProps> = ({ open, onClose, referral_link }) => {
  const { shareContent } = useTelegramShare();

  const [openTooltip, setOpenTooltip] = useState(false);

  // Toggle the tooltip on click
  const handleTooltipToggle = () => {
    setOpenTooltip(!openTooltip);
  };

  // Close the tooltip when clicking outside
  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}     PaperProps={{
        sx: {
          paddingTop: "40px",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          overflow: 'hidden',  // Ensure content doesn't overflow the rounded corners
        },
      }}>
      <Box
        sx={{
          padding: 2,
          textAlign: 'center',
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          paddingBottom: 8
        }}
      >
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={onClose}
        >
            <CloseIcon />
        </IconButton>

        <Box sx={{position: "relative", width: 'fit-content'}}>
            <Typography sx={{color: '#1F2937', lineHeight: "20px", fontSize: "24px"}} variant="h6" fontWeight="bold">
            Social Score
            </Typography>
            <Tooltip   title={
                <span style={{fontSize: 9}}>
                Dynamic metric for the value of your contacts that<br />changes
                depending on the NetWorth of each contact
                </span>
            }
            open={openTooltip} // Control the open state manually
            onClose={handleTooltipClose} // Close when clicking outside
            componentsProps={{
                tooltip: {
                  sx: {
                    maxWidth: 260, // Keeps the text in two lines
                    mt: 20, // Move tooltip closer to the icon vertically
                    ml: -26, // Adjust this value to move tooltip horizontally to the left,
                    borderRadius: "10px",
                    padding: "4px 8px",
                  },
                },
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -24], // Fine-tune the tooltip position closer to the icon
                      },
                    },
                  ],
                },
              }}
            placement="top" // This ensures the tooltip appears at the top
            >
            {/* <Tooltip title="Dynamic metric for the value of your contacts that changes depending on the NetWorth of each contact"> */}
                <div onClick={handleTooltipToggle} style={{width: "24px", height: "24px", position: "absolute", top: "-4px", right: -16}}>
                    <InfoIcon style={{marginLeft: "10px"}} />
                </div>
                    
            </Tooltip>
        </Box>
        <Typography sx={{color: '#1F2937',}} variant="subtitle2" color="textSecondary">
          How to increase it:
        </Typography>

        {/* Invite friends */}
        {SOCIAL_SCORE_INFO.map(({icon, title, text, isDisabled}) => (
          <Box key={title} sx={{ display: 'flex', alignItems: 'center', marginY: 2 }}>
              <Box sx={{minWidth: "67px"}}>{icon}</Box>
              <Box sx={{
                  display: "flex",
                  flexDirection: "column"
                  }}
              >
                  <Typography sx={{color: '#1F2937', textAlign: 'start', fontSize: "15px", opacity: isDisabled ? 0.5 : 1}} variant="body2">
                      {title}
                  </Typography>
                  <Typography sx={{color: '#1F2937', textAlign: 'start', fontSize: "13px", fontWeight: 300, opacity: isDisabled ? 0.5 : 0.7}}>
                      {text}
                  </Typography>
              </Box>
          </Box>
        ))}

        {/* Invite Button */}
        <Button
          variant="contained"
          color="warning"
          disabled={!referral_link}
          onClick={() => {
            shareContent(`https://t.me/TractionEyebot/app?startapp=${referral_link}`,"Check out my investment profile and join my network of contacts. Find out your social score 🏆");
          }}
          sx={{ fontWeight: "bold", height: "56px",fontSize: "19px", textTransform: "none", marginTop: 2, marginBottom: 2, paddingY: 1, borderRadius: '15px', width: '100%', color: '#1F2937', backgroundColor: '#FFD235', }}
        >
          Invite friend
        </Button>
      </Box>
    </Drawer>
  );
};
