import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/svelte';

import Comp from '../../../src/components/GovInfo.svelte';

describe('GovInfo', () => {
  test('matches snapshot', () => {
    const { container } = render(Comp, { term: { contact_form: 'test' }, id: { bioguide: 'test', fec: [] } });

    expect(container.innerHTML).toMatchSnapshot();
  });
});
