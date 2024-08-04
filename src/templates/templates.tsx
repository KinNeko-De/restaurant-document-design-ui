import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';

// Interface for Item data type
interface Item {
  name: string;
  description: string;
  language: TemplateLanguage;
  favourite: boolean;
  lastModified: Date;
  tags?: string[]
}

enum TemplateLanguage {
  LuaLaTex = 0,
  Word = 1
}

const formatDate2 = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const diffInDays = diffInHours / 24;
  const diffInYears = diffInDays / 365;

  if (diffInHours < 24) {
    return `Updated ${Math.floor(diffInHours)} hours ago`;
  } else if (diffInYears >= 1) {
    return `Updated on ${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
  } else {
    return `Updated on ${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`;
  }
};


// FavoriteButton component (implementation details omitted)
const FavoriteButton: React.FC = () => (
  <IconButton>
    <StarIcon color="primary" />
  </IconButton>
);

const getLanguageColor = (value: TemplateLanguage): string => {
  switch (value) {
    case TemplateLanguage.LuaLaTex:
      return 'green';
    case TemplateLanguage.Word:
      return 'blue';
    default:
      return 'gray';
  }
};

const Templates: React.FC = () => {
  const items: Item[] = [
    { name: 'Item 1', description: 'This is the first item.', language: TemplateLanguage.LuaLaTex, favourite: false, lastModified: new Date('2024-08-03T19:00:00'), tags: ['tag 1', 'tag 2'] },
    { name: 'Item 2', description: 'This is the second item.', language: TemplateLanguage.Word, favourite: false, lastModified: new Date('2023-10-02T14:30:00') },
    { name: 'Item 3', description: 'This is the second item.', language: TemplateLanguage.LuaLaTex, favourite: false, lastModified: new Date('2023-10-03T16:45:00'), tags: ['tag 3'] },
    { name: 'Item 4', description: 'This is the second item.', language: TemplateLanguage.LuaLaTex, favourite: false, lastModified: new Date('2023-07-04T18:00:00') },
  ];

  return (
    <Grid container rowSpacing={'1rem'} columnSpacing={{ xs: '1rem' }} sx={{ m: '0.5rem' }}>
      {items.map((item) => (
        <Grid xs={12} sm={6} md={4} key={item.name}>
          <Card sx={{ height: '100%' }}>
          <Box display="flex" flexDirection="column" height="100%">
            <CardContent>
              <Typography variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
              {item.tags && item.tags.length > 0 && (
              <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                {item.tags.map((tag, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '16px',
                      backgroundColor: '#e0e0e0',
                      color: '#424242',
                      fontSize: '0.875rem',
                    }}
                  >
                    {tag}
                  </Box>
                ))}
              </Box>
            )}
            </CardContent>
            <Box mt="auto">
            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: getLanguageColor(item.language),
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {TemplateLanguage[item.language]}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {formatDate2(item.lastModified)}
                </Typography>
              </Box>
              <FavoriteButton />
            </CardActions>
            </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Templates;