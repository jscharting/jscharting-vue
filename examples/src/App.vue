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
					v-for="chart in [
						'areaStep',
						'mapChart',
						'calendarChart',
						'methodUpdate',
						'liveData',
						'microProgress',
						'masterDetail',
						'dataGrid'
					]"
					v-bind:key="chart"
					v-on:click="selected = chart"
					v-bind:class="{ selected: selected === chart }"
					class="btn"
				>
					{{ chart }}
				</button>
			</div>
		</div>
		<div class="samples">
			<component v-bind:is="selected"></component>
		</div>
	</div>
</template>

<script>
import { JSC } from 'jscharting-vue';

import areaStep from './components/areaStep.vue';
import mapChart from './components/mapChart.vue';
import calendarChart from './components/calendarChart.vue';
import methodUpdate from './components/methodUpdate.vue';
import liveData from './components/liveData.vue';
import microProgress from './components/microProgress.vue';
import masterDetail from './components/masterDetail.vue';
import dataGrid from './components/dataGrid.vue';

export default {
	name: 'app',
	data() {
		return {
			selected: 'areaStep'
		};
	},
	components: {
		areaStep,
		mapChart,
		calendarChart,
		methodUpdate,
		liveData,
		microProgress,
		masterDetail,
		dataGrid
	},
	beforeCreate: function() {
		JSC.defaults({ baseUrl: './assets/jscharting/' });
	}
};
</script>

<style>
.samples {
	max-width: 800px;
	margin: 0 auto;
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
	min-width: 60px;
}

.btn:focus,
.btn:hover,
.btn.selected {
	background-color: #05418c;
}
</style>
