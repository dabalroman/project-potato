<template>
  <div id="main_view" class="fullscreen">
    <div class="header"><h4>POTATO CRM</h4></div>
    <b-container fluid="">
      <b-row>

        <b-col cols="8" class="column">

          <!-- Renderowanie z użyciem dataStorage -->
          <b-table
              :items="dataToRenderInBootstrapTable"
              hover
              borderless
              style="background-color: #eee"
          />
          <!-- Renderowanie z użyciem dataStorage -->

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
                  hover
                  borderless
              />
            </div>
          </div>
        </b-col>


        <b-col cols="4" class="detail">
          <div v-for="desc in desc" :key="desc.age">
            <h4>{{ desc.first_name }}</h4>
          </div>
          <div>
            <b-table stacked="stacked" :items="desc" borderless="borderless"></b-table>
          </div>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import './../style/style.css';
import DataStorage from '@/Data/DataStorage';
import Category from '@/Model/Category';
import Item from '@/Model/Item';

export default {
  name: 'Main',

  data () {
    return {
      categories: [],
      category: null,
      items: [],
      sortBy: 'age',
      sortDesc: false,
      bla: [{ age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { age: 38, first_name: 'Jami', last_name: 'Carney' }],
      fields: [
        { key: 'last_name', sortable: true },
        { key: 'first_name', sortable: true },
        { key: 'age', sortable: true },
      ],
      desc: [{ age: 40, first_name: 'Dickerson', last_name: 'Macdonald' }],
      item: null,

      /** @var {DataStorage} dataStorage */
      dataStorage: null,
    };
  },

  mounted () {
    this.categories = Category.getAll();
    this.items = Item.getAll();

    //Wczytanie wszystkich danych z bazy danych
    this.dataStorage = new DataStorage();
    this.dataStorage.loadData();
  },

  //Computed to zestaw funkcji wywoływanych, gdy dane w aplikacji się zmienią.
  // Automatycznie wykrywa to, że api zwróciło dane.
  computed: {
    //Utworzenie danych, które mają być wyświetlane w tabeli
    dataToRenderInBootstrapTable: function () {
      //Sprawdzenie, czy api na pewno już zwróciło dane
      if (!this.dataStorage || !this.dataStorage.isReady()) {
        return;
      }

      //Jeśli tak to pobierz wszystkie przedmioty z pierwszej kategorii (stąd [0] na końcu)
      //Pobieranie za pomocą metody zwracającej wszystkie przedmioty z danej kategorii
      let itemsInCategory = this.dataStorage.getArrayOfItemsFromCategory(this.dataStorage.categories.data[0]);

      //Mapuj dane, czyli weź każdy przedmiot i zamień w coś innego, w tym wypadku obiekt do renderowania w tabeli.
      //Wygenerowane obiekty wyglądają tak - analogicznie do twoich przykładowych danych do tabel:
      //{nazwa: 'Kij', zrodlo: 'JANUSZEX', kategoria: 'KIJE', ilosc: 4, cena: 3, wartosc: 12}
      return itemsInCategory.map(item => {
        return {
          nazwa: item.name,
          //dataStorage potrafi zwrócić źródło gdy podasz mu item
          zrodlo: this.dataStorage.getSourceForItem(item).name,
          //Tutaj pobieranie kategorii na podstawie itemu
          kategoria: this.dataStorage.getCategoryForItem(item).name,
          ilosc: item.amount + ' szt.',
          cena: item.price + ' zł',
          wartosc: item.amount * item.price + ' zł'
        };
      });
    }
  }
};
</script>
