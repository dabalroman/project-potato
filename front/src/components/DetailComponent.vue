<template>
  <div v-if="item">
    <div class="item_title">
      <h4>{{ item.name }}</h4>
      <b-icon icon="pencil-square" class="icon"></b-icon>
    </div>
    <div class="item_details">
      <div>
        <b-container>
          <b-row>
            <b-col cols="4" class="item_categories">
              <p> Status</p>
              <p> Nazwa</p>
              <p> Źródło</p>
              <p> Kategoria</p>
              <p> Ilość</p>
              <p> Cena</p>
              <p> Wartość</p>
            </b-col>
            <b-col cols="8">
              <div v-if="dataStorage">
                <p>{{ item.state }}</p>
                <p>{{ item.name }}</p>
                <p>{{ this.dataStorage.getSourceForItem(item).name }}</p>
                <p>{{ this.dataStorage.getCategoryForItem(item).name | capitalize }}</p>
                <p>{{ item.amount }}</p>
                <p>{{ item.price | formatCurrency }}</p>
                <p>{{ item.amount * item.price | formatCurrency }}</p>
                <!--                        <p>{{ selectedItemData.item.price}}</p>-->
                <!--                        <p>{{ selectedItemData.item.value}}</p>-->
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import Currency from '@/utils/Currency';
import DataStorage from '@/Data/DataStorage';


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


  computed: {
    item: function () {
      if (!this.isDateStorageReady()) {
        return null;
      }
      return this.dataStorage.getItem(this.selectedItemId);
    },
  },

  filters: {
    formatCurrency: function (value) {
      return Currency.formatCurrency(value);
    },

    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },

  methods: {
    isDateStorageReady: function () {
      return this.dataStorage && this.dataStorage.isReady();
    }
  }
};
</script>
