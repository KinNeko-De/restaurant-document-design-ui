import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TemplateGateway, Template } from './domain';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const TemplateDesign: React.FC<{ gateway: TemplateGateway }> = ({ gateway }) => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    const loadTemplate = async () => {
      if (id) {
        const data = await gateway.fetchTemplate(id);
        setTemplate(data);
        setLoading(false);
      }
    };

    loadTemplate();
  }, [gateway, id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!template) {
    return (
      <Typography variant="h6" color="textSecondary" align="center">
        Template not found.
      </Typography>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h4" component="div">
        {template.name}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {template.description}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Language: {template.language}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Last Modified: {template.lastModified.toLocaleDateString()}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Status: {template.status}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Files: {template.files?.map((file) => file.name).join(', ')}
      </Typography>
      {template.tags && template.tags.length > 0 && (
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            Tags:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
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
        </Box>
      )}
    </Box>
  );
}

export default TemplateDesign;
