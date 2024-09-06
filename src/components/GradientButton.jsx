import React from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 25,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)', // 약간 커지는 애니메이션 효과
    boxShadow: '0 6px 8px 3px rgba(255, 105, 135, .5)',
  },
}));

const GradientButtonComponent = () => {
  return (
    <GradientButton  fullWidth> 
      Participate
    </GradientButton>
  );
};

export default GradientButtonComponent;