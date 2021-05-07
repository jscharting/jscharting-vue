import Vue, {WatchOptionsWithHandler} from 'vue'
import * as JSC from 'jscharting';

export interface ChartWatchObject {
	options: WatchOptionsWithHandler<any>;
}

// Chart
export interface ChartPropsObject {
	options: JSC.JSCChartConfig;
	mutable?: boolean;
	ignoreStateUpdate?: boolean;
}

export default class JSCharting extends Vue {
	props: ChartPropsObject;
	template: string;
	watch: ChartWatchObject;
	beforeDestroy: () => void;
	mounted: () => void;
	createChart: () => void;
	destroyChart: () => void;
	instance?: JSC.Chart;

}

// Grid
export interface GridPropsObject {
	options: JSC.JSCGridConfig;
	mutable?: boolean;
}

export class JSCGrid extends Vue {
	props: GridPropsObject;
	template: string;
	watch: ChartWatchObject;
	beforeDestroy: () => void;
	mounted: () => void;
	renderGrid: () => void;
	destroyGrid: () => void;

}

// Label
export interface LabelPropsObject {
	options: string;
}

export class JSCLabel extends Vue {
	props: LabelPropsObject;
	template: string;
	watch: ChartWatchObject;
	beforeDestroy: () => void;
	mounted: () => void;
	renderGrid: () => void;
	destroyGrid: () => void;

}

export {JSC as JSC};

