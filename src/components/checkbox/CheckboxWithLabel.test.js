/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
import {cleanup, fireEvent, render} from '@testing-library/react';
import CheckboxWithLabel from './CheckboxWithLabel';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('CheckboxWithLabel changes the text after click', () => {
  const {queryByLabelText, getByLabelText} = render(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />,
  );

  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(queryByLabelText(/off/i)).toBeTruthy();

  // eslint-disable-next-line testing-library/prefer-screen-queries
  fireEvent.click(getByLabelText(/off/i));

  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(queryByLabelText(/on/i)).toBeTruthy();
});