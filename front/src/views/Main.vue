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
          <!-- Pojedynczy obiekt, domyślnie null, sprawdzanie czy obiekt istnieje i czy jest gotowy -->
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
import Category from '@/Model/Category';
import Item from "@/Model/Item";


export default {
  name: 'Main',

  data() {
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
      item: null
    };
  },

  mounted() {
    this.categories = Category.getAll();
    this.items = Item.getAll();
    //this.category = Category.create('BANANY');
    //this.category = Item.create('Cebule',10, 20,Item.STATE_OK, "Cebula +10 do ataku", 1,1);
    //this.category.save();
  }
};
</script>
