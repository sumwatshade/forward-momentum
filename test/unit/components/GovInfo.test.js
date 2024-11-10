import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/svelte';

import Comp from '../../../src/components/GovInfo.svelte';

import rep from '../__helpers__/mock-rep';
import sen from '../__helpers__/mock-sen';

describe('GovInfo', () => {
	test('rep - matches snapshot', () => {
		const { container } = render(Comp, { ...rep });

		expect(container.innerHTML).toMatchSnapshot();
	});

	test('sen - matches snapshot', () => {
		const { container } = render(Comp, { ...sen });

		expect(container.innerHTML).toMatchSnapshot();
	});
});
