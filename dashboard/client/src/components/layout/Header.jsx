import { Box, Button } from '@mui/material';

const Header = ({ onLogout }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
      <h1>Product Analytics Dashboard</h1>
      <Button variant="outlined" onClick={onLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Header;