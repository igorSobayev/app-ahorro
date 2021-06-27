<template>
  <div class="container-operaciones">
    <div class="filtros-container mb-3">Filtros</div>
    <div class="operaciones">
      <div class="operacion" v-for="(transaction, index) in transactions" :key="index">
        <div class="operacion--categoria">
          <div class="categoria">
            <i :class="transaction.img"></i>
            <!-- <span class="categoria--name">{{ transaction.name }}</span> -->
          </div>
        </div>
        <div class="operacion--asunto">{{ transaction.subject }}</div>
        <div class="operacion--cantidad" :class="{ 'color--resta': transaction.type_transaction === 'resta', 'color--suma': transaction.type_transaction === 'suma' }">
          {{ transaction.quantity }} {{ transaction.currency_icon }}
        </div>
      </div>

      <div class="ninguna-operacion" v-if="transactions.length === 0">No hay ningún registro actualmente.</div>

      <!-- <div class="operacion">
        <div class="operacion--categoria">
          <div class="categoria"><i class="fas fa-apple-alt"></i></div>
        </div>
        <div class="operacion--asunto">Compra supermercado</div>
        <div class="operacion--cantidad color--resta">15€</div>
      </div> -->
    </div>

    <btnAddOperation />
  </div>
</template>

<script>
import btnAddOperation from "@/components/btnAddOperation";
import { mapGetters } from "vuex";

export default {
  name: "Operaciones",
  components: {
    btnAddOperation,
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("operaciones/getTransactionsMonth");
  },
  computed: {
    ...mapGetters(["isLogged", "user"]),
    transactions() {
      return this.$store.state.operaciones.transactions;
    },
  },
};
</script>

<style lang="scss" scoped>
.container-operaciones {
  padding-left: 10px;
  padding-top: 50px;

  .filtros-container {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid black;
    position: fixed;
    background-color: white;
    top: 65px;
  }

  .operaciones {
    height: 78vh;
    overflow: scroll;
    padding-right: 10px;

    .operacion {
      overflow: hidden;
      border-bottom: 1px solid $color-10;
      padding-left: 5px;
      padding-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      flex-wrap: wrap;
      height: 50px;

      &--categoria {
        width: 10%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .categoria {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;

          &--name {
            font-size: 9px;
            width: 100%;
            text-align: center;
          }
        }
      }

      &--asunto {
        width: 70%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 13px;
        padding-left: 15px;
        padding-right: 15px;
      }

      &--cantidad {
        width: 20%;
        height: 100%;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .ninguna-operacion {
      font-size: 20px;
      text-align: center;
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
}
</style>
