import React from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

// Interface for Item data type
interface Item {
  title: string;
  description: string;
  language: string;
}

// Interface for LikeButton component props (optional)
interface LikeButtonProps {
  onClick?: () => void; // Optional click handler function
}

// LikeButton component (implementation details omitted)
const LikeButton: React.FC<LikeButtonProps> = ({ onClick }) => (
  <IconButton onClick={onClick}>
    <ThumbUpIcon /> {/* ThumbUpIcon for like button */}
  </IconButton>
);

// FavoriteButton component (implementation details omitted)
const FavoriteButton: React.FC = () => (
  <IconButton>
    <StarIcon color="primary" /> {/* Star icon with primary color */}
  </IconButton>
);

const Templates: React.FC = () => {
  const items: Item[] = [
    { title: 'Item 1', description: 'This is the first item.', language: 'English' },
    { title: 'Item 2', description: 'This is the second item.', language: 'French' },
    // ...
  ];

  return (
    <Grid container rowSpacing={'1rem'} columnSpacing={{ xs: '1rem' }} sx={{ m: '0.5rem' }}>
      {items.map((item) => (
        <Grid xs={12} sm={6} md={4} key={item.title}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description} - {item.language}
              </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <LikeButton /> {/* Can optionally pass an onClick handler */}
              <FavoriteButton />
              <IconButton>
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Templates;