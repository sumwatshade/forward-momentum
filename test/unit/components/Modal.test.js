import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/svelte';

import Comp from '../../../src/components/Modal.svelte';

describe('Modal', () => {
  test('matches snapshot', () => {
    const { container } = render(Comp, {});

    expect(container.innerHTML).toMatchSnapshot();
  });
});
