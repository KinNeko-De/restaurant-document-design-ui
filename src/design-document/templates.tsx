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
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { Template, TemplateLanguage, TemplateGateway } from './domain';
import { formatLastModified } from '../format-date/lastModified';
import { TEST_IDS } from './testIds';
import HappySnowman from './happy_snowman.svg'; // Import the SVG file


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
      // This should never happen if all enum values are handled
      const exhaustiveCheck: never = value;
      throw new Error(`Unhandled case: ${exhaustiveCheck}`);
  }
};

const Templates: React.FC<{ gateway: TemplateGateway }> = ({ gateway }) => {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const loadTemplates = async () => {
      const data = await gateway.fetchTemplates();
      setTemplates(data);
      setLoading(false);
    };

    loadTemplates();
  }, [gateway]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" data-testid={TEST_IDS.TEMPLATE_LOADING}>
        <CircularProgress />
      </Box>
    );
  }

  if (templates.length === 0) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" p={2}  data-testid={TEST_IDS.TEMPLATE_LOADED_NO_TEMPLATES}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <img src={HappySnowman} alt="Happy Snowman" style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
        <Typography variant="h6" color="textSecondary" align="center">
          Feeling a bit chilly? ❄️
        </Typography>
        <Typography variant="h6" color="textSecondary" align="center">
          Let's warm things up with a brand
        </Typography>
        <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} data-testid={TEST_IDS.TEMPLATE_NEW}>
          New Template
        </Button>
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
                      {formatLastModified(template.lastModified)}
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