<template>
  <div class="info-card">
    <div class="row">
      <div class="col-12  align-items-center">
        <div class="row chart-bar">
          <div class="chart-type">
            <button 
              :class="[{'active': chartType==='cs'}]" 
              class="btn btn-primary btn-sm mr-2" 
              @click="toCandleStickChart"
            >
              Candlestick Chart
            </button>
            <button 
              :class="[{'active': chartType==='lc'}]" 
              class="btn btn-primary btn-sm" 
              @click="toLineChart"
            >
              Line Chart
            </button>
          </div>
        </div>
      </div>
      <div 
        id="chartdiv" 
        ref="chartdiv" 
        class="chart-panel col"
      />
      <div class="col-12 p-2 text-right">
        <button 
          :class="[{'active': interval==='1h'}]" 
          class="btn btn-primary btn-sm mr-2" 
          @click="updateTimeInterval('1h')"
        >
          1H
        </button>
        <button 
          :class="[{'active': interval==='1d'}]" 
          class="btn btn-primary btn-sm mr-2" 
          @click="updateTimeInterval('1d')"
        >
          1D
        </button>
        <button 
          :class="[{'active': interval==='1w'}]" 
          class="btn btn-primary btn-sm mr-2" 
          @click="updateTimeInterval('1w')"
        >
          1W
        </button>
        <button 
          :class="[{'active': interval==='1M'}]" 
          class="btn btn-primary btn-sm mr-2" 
          @click="updateTimeInterval('1M')"
        >
          1M
        </button>
      </div>
    </div>
    <div 
      v-if="chartLoading" 
      class="spinner"
    >
      <div class="circle-spinner" />
    </div>
  </div>
</template>
<script>
import 'amcharts3/amcharts/amcharts';
import 'amcharts3/amcharts/serial';
import 'amstock3/amcharts/amstock';
// var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
export default {
  name: 'CoinCharts',
  props: {
    symbol: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      chartData: [],
      chart: null,
      interval: '1d',
      chartLoading: true,
      chartType: 'cs',
      candleStickChartConfig: {
        'type': 'stock',
        'theme': 'light',
        'dataDateFormat': 'YYYY-MM-DD HH',
        'mouseWheelZoomEnabled': true,
        'pathToImages': 'http://cdn.amcharts.com/lib/3/images/',
        'categoryAxesSettings': {
          'minPeriod': 'hh',
        },
        'dataSets': [{
          'fieldMappings': [{
            'fromField': 'open',
            'toField': 'open',
          }, {
            'fromField': 'close',
            'toField': 'close',
          }, {
            'fromField': 'high',
            'toField': 'high',
          }, {
            'fromField': 'low',
            'toField': 'low',
          }, {
            'fromField': 'volume',
            'toField': 'volume',
          }],
          'color': '#7f8da9',
          'dataProvider': this.chartData,
          'title': this.symbol,
          'categoryField': 'date',
        }],
        'panels': [{
          'title': 'Price',
          'showCategoryAxis': true,
          'percentHeight': 70,
          'valueAxes': [{
            'id': 'v1',
            'dashLength': 5,
          }],
          'categoryAxis': {
            'dashLength': 5,
          },
          'stockGraphs': [{
            'type': 'candlestick',
            'id': 'g1',
            'openField': 'open',
            'closeField': 'close',
            'highField': 'high',
            'lowField': 'low',
            'valueField': 'close',
            'lineColor': '#00a928',
            'fillColors': '#00a928',
            'negativeLineColor': '#db4c3c',
            'negativeFillColors': '#db4c3c',
            'fillAlphas': 1,
            'useDataSetColors': false,
            'showBalloon': true,
            'useNegativeColorIfDown': false,
            'balloonText': 'Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b>',
          }],
          'stockLegend': {
            'valueTextRegular': undefined,
            'periodValueTextComparing': '[[percents.value.close]]%',
          },
        },
        {
          'title': 'Volume',
          'percentHeight': 30,
          'marginTop': 1,
          'showCategoryAxis': true,
          'valueAxes': [{
            'dashLength': 5,
          }],
          'categoryAxis': {
            'dashLength': 5,
          },
          'stockGraphs': [{
            'valueField': 'volume',
            'type': 'column',
            'fillColors': '#7f8da9',
            'showBalloon': true,
            'fillAlphas': 1,
          }],
          'stockLegend': {
            'markerType': 'none',
            'markerSize': 0,
            'labelText': '',
            'periodValueTextRegular': '[[value.close]]',
          },
        },
        ],
        'chartScrollbarSettings': {
          'graph': 'g1',
          'graphType': 'line',
          'usePeriod': 'DD',
        },
        'chartCursorSettings': {
          'valueLineBalloonEnabled': true,
          'valueLineEnabled': true,
        },
        'legendSettings': {
          'useMarkerColorForLabels': true,
        },
      },
      lineCartConfig: {
        'type': 'stock',
        'theme': 'light',
        'dataDateFormat': 'YYYY-MM-DD HH',
        'mouseWheelZoomEnabled': true,
        'pathToImages': 'http://cdn.amcharts.com/lib/3/images/',
        'categoryAxesSettings': {
          'minPeriod': 'hh',
        },
        'dataSets': [{
          'color': '#00a928',
          'fieldMappings': [ {
            'fromField': 'value',
            'toField': 'value',
          } ],
          'dataProvider': this.chartData,
          'categoryField': 'date',
        }],
        'panels': [ {
          'showCategoryAxis': true,
          'title': 'Price',
          'stockGraphs': [ {
            'id': 'g1',
            'valueField': 'value',
            'useDataSetColors': false,
          } ],
          'stockLegend': {
            'periodValueTextRegular': '[[value.close]]',
          },
        },
        {
          'title': 'Volume',
          'percentHeight': 30,
          'showCategoryAxis': true,
          'stockGraphs': [ {
            'valueField': 'volume',
            'type': 'column',
            'showBalloon': false,
            'fillAlphas': 1,
          } ],
          'stockLegend': {
            'periodValueTextRegular': '[[value.close]]',
          },
        },
        ],
        'chartScrollbarSettings': {
          'graph': 'g1',
          'graphType': 'line',
          'usePeriod': 'DD',
        },
        'chartCursorSettings': {
          'valueLineBalloonEnabled': true,
          'valueLineEnabled': true,
        },
        'legendSettings': {
          'useMarkerColorForLabels': true,
        },
      },
    };
  },
  mounted() {
    this.fetchChartData();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.clear();
      this.chart = null;
      this.chartData = [];
    }
  },
  methods: {
    zoomChart() {
      if (this.chartData.length > 50){
        this.chart.scrollbarChart.zoomToIndexes(this.chartData.length - 40, this.chartData.length - 1);
      }
    },
    fetchChartData(isUpdate = false) {
      this.chartLoading = true;
      // proxyuUrl is done to avoid cross-origin error as it is directly called from javascript.
      fetch(`https://api.binance.com/api/v1/klines?symbol=${this.symbol}&interval=${this.interval}`).then(
        function (response) {
          if (response.status !== 200) {
            return;
          }
          response.json().then(function (data) {
            this.chartData = data.map((val) => {
              return {
                'date': new Date(val[0]),
                'open': parseFloat(val[1]),
                'high': parseFloat(val[2]),
                'low': parseFloat(val[3]),
                'close': parseFloat(val[4]),
                'volume': parseFloat(val[5]),
                'value': parseFloat(val[4]),
              };
            });
            if (isUpdate) {
              this.chart.dataSets[0].dataProvider = this.chartData;
              this.chart.validateData();
            }
            else {
              this.showChart();
            }
            this.chartLoading = false;
            this.zoomChart();
          }.bind(this));
        }.bind(this),
      ).catch(() => {
        this.chartLoading = false;
      });
    },
    updateTimeInterval(ti) {
      this.interval = ti;
      this.fetchChartData(true);
    },
    toCandleStickChart() {
      this.chartType = 'cs';
      const dataSet = this.chart.dataSets[0];
      const panel = this.chart.panels[0];
      dataSet.fieldMappings = [];
      dataSet.fieldMappings.push({
        fromField: 'close',
        toField: 'close',
      });
      dataSet.fieldMappings.push({
        fromField: 'open',
        toField: 'open',
      });
      dataSet.fieldMappings.push({
        fromField: 'high',
        toField: 'high',
      });
      dataSet.fieldMappings.push({
        fromField: 'low',
        toField: 'low',
      });
      dataSet.fieldMappings.push({
        fromField: 'volume',
        toField: 'volume',
      });
      dataSet.fieldMappings.push({
        fromField: 'value',
        toField: 'value',
      });
      panel.stockGraphs[0] = {
        id: 'g1',
        type: 'candlestick',
        balloonText: 'Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b>',
        closeField: 'close',
        fillColors: '#00a928',
        highField: 'high',
        lineColor: '#00a928',
        lineAlpha: 1,
        lowField: 'low',
        fillAlphas: 1,
        negativeFillColors: '#db4c3c',
        negativeLineColor: '#db4c3c',
        openField: 'open',
        valueField: 'value',
        proCandlesticks: false,
        useDataSetColors: false,
      };
      panel.stockLegend.valueTextRegular = '[[close]] ';
      this.chart.validateNow();
    },
    toLineChart() {
      this.chartType = 'lc';
      const dataSet = this.chart.dataSets[0];
      const panel = this.chart.panels[0];
      dataSet.fieldMappings = [];
      dataSet.fieldMappings.push({
        fromField: 'value',
        toField: 'value',
      });
      dataSet.fieldMappings.push({
        fromField: 'volume',
        toField: 'volume',
      });
      panel.stockGraphs[0] = {
        id: 'g1',
        type: 'line',
        valueField: 'value',
        lineThickness: 1,
        useDataSetColors: false,
        lineColor: '#00a928',
        showBalloon: true,
        balloonText: '<b>[[value]]</b>',
      };
      panel.stockLegend.periodValueTextRegular = '[[value.close]] ';
      this.chart.validateNow();
    },
    showChart() {
      this.chart = window.AmCharts.makeChart('chartdiv', {
        'type': 'stock',
        'theme': 'light',
        'dataDateFormat': 'YYYY-MM-DD HH',
        'mouseWheelZoomEnabled': true,
        'pathToImages': 'http://cdn.amcharts.com/lib/3/images/',
        'categoryAxesSettings': {
          'minPeriod': 'hh',
        },
        'dataSets': [{
          'fieldMappings': [{
            'fromField': 'open',
            'toField': 'open',
          }, {
            'fromField': 'close',
            'toField': 'close',
          }, {
            'fromField': 'high',
            'toField': 'high',
          }, {
            'fromField': 'low',
            'toField': 'low',
          }, {
            'fromField': 'volume',
            'toField': 'volume',
          }, {
            'fromField': 'value',
            'toField': 'value',
          }],
          'color': '#7f8da9',
          'dataProvider': this.chartData,
          'title': this.symbol,
          'categoryField': 'date',
        }],
        'panels': [
          {
            'title': 'Price',
            'showCategoryAxis': true,
            'percentHeight': 70,
            'valueAxes': [{
              'id': 'v1',
              'dashLength': 5,
            }],
            'categoryAxis': {
              'dashLength': 5,
              'parseDates': true,
            },
            'stockGraphs': [{
              'type': 'candlestick',
              'id': 'g1',
              'openField': 'open',
              'closeField': 'close',
              'highField': 'high',
              'lowField': 'low',
              'valueField': 'close',
              'lineColor': '#00a928',
              'fillColors': '#00a928',
              'negativeLineColor': '#db4c3c',
              'negativeFillColors': '#db4c3c',
              'fillAlphas': 1,
              'useDataSetColors': false,
              'showBalloon': true,
              'useNegativeColorIfDown': false,
              'balloonText': 'Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b>',
            }],
            'stockLegend': {
              'valueTextRegular': undefined,
              'periodValueTextComparing': '[[percents.value.close]]%',
            },
          },
          {
            'title': 'Volume',
            'percentHeight': 30,
            'marginTop': 1,
            'showCategoryAxis': true,
            'valueAxes': [{
              'dashLength': 5,
            }],
            'categoryAxis': {
              'dashLength': 5,
            },
            'stockGraphs': [{
              'valueField': 'volume',
              'type': 'column',
              'fillColors': '#7f8da9',
              'showBalloon': true,
              'fillAlphas': 1,
            }],
            'stockLegend': {
              'markerType': 'none',
              'markerSize': 0,
              'labelText': '',
              'periodValueTextRegular': '[[value.close]]',
            },
          },
        ],
        'chartScrollbarSettings': {
          'graph': 'g1',
          'graphType': 'line',
          'usePeriod': 'DD',
        },
        'chartCursorSettings': {
          'valueBalloonsEnabled': true,
          'valueLineBalloonEnabled': true,
          'valueLineEnabled': true,
        },
        'legendSettings': {
          'useMarkerColorForLabels': true,
        },
      });
    },
  },
};
</script>