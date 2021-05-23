<template>
  <div id="main_view" class="fullscreen">
    <div class="header">.</div>
    <b-container fluid="">
      <b-row>

        <b-col cols="8" class="column">
          <div v-for="category in categories" :key="category.id">
            <div class="title">
              <h3> {{ category.name }} </h3>
            </div>
            <!-- Tablica obiektów, domyślnie [], sprawdzanie czy długość != 0 -->

            <div>

            </div>

          </div>

          <div class="title">
            <h3> LISTA </h3>
          </div>

          <!-- Tablica obiektów, domyślnie [], sprawdzanie czy długość != 0 -->
          <div v-if="categories.length" class="list">

            <div v-for="category in categories" :key="category.id">
              {{ category.name }}
            </div>
          </div>
        </b-col>


        <!--        <b-col cols="4" class="column">-->
        <!--          <div class="title">-->
        <!--            <h3> LISTA </h3>-->
        <!--          </div>-->

        <!--          &lt;!&ndash; Tablica obiektów, domyślnie [], sprawdzanie czy długość != 0 &ndash;&gt;-->
        <!--          <div v-if="categories.length" class="list">-->

        <!--            <div v-for="category in categories" :key="category.id">-->
        <!--              {{ category.name }}-->
        <!--            </div>-->


        <!--          </div>-->
        <!--        </b-col>-->

        <b-col cols="4" class="header">
          <b-table :items="dataToRenderInBootstrapTable"/>
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
