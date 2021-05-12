<template>
  <div id="main_view" class="fullscreen">
    <div class="header">Header</div>
    <b-container fluid="">
      <b-row>
        <b-col cols="8" class="column">
          LISTA
          <div v-for="category in categories" :key="category.id">{{ category.name }}</div>
        </b-col>
        <b-col cols="4" class="column">SZCZEGÓŁY</b-col>
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
      categories: [new Category()]
    };
  },

  mounted () {
    this.categories = Category.getAll();
  }
};
</script>
