<style>
.chartA {
	max-width: 700px;
	height: 400px;
	margin: 0 auto;
}
.chartB {
	max-width: 700px;
	height: 250px;
	margin: 0 auto;
}
</style>

<template>
	<div>
		<JSCharting ref="chartA" :options="configA" class="chartA" />
		<JSCharting ref="chartB" :options="configB" class="chartB" />
	</div>
</template>

<script>
import { JSCharting, JSC } from 'jscharting-vue';

const initialView = [1990, 2015];
const configA = () => ({
	debug: true,
	title_label_text: 'Births to Unmarried Women by Age Group',
	animation: false,
	legend: {
		template: '%icon %name',
		position: 'bottom'
	},
	defaultPoint_marker_type: 'none',
	defaultSeries_mouseTracking_enabled: false,
	yAxis: {
		alternateGridFill: 'none',
		label_text: 'Number of births'
	},
	xAxis: {
		formatString: 'd',
		label_text: 'Year',
		markers: [
			{
				value: initialView,
				legendEntry_visible: false
			}
		]
	},
	toolbar_items: {
		export_visible: false,
		slider: {
			position: 'inside top',
			type: 'range',
			label_text: '1940-2015',
			visible: true,
			width: 595,
			value: initialView,
			min: 1940,
			max: 2015
			//events_change: updateDetailChart
		}
	},
	series: [
		{
			points: []
		}
	]
});

const configB = () => ({
	title_label_text: 'Detail',
	animation: false,
	debug: true,
	legend_visible: false,
	defaultPoint: {
		marker_type: 'none',
		tooltip: '%seriesName %icon %yValue'
	},
	yAxis: {
		alternateGridFill: 'none',
		label_text: 'Number of births'
	},
	xAxis: {
		crosshair_enabled: true,
		formatString: 'd',
		label_text: 'Year'
	},
	series: [
		{
			points: []
		}
	]
});

export default {
	name: 'masterDetail',
	mounted: function() {
		const me = this;
		fetch('https://data.cdc.gov/resource/fvae-a8ai.csv')
			.then(function(response) {
				return response.text();
			})
			.then(function(text) {
				me.dataObject = JSC.csv2Json(text);
				me.configA = JSC.merge(configA(), {
					series: me.getSeries(),
					toolbar_items_slider_events_change: me.updateDetailChart
				});
				me.configB = JSC.merge(configB(), {
					series: me.getSeries()
				});
			});
	},
	data() {
		return {
			dataObject: undefined,
			configA: configA(),
			configB: configB()
		};
	},
	methods: {
		getSeries() {
			const me = this;
			return JSC.nest()
				.key('age_group')
				.key('year')
				.rollup('birth_number')
				.series(me.dataObject);
		},
		updateDetailChart(range) {
			if (this.$refs.chartB) {
				const chartDetail = this.$refs.chartB.instance,
					chart = this.$refs.chartA.instance;
				//Update marker position on main chart.
				chart
					.axes('x')
					.markers(0)
					.options({ value: range });
				//Update details chart zoom
				chartDetail.axes('x').zoom(range);
			}
		}
	},
	components: {
		JSCharting
	}
};
</script>
