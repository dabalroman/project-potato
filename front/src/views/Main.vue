<template>
  <div id="main_view" class="fullscreen">
    <div class="header">Header</div>
    <b-container fluid="">
      <b-row>
        <b-col cols="8" class="column">
          LISTA
          <!-- Tablica obiektów, domyślnie [], sprawdzanie czy długość != 0 -->
          <div v-if="categories.length" class="border border-2 border-primary">
            <div v-for="category in categories" :key="category.id">
              {{ category.name }}
            </div>
          </div>
        </b-col>
        <b-col cols="4" class="column">
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

  data () {
    return {
      categories: [],
      category: null
    };
  },

  mounted () {
    this.categories = Category.getAll();
    this.category = Category.getById(5);
  }
};
</script>
