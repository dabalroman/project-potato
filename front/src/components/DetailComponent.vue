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
                <b-form-input v-model=" data.value  "/>
              </div>
              <div v-else> {{ data.value | capitalize }}</div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import DataStorage from '@/Data/DataStorage';
import Filters from "@/utils/Filters";


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
          value: Filters.captialization(this.dataStorage.getCategoryForItem(this.item).name),
        },
        {
          key: "ilość",
          value: Filters.unit(this.item.amount),
        },
        {
          key: "cena",
          value: Filters.formatCurrency(this.item.price)   //this.item.price,

        },
        {
          key: "wartość",
          value: Filters.formatCurrency(this.item.amount * this.item.price),
        },
      ];
    }

  },

  filters: {
    formatCurrency: function (value) {
      return Filters.formatCurrency(value);
    },
    capitalize: function (value) {
      return Filters.captialization(value);
    },
    unit: function (value) {
      return Filters.unit(value);
    },
  },

  methods: {
    isDateStorageReady: function () {
      return this.dataStorage && this.dataStorage.isReady();
    }
  }
};
</script>
