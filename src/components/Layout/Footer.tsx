import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.paper',
        textAlign: 'center'
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 Community Events Platform
      </Typography>
    </Box>
  );
};

export default Footer;