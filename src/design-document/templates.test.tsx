import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Templates from './templates';

describe('Templates', () => {
  test('loading animation is shown while loading', async () => {
    render(<Templates />);

    expect(screen.getByTestId('template-loading')).toBeInTheDocument();
  });

  test('templates are displayed after loaded', async () => {
    render(<Templates />);

    await waitFor(() => {
      const templates = screen.getAllByTestId('template-loaded');
      expect(templates).toHaveLength(4);
    }, { timeout: 3000 });
  });
});