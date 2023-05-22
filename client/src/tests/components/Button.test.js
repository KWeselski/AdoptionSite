import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { Button } from '../../components';

describe('Button', () => {
  test('renders a button with the correct classes and invokes onClick function', () => {
    const onClickMock = jest.fn();

    const { getByText } = render(
      <Button onClick={onClickMock} variant="primary" type="button">
        Adopt me
      </Button>
    );

    const buttonElement = getByText('Adopt me');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-green-500');
    expect(buttonElement).not.toHaveClass('bg-gray-500');

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
