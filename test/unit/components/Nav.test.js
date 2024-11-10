import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/svelte';

import Comp from '../../../src/components/Nav.svelte';

describe('Nav', () => {
	test('matches snapshot', () => {
		const { container } = render(Comp, {});

		expect(container.innerHTML).toMatchSnapshot();
	});
});
