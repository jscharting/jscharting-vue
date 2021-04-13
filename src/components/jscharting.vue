<template>
	<div></div>
</template>

<script>
import { Chart } from 'jscharting';

export default {
	name: 'JSCharting',
	props: {
		options: { type: Object, required: true },
		mutable: { type: Boolean, default: true },
		ignoreStateUpdate: { type: Boolean, default: false }
	},
	data() {
		return {
			instance: undefined
		};
	},
	mounted: function() {
		this.createChart();
	},
	beforeDestroy: function() {
		this.destroyChart();
	},
	watch: {
		options: {
			deep: true,
			handler() {
				// Skip update if chart exists and ignoreStateUpdate is true
				if (this.instance && this.ignoreStateUpdate) return;

				this.createChart();
			}
		}
	},
	methods: {
		createChart: function() {
			const options = this.options || {};

			// If the instance does not exist yet, create one
			if (!this.instance) {
				this.renderChart(options);
				return;
			}

			if (this.mutable && !this.instance.dirty) {
				// If the mutable is true and the instance is not dirty, update the existing instance
				this.instance.options(options);
			} else {
				// Create a new instance with the new values
				this.renderChart(options);
			}
		},
		renderChart(options) {
			this.destroyChart();
			this.instance = new Chart(
				options.targetElement || this.$el,
				options,
				chart => this.$emit('rendered', chart)
			);
		},
		destroyChart: function() {
			if (this.instance) {
				this.instance.destroy();
				this.instance = undefined;
			}
		}
	}
};
</script>
