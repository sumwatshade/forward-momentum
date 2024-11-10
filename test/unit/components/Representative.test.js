import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/svelte';

import Comp from '../../../src/components/Representative.svelte';

import rep from '../__helpers__/mock-rep';
import sen from '../__helpers__/mock-sen';

describe('Representative', () => {
	test('senator matches snapshot', () => {
		const { container } = render(Comp, { rep: sen });

		expect(container.innerHTML).toMatchSnapshot();
	});

	test('senator matches snapshot', () => {
		const { container } = render(Comp, { rep });

		expect(container.innerHTML).toMatchSnapshot();
	});
});
