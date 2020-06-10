import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/svelte';

import Comp from '../../../src/components/InvalidRepWarning.svelte';

describe('InvalidRepWarning', () => {
  test('matches snapshot', () => {
    const { container } = render(Comp, {});

    expect(container.innerHTML).toMatchSnapshot();
  });
});
