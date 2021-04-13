<template>
	<p>
		The JSCLabel chart is a simple string based generator that creates simple
		SVG charts very quickly.
	</p>
	<p>
		This chart is created with the string
		<i>&lt;chart type="column" data=12,23,... width=800 height=300&gt;</i>
	</p>
	<p>
		Microchart string reference:
		<a href="https://jscharting.com/tutorials/types/js-microcharts/"
			>MicroCharts</a
		>
	</p>
	<JSCLabel :options="labelConfig"></JSCLabel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { JSCLabel } from 'jscharting-vue';

export default defineComponent({
	name: 'microchartFast',
	beforeUnmount: function() {
		clearInterval(this.INTERVAL_ID);
	},
	setup() {
		let INTERVAL_ID = 0;
		let mySeed = 0;
		const makeYData = (seed: number, len = 100) => {
			let list = [];
			for (let i = 0, iLen = len; i < iLen; i++) {
				list.push(Math.sin(seed + i * 0.1));
			}
			return list.join(',');
		};

		let labelConfig = ref(``);

		const updateChart = () => {
			labelConfig.value = `<chart type="column" data=${makeYData(
				mySeed
			)} width=800 height=300>`;
			mySeed += 0.1;
		};

		INTERVAL_ID = setInterval(updateChart, 10);

		return {
			labelConfig,
			INTERVAL_ID
		};
	},
	components: {
		JSCLabel
	}
});
</script>
