import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/svelte';

import Comp from '../../../src/components/RepImage.svelte';
import rep from '../__helpers__/mock-rep';

describe('RepImage', () => {
  test('matches snapshot', () => {
    const { container } = render(Comp, { ...rep });

    expect(container.innerHTML).toMatchSnapshot();
  });
});
