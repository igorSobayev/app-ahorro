<template>
  <div class="container-add-operacion">
    <div class="titulo-seccion-container">
      <div class="btn-go-back"><goBackBtn /></div>
      <h3 class="titulo-seccion">Añadir transacción</h3>
    </div>
    <form @submit.prevent="addTransaction()" class="form-add-operacion" action="">
      <div class="add--asunto input">
        <v-text-field label="Asunto" hide-details="auto" v-model="transaction.subject"></v-text-field>
      </div>
      <div class="add--cantidad" :class="{ 'cantidad--suma': transaction.type_transaction === 'suma', 'cantidad--resta': transaction.type_transaction === 'resta' }">
        <div class="cantidad--tipo">
          <input type="radio" id="suma" value="suma" v-model="transaction.type_transaction" hidden />
          <input type="radio" id="resta" value="resta" v-model="transaction.type_transaction" hidden />
          <label class="tipo suma" for="suma"><i class="fas fa-plus"></i></label>
          <label class="tipo resta" for="resta"><i class="fas fa-minus"></i></label>
        </div>
        <div class="cantidad--cuantia"><input type="number" min="0" step=".01" v-model="transaction.quantity" placeholder="Cantidad" /></div>
        <div class="cantidad--moneda">€</div>
      </div>
      <div class="add--categoria__title">
        Categoría
        <div class="add--categoria__seleccionada">
          <small>({{ transaction.categoria.name }})</small>
        </div>
      </div>

      <div class="add--categoria">
        <div
          class="categoria"
          :class="{ 'categoria--selected': categoria.id_category === transaction.categoria.id_category }"
          v-for="(categoria, index) in categories"
          :key="index"
          @click="transaction.categoria = categoria"
        >
          <i :class="categoria.img"></i>
          <span class="categoria-nombre">{{ categoria.name }}</span>
        </div>
      </div>
      <div class="add--btn mt-4"><button class="btn btn-primary">Add</button></div>
    </form>

    <adviceAction v-model="showAdvice" :title="dialogTitle" :text="dialogText" :type="dialogType" />
  </div>
</template>

<script>
import adviceAction from "@/components/adviceAction";
import goBackBtn from "@/components/goBackBtn";

export default {
  name: "AddOperacion",
  components: { adviceAction, goBackBtn },
  data() {
    return {
      // rules: [(value) => !!value || "Required.", (value) => (value && value.length >= 3) || "Min 3 characters"],
      transaction: {
        subject: "",
        quantity: "",
        type_transaction: "resta",
        categoria: {
          color: null,
          descr: "El resto de gastos que no pueden incluirse en ninguna de las categorias anteriores.",
          id_category: 10,
          img: "fas fa-align-center",
          literal_descr: "cat_descr_other-expenses",
          literal_name: "cat_other-expenses",
          name: "Otros Gastos",
          status: 1,
        },
      },
      showAdvice: false,
      dialogText: "",
      dialogTitle: "",
      dialogType: "success",
    };
  },
  computed: {
    categories() {
      return this.$store.state.operaciones.categories;
    },
  },
  mounted() {
    this.$store.dispatch("operaciones/getCategories");
  },
  methods: {
    addTransaction() {
      if (this.checkData()) {
        this.$store
          .dispatch("operaciones/addTransaction", this.transaction)
          .then((res) => {
            this.dialogTitle = "¡Éxito!";
            this.dialogText = "La operación se ha registrado con éxito";
            this.dialogType = "success";
            this.showAdvice = true;
            this.transaction = {
              subject: "",
              quantity: "",
              type_transaction: "resta",
              categoria: {
                color: null,
                descr: "El resto de gastos que no pueden incluirse en ninguna de las categorias anteriores.",
                id_category: 10,
                img: "fas fa-align-center",
                literal_descr: "cat_descr_other-expenses",
                literal_name: "cat_other-expenses",
                name: "Otros Gastos",
                status: 1,
              },
            };
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    checkData() {
      var missElements = [];
      var faltaAlguno = false;
      if (this.transaction.subject === "") {
        faltaAlguno = true;
        missElements.push("Asunto");
      }
      if (this.transaction.quantity === "") {
        faltaAlguno = true;
        missElements.push(" Cantidad");
      }

      if (faltaAlguno) {
        this.dialogText = "Faltán los siguientes campos por completar: " + missElements.toString();
        this.dialogTitle = "¡Error!";
        this.dialogType = "fail";
        this.showAdvice = true;
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container-add-operacion {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;

  .titulo-seccion-container {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .btn-go-back {
      width: 20%;
      padding-left: 20px;
    }

    h3 {
      font-size: 1.3rem;
    }
  }

  .form-add-operacion {
    width: 80%;
    height: auto;

    .add--cantidad {
      margin-top: 20px;
      height: 65px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .cantidad {
        &--tipo {
          height: 100%;
          width: 32.5px;
          display: flex;
          justify-content: space-between;
          flex-direction: column;

          .tipo {
            width: 100%;
            height: 50%;
            // border: 1px solid black;
            border-left: 1px solid black;
            border-top: 1px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .suma {
            color: $color-11;
          }

          .resta {
            color: $color-1;
            border-bottom: 1px solid black;
          }
        }

        &--cuantia {
          height: 100%;
          width: 200px;
          padding-left: 10px;
          display: flex;
          align-items: center;
          border: 1px solid black;

          input {
            height: 50px;
            font-size: 20px;
            width: 100%;
            color: $color-5;
          }

          input:focus {
            outline: none;
          }

          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"] {
            -moz-appearance: textfield;
          }
        }

        &--moneda {
          width: 20%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 32px;
        }
      }
    }

    .add--categoria__title {
      margin-top: 20px;
      font-size: 22px;
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .add--categoria__seleccionada {
      color: $color-5;
      font-size: 14px;
    }

    .add--categoria {
      margin-top: 5px;
      width: 100%;
      height: 340px;
      border: 1px solid $color-10;
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      padding: 10px;
      align-items: center;

      .categoria {
        width: 70px;
        height: 70px;
        border-radius: 55px;
        border: 1px solid black;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        cursor: pointer;
        flex-wrap: wrap;
        line-height: 10px;

        .categoria-nombre {
          margin-top: -18px;
          font-size: 9px;
          width: 100%;
          text-align: center;
          word-spacing: 40px;
        }

        &--selected {
          border-color: $color-6;
          color: $color-6;
        }
      }
    }

    .add--btn {
      text-align: right;

      button {
        font-size: 24px;
      }
    }
  }
}

.cantidad {
  &--suma {
    .cantidad--tipo .suma {
      color: white !important;
      background-color: $color-11;
      border-color: $color-11 !important;
    }

    .cantidad--tipo .resta {
      border-color: $color-11 !important;
    }

    .cantidad--cuantia {
      border-color: $color-11 !important;
    }
  }
  &--resta {
    .cantidad--tipo .resta {
      color: white !important;
      background-color: $color-1;
      border-color: $color-1 !important;
    }

    .cantidad--tipo .suma {
      border-color: $color-1 !important;
    }

    .cantidad--cuantia {
      border-color: $color-1 !important;
    }
  }
}

.input .primary--text {
  color: $color-4 !important;
  caret-color: $color-4 !important;
}
</style>
