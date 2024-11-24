import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { TemplateLanguage, TemplateGateway, TemplatePreview } from './domain';
import { formatLastModified } from '../format-date/lastModified';
import { TEST_IDS } from './testIds';
import HappySnowman from './happy_snowman.svg'; // Import the SVG file
import CardActionArea from '@mui/material/CardActionArea';
import { Link as RouterLink } from 'react-router-dom';
import PushPinIcon from '@mui/icons-material/PushPin'; // Import the pin icon

const StatusCircle = styled.span<{ status: 'Draft' | 'Active' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  margin-left: 8px;
  margin-top: 6px;
  background-color: ${({ status }) => (status === 'Active' ? '#28a745' : '#6c757d')};
  color: ${({ status }) => (status === 'Active' ? '#ffffff' : '#ffffff')};
  font-size: 0.75rem;
  font-weight: bold;
`;

const Pin: React.FC<{ isPinned: boolean; onClick: () => void }> = ({ isPinned, onClick }) => (
  <IconButton onClick={onClick}>
    <PushPinIcon color={isPinned ? "primary" : "disabled"} />
  </IconButton>
);

const getLanguageColor = (value: TemplateLanguage): string => {
  switch (value) {
    case TemplateLanguage.LuaLaTex:
      return 'green';
    case TemplateLanguage.Word:
      return 'blue';
    default:
      const exhaustiveCheck: never = value;
      throw new Error(`Unhandled case: ${exhaustiveCheck}`);
  }
};

const TemplateList: React.FC<{ gateway: TemplateGateway }> = ({ gateway }) => {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<TemplatePreview[]>([]);

  useEffect(() => {
    const loadTemplates = async () => {
      const data = await gateway.fetchTemplates();
      setTemplates(data);
      setLoading(false);
    };

    loadTemplates();
  }, [gateway]);

  const togglePin = (id: string) => {
    setTemplates((prevTemplates) => {
      const newTemplates = prevTemplates.map((template) =>
        template.id === id ? { ...template, pinned: !template.pinned } : template
      );
      return newTemplates;
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" data-testid={TEST_IDS.TEMPLATE_LOADING}>
        <CircularProgress />
      </Box>
    );
  }

  if (templates.length === 0) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" p={2} data-testid={TEST_IDS.TEMPLATE_LOADED_NO_TEMPLATES}>
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
          <Card sx={{ height: '100%', display: 'flex' }} data-testid={TEST_IDS.TEMPLATE_LOADED}>
            <CardActionArea component={RouterLink} to={`/template/${template.id}`}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box display={'flex'} flexDirection={'column'} >
                  <Box display="flex">
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
                </Box>
                <Box display="flex" gap={2} alignItems={'center'} mt={1}>
                  <Box display="flex" gap={0.5} alignItems={'center'}>
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
                    {formatLastModified(template.lastModified, "en-US")}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
            {/* disableSpacing is needed because material ui put a margin of 8px in front of the not first element */}
            <CardActions disableSpacing style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Pin isPinned={template.pinned} onClick={() => togglePin(template.id)} />
            </CardActions>
          </Card>
        </Grid>
      ))
      }
    </Grid >
  );
};

export default TemplateList;