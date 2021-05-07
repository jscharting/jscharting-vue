<template>
	<div id="app">
		<div class="examplesHead">
			<a href="https://jscharting.com"
				><img
					src="../public/jsc-vue-logo.svg"
					style="width: 200px; margin-top: 2px;"
					title="JSCharting"
					alt="JSCharting JavaScript Chart Library"
			/></a>

			<div class="examplesItems">
				<button
					v-for="item in examples"
					v-bind:key="item.file"
					v-on:click="selected = item.file"
					v-bind:class="{ selected: selected === item.file }"
					class="btn"
				>
					{{ item.name }}
				</button>
			</div>
		</div>
		<div class="samples">
			<component v-bind:is="selected"></component>
		</div>
	</div>
</template>

<script lang="ts">
import * as JSC from 'jscharting';
import { defineComponent } from 'vue';

import simpleLine from './components/simpleLine.vue';
import chartDash from './components/chartDash.vue';
import circularGauge from './components/circularGauge.vue';
import circularColorBar from './components/circularColorBar.vue';
import interactiveLine from './components/interactiveLine.vue';
import calendarHeatmap from './components/calendarHeatmap.vue';
import dataGrid from './components/dataGrid.vue';
import mapChoropleth from './components/mapChoropleth.vue';
import methodUpdate from './components/methodUpdate.vue';
import liveData from './components/liveData.vue';
import masterDetail from './components/masterDetail.vue';
import microchartFast from './components/microchartFast.vue';
import chartDataGrid from './components/chartDataGrid.vue';

export default defineComponent({
	name: 'App',
	data() {
		return {
			selected: 'simpleLine',
			examples: [
				{ file: 'simpleLine', name: 'Line' },
				{ file: 'chartDash', name: 'Dashboard' },
				{ file: 'circularGauge', name: 'Gauge' },
				{ file: 'circularColorBar', name: 'Color Bar' },
				{ file: 'interactiveLine', name: 'Interactivity' },
				{ file: 'mapChoropleth', name: 'Map Choropleth' },
				{ file: 'calendarHeatmap', name: 'Calendar Heatmap' },
				{ file: 'methodUpdate', name: 'Method Update' },
				{ file: 'microchartFast', name: 'Microchart' },
				{ file: 'liveData', name: 'Live Data' },
				{ file: 'masterDetail', name: 'Master Detail' },
				{ file: 'dataGrid', name: 'Data Grid' },
				{ file: 'chartDataGrid', name: 'Chart Grid Switch' }
			]
		};
	},
	components: {
		simpleLine,
		chartDash,
		circularGauge,
		circularColorBar,
		interactiveLine,
		mapChoropleth,
		calendarHeatmap,
		methodUpdate,
		microchartFast,
		liveData,
		masterDetail,
		dataGrid,
		chartDataGrid
	},
	beforeCreate: function() {
		JSC.defaults({ baseUrl: './assets/jscharting/' });
	}
});
</script>

<style scoped>
#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.samples {
	font-family: sans-serif;
	max-width: 800px;
	margin: 20px auto;
}

.examplesHead {
	background: #e2e7ef;
	padding: 15px 15px 10px 15px;
	min-height: 60px;
	position: relative;
	display: inline-block;
	width: 100%;
}

.examplesDescription {
	text-align: center;
	margin: 15px 0 0 0;
}

.examplesItems {
	float: right;
	margin: 13px;
}

.examplesLabel {
	font-family: sans-serif;
	top: 52px;
	position: absolute;
	left: 125px;
}

.btn {
	background-color: #0876ff;
	border-radius: 4px;
	border-width: 0;
	color: white;
	padding: 0.5em;
	font-family: sans-serif;
	font-size: 0.9em;
	margin-right: 10px;
	margin-top: 5px;
	min-width: 60px;
}

.btn:focus,
.btn:hover,
.btn.selected {
	background-color: #05418c;
}
</style>
