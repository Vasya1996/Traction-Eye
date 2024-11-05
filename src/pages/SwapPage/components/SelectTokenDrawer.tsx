import React from 'react';
import {
  AppBar,
  Box,
  InputBase,
  Tab,
  Tabs,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  Toolbar,
  Drawer,
} from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import StarOutlineIcon from '@mui/icons-material/StarOutline';

interface Token {
  name: string;
  ticker: string;
  balance: string;
  value: string;
  icon: string;
}

const tokens: Token[] = [
  { name: 'TON', ticker: 'TON', balance: '727.78808', value: '$3.78K', icon: '/path/to/ton-icon.png' },
  { name: 'NOT', ticker: 'Notcoin', balance: '26 900.15235', value: '$213.02', icon: '/path/to/notcoin-icon.png' },
  { name: 'OPEN', ticker: 'OPEN', balance: '697 723', value: '$197.28', icon: '/path/to/open-icon.png' },
  { name: 'CES', ticker: 'swap.coffee', balance: '136.35716', value: '$186.60', icon: '/path/to/ces-icon.png' },
  { name: 'STON', ticker: 'STON', balance: '23.33961', value: '$83.51', icon: '/path/to/ston-icon.png' },
];

interface SelectTokenDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const SelectTokenDrawer: React.FC<SelectTokenDrawerProps> = ({ open, onClose }) => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          paddingTop: '12px',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          overflow: 'hidden', // Ensure content doesn't overflow the rounded corners
        },
      }}
    >
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Select token
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ px: 2, py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'grey.100', borderRadius: '20px', px: 1 }}>
            {/* <SearchIcon sx={{ color: 'grey.500' }} /> */}
            <InputBase placeholder="Search assets or address" sx={{ ml: 1, flex: 1 }} />
          </Box>
        </Box>

        <Tabs value={tabIndex} onChange={handleTabChange} sx={{ marginLeft: '16px' }}>
          <Tab label="All assets" />
        </Tabs>

        <List>
          {tokens.map((token, index) => (
            <React.Fragment key={token.name}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={token.icon} alt={token.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1">{token.name}</Typography>
                      <Typography variant="body1">{token.balance}</Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'grey.600' }}>
                      <Typography variant="caption">{token.ticker}</Typography>
                      <Typography variant="caption">{token.value}</Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < tokens.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        <Box sx={{ p: 2 }}>
          <Button variant="contained" color="primary" fullWidth onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
