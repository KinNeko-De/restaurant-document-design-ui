import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';
import { Template, TemplateLanguage } from './domain';
import { fetchTemplates } from './gateway';
import { TEST_IDS } from './testIds';

const StatusCircle = styled.span<{ status: 'Draft' | 'Active' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  margin-left: 8px;
  background-color: ${({ status }) => (status === 'Active' ? '#28a745' : '#6c757d')};
  color: ${({ status }) => (status === 'Active' ? '#ffffff' : '#ffffff')};
  font-size: 0.75rem;
  font-weight: bold;
`;

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

const loadTemplates = async (setTemplates: React.Dispatch<React.SetStateAction<Template[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const fetchedTemplates = await fetchTemplates();
  setTemplates(fetchedTemplates);
  setLoading(false);
};

const Templates: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    loadTemplates(setTemplates, setLoading);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" data-testid={TEST_IDS.TEMPLATE_LOADING}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container rowSpacing={'1rem'} columnSpacing={{ xs: '1rem' }} sx={{ m: '0.5rem' }}>
      {templates.map((template) => (
        <Grid xs={12} sm={6} md={4} key={template.name}>
          <Card sx={{ height: '100%' }} data-testid={TEST_IDS.TEMPLATE_LOADED}>
            <Box display="flex" flexDirection="column" height="100%">
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Typography variant="h5" component="div">
                    {template.name}
                  </Typography>
                  <StatusCircle status={template.status}>{template.status}</StatusCircle>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {template.description}
                </Typography>
                {template.tags && template.tags.length > 0 && (
                  <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                    {template.tags.map((tag, index) => (
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
                          backgroundColor: getLanguageColor(template.language),
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {TemplateLanguage[template.language]}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate2(template.lastModified)}
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
export { fetchTemplates };