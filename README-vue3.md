
<p align="center">
    <br />
    <br />
   <a href="https://jscharting.com"><img src="https://jscharting.com/images/jsc-vue-logo.svg" width="400" alt="JSCharting for Vue.js"/></a><br />
   JavaScript data visualization for Vue.js 
</p>

<p align="center">
<a href="https://travis-ci.com/jscharting/jscharting-vue"><img src="https://img.shields.io/travis/com/jscharting/jscharting-vue.svg?branch=master" alt="Builds"></a>
<a href="https://david-dm.org/jscharting/jscharting-vue"><img alt="David" src="https://img.shields.io/david/jscharting/jscharting-vue"></a>
<a href="https://www.npmjs.com/package/jscharting-vue"><img alt="npm version" src="https://img.shields.io/npm/v/jscharting-vue.svg"></a>
<img alt="code style" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
<a href="https://twitter.com/jscharting/"><img alt="Twitter" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fjscharting%2F"></a> <br />
</p>

<br />

**JSCharting** is a JavaScript data visualization library offering seamless usage with Vue across all devices and platforms. Every JSCharting license includes a full suite of 150+ chart types including standards such as pie charts, line charts, donut and bar charts. In addition, advanced chart types including Gantt charts, JavaScript Org Charts, interactive charts for stock and finance, seamless grid and calendar charts, JavaScript maps, sparklines, and micro charts all for no additional charge. JSCharting has all the features you need and many you don't yet know you want.

Example Charts:
[Chart Types](https://jscharting.com/examples/chart-types/)
| [Feature Examples](https://jscharting.com/examples/chart-features/)

# Official JSCharting plugin for Vue.js 
A Vue2 and Vue3 wrapper to use [JSCharting](https://jscharting.com/) charting library as a Vue component.

### This documentation is for Vue3. For Vue2, [click here](README.md).

## Table of Contents 

1. [Install](#install)
    1. [Run Examples](#run-examples)
2. [Usage](#usage)
    1. [Simple Example](#simple-example)
    2. [JSCharting Component Options](#jscharting-component-options)
    3. [Updating Charts](#updating-charts)
3. [Chart resources](#chart-resources)
4. [Getting a chart reference](#getting-a-chart-reference)
5. [JSCLabel Component](#jsclabel-component)
6. [JSCGrid Component](#jscgrid-component)



### Install

Install the jscharting-vue chart component.

```console
npm i -D jscharting-vue
```

or

```console
yarn add jscharting-vue
```


#### Run Examples
Clone the [Github repo](https://github.com/jscharting/jscharting-vue)  locally. Example charts are located in the `/examples-vue3` folder.

To view the examples you can run the webpack dev server: localhost:3333

```console
npm run serve-examples-vue3
```

Or build the project manually.

```console
npm run build-examples-vue3
```


### Usage

#### Simple example
This example shows how you can use the `JSCharting` component of the `jscharting-vue` module to make a column chart.


```html
<template>
    <JSCharting :options="chartOptions" ></JSCharting>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import JSCharting, { JSC } from 'jscharting-vue';

export default defineComponent({
   name: 'columnChart',
   setup() {
      const chartOptions = reactive({
         type: 'horizontal column',
         series: [
            {
               points: [
                  { x: 'A', y: 50 },
                  { x: 'B', y: 30 },
                  { x: 'C', y: 50 }
                  ]
              }
          ]
        } as JSC.JSCChartConfig);
      return { chartOptions }; 
    },
    components: {
        JSCharting
    }
});
</script>
```

Notice that you can use `JSCChartConfig` type definitions for chart configuration properties.
```typescript
import { JSCChartConfig } from 'jscharting'; // -> JSCChartConfig
// OR
import JSCharting, { JSC } from 'jscharting-vue'; // -> JSC.JSCChartConfig
```


#### JSCharting Component Options
These customizable options are available with the `JSCharting` component.

| Parameter | Type |  Description |
| --------- | :----: | ----------- |
| `:options` | object | JSCharting chart configuration object. Please refer to the [API documentation](https://jscharting.com/documentation/#node=Home.API.json.Chart). |
| `:mutable` | boolean | (Optional) True by default. When set to `false`, a new instance of the chart is created when chart options change. Otherwise, updated options are passed to the existing chart instance `chart.options()` function. 
| `:ignoreStateUpdate` | boolean | (Optional) `false` by default. When `true`, the chart will ignore updates applied when reactive property is changed. This is useful when you want to update the chart directly. |
| `@rendered` | event | (Optional) Event triggered when the chart is finished rendering. The first argument of the event handler is a reference to the created chart.|


#### Updating charts

There are a couple ways to update live charts.

##### Using reactive properties

Updating reactive chart options properties affects the chart in two ways, depending on the option `mutable`. 
When the component option `mutable` is true, options are passed to the chart using chart.options(). 
When `mutable` is false, changing options will reset the chart with a new instance.

Charts with `mutable == true` option perform better and allow charts to animate changes. Only new options that are changing
need to be passed to the chart. You can animate chart updates using this more.

Using `mutable == false` is sometimes useful when a chart must be drastically modified. In this mode, all options should be
 available for a new chart instance to use.

See [animating series and points](https://jscharting.com/tutorials/types/js-series-point-animation-chart/) for more 
information.

```html
<template>
   <div>
      <JSCharting :options="chartOptions"></JSCharting>
      <button v-on:click="updateChartOptions">Update Chart Options Data</button>
   </div>
</template>

<script lang="ts">
   import { defineComponent, reactive } from 'vue';
   import { JSCChartConfig } from 'jscharting';
   import JSCharting from 'jscharting-vue';

   export default defineComponent({
      name: 'methodUpdate',
      setup() {
      	
         const randomPoints = () => {
            let points = [];
            for (let i = 1; i < 12; i++) {
               points.push({ id: 'p' + i, x: `1/${i * 2}/2020`, y: Math.random() * 10 });
            }
            return points;
         }
      	
         const chartOptions = reactive({
            type: 'line',
            title: { label: { text: 'Series updates' } },
            legend: {
               position: 'inside bottom right'
            },
            xAxis: { scale: { type: 'time' } },
            series: [
               {
                  name: 'Purchases',
                  points: randomPoints()
               }
            ]
         } as JSCChartConfig);

         function updateChartOptions() {
            chartOptions.series = [
               {
                  name: 'Purchases',
                  points: randomPoints()
               }
            ];
         }
         return {
            chartOptions,
            updateChartOptions
         };
      },
      components: {
         JSCharting
      }
   });

</script>
```

##### Updating chart directly

JSCharting has a rich API for direct interaction with chart elements programmatically. This approach is more 
flexible and can update the chart more efficiently when performance is a priority. Charts can also 
be decoupled from `data` updates and managed independently.

Set the `ignoreStateUpdate` option to true to prevent reactive chart properties from affecting the chart itself.

See [getting a chart reference](#getting-a-chart-reference). Code to get the chart instance inside the `setup()` function
will look something like this.

```js
const chart = this.myChart.value?.instance as JSC.Chart;
```

Once a `chart` instance reference is available, you can update chart options as needed with code such as:

```js
chart.series().points(p => p.y > 50).options({ color: "red" });
```

This line will make all points on a chart with y values greater than 50 red. Another example:

```js
chart.series(0).points(0).options({ y: 100 });
```

This example updates the "Purchases" series with new random point values.


```vue
<template>
    <div>
        <JSCharting :options="chartOptions" ref="myChart"></JSCharting>
        <button v-on:click="updateData">Update Chart Options Data</button>
    </div>
</template>

<script lang="ts">
   import { defineComponent, reactive, ref } from 'vue';
   import JSCharting, { JSC } from 'jscharting-vue';

   export default defineComponent({
      name: 'methodUpdate2',
      setup() {
         const randomPoints = () => {
            let points = [];
            for (let i = 1; i < 12; i++) {
               points.push({ id: 'p' + i, x: `1/${i * 2}/2020`, y: Math.random() * 10 });
            }
            return points;
         }
            const myChart = ref({} as JSCharting);
            const chartOptions = reactive({
               type: 'line',
               title: { label: { text: 'Series updates' } },
               legend: {
                  position: 'inside bottom right'
               },
               xAxis: { scale: { type: 'time' } },
               series: [
                  {
                     name: 'Purchases',
                     points: randomPoints()
                  }
               ]
            } as JSC.JSCChartConfig);
            
            const updateData = ()=>{
               const chart = myChart.value?.instance as JSC.Chart;
               if (chart) {
                  chart.series('Purchases').options({ points: randomPoints() });
               }
            }
            
            return {
               chartOptions,
               myChart,
               updateData
            };
        },
        components: {
           JSCharting
        }
    });
</script>
```

### Chart resources
The JSCharting library includes resources (modules, mapping data, polyfills, icons library) that load automatically
when they are needed. The `examples-vue3/` webpack [vue.config.js](examples-vue3/vue.config.js) configuration copies 
these resources to the `./dist/assets/jscharting` folder during built.

The `examples-vue3/src/App.vue` file calls the `JSC.defaults()` function to set `baseUrl` option
with this path globally in its constructor. All subsequent charts will be aware of the location of these resources.

```js
import { JSC } from 'jscharting-vue';
JSC.defaults({ baseUrl: 'dist/assets/jscharting', debug:true });
```

**Note:** If the chart does not find the resources path, it will download them from a CDN.
Setting `debug:true` in the `JSC.defaults()` function during development is recommended as it will 
alert you when the CDN fallback is used. It is recommended to use a local copy of resources in production.

### Getting a chart reference

You can get a chart instance and use it within the `setup()` function using the `ref` attribute on 
the <JSCharting> tag:

```vue
<template>
    <JSCharting ref="myChart" :options="chartOptions"></JSCharting>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import JSCharting, { JSC } from 'jscharting-vue';

export default defineComponent({
   setup() {
      const randomPoints = () => {
         let points = [];
         for (let i = 1; i < 12; i++) {
            points.push({ id: 'p' + i, x: `1/${i * 2}/2020`, y: Math.random() * 10 });
         }
         return points;
      }
      
      // Define myChart reference
      const myChart = ref({} as JSCharting);
      
      const chartOptions = reactive({
         type: 'line',
         series: [
            {
               name: 'Purchases',
               points: randomPoints()
            }
         ]
      } as JSC.JSCChartConfig);
    
      // Helper function to get a chart reference
      const getChart = () => this.myChart.value?.instance as JSC.Chart;
      
      return {
         chartOptions,
         myChart,
         getChart
      };
    },
    components: {
        JSCharting
    }
});

</script>
```

You can also store it when the chart `@rendered` event is executed.

```vue
<template>
    <JSCharting :options="chartOptions" @rendered="chartRendered"></JSCharting>
    <button v-on:click="updateData">Add Series</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import JSCharting, {JSC} from 'jscharting-vue';

export default defineComponent({
   setup() {
      const myChart = ref({} as JSC.Chart);
      return {
         myChart,
         chartOptions:{
            type:'line'
         },
         chartRendered: (instance: JSC.Chart) => {
            myChart.value = instance;
         },
         updateData: () => {
            myChart.value?.series.add({name: "S1", points: [{x: 5, y: 10}, {x: 8, y: 10}]});
         }
      }
   },
   components: {
      JSCharting
   }
});
</script>
```

### JSCLabel Component
This plugin also contains an implementation of the `JSCLabel` component for vue.
You can use it to create very efficient micro chart SVG images in your vue projects.
Here's a simple example.

```html
<template>
    <JSCLabel :options="options" />
</template>

<script>
   import { JSCLabel } from 'jscharting-vue';
   export default {
      name:'Microchart',
      setup(){
         const data = [5,2,3,5,1];
         return {
            options: `<chart arealine data=${data.join(',')} width=200 height=50>`
         }
      },

      components: {
         JSCLabel
      }
   };
</script>
```

The [Microchart Fast](examples-vue3/components/microchartFast.vue) example demonstrates updating a microchart using the 
JSCLabel component quickly.

See the [microcharts tutorial](https://jscharting.com/tutorials/types/js-microcharts/) for configuration 
string syntax and more information.

### JSCGrid Component
The `JSCGrid` data grid component is also included. You can use it to create data grids from JSON arrays.
Here's a data grid example.

```html
<template>
    <JSCGrid :options="gridOptions" />
</template>

<script>
   import { JSCGrid } from 'jscharting-vue';
   export default {
      name:'Data Grid',
      setup(){
         return {
         	gridOptions: {
         	   data: [
                  ['Art', 5, 10],
                  ['Greg', 3, 6],
                  ['Olivia', 11, 8],
                  ['Steve', 11, 4],
                  ['Anna', 3, 8]
               ],
               columns: [
                  {header: 'Name'},
                  {header: 'Value One'},
                  {header: 'Value Two'},
                  {header: 'Sum', value: '{%1+%2}'}
               ]
            }
         }
      }
      components: {
         JSCGrid
      }
   };
</script>
```

The available options for the data grid component are.

| Parameter | Type |  Description |
| --------- | :----: | ----------- |
| `:options` | object | JSCGrid configuration object. Please refer to the [API documentation](https://jscharting.com/documentation/#node=Home.API.json.Types.grid). |
| `:mutable` | boolean | (Optional) When set to true, `grid.options()` is called with the updated props instead of recreating the grid instance.
| `:className` | string | (Optional) Applies the class name to the grid container div element. It allows controlling grid size and layout with external CSS. |
| `@rendered` | event | Triggered when the grid is finished rendering. The first argument of the event handler is a reference to the created grid.|

Similar to the chart, you can import `JSCGridConfig` typings for grid options with

```typescript
import { JSCGridConfig } from 'jscharting'; // -> JSCGridConfig
// OR
import JSCharting, { JSC } from 'jscharting-vue'; // -> JSC.JSCGridConfig
```

See the [data grid tutorial](https://jscharting.com/tutorials/types/js-data-grid/) for configuration 
syntax and more information.






