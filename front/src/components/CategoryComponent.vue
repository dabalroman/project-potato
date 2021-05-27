<template>
  <div>
    <div class="list_title">
      <span> {{ category.name }} </span>
      <b-icon icon="pencil-square" class="icon"></b-icon>
    </div>
    <div class="list_content">
      <div v-if="tableData.length > 0">
        <b-table
            :items="tableData"
            :fields="fields"
            sort-icon-left
            responsive="sm"
            hover
            borderless
        />
      </div>
      <span v-else style="color: red">Nic tu nie ma! </span>
    </div>
  </div>
</template>

<script>
import Category from '@/Model/Category';
import Currency from '@/utils/Currency';
import DataStorage from '@/Data/DataStorage';

export default {
  name: 'CategoryComponent',
  props: {
    category: {
      type: Category,
      required: true
    },
    dataStorage: {
      type: DataStorage,
      required: true
    }
  },

  data () {
    return {
      fields: [
        {
          label: 'Status',
          key: 'status',
          sortable: true
        },
        {
          label: 'Nazwa',
          key: 'nazwa',
          sortable: false
        },
        {
          label: 'Źródło',
          key: 'zrodlo',
          sortable: false
        },
        {
          label: 'Kategoria',
          key: 'kategoria',
          sortable: true
        },
        {
          label: 'Ilość',
          key: 'ilosc',
          sortable: false
        },
        {
          label: 'Cena',
          key: 'cena',
          sortable: true
        },
        {
          label: 'Wartość',
          key: 'wartosc',
          sortable: true
        },
        {
          label: 'ID',
          key: 'id',
          sortable: false
        }
      ],
    };
  },

  computed: {
    tableData: function () {
      let itemsInCategory = this.dataStorage.getArrayOfItemsFromCategory(this.category);

      return itemsInCategory.map(item => {
            return {
              status: item.state,
              nazwa: item.name,
              zrodlo: this.dataStorage.getSourceForItem(item).name,
              kategoria: this.dataStorage.getCategoryForItem(item).name,
              ilosc: item.amount + ' szt.',
              cena: Currency.formatCurrency(item.price),
              wartosc: Currency.formatCurrency(item.amount * item.price),
              id: item.id,
            };
          }
      );
    }
  }
};
</script>
