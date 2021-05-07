<template>
	<div></div>
</template>

<script>
import * as JSC from 'jscharting';
export default {
	name: 'JSCGrid',
	props: {
		options: { type: Object, required: true },
		mutable: { type: Boolean, default: true }
	},
	mounted: function() {
		this.renderGrid();
	},
	beforeDestroy: function() {
		this.destroyGrid();
	},
	watch: {
		options: function() {
			this.renderGrid();
		}
	},
	methods: {
		destroyGrid: function() {
			if (this.instance) {
				this.instance.destroy();
				this.instance = undefined;
			}
		},
		renderGrid: function() {
			const options = this.options;
			const updateExisting = this.instance && this.mutable !== false;
			if (updateExisting) {
				this.instance.options(this.options);
			} else {
				this.destroyGrid();
				const containerElement = this.$el;
				JSC.Grid(containerElement, options).then(grid => {
					this.instance = grid;
					this.$emit('rendered', grid);
				});
			}
		}
	}
};
</script>
