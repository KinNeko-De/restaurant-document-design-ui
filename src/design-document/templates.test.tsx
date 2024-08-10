import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Template, TemplateLanguage } from './domain';
import Templates from './templates';
import { TEST_IDS } from './testIds';

describe('Templates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loading animation is shown while loading', async () => {
    (mockGateway.fetchTemplates as jest.Mock).mockImplementationOnce(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([]);
        }, 1000);
      });
    });

    render(<Sut/>);

    expect(screen.getByTestId(TEST_IDS.TEMPLATE_LOADING)).toBeInTheDocument();
  });

  test('templates are displayed after loaded', async () => {
    const mockTemplates: Template[] = [
      { name: 'Template 1', description: 'This is the first template.', language: TemplateLanguage.LuaLaTex, favourite: false, lastModified: new Date('2024-08-03T19:00:00'), tags: ['tag 1', 'tag 2'], status: 'Active' },
      { name: 'Template 2', description: 'This is the second template.', language: TemplateLanguage.Word, favourite: false, lastModified: new Date('2023-10-02T14:30:00'), status: 'Draft' },
      { name: 'Template 3', description: 'This is the second template.', language: TemplateLanguage.LuaLaTex, favourite: false, lastModified: new Date('2023-10-03T16:45:00'), tags: ['tag 3'], status: 'Draft' },
      { name: 'Template 4', description: 'This is the second template.', language: TemplateLanguage.LuaLaTex, favourite: false, lastModified: new Date('2023-07-04T18:00:00'), status: 'Draft' },
    ];
    setupFetchTemplates(mockTemplates);

    render(<Sut/>);

    await waitForElementToBeRemoved(() => screen.queryByTestId(TEST_IDS.TEMPLATE_LOADING));
    const templates = screen.getAllByTestId(TEST_IDS.TEMPLATE_LOADED);
    expect(templates).toHaveLength(4);
  });
});

const mockGateway = {
  fetchTemplates: jest.fn(),
  fetchTemplate: jest.fn()
};

const Sut: React.FC = () => {
  return (
    <Templates 
      gateway={mockGateway}
    />
  );
};

function setupFetchTemplates(templates: Template[]) {
  mockGateway.fetchTemplates.mockImplementationOnce(() => {
    return templates;
  });
}