import Typography from '@mui/material/Typography';
import React from 'react';
import { TemplateGateway } from './domain';

const TemplateDesign: React.FC<{ gateway: TemplateGateway }> = ({ gateway }) => {
  return (
    <Typography variant="h6" color="textSecondary" align="center">
      Feeling a bit chilly? ❄️
    </Typography>
  );
}

export default TemplateDesign;
