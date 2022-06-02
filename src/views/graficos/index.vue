<template>
  <div class="container-charts">
    <div class="filtro-charts-container">
      <div class="filtro">
        <select v-model="filtroTypeSelected">
          <option :value="item.id" v-for="(item, index) in filtrosType" :key="index">{{ item.text }}</option>
        </select>
      </div>
    </div>
    <!-- Contenedor para los charts del mes actual -->
    <div class="filtered-chart-container" v-if="filtroTypeSelected === 'mesActual'">
      <!-- Charts de gasto -->
      <div class="chart-table-info">
        <h3>Resumen del mes</h3>
        <ul>
          <li>
            Gastos totales: <strong>{{ totalSpend }}€</strong>
          </li>
          <li>
            Ingresos totales: <strong>{{ totalRevenue }}€</strong>
          </li>
          <li>
            Media diaria gastos: <strong>{{ spendPerDay }}€</strong>
          </li>
          <li>
            Mayor gasto: <strong>{{ topSpend.quantity }}€ ({{ topSpend.cat }})</strong>
          </li>
        </ul>
        <div class="selector-tipo-chart">
          <div class="tipo-chart--option">
            <input type="radio" id="barras-gastos" v-model="radioMonthGastos" name="radioMonthGastos" value="barras" checked />
            <label for="barras-gastos">Barras</label>
          </div>
          <div class="tipo-chart--option">
            <input type="radio" id="lineas-gastos" v-model="radioMonthGastos" name="radioMonthGastos" value="lineas" />
            <label for="lineas-gastos">Lineas</label>
          </div>
        </div>
      </div>
      <div class="chart" v-if="radioMonthGastos === 'barras' && chartsData.transactions_gastos !== undefined && chartsData.transactions_gastos.length > 0">
        <highcharts :options="chartMonthOptions"></highcharts>
      </div>
      <div class="chart" v-if="radioMonthGastos === 'lineas' && chartsData.transactions_gastos !== undefined && chartsData.transactions_gastos.length > 0">
        <highcharts :options="chartMonthLineOptions"></highcharts>
      </div>
      <div class="chart chart-no-data" v-if="chartsData.transactions_gastos !== undefined && chartsData.transactions_gastos.length === 0">
        <p>Actualmente no hay ninguna transacción realizada este mes.</p>
      </div>
    </div>
    <!-- Contenedor para los charts de los ultimos 30 dias -->
    <div class="filtered-chart-container" v-if="filtroTypeSelected === 'ultimos30'">
      <!-- Charts de gasto -->
      <div class="chart-table-info">
        <h3>Resumen de los últimos 30 días</h3>
        <ul>
          <li>
            Gastos totales: <strong>{{ totalSpend }}€</strong>
          </li>
          <li>
            Ingresos totales: <strong>{{ totalRevenue }}€</strong>
          </li>
          <li>
            Media diaria gastos: <strong>{{ spendPerDay }}€</strong>
          </li>
          <li>
            Mayor gasto: <strong>{{ topSpend.quantity }}€ ({{ topSpend.cat }})</strong>
          </li>
        </ul>
        <div class="selector-tipo-chart">
          <div class="tipo-chart--option">
            <input type="radio" id="barras-gastos" v-model="radioMonthGastos" name="radioMonthGastos" value="barras" checked />
            <label for="barras-gastos">Barras</label>
          </div>
          <div class="tipo-chart--option">
            <input type="radio" id="lineas-gastos" v-model="radioMonthGastos" name="radioMonthGastos" value="lineas" />
            <label for="lineas-gastos">Lineas</label>
          </div>
        </div>
      </div>
      <div class="chart" v-if="radioMonthGastos === 'barras' && chartsData.transactions_gastos !== undefined && chartsData.transactions_gastos.length > 0">
        <highcharts :options="chartLast30DaysOptions"></highcharts>
      </div>
      <div class="chart" v-if="radioMonthGastos === 'lineas' && chartsData.transactions_gastos !== undefined && chartsData.transactions_gastos.length > 0">
        <highcharts :options="chartLast30DaysLineOptions"></highcharts>
      </div>
      <div class="chart chart-no-data" v-if="chartsData.transactions_gastos !== undefined && chartsData.transactions_gastos.length === 0">
        <p>Actualmente no hay ninguna transacción realizada este mes.</p>
      </div>
    </div>
    <!-- Contenedor para los charts del año en curso -->
    <div class="filtered-chart-container" v-if="filtroTypeSelected === 'actualYear'">
      <!-- Charts de gasto -->
      <div class="chart-table-info">
        <h3>Resumen del año</h3>
        <ul>
          <li>
            Gastos totales: <strong>{{ totalSpend }}€</strong>
          </li>
          <li>
            Ingresos totales: <strong>{{ totalRevenue }}€</strong>
          </li>
          <li>
            Media diaria gastos: <strong>{{ spendPerDay }}€</strong>
          </li>
          <li>
            Mayor gasto: <strong>{{ topSpend.quantity }}€ ({{ topSpend.cat }})</strong>
          </li>
        </ul>
        <div class="selector-tipo-chart">
          <div class="tipo-chart--option">
            <input type="radio" id="barras-gastos" v-model="radioMonthGastos" name="radioMonthGastos" value="barras" checked />
            <label for="barras-gastos">Barras</label>
          </div>
          <div class="tipo-chart--option">
            <input type="radio" id="lineas-gastos" v-model="radioMonthGastos" name="radioMonthGastos" value="lineas" />
            <label for="lineas-gastos">Lineas</label>
          </div>
        </div>
      </div>
      <div class="chart" v-if="radioMonthGastos === 'barras' && chartsData.transactions_gastos !== undefined && chartsData.transactions_gastos.length > 0">
        <highcharts :options="chartMonthOptions"></highcharts>
      </div>
      <div class="chart" v-if="radioMonthGastos === 'lineas' && chartsData.transactions_gastos !== undefined && chartsData.transactions_gastos.length > 0">
        <highcharts :options="chartMonthLineOptions"></highcharts>
      </div>
      <div class="chart chart-no-data" v-if="chartsData.transactions_gastos !== undefined && chartsData.transactions_gastos.length === 0">
        <p>Actualmente no hay ninguna transacción realizada este mes.</p>
      </div>
    </div>
    <!-- Contenedor para los charts de todo el historico -->
    <div class="filtered-chart-container" v-if="filtroTypeSelected === 'all'">
      <!-- Charts de gasto -->
      <div class="chart-table-info">
        <h3>Resumen desde el inicio</h3>
        <ul>
          <li>
            Gastos totales: <strong>{{ totalSpend }}€</strong>
          </li>
          <li>
            Ingresos totales: <strong>{{ totalRevenue }}€</strong>
          </li>
          <li>
            Media diaria gastos: <strong>{{ spendPerDay }}€</strong>
          </li>
          <li>
            Mayor gasto: <strong>{{ topSpend.quantity }}€ ({{ topSpend.cat }})</strong>
          </li>
        </ul>
        <div class="selector-tipo-chart">
          <div class="tipo-chart--option">
            <input type="radio" id="barras-gastos" v-model="radioMonthGastos" name="radioMonthGastos" value="barras" checked />
            <label for="barras-gastos">Barras</label>
          </div>
          <div class="tipo-chart--option">
            <input type="radio" id="lineas-gastos" v-model="radioMonthGastos" name="radioMonthGastos" value="lineas" />
            <label for="lineas-gastos">Lineas</label>
          </div>
        </div>
      </div>
      <div class="chart" v-if="radioMonthGastos === 'barras' && chartsData.transactions_gastos !== undefined && chartsData.transactions_gastos.length > 0">
        <highcharts :options="chartMonthOptions"></highcharts>
      </div>
      <div class="chart" v-if="radioMonthGastos === 'lineas' && chartsData.transactions_gastos !== undefined && chartsData.transactions_gastos.length > 0">
        <highcharts :options="chartMonthLineOptions"></highcharts>
      </div>
      <div class="chart chart-no-data" v-if="chartsData.transactions_gastos !== undefined && chartsData.transactions_gastos.length === 0">
        <p>Actualmente no hay ninguna transacción realizada este mes.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Graficos",
  data() {
    return {
      radioMonthGastos: "barras",
      filtroTypeSelected: "mesActual",
      filtrosType: [
        { id: "mesActual", text: "Mes Actual" },
        { id: "ultimos30", text: "Últimos 30 días" },
        { id: "actualYear", text: "Año actual" },
        { id: "all", text: "Todas las operaciones" },
      ],
      // Mes actual
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
      // Ultimos 30 dias
      chartLast30DaysOptions: {
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
      chartLast30DaysLineOptions: {
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
      // Año actual
      // Todos
    };
  },
  components: {},
  computed: {
    transactions() {
      return this.$store.state.operaciones.transactions;
    },
    totalSpend() {
      if (this.chartsData.length === 0) return 0;

      var totalSpend = 0;
      this.chartsData.transactions_gastos.forEach((item) => {
        totalSpend += item.quantity;
      });
      return totalSpend.toFixed(2);
    },
    totalRevenue() {
      if (this.chartsData.length === 0) return 0;

      var totalRevenue = 0;
      this.chartsData.transactions_ingresos.forEach((item) => {
        totalRevenue += item.quantity;
      });
      return totalRevenue.toFixed(2);
    },
    spendPerDay() {
      if (this.chartsData.length === 0) return 0;

      return (this.totalSpend / this.chartsData.transactions_gastos.length).toFixed(2);
    },
    topSpend() {
      if (this.transactions.length === 0) return 0;

      var topSpend = {
        quantity: 0,
        cat: "Otros gastos",
      };
      this.transactions.forEach((item) => {
        if (item.quantity >= topSpend.quantity && item.type_transaction === "resta") {
          topSpend.quantity = item.quantity.toFixed(2);
          topSpend.cat = item.name + " - " + item.subject;
        }
      });
      return topSpend;
    },
    chartsData: {
      get() {
        return this.$store.state.charts.chartsData;
      },
    },
    updateTransactions: {
      get() {
        return this.$store.state.operaciones.updateTransactions;
      },
      set(value) {
        this.$store.dispatch("operaciones/updateTransactionsAction", value);
      },
    },
  },
  watch: {
    updateTransactions(newOne, oldOne) {
      if (newOne) {
        this.loadChartsData();
      }
    },
    filtroTypeSelected() {
      this.loadChartsData();
    },
  },
  mounted() {
    this.loadChartsData();
  },
  methods: {
    loadChartsData() {
      switch (this.filtroTypeSelected) {
        case "mesActual":
          // Se cargan los datos de las transacciones
          this.$store.dispatch("operaciones/getTransactionsMonth");
          // Se cargan los datos de los charts
          this.$store.dispatch("charts/getTransactionsDataChartMonth").then((res) => {
            console.log(this.chartsData);
            this.initChartMonth();
            this.initChartLineMonth();
          });
          break;
        case "ultimos30":
          // Se cargan los datos de las transacciones
          this.$store.dispatch("operaciones/getTransactionsLast30Days");
          // Se cargan los datos de los charts
          this.$store.dispatch("charts/getTransactionsDataChartLast30Days").then((res) => {
            console.log(this.chartsData);
            this.initChartLast30Days();
            this.initChartLineLast30Days();
          });
          break;
        case "actualYear":
          // Se cargan los datos de las transacciones
          this.$store.dispatch("operaciones/getAllTransactionsYear");
          // Se cargan los datos de los charts
          this.$store.dispatch("charts/getTransactionsDataChartYear").then((res) => {
            console.log(this.chartsData);
            // this.initChartMonth();
            // this.initChartLineMonth();
          });
          break;
        case "all":
          // Se cargan los datos de las transacciones
          this.$store.dispatch("operaciones/getAllTransactions");
          // Se cargan los datos de los charts
          this.$store.dispatch("charts/getTransactionsDataChartAll").then((res) => {
            console.log(this.chartsData);
            // this.initChartMonth();
            // this.initChartLineMonth();
          });
          break;
        default:
          break;
      }
    },
    // Filtro charts este mes
    // Para los charts de gastos
    initChartMonth() {
      const labels = this.chartsData.transactions_gastos.map((item) => {
        return item.day;
      });

      this.chartMonthOptions.xAxis.categories = labels;

      const series = [];

      series.push({
        name: "Gastos este mes el día",
        type: "column",
        color: "#118AB2",
        data: this.chartsData.transactions_gastos.map((item) => {
          return {
            name: item.day,
            y: item.quantity,
          };
        }),
      });

      this.chartMonthOptions.series = series;
    },
    initChartLineMonth() {
      const labels = this.chartsData.transactions_gastos.map((item) => {
        return item.day;
      });

      this.chartMonthLineOptions.xAxis.categories = labels;

      const series = [];

      series.push({
        name: "Gastos este mes el día",
        type: "spline",
        color: "#118AB2",
        data: this.chartsData.transactions_gastos.map((item) => {
          return {
            name: item.day,
            y: item.quantity,
          };
        }),
      });

      this.chartMonthLineOptions.series = series;
    },
    // Filtro charts ultimos 30 dias
    // Para los charts de gastos
    initChartLast30Days() {
      const labels = this.chartsData.transactions_gastos.map((item) => {
        return item.day;
      });

      this.chartLast30DaysOptions.xAxis.categories = labels;

      const series = [];

      series.push({
        name: "Gastos últimos 30 días el día",
        type: "column",
        color: "#118AB2",
        data: this.chartsData.transactions_gastos.map((item) => {
          return {
            name: item.day,
            y: item.quantity,
          };
        }),
      });

      this.chartLast30DaysOptions.series = series;
    },
    initChartLineLast30Days() {
      const labels = this.chartsData.transactions_gastos.map((item) => {
        return item.day;
      });

      this.chartLast30DaysLineOptions.xAxis.categories = labels;

      const series = [];

      series.push({
        name: "Gastos últimos 30 días el día",
        type: "spline",
        color: "#118AB2",
        data: this.chartsData.transactions_gastos.map((item) => {
          return {
            name: item.day,
            y: item.quantity,
          };
        }),
      });

      this.chartLast30DaysLineOptions.series = series;
    },
    // Filtro charts este año

    // Filtro charts todas las operaciones
  },
};
</script>

<style lang="scss" scoped>
.container-charts {
  .filtro-charts-container {
    padding: 10px 15px 10px 15px;
  }

  .filtered-chart-container {
    max-height: 78vh;

    .chart {
      height: 350px;
    }

    .chart-no-data {
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        max-width: 200px;
        text-align: center;
        font-weight: 600;
      }
    }

    .chart-table-info {
      padding: 10px;

      h3 {
        padding-left: 10px;
        margin-bottom: 5px;
      }

      ul li {
        font-size: 15px;
      }

      .selector-tipo-chart {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        margin-top: 15px;

        .tipo-chart--option {
          display: flex;
          gap: 5px;
        }
      }
    }
  }
}

.filtro {
  border: 1px solid #d9d9d9;
  height: 30px;
  overflow: hidden;
  // width: 230px;
  position: relative;

  select {
    background: transparent;
    border: none;
    font-size: 14px;
    height: 30px;
    padding: 5px;
    width: 100%;
  }

  &::after {
    content: "\025be";
    display: table-cell;
    padding-top: 3px;
    text-align: center;
    width: 30px;
    height: 30px;
    background-color: #d9d9d9;
    position: absolute;
    top: 0;
    right: 0px;
    pointer-events: none;
  }
}
</style>

<style lang="scss">
.highcharts-credits {
  display: none;
}
</style>
