<template>
  <div id="main_view" class="fullscreen">

    <div class="navbar">
      <span>POTATO CRM</span>
      <b-icon icon="person-circle"></b-icon>
    </div>

    <b-container fluid="true">
      <b-row>

        <b-col cols="8" class="left_panel">
          <div v-if="categories && dataStorage">
            <div class="item_list" v-for="category in categories" :key="category.id">
              <CategoryComponent :category="category" :dataStorage="dataStorage"/>
            </div>
          </div>
        </b-col>

        <b-col cols="4" class="right_panel">
          <div v-if="selectedItemData">
            <div class="item_title">
              <h4>{{ selectedItemData.item.name }}</h4>
              <b-icon icon="pencil-square" class="icon"></b-icon>
            </div>
            <div class="item_details">
              <!-- tabela do wyrzucenia -->
              <div>
                <b-table stacked="stacked" :items="selectedItemData.tableData" borderless="borderless"></b-table>
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
                      <div v-if="selectedItemData">
                        <p>{{ selectedItemData.item.state }}</p>
                        <p>{{ selectedItemData.item.name }}</p>
                        <p>{{ selectedItemData.item.zrodlo }}</p>
                        <!--                        <p>{{ selectedItemData.item.category}}</p>-->
                        <!--                        <p>{{ selectedItemData.item.amount}}</p>-->
                        <!--                        <p>{{ selectedItemData.item.price}}</p>-->
                        <!--                        <p>{{ selectedItemData.item.value}}</p>-->
                      </div>
                    </b-col>
                  </b-row>
                </b-container>

              </div>
            </div>
          </div>
        </b-col>

      </b-row>
    </b-container>

    <div class="add_item_button">
      <b-icon icon="plus" aria-hidden="true"></b-icon>
    </div>
  </div>
</template>

<script>
import './../style/style.css';
import DataStorage from '@/Data/DataStorage';
import Currency from '@/utils/Currency';
import CategoryComponent from '@/components/CategoryComponent';

export default {
  name: 'Main',
  components: {CategoryComponent},

  data() {
    return {
      /** @var {DataStorage} dataStorage */
      dataStorage: null,
      selectedItemId: 2,
    };
  },

  mounted() {
    //Wczytanie wszystkich danych z bazy danych
    this.dataStorage = new DataStorage();
    this.dataStorage.loadData();
  },

  computed: {
    //Dane obecnie wybranego itemu
    categories: function () {
      if (!this.isDateStorageReady()) {
        return null;
      }

      return this.dataStorage.getCategories();
    },

    selectedItemData: function () {
      if (!this.isDateStorageReady()) {
        return null;
      }

      let item = this.dataStorage.getItem(this.selectedItemId);
      return {
        item: item,
        tableData: [{
          status: item.state,
          nazwa: item.name,
          zrodlo: this.dataStorage.getSourceForItem(item).name,
          kategoria: this.dataStorage.getCategoryForItem(item).name,
          ilosc: item.amount + ' szt.',
          cena: Currency.formatCurrency(item.price),
          wartosc: Currency.formatCurrency(item.amount * item.price)
        }]
      };
    },
  },

  methods: {
    isDateStorageReady: function () {
      return this.dataStorage && this.dataStorage.isReady();
    }
  }
};
</script>
