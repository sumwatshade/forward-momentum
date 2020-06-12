import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/svelte';

import Comp from '../../../src/components/RepInfo.svelte';
import rep from '../__helpers__/mock-rep';

describe('RepInfo', () => {
  test('matches snapshot', () => {
    const { container } = render(Comp, { data: rep });

    expect(container.innerHTML).toMatchSnapshot();
  });
});
