import React from 'react';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Template, TemplateLanguage, TemplatePreview } from './domain';
import Templates from './templates';
import { TEST_IDS } from './testIds';

describe('TemplateList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loading animation is shown while loading', async () => {
    (mockGateway.fetchTemplates as jest.Mock).mockImplementationOnce(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([]);
        }, 100);
      });
    });

    render(<Sut />);

    expect(screen.getByTestId(TEST_IDS.TEMPLATE_LOADING)).toBeInTheDocument();
  });

  test('no templates are available', async () => {
    const mockTemplates: Template[] = [];
    setupFetchTemplates(mockTemplates);

    render(<Sut />);

    await waitForElementToBeRemoved(() => screen.queryByTestId(TEST_IDS.TEMPLATE_LOADING));
    const noTemplate = screen.getAllByTestId(TEST_IDS.TEMPLATE_LOADED_NO_TEMPLATES);
    expect(noTemplate).toHaveLength(1);
    const button = screen.getByTestId(TEST_IDS.TEMPLATE_NEW);
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    fireEvent.click(button);
    // TODO - Add assert for clicking the button
  });

  test('templates are displayed after loaded', async () => {
    const mockTemplates: TemplatePreview[] = [
      { id: '550e8400-e29b-41d4-a716-446655440000', name: 'Template 1', description: 'This is the first template.', language: TemplateLanguage.LuaLaTex, favourite: false, lastModified: new Date('2022-08-03T19:00:00'), tags: ['tag 1', 'tag 2'], status: 'Active' },
      { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Template 2', description: 'This is the second template.', language: TemplateLanguage.Word, favourite: false, lastModified: new Date('2022-10-02T14:30:00'), status: 'Draft' },
    ];
    const expectedLocalizations = [
      { LastModified: 'Aug 03, 2022' },
      { LastModified: 'Oct 02, 2022' }
    ];

    setupFetchTemplates(mockTemplates);

    render(<Sut />);

    await waitForElementToBeRemoved(() => screen.queryByTestId(TEST_IDS.TEMPLATE_LOADING));
    const templates = screen.getAllByTestId(TEST_IDS.TEMPLATE_LOADED);
    expect(templates).toHaveLength(2);

    templates.forEach((template, index) => {
      expect(template).toHaveTextContent(mockTemplates[index].name);
      expect(template).toHaveTextContent(mockTemplates[index].description);
      expect(template).toHaveTextContent(TemplateLanguage[mockTemplates[index].language]); // TODO make this assert more stable
      expect(template).toHaveTextContent(expectedLocalizations[index].LastModified);
      mockTemplates[index].tags?.forEach((tag) => {
        expect(template).toHaveTextContent(tag);
      });
      expect(template).toHaveTextContent(mockTemplates[index].status);
    });
  }, 100000);
});

const mockGateway = {
  fetchTemplates: jest.fn(),
  fetchTemplate: jest.fn()
};

const Sut: React.FC = () => {
  return (
    <Templates gateway={mockGateway} />
  );
};

function setupFetchTemplates(templates: Template[]) {
  mockGateway.fetchTemplates.mockImplementationOnce(() => {
    return templates;
  });
}