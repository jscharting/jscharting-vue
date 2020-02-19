<style>
.microcharts {
	width: 350px;
	margin: 20px auto;
}
</style>

<template>
	<div class="microcharts">
		<JSCLabel :options="labelConfig1"></JSCLabel>
		<JSCLabel :options="labelConfig2"></JSCLabel>
		<JSCLabel :options="labelConfig3"></JSCLabel>
		<br />
		<JSCLabel :options="finalLabelConfig"></JSCLabel>
	</div>
</template>

<script>
import { JSCLabel } from 'jscharting-vue';

export default {
	beforeDestroy: function() {
		clearInterval(this.INTERVAL_ID);
	},
	mounted: function() {
		this.showProgress(c => {
			this.labelConfig1 = c;
		})
			.then(() =>
				this.showProgress(c => {
					this.labelConfig2 = c;
				})
			)
			.then(() =>
				this.showProgress(c => {
					this.labelConfig3 = c;
				})
			)
			.then(() => {
				this.finalLabelConfig =
					'<span style="font-weight:bold; font-size:20px">The installation was successful!</span><br>';
			});
	},
	methods: {
		showProgress: function(configFn) {
			return new Promise(resolve => {
				this.INTERVAL_ID = setInterval(() => {
					this.stepNext = Math.floor(Math.random() * 50);
					this.progress = this.progress + this.stepNext;
					this.step = this.stepNext;
					this.updateLabel(configFn, this.progress, 2000);
					if (this.progress >= 2000) {
						clearInterval(this.INTERVAL_ID);
						this.progress = 0;
						this.step = Math.floor(Math.random() * 50);
						this.stepNext = 0;
						this.doneLabel(configFn);
						resolve();
					}
				}, Math.floor(50 + Math.random() * 10));
			});
		},
		updateLabel: function(configFn, progress, goal) {
			configFn(
				'<span style="font-weight:bold; font-size:18px">' +
					((progress * 100) / goal).toFixed(2) +
					'%' +
					'</span><br>' +
					'<chart width=200 type=progress data=' +
					progress +
					' max=' +
					goal +
					' color=#00e676><br>' +
					'<span style="font-size:14px">' +
					progress +
					' of ' +
					goal +
					'</span>'
			);
		},
		doneLabel: configFn => {
			configFn(
				'<span style="font-weight:bold; font-size:18px">100%</span><br>' +
					'<chart width=200 type=progress data=100 max=100 color=#00e676>' +
					'<span style="font-size:14px"> Done </span><icon name=material/navigation/check size=16 fill=green>'
			);
		}
	},
	data() {
		return {
			name: 'microProgress',
			INTERVAL_ID: 0,
			labelConfig1: '',
			labelConfig2: '',
			labelConfig3: '',
			finalLabelConfig: '',
			step: Math.floor(Math.random() * 10),
			stepNext: 0,
			progress: 0
		};
	},
	components: {
		JSCLabel
	}
};
</script>
