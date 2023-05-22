import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { Checkbox } from '../../components';

describe('Checkbox', () => {
  test('renders a single checkbox with the correct label and invokes onChange function', () => {
    const onChangeMock = jest.fn();

    const { getByLabelText } = render(
      <Checkbox
        label="Adopt me"
        name="checkbox"
        checked={false}
        onChange={onChangeMock}
      />
    );

    const checkboxElement = getByLabelText('Adopt me');

    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).not.toBeChecked();

    fireEvent.click(checkboxElement);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(checkboxElement).toBeChecked();
  });

  test('renders multiple checkboxes with the correct labels and invokes handleChange function', () => {
    const handleChangeMock = jest.fn();

    const options = ['Long walks', 'Short walks', 'Medium-length walks'];
    const values = ['Long walks', 'Short walks'];

    const { getByLabelText } = render(
      <Checkbox.Multi
        label="How often do you plan to walk your dog?"
        name="walks"
        options={options}
        values={values}
        handleChange={handleChangeMock}
      />
    );

    const checkbox1 = getByLabelText('Long walks');
    const checkbox2 = getByLabelText('Short walks');
    const checkbox3 = getByLabelText('Medium-length walks');

    expect(checkbox1).toBeInTheDocument();
    expect(checkbox1).toBeChecked();
    expect(checkbox2).toBeInTheDocument();
    expect(checkbox2).toBeChecked();
    expect(checkbox3).toBeInTheDocument();
    expect(checkbox3).not.toBeChecked();

    fireEvent.click(checkbox3);

    expect(handleChangeMock).toHaveBeenCalledTimes(1);
    expect(handleChangeMock).toHaveBeenCalledWith([
      'Long walks',
      'Short walks',
      'Medium-length walks',
    ]);
    expect(checkbox3).toBeChecked();

    fireEvent.click(checkbox1);

    expect(handleChangeMock).toHaveBeenCalledTimes(2);
    expect(handleChangeMock).toHaveBeenCalledWith([
      'Short walks',
      'Medium-length walks',
    ]);
    expect(checkbox1).not.toBeChecked();
  });
});
