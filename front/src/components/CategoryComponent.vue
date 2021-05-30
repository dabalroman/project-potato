<template>
  <div>
    <div v-if="editable" class="list_title">
      <b-input
          class="me-3"
          v-model="category.name"
          @keyup.native="inputKeyConfirmHandler"
          autofocus
      ></b-input>
      <b-icon icon='check-square' class="icon" @click="toggleEditable"/>
    </div>
    <div v-else class="list_title">
      <span> {{ category.name }} </span>
      <b-icon icon='pencil-square' class="icon" @click="toggleEditable"/>
    </div>
    <div class="list_content">
      <div v-if="tableData.length > 0">
        <b-table
            :items="tableData"
            :fields="fields"
            responsive="sm"
            sort-by="nazwa"
            sort-icon-left
            hover
            borderless
            @row-clicked="rowClickedHandler"
        >
          <template #cell(status)="data">
            <b-icon
                :title="data.item.status.description"
                :class="data.item.status.class"
                :icon="data.item.status.icon"
            />
          </template>
        </b-table>
      </div>
      <span v-else class="d-block text-center">Ta kategoria jest pusta.</span>
    </div>
  </div>
</template>

<script>
import Category from '@/Model/Category';
import Filters from '@/utils/Filters';
import DataStorage from '@/Data/DataStorage';
import Item from '@/Model/Item';

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
      editable: false,
      fields: [
        {
          label: '',
          key: 'status',
          sortable: false
        },
        {
          label: 'Nazwa',
          key: 'nazwa',
          sortable: true
        },
        {
          label: 'Źródło',
          key: 'zrodlo',
          sortable: true
        },
        {
          label: 'Ilość',
          key: 'ilosc',
          sortable: true,
          formatter: Filters.unit
        },
        {
          label: 'Cena',
          key: 'cena',
          sortable: true,
          formatter: Filters.formatCurrency
        },
        {
          label: 'Wartość',
          key: 'wartosc',
          sortable: true,
          formatter: Filters.formatCurrency
        }
      ],
    };
  },

  computed: {
    tableData: function () {
      let itemsInCategory = this.dataStorage.getArrayOfItemsFromCategory(this.category);

      return itemsInCategory.map(item => {
            return {
              status: this.getIconForItemStatus(item.state),
              nazwa: item.name,
              zrodlo: this.dataStorage.getSourceForItem(item).name,
              ilosc: item.amount,
              cena: item.price,
              wartosc: item.amount * item.price,
              id: item.id,
            };
          }
      );
    }
  },

  methods: {
    getIconForItemStatus (status) {
      if (status === Item.STATE_OK) {
        return { description: 'Ok', icon: 'circle-fill', class: 'green' };
      } else if (status === Item.STATE_BORROWED) {
        return { description: 'Pożyczony', icon: 'slash-circle-fill', class: 'yellow' };
      } else {
        return { description: 'Zepsuty', icon: 'x-circle-fill', class: 'red' };
      }
    },

    rowClickedHandler (rowData) {
      this.$emit('setSelectedItem', rowData.id);
    },

    toggleEditable () {
      if (this.editable) {
        this.saveCategoryChanges();
      }

      this.editable = !this.editable;
    },

    inputKeyConfirmHandler (event) {
      if (event.which === 13) {
        this.editable = false;
        this.saveCategoryChanges();
      }
    },

    saveCategoryChanges () {
      this.category.save();
    }
  }
};
</script>
