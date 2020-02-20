import { mount } from '@vue/test-utils';
import { JSCGrid } from '../dist/jscharting-vue.common';

describe('JSCGrid unit tests', () => {
	const wrapper = mount(JSCGrid, {
		propsData: {
			options: {
				className: 'jscTable',
				data: [
					['Art', 5, 10],
					['Greg', 3, 6],
					['Olivia', 11, 8],
					['Steve', 11, 4],
					['Anna', 3, 8]
				]
			}
		}
	});

	test('Wrapper is a Vue instance', () => {
		expect(wrapper.isVueInstance()).toBeTruthy();
	});

	test('Grid should be destroyed after component is destroyed.', () => {
		wrapper.destroy();
		expect(wrapper.element.innerHTML === '').toBeTruthy();
	});
});
