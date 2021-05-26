
<template>
  <div id="main_view" class="fullscreen">

    <div class="navbar">
      <span>POTATO CRM</span>
      <b-icon icon="person-circle"></b-icon>
    </div>

    <b-container fluid="true">
      <b-row>

        <b-col cols="8" class="left_panel">
          <div class="item_list" v-for="data in itemListData" :key="data.category.id">
            <div class=" list_title ">
              <span> {{ data.category.name }} </span>
              <b-icon icon="pencil-square" class="icon"></b-icon>
            </div>
            <div class="list_content">
              <!-- Tablica obiektów, domyślnie [], sprawdzanie czy długość != 0 -->
              <div v-if="data.tableData.length > 0">
                <!--                 <b-icon icon="exclamation-circle" ></b-icon>-->
                <b-table
                    :items="data.tableData"
                    :fields="fields"
                    sort-icon-left
                    responsive="sm"
                    hover
                    borderless
                />
                <!-- Te pola kłóciły się ze zmianą, do ogarnięcia później -->
                <!--              :fields="fields"-->
                <!--              :sort-by.sync="sortBy"-->
                <!--              :sort-desc.sync="sortDesc"-->
              </div>
              <span v-else style="color: red">Nic tu nie ma! </span>
            </div>
          </div>
        </b-col>

        <b-col cols="4" class="right_panel">
          <div class="item_title">
            <h4>{{ selectedItemData.item.name }}</h4>
            <b-icon icon="pencil-square" class="icon"></b-icon>
          </div>
          <div class="item_details">
            <!-- tabela do wyrzucenia -->
            <div>
              <b-table stacked="stacked" :items="selectedItemData.tableData" borderless="borderless"></b-table>
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
      fields: [
        {
          label: "Status",
          key: 'status',
          sortable: true
        },
        {
          label: "Nazwa",
          key: 'nazwa',
          sortable: false
        },
        {
          label: "Źródło",
          key: 'zrodlo',
          sortable: false
        },
        {
          label: "Kategoria",
          key: 'kategoria',
          sortable: true
        },
        {
          label: "Ilość",
          key: 'ilosc',
          sortable: false
        },
        {
          label: "Cena",
          key: 'cena',
          sortable: true
        },
        {
          label: "Wartość",
          key: 'wartosc',
          sortable: true
        },
        {
          label: "ID",
          key: 'id',
          sortable: false
        }
      ],
      bla: [{age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
        {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
        {age: 89, first_name: 'Geneva', last_name: 'Wilson'},
        {age: 38, first_name: 'Jami', last_name: 'Carney'}],

      desc: [{age: 40, first_name: 'Dickerson', last_name: 'Macdonald'}],
      item: null,

      /** @var {DataStorage} dataStorage */
      dataStorage: null,
      selectedItemId: 2,
    };
  },

  mounted () {
    this.categories = Category.getAll();
    this.items = Item.getAll();


    //Wczytanie wszystkich danych z bazy danych
    this.dataStorage = new DataStorage();
    this.dataStorage.loadData();
  },

  computed: {
    //Lista kategorii i przedmiotów
    itemListData: function () {
      if (!this.isDateStorageReady()) {
        return [];
      }

      let data = [];

      this.dataStorage.categories.data.forEach(category => {
        let itemsInCategory = this.dataStorage.getArrayOfItemsFromCategory(category);

        data.push(
            {
              category: category,
              tableData: itemsInCategory.map(item => {
                    return {
                      status: item.state,
                      nazwa: item.name,
                      zrodlo: this.dataStorage.getSourceForItem(item).name,
                      kategoria: this.dataStorage.getCategoryForItem(item).name,
                      ilosc: item.amount + ' szt.',
                      cena: item.price + ' zł',
                      wartosc: item.amount * item.price + ' zł',
                      id: item.id,
                    };
                  }
              ),
            }
        );
      });

      return data;
    },

    //Dane obecnie wybranego itemu
    selectedItemData: function () {
      if (!this.isDateStorageReady()) {
        return [];
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
          cena: item.price + ' zł',
          wartosc: item.amount * item.price + ' zł'
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
