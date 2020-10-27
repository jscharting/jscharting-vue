import { mount } from '@vue/test-utils';
import { JSCLabel } from '../dist/jscharting-vue.common';

describe('JSCLabel unit tests', () => {
	const wrapper = mount(JSCLabel, {
		propsData: { options: '<b>JSCLabel test string</b>' }
	});
	const element = wrapper.element;

	test('Wrapper is a Vue instance', () => {
		expect(wrapper.exists()).toBeTruthy();
	});

	test('Label data is set correctly', () => {
		let renderedString =
			'<text><tspan x="0px" font-weight="bold" style="white-space: pre">JSCLabel test string</tspan></text>';
		expect(element.innerHTML.indexOf(renderedString) > -1).toBeTruthy();
	});

	test('Label should be destroyed after component is destroyed.', () => {
		wrapper.destroy();
		expect(wrapper.element.innerHTML === '').toBeTruthy();
	});
});
