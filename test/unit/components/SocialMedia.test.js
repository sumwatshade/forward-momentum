import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/svelte';

import Comp from '../../../src/components/SocialMedia.svelte';

import rep from '../__helpers__/mock-rep';
import sen from '../__helpers__/mock-sen';

describe('SocialMedia', () => {
	test('no data - matches snapshot', () => {
		const { container } = render(Comp, { media: rep.social });

		expect(container.innerHTML).toMatchSnapshot();
	});

	test('some data - matches snapshot', () => {
		const { container } = render(Comp, { media: sen.social });

		expect(container.innerHTML).toMatchSnapshot();
	});
});
