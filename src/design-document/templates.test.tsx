import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Templates from './templates';
import { TemplateLanguage } from './domain';
import { fetchTemplates } from './gateway';
import '@testing-library/jest-dom'
import { TEST_IDS } from './testIds';

jest.mock('./gateway', () => ({ fetchTemplates: jest.fn() }));

describe('Templates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loading animation is shown while loading', async () => {
    (fetchTemplates as jest.Mock).mockImplementationOnce(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([]);
        }, 1000);
      });
    });

    render(<Templates />);

    expect(screen.getByTestId(TEST_IDS.TEMPLATE_LOADING)).toBeInTheDocument();
  });

  test('templates are displayed after loaded', async () => {
    const mockTemplates = [
      { name: 'Template 1', description: 'This is the first template.', language: TemplateLanguage.LuaLaTex, favourite: false, lastModified: new Date('2024-08-03T19:00:00'), tags: ['tag 1', 'tag 2'], status: 'Active' },
      { name: 'Template 2', description: 'This is the second template.', language: TemplateLanguage.Word, favourite: false, lastModified: new Date('2023-10-02T14:30:00'), status: 'Draft' },
      { name: 'Template 3', description: 'This is the second template.', language: TemplateLanguage.LuaLaTex, favourite: false, lastModified: new Date('2023-10-03T16:45:00'), tags: ['tag 3'], status: 'Draft' },
      { name: 'Template 4', description: 'This is the second template.', language: TemplateLanguage.LuaLaTex, favourite: false, lastModified: new Date('2023-07-04T18:00:00'), status: 'Draft' },
    ];
    (fetchTemplates as jest.Mock).mockResolvedValueOnce(mockTemplates);

    render(<Templates />);

    await waitFor(() => {
      const templates = screen.getAllByTestId(TEST_IDS.TEMPLATE_LOADED);
      expect(templates).toHaveLength(4);
    }, { timeout: 3000 });
  });
});