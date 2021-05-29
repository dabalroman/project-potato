<template>
  <div v-if="item">
    <div class="item_title">
      <h4>{{ item.name }}</h4>
      <b-icon icon="pencil-square" class="icon"></b-icon>
    </div>
    <div class="item_details">
      <div>
        <b-container>
          <b-row class="item_row" v-for="data in itemData" :key="data.key">
            <b-col cols="4" class="item_categories"> {{ data.key | capitalize }}</b-col>
            <b-col cols="8">
              <div v-if="editable">
                <b-form-input v-model=" data.value"/>
              </div>
              <div v-else>dupaa {{ data.value }}</div>
            </b-col>
          </b-row>
          <!--          <b-row>-->
          <!--            <b-col cols="4" class="item_categories">-->
          <!--              <p> Status</p>-->
          <!--              <p> Nazwa</p>-->
          <!--              <p> Źródło</p>-->
          <!--              <p> Kategoria</p>-->
          <!--              <p> Ilość</p>-->
          <!--              <p> Cena</p>-->
          <!--              <p> Wartość</p>-->
          <!--            </b-col>-->
          <!--            <b-col cols="8">-->
          <!--              <div v-if="dataStorage">-->
          <!--                <p>{{ item.state }}</p>-->
          <!--                <p>{{ item.name }}</p>-->
          <!--                <p>{{ this.dataStorage.getSourceForItem(item).name }}</p>-->
          <!--                <p>{{ this.dataStorage.getCategoryForItem(item).name | capitalize }}</p>-->
          <!--                <p>{{ item.amount }}</p>-->
          <!--                <p>{{ item.price | formatCurrency }}</p>-->
          <!--                <p>{{ item.amount * item.price | formatCurrency }}</p>-->
          <!--              </div>-->
          <!--            </b-col>-->
          <!--          </b-row>-->
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import Currency from '@/utils/Currency';
import DataStorage from '@/Data/DataStorage';
import Capitalize from "@/utils/Capitalize";


export default {
  name: 'DetailComponent',
  props: {
    selectedItemId: {
      type: Number,
      required: true,
    },
    dataStorage: {
      type: DataStorage,
      required: true
    }
  },

  data() {
    return {
      editable: true
    };
  },

  computed: {
    item: function () {
      if (!this.isDateStorageReady()) {
        return null;
      }
      return this.dataStorage.getItem(this.selectedItemId);
    },

    itemData: function () {
      return [
        {
          key: "status",
          value: this.item.state,
        },
        {
          key: "nazwa",
          value: this.item.name,
        },
        {
          key: "źródło",
          value: this.dataStorage.getSourceForItem(this.item).name,
        },
        {
          key: "kategoria",
          value: this.dataStorage.getCategoryForItem(this.item).name,
        },
        {
          key: "ilość",
          value: this.item.amount,
        },
        {
          key: "cena",
          value: this.item.price,
        },
        {
          key: "Wartość",
          value: this.item.amount * this.item.price,
        },
      ];
    }

  },

  filters: {
    formatCurrency: function (value) {
      return Currency.formatCurrency(value);
    },

    capitalize: function (value) {
      return Capitalize.captialization(value);
    }
  },

  methods: {
    isDateStorageReady: function () {
      return this.dataStorage && this.dataStorage.isReady();
    }
  }
};
</script>
