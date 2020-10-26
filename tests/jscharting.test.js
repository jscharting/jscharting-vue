import { mount } from '@vue/test-utils';
import { JSCharting } from '../dist/jscharting-vue.common';

const propsData = {
	options: {
		series: [
			{
				points: [
					{
						x: 0,
						y: 1
					},
					{
						x: 1,
						y: 2
					}
				]
			}
		]
	},
	callback: function(chart) {
		chart.isCallbackInvoked = true;
	}
};

describe('JSCharting unit tests', () => {
	const wrapper = mount(JSCharting, { propsData });
	const chart = wrapper.vm.instance;

	test('Wrapper is a Vue instance', () => {
		expect(wrapper.exists()).toBeTruthy();
	});

	test('Component has JSCharting instance', () => {
		expect(chart).not.toBeUndefined();
	});

	test('Chart data is set correctly', () => {
		expect(chart.options('series')[0].points[0].x).toBe(0);
		expect(chart.options('series')[0].points[0].y).toBe(1);
		expect(chart.options('series')[0].points[1].x).toBe(1);
		expect(chart.options('series')[0].points[1].y).toBe(2);
	});

	test('Callback should be invoked.', () => {
		expect(chart.isCallbackInvoked).toBeTruthy();
	});

	test('Chart should be destroyed after component is unmounted.', () => {
		wrapper.destroy();
		expect(wrapper.vm.instance).toBeUndefined();
	});
});
