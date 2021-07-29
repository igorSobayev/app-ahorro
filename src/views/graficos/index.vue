<template>
  <div class="container-charts">
    <!-- Charts de gasto -->
    <div class="chart">
      <highcharts :options="chartMonthOptions"></highcharts>
    </div>
    <div class="chart">
      <highcharts :options="chartMonthLineOptions"></highcharts>
    </div>
    <!-- Charts de ingresos -->
    <div class="chart">
      <highcharts :options="chartMonthIngresosOptions"></highcharts>
    </div>
    <div class="chart">
      <highcharts :options="chartMonthLineIngresosOptions"></highcharts>
    </div>
  </div>
</template>

<script>
export default {
  name: "Graficos",
  data() {
    return {
      chartMonthOptions: {
        chart: {
          type: "column",
          height: 350,
        },
        title: {
          text: "Gastos de este mes (por días)",
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          title: "",
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: "{point.y:.1f} €",
              style: {
                fontSize: "9px",
                fontWeight: "400",
              },
            },
          },
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: "<span>{point.name}</span>: <b>{point.y:.2f}€</b> <br/>",
        },

        series: [],
      },
      chartMonthLineOptions: {
        chart: {
          type: "spline",
          height: 350,
        },
        title: {
          text: "Gastos de este mes (por días)",
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          title: "",
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: "{point.y:.1f} €",
              style: {
                fontSize: "9px",
                fontWeight: "400",
              },
            },
          },
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: "<span>{point.name}</span>: <b>{point.y:.2f}€</b> <br/>",
        },

        series: [],
      },
      chartMonthIngresosOptions: {
        chart: {
          type: "column",
          height: 350,
        },
        title: {
          text: "Ingresos de este mes (por días)",
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          title: "",
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: "{point.y:.1f} €",
              style: {
                fontSize: "9px",
                fontWeight: "400",
              },
            },
          },
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: "<span>{point.name}</span>: <b>{point.y:.2f}€</b> <br/>",
        },

        series: [],
      },
      chartMonthLineIngresosOptions: {
        chart: {
          type: "spline",
          height: 350,
        },
        title: {
          text: "Ingresos de este mes (por días)",
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          title: "",
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: "{point.y:.1f} €",
              style: {
                fontSize: "9px",
                fontWeight: "400",
              },
            },
          },
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: "<span>{point.name}</span>: <b>{point.y:.2f}€</b> <br/>",
        },

        series: [],
      },
    };
  },
  components: {},
  computed: {
    chartMonth: {
      get() {
        return this.$store.state.charts.chartMonth;
      },
    },
  },
  mounted() {
    this.loadChartsData();
  },
  methods: {
    loadChartsData() {
      this.$store.dispatch("charts/getTransactionsDataChartMonth").then((res) => {
        console.log(this.chartMonth);
        this.initChartMonth();
        this.initChartLineMonth();
        this.initChartIngresosMonth();
        this.initChartLineIngresosMonth();
      });
    },
    // Para los charts de gastos
    initChartMonth() {
      const labels = this.chartMonth.transactions_gastos.map((item) => {
        return item.day;
      });

      this.chartMonthOptions.xAxis.categories = labels;

      const series = [];

      series.push({
        name: "Gastos este mes el día",
        type: "column",
        color: "#118AB2",
        data: this.chartMonth.transactions_gastos.map((item) => {
          return {
            name: item.day,
            y: item.quantity,
          };
        }),
      });

      this.chartMonthOptions.series = series;
    },
    initChartLineMonth() {
      const labels = this.chartMonth.transactions_gastos.map((item) => {
        return item.day;
      });

      this.chartMonthLineOptions.xAxis.categories = labels;

      const series = [];

      series.push({
        name: "Gastos este mes el día",
        type: "spline",
        color: "#118AB2",
        data: this.chartMonth.transactions_gastos.map((item) => {
          return {
            name: item.day,
            y: item.quantity,
          };
        }),
      });

      this.chartMonthLineOptions.series = series;
    },
    // Para los charts de ingresos
    initChartIngresosMonth() {
      const labels = this.chartMonth.transactions_ingresos.map((item) => {
        return item.day;
      });

      this.chartMonthIngresosOptions.xAxis.categories = labels;

      const series = [];

      series.push({
        name: "Ingresos este mes el día",
        type: "column",
        color: "#358200",
        data: this.chartMonth.transactions_ingresos.map((item) => {
          return {
            name: item.day,
            y: item.quantity,
          };
        }),
      });

      this.chartMonthIngresosOptions.series = series;
    },
    initChartLineIngresosMonth() {
      const labels = this.chartMonth.transactions_ingresos.map((item) => {
        return item.day;
      });

      this.chartMonthLineIngresosOptions.xAxis.categories = labels;

      const series = [];

      series.push({
        name: "Ingresos este mes el día",
        type: "spline",
        color: "#358200",
        data: this.chartMonth.transactions_ingresos.map((item) => {
          return {
            name: item.day,
            y: item.quantity,
          };
        }),
      });

      this.chartMonthLineIngresosOptions.series = series;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-charts {
  max-height: 85vh;

  .chart {
    height: 350px;
  }
}
</style>

<style lang="scss">
.highcharts-credits {
  display: none;
}
</style>
