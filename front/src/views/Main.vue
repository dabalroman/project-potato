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
          SZCZEGÓŁY
          <!-- Pojedynczy obiekt, domyślnie null, sprawdzanie czy obiekt istnieje i czy jest gotowy -->
          <div v-if="category && category.ready" class="border border-2 border-primary">
            <div>
              {{ category.name }}
            </div>
          </div>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import './../style/style.css';
import Category from '@/Model/Category';


export default {
  name: 'Main',

  data() {
    return {
      categories: [],
      category: null
    };
  },

  mounted() {
    this.categories = Category.getAll();
    //this.category = Category.create('BANANY');
    //this.category = Item.create('Cebule',10, 20,Item.STATE_OK, "Cebula +10 do ataku", 1,1);
    //this.category.save();
  }
};
</script>
