<template>
	<div :class="className"></div>
</template>

<script>
import * as JSC from 'jscharting';
export default {
	name: 'JSCharting',
	props: {
		options: Object,
		callback: Function,
		mutable: undefined,
		ignoreStateUpdate: undefined,
		className: String
	},
	mounted: function() {
		this.createChart();
	},
	beforeDestroy: function() {
		this.destroyChart();
	},
	watch: {
		options: function() {
			this.createChart();
		}
	},
	methods: {
		createChart: function() {
			const cb = this.callback;
			const options = this.options || {};
			const ignoreStateUpdate = this.ignoreStateUpdate;
			const updateExisting =
				this.instance && this.mutable !== false && !this.instance.dirty;

			// Skip update if chart exists and ignoreStateUpdate is true
			if (!this.instance || !ignoreStateUpdate) {
				if (updateExisting) {
					this.instance.options(options);
				} else {
					this.destroyChart();
					options.targetElement = options.targetElement || this.$el;
					this.instance = new JSC.Chart(options, cb);
				}
			}
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
