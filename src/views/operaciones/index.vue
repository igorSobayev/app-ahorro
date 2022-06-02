<template>
  <div class="container-operaciones">
    <div class="filtros-container mb-3">
      <div class="filtro--type">
        <select v-model="filtroTypeSelected">
          <option :value="item.id" v-for="(item, index) in filtrosType" :key="index">{{ item.text }}</option>
        </select>
      </div>
      <div class="filtro--days"></div>
      <div class="filtro--between-days"></div>
    </div>
    <div class="operaciones" @click="removeAllTransactionOptionsOutside">
      <div class="operacion" v-for="(transaction, index) in transactions" :key="index">
        <div class="operacion--categoria" @click="showTransactionOptions(index)">
          <div class="categoria">
            <i :class="transaction.img"></i>
          </div>
        </div>
        <div class="operacion--asunto" @click="showTransactionOptions(index)">
          <div class="subject__text">{{ transaction.subject }}</div>
          <div class="subject__date">{{ formattDate(transaction.created_at) }}</div>
        </div>
        <div
          class="operacion--cantidad"
          @click="showTransactionOptions(index)"
          :class="{ 'color--resta': transaction.type_transaction === 'resta', 'color--suma': transaction.type_transaction === 'suma' }"
        >
          {{ transaction.quantity }} {{ transaction.currency_icon }}
        </div>

        <div :id="'actions-' + index" class="operacion--actions">
          <button class="btn btn-danger" @click="checkRemoveTransaction(transaction.id_transaction)"><i class="far fa-trash-alt"></i></button>
          <router-link :to="'/edit-operation/' + transaction.id_transaction" class="btn btn-primary"><i class="far fa-edit"></i></router-link>
        </div>
      </div>

      <div class="ninguna-operacion" v-if="transactions.length === 0">No hay ningún registro para el filtro seleccionado.</div>

      <!-- <div class="operacion">
        <div class="operacion--categoria">
          <div class="categoria"><i class="fas fa-apple-alt"></i></div>
        </div>
        <div class="operacion--asunto">Compra supermercado</div>
        <div class="operacion--cantidad color--resta">15€</div>
      </div> -->
    </div>

    <v-dialog v-model="checkRemove" max-width="290">
      <div class="check-remove-container">
        <div class="check-remove-container--text">¿Estás seguro de querer eliminar esta operación?</div>
        <div class="check-remove-container--buttons">
          <button class="btn btn-primary" @click="cancelRemove">Cancelar</button><button class="btn btn-danger" @click="removeTransaction">Eliminar</button>
        </div>
      </div>
    </v-dialog>

    <adviceAction v-model="showAdvice" :title="dialogTitle" :text="dialogText" :type="dialogType" :time="3" />

    <btnAddOperation />
  </div>
</template>

<script>
import btnAddOperation from "@/components/btnAddOperation";
import { mapGetters } from "vuex";
import adviceAction from "@/components/adviceAction";

export default {
  name: "Operaciones",
  components: {
    btnAddOperation,
    adviceAction,
  },
  data() {
    return {
      oldVisibleAction: "",
      checkRemove: false,
      actualTransactionId: "",
      showAdvice: false,
      dialogText: "",
      dialogTitle: "",
      dialogType: "success",
      filtrosType: [
        { id: "mesActual", text: "Mes Actual" },
        { id: "ultimos30", text: "Últimos 30 días" },
        { id: "actualYear", text: "Año actual" },
        { id: "all", text: "Todas las operaciones" },
      ],
      filtroTypeSelected: "mesActual",
    };
  },
  mounted() {
    this.$store.dispatch("operaciones/getTransactionsMonth");
    this.$store.dispatch("operaciones/getCategories");
  },
  watch: {
    filtroTypeSelected(newOne, oldOne) {
      this.applyFiltroType(newOne);
    },
    updateTransactions(newOne, oldOne) {
      if (newOne) {
        this.applyFiltroType(this.filtroTypeSelected);
      }
    },
  },
  computed: {
    ...mapGetters(["isLogged", "user"]),
    transactions() {
      return this.$store.state.operaciones.transactions;
    },
    updateTransactions: {
      get() {
        return this.$store.state.operaciones.updateTransactions;
      },
      set(value) {
        this.$store.dispatch("operaciones/updateTransactionsAction", value);
      },
    },
    loading: {
      get() {
        return this.$store.state.operaciones.loading;
      },
      set(value) {
        this.$store.dispatch("operaciones/loadingAction", value);
      },
    },
  },
  methods: {
    applyFiltroType(type) {
      switch (type) {
        case "mesActual":
          this.$store.dispatch("operaciones/getTransactionsMonth");
          break;
        case "ultimos30":
          this.$store.dispatch("operaciones/getTransactionsLast30Days");
          break;
        case "actualYear":
          this.$store.dispatch("operaciones/getAllTransactionsYear");
          break;
        case "all":
          this.$store.dispatch("operaciones/getAllTransactions");
          break;
        default:
          break;
      }
    },
    /**
     * Formateamos la fecha para el formato adecuado proveniente de la base de datos
     */
    formattDate(date) {
      return new Date(date).toLocaleString();
    },
    checkRemoveTransaction(id) {
      this.checkRemove = true;
      this.actualTransactionId = id;
    },
    cancelRemove() {
      this.actualTransactionId = "";
      this.checkRemove = false;
    },
    removeTransaction() {
      console.log("ELIMINANDO " + this.actualTransactionId);
      this.checkRemove = false;
      this.loading = true
      this.$store
        .dispatch("operaciones/removeTransaction", { id_transaction: this.actualTransactionId })
        .then((res) => {
          this.removeAllTransactionOptions();
          this.actualTransactionId = "";
          this.dialogTitle = "¡Éxito!";
          this.dialogText = "Se ha eliminado la transacción con éxito";
          this.dialogType = "success";
          this.showAdvice = true;
          this.loading = false
        })
        .catch((e) => {
          this.removeAllTransactionOptions();
          this.cancelRemove();
          this.dialogText = "Ha ocurrido un error al eliminar la transacción";
          this.dialogTitle = "¡Error!";
          this.dialogType = "fail";
          this.showAdvice = true;
          this.loading = false
          console.log(e);
        });
    },
    showTransactionOptions(id) {
      this.removeAllTransactionOptions();

      if (this.oldVisibleAction !== "actions-" + id) {
        var transactionAction = document.getElementById("actions-" + id);
        transactionAction.classList.add("operacion--actions__visible");
        this.oldVisibleAction = "actions-" + id;
      } else {
        this.oldVisibleAction = "";
      }
    },
    removeAllTransactionOptions() {
      var oldActionsVisibles = document.getElementsByClassName("operacion--actions__visible");
      if (oldActionsVisibles.length > 0 && oldActionsVisibles !== undefined) {
        oldActionsVisibles.forEach((item) => {
          item.classList.remove("operacion--actions__visible");
        });
      }
    },
    removeAllTransactionOptionsOutside(e) {
      if ([...e.target.classList].includes("operaciones")) {
        this.removeAllTransactionOptions();
      }
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;

    .filtro {
      &--days {
        width: 30%;
      }

      &--between-days {
        width: 30%;
      }

      &--type {
        width: 40%;

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
    }
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
      height: 54px;
      position: relative;

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
        height: 50px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 13px;
        padding-left: 15px;
        padding-right: 15px;
        flex-wrap: wrap;
        overflow: hidden;
        cursor: pointer;

        .subject__text {
          width: 100%;
          line-height: 12px;
          min-height: 30px;
          max-height: 34px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding-bottom: 2px;
        }

        .subject__date {
          width: 100%;
          font-size: 10px;
          color: $color-12;
          height: 16px;
        }
      }

      &--cantidad {
        width: 20%;
        height: 100%;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &--actions {
        position: absolute;
        right: -1400px;
        transition: all 0.2s;
        opacity: 0;
        border: 1px solid $color-12;
        background-color: white;
        height: 45px;
        width: 120px;
        border-radius: 5px;

        a {
          color: white;
        }

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        &__visible {
          opacity: 1 !important;
          right: 10px !important;
        }
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

.check-remove-container {
  background-color: white;
  padding: 15px;

  &--text {
    text-align: center;
  }

  &--buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
  }
}
</style>
