<template>
  <div id="main_view" class="fullscreen">
    <div class="header"><h4>POTATO CRM</h4></div>
    <b-container fluid="">
      <b-row>

        <b-col cols="8" class="column">
          <div v-for="category in categories" :key="category.id">
            <div class="title">
              <h3> {{ category.name }} </h3>
            </div>
            <!-- Tablica obiektów, domyślnie [], sprawdzanie czy długość != 0 -->

            <div>
              <!--                 <b-icon icon="exclamation-circle" ></b-icon>-->
              <b-table
                  :items="bla"
                  :fields="fields"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  sort-icon-left
                  responsive="sm"
                  hover borderless="borderless"></b-table>
            </div>
          </div>
        </b-col>


        <b-col cols="4" class="detail">
          <div v-for="desc in desc" :key="desc.age">
            <h4>{{ desc.first_name }}</h4>
          </div>
          <div>
            <b-table stacked :items="desc" borderless="borderless"></b-table>
          </div>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import './../style/style.css';
import DataStorage from '@/Data/DataStorage';

export default {
  name: 'Main',

  data () {
    return {
      categories: [],
      category: null,
      items: [],
      sortBy: 'age',
      sortDesc: false,
      bla: [{age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
        {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
        {age: 89, first_name: 'Geneva', last_name: 'Wilson'},
        {age: 38, first_name: 'Jami', last_name: 'Carney'}],
      fields: [
        {key: 'last_name', sortable: true},
        {key: 'first_name', sortable: true},
        {key: 'age', sortable: true},
      ],
      desc: [{age: 40, first_name: 'Dickerson', last_name: 'Macdonald'}],

      /** @var {DataStorage} dataStorage */
      dataStorage: null,
    };
  },

  mounted () {
    this.dataStorage = new DataStorage();
    this.dataStorage.loadData();
  },

  computed: {
    dataToRenderInBootstrapTable: function (){
      if(!this.dataStorage || !this.dataStorage.isReady()){
        return;
      }

      let itemsInCategory = this.dataStorage.getArrayOfItemsFromCategory(this.dataStorage.categories.data[0]);
      return itemsInCategory.map(item => {
        return {
          'nazwa': item.name,
          'zrodlo': this.dataStorage.getSourceForItem(item).name,
          'kategoria': this.dataStorage.getCategoryForItem(item).name,
          'ilosc': item.amount,
          'cena': item.price,
          'wartosc': item.amount * item.price
        };
      });
    }
  }
};
</script>
