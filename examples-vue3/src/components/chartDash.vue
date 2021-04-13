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

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';

import JSCharting, { JSCGrid, JSC } from 'jscharting-vue';

export default defineComponent({
	name: 'chartDash',
	props: {
		dataLoaded: { type: Boolean, default: false }
	},
	setup() {
		//The series data
		const mapPoints: any = ref([]);

		let dataLoaded = ref(false);

		const paletteColors = [
			'#6ef2f0',
			'#00d2fa',
			'#00aeff',
			'#0084ff',
			'#4c4bdf'
		];

		//Util functions
		const mapValue = (
			toStart: number,
			toEnd: number,
			fromStart: number,
			fromEnd: number,
			value: number
		) =>
			toStart +
			((value - fromStart) / (fromEnd - fromStart)) * (toEnd - toStart);
		const round = (v: number) => Math.round(v * 10) / 10;

		const chartConfig = reactive({
			type: 'map',
			chartArea: { boxVisible: false, fill: 'none' },
			margin: { right: 15 },
			title: {
				label: {
					text: 'US Unemployment Rate, 2020',
					style: { fontSize: '15px' }
				},
				position: 'center'
			},
			defaultPoint: {
				tooltip:
					'%name <b>{%zValue:n1}%</b><br>(<b>{%unemployed:n0}</b> people)'
			},
			palette: {
				pointValue: '{%zValue:n1}%',
				colors: paletteColors,
				colorBar: { axis: { defaultTick: { label: { text: '%value%' } } } }
			},
			toolbar: {
				items: {
					zoom: { visible: false }
				}
			}
		} as JSC.JSCChartConfig);

		const gridConfig = reactive({
			className: 'dataTable',
			exportFile: false,
			columns: [
				{ header: 'State', value: '%state' },
				{ header: 'Unemployment Rate 2020', value: '%rate_bar%' },
				{ header: 'Trends (1976-2020)', value: '%trends_line' },
				{ header: 'Min Unemployment Rate', value: '%min_rate', align: 'right' },
				{ header: 'Max Unemployment Rate', value: '%max_rate', align: 'right' }
			]
		} as JSC.JSCGridConfig);

		onMounted(async () => {
			const response = await fetch('./resources/laborForceUs.csv');
			const text = await response.text();
			let data = JSC.csv2Json(text, {
				coerce: function(d: any) {
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
			mapPoints.value = mapData.map(v => {
				return {
					map: 'US.name:' + v.state,
					z: v.unemployment_rate,
					attributes_unemployed: v.unemployed
				};
			});
			chartConfig.series = [{ points: mapPoints.value }];

			// Create Grid Data
			let minRate = JSC.min(mapData, 'unemployment_rate');
			let maxRate = JSC.max(mapData, 'unemployment_rate');

			gridConfig.data = JSC.nest()
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
							Math.round(mapValue(0, 4, minRate, maxRate, rates.last))
						];
					return {
						state: key,
						trends_line: `<chart type=sparkline colors="#333F89,,#00aeff" width=130 height=20 margin=3 data="${rateList.join(
							','
						)}">`,
						rate_bar: `<chart type=bar margin_right=5 verticalAlign=middle color="${color}" data=${
							rates.last
						} max=13.3>${round(rates.last)}`,
						min_rate: `${round(rates.min)}% (${1976 +
							rateList.indexOf(rates.min)})`,
						max_rate: `<span style="${
							1976 + rateList.indexOf(rates.max) === 2020
								? 'font-weight:bold; color:black;'
								: ''
						} ">${round(rates.max)} % (${1976 +
							rateList.indexOf(rates.max)})</span>`
					};
				})
				.points(data);

			dataLoaded.value = true;
		});
		return {
			dataLoaded,
			chartConfig,
			gridConfig
		};
	},
	components: {
		JSCharting,
		JSCGrid
	}
});
</script>
