<template>
	<div id="mapGridWrapper">
		<JSCharting
			ref="myChart"
			v-if="dataLoaded"
			:options="chartConfig"
			style="max-width: 740px;height: 400px;"
		/>
		<JSCGrid
			ref="myGrid"
			v-if="dataLoaded"
			:options="gridConfig"
			style="max-width: 635px;"
		/>
	</div>
</template>

<script>
import JSCharting, { JSCGrid, JSC } from 'jscharting-vue';

const paletteColors = ['#6ef2f0', '#00d2fa', '#00aeff', '#0084ff', '#4c4bdf'];

export default {
	name: 'chartDash',
	mounted: function() {
		const me = this;
		JSC.fetch('./resources/laborForceUs.csv')
			.then(function(response) {
				return response.text();
			})
			.then(function(text) {
				let data = JSC.csv2Json(text, {
					coerce: function(d) {
						return {
							state: d.state,
							year: d.year,
							unemployment_rate:
								(parseInt(d.unemployed) * 100) / parseInt(d.labor_force),
							unemployed: parseInt(d.unemployed)
						};
					}
				});
				let mapData = data.filter(v => v.year === '2020');
				let mapPoints = mapData.map(v => {
					return {
						map: 'US.name:' + v.state,
						z: v.unemployment_rate,
						attributes_unemployed: v.unemployed
					};
				});

				me.chartConfig = JSC.merge(me.getChartConfig(), {
					series: [{ points: mapPoints }]
				});

				// Create Grid Data
				let minRate = JSC.min(mapData, 'unemployment_rate');
				let maxRate = JSC.max(mapData, 'unemployment_rate');

				const gridConfigData = JSC.nest()
					.key('state')
					.pointRollup(function(key, val) {
						const rateList = val.map(v => v.unemployment_rate);
						const rates = {
							last: rateList[rateList.length - 1],
							min: JSC.min(rateList),
							max: JSC.max(rateList)
						};
						const color =
							paletteColors[
								Math.round(me.mapValue(0, 4, minRate, maxRate, rates.last))
							];
						return {
							state: key,
							trends_line: `<chart type=sparkline colors="#333F89,,#00aeff" width=130 height=20 margin=3 data="${rateList.join(
								','
							)}">`,
							rate_bar: `<chart type=bar margin_right=5 verticalAlign=middle color="${color}" data=${
								rates.last
							} max=13.3>${me.round(rates.last)}`,
							min_rate: `${me.round(rates.min)}% (${1976 +
								rateList.indexOf(rates.min)})`,
							max_rate: `<span style="${
								1976 + rateList.indexOf(rates.max) === 2020
									? 'font-weight:bold; color:black;'
									: ''
							} ">${me.round(rates.max)} % (${1976 +
								rateList.indexOf(rates.max)})</span>`
						};
					})
					.points(data);

				me.gridConfig = JSC.merge(me.getGridConfig(), { data: gridConfigData });
				me.dataLoaded = true;
			});
	},
	data() {
		return {
			chartConfig: {},
			gridConfig: {},
			dataLoaded: false
		};
	},
	methods: {
		getChartConfig: () => {
			return {
				type: 'map',
				chartArea_boxVisible: false,
				margin_right: 15,
				title: {
					label: { text: 'US Unemployment Rate, 2020', style_fontSize: '15px' },
					position: 'center'
				},
				defaultPoint_tooltip:
					'%name <b>{%zValue:n1}%</b><br>(<b>{%unemployed:n0}</b> people)',
				palette: {
					pointValue: '{%zValue:n1}%',
					colors: paletteColors,
					colorBar_axis_defaultTick_label_text: '%value%'
				},
				chartArea_fill: 'none',
				toolbar_items: {
					zoom_visible: false
				}
			};
		},
		getGridConfig: () => {
			return {
				className: 'dataTable',
				exportFile: false,
				columns: [
					{ header: 'State', value: '%state' },
					{ header: 'Unemployment Rate 2020', value: '%rate_bar%' },
					{ header: 'Trends (1976-2020)', value: '%trends_line' },
					{
						header: 'Min Unemployment Rate',
						value: '%min_rate',
						align: 'right'
					},
					{
						header: 'Max Unemployment Rate',
						value: '%max_rate',
						align: 'right'
					}
				]
			};
		},
		mapValue: (toStart, toEnd, fromStart, fromEnd, value) =>
			toStart +
			((value - fromStart) / (fromEnd - fromStart)) * (toEnd - toStart),
		round: v => Math.round(v * 10) / 10
	},
	components: {
		JSCharting,
		JSCGrid
	}
};
</script>

<style>
#mapGridWrapper {
	max-width: 740px;
	margin: 0px auto;
}
#mapGridWrapper a {
	text-decoration: none;
}
#mapGridWrapper p {
	margin-left: 5px;
	font-size: 12px;
	font-family: tahoma, geneva, sans-serif;
}

.jscGrid .col1 {
	text-align: left;
	padding-left: 15px;
}

.jscGrid .dataTable {
	font-family: tahoma, geneva, sans-serif;
}
.jscGrid .dataTable thead th {
	background-color: white;
	color: #424242;
	text-align: left !important;
	font-size: 14px;
	font-weight: bold;
	border-bottom: 1px solid #f5f5f5;
}
.jscGrid .dataTable tr {
	background-color: white !important;
}
.jscGrid .dataTable td {
	font-size: 12px;
	border-bottom: 1px solid #f5f5f5;
	font-weight: 300;
}
</style>
