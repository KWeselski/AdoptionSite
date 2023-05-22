import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { render, waitFor } from '@testing-library/react';

import { ErrorAlert } from '../../components';
import { clearError } from '../../redux/actions/errors';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../redux/actions/errors', () => ({
  clearError: jest.fn(),
}));

describe('ErrorAlert', () => {
  const mockedDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockedDispatch);
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({ errors: { error: 'Test error' } })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the error message and clears the error after 5 seconds', async () => {
    jest.useFakeTimers();

    render(<ErrorAlert />);

    expect(mockedDispatch).not.toHaveBeenCalled();

    jest.runAllTimers();

    await waitFor(() => {
      expect(clearError).toHaveBeenCalledTimes(1);
    });
  });

  test('does not render when the error is null', () => {
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({ errors: { error: null } })
    );

    const { queryByRole } = render(<ErrorAlert />);

    expect(queryByRole('alert')).toBeNull();
    expect(mockedDispatch).not.toHaveBeenCalled();
  });
});
