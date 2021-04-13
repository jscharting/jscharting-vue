<style>
.liveData {
	height: 400px;
}
</style>

<template>
	<JSCharting :options="options()" class="liveData" @rendered="start">
	</JSCharting>
</template>

<script>
import JSCharting from 'jscharting-vue';

export default {
	beforeDestroy: function() {
		clearInterval(this.INTERVAL_ID);
	},
	name: 'liveData',
	data() {
		return {
			INTERVAL_ID: 0,
			date: new Date(2020, 0, 10).getTime(),
			chart: null,
			useShift: true,
			options: () => ({
				debug: true,
				legend_position: 'inside top right',
				yAxis_formatString: 'c',
				defaultSeries: { type: 'line', opacity: 1 },
				title_label_text: 'Data Total: %sum Average: %average',
				defaultPoint: {
					label_text: '%yValue',
					marker: {
						type: 'circle',
						size: 11,
						outline: { color: 'white', width: 2 }
					}
				},
				xAxis_overflow: 'hidden',
				margin_right: 20,
				animation: { duration: 400 },
				toolbar: {
					margin: 5,
					items: {
						'Shift Values': {
							type: 'checkbox',
							value: true,
							tooltip:
								'The shift option determines whether the first point in the series is removed when adding a new point.',
							events: { change: this.shiftPoints_btnClick.bind(this) }
						},
						Stop: {
							type: 'option',
							icon_name: 'system/default/pause',
							boxVisible: true,
							label_text: 'Pause',
							events: { change: this.playPause.bind(this) },
							states_select: {
								icon_name: 'system/default/play',
								label_text: 'Play'
							}
						}
					}
				},
				xAxis: { scale_type: 'time' },
				series: [
					{
						name: 'Purchases',
						points: [
							['1/1/2020', 29.9],
							['1/2/2020', 71.5],
							['1/3/2020', 106.4],
							['1/6/2020', 129.2],
							['1/7/2020', 144.0],
							['1/8/2020', 176.0]
						]
					}
				]
			})
		};
	},
	methods: {
		playPause(val) {
			if (val === true) {
				clearInterval(this.INTERVAL_ID);
			} else {
				this.start(this.chart);
			}
		},
		shiftPoints_btnClick(shiftVal) {
			this.useShift = shiftVal;
		},
		start(chart) {
			const me = this;
			me.chart = chart;
			me.INTERVAL_ID = setInterval(function() {
				if (chart) {
					me.addData(chart);
				}
			}, 800);
		},
		addData(chart) {
			chart
				.series(0)
				.points.add(
					{ y: Math.random() * 200, x: new Date(this.date) },
					{ shift: this.useShift }
				);
			this.date = this.date + 24 * 3600000 * 2;
		}
	},
	components: {
		JSCharting
	}
};
</script>
