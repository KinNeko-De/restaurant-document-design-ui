import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const notFound = <Box
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  height="100vh"
  textAlign="center"
  bgcolor="#f0f0f0"
  p={3}
>
  <FollowTheSignsIcon style={{ fontSize: 100, color: '#ff6f61' }} />
  <Typography variant="h3" component="h1" gutterBottom>
    Oops! Page not found.
  </Typography>
  <Typography variant="h6" component="p" gutterBottom>
    It looks like you've taken a wrong turn. Don't worry, it happens to the best of us.
  </Typography>
  <Button variant="contained" color="primary" href="/">
    Go Back Home
  </Button>
</Box>;

const PageNotFound: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error && error.status === 404) {
      return notFound;
    }
  }

  return <div>Unexpected error</div>

};

export default PageNotFound;