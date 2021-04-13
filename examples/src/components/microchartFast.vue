<template>
	<div>
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
	</div>
</template>

<script>
import { JSCLabel } from 'jscharting-vue';

export default {
	name: 'microchartFast',
	mounted: function() {
		this.start();
	},
	beforeUnmount: function() {
		clearInterval(this.INTERVAL_ID);
	},
	data() {
		return {
			INTERVAL_ID: 0,
			mySeed: 0,
			labelConfig: `<chart type="column" data=${this.makeYData(
				0
			)} width=800 height=300>`
		};
	},
	methods: {
		makeYData: (seed, len = 100) => {
			let list = [];
			for (let i = 0, iLen = len; i < iLen; i++) {
				list.push(Math.sin(seed + i * 0.1));
			}
			return list.join(',');
		},
		updateChart: function() {
			this.labelConfig = `<chart type="column" data=${this.makeYData(
				this.mySeed
			)} width=800 height=300>`;
			this.mySeed += 0.1;
		},
		start: function() {
			this.INTERVAL_ID = setInterval(this.updateChart, 10);
		}
	},
	components: {
		JSCLabel
	}
};
</script>
