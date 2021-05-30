<template>
  <div v-if="item">
    <div class="item_title">
      <h4>{{ item.name }}</h4>
      <b-icon v-if="editable" icon='check-square' class="icon" @click="toggleEditable"/>
      <b-icon v-else icon='pencil-square' class="icon" @click="toggleEditable"/>
    </div>
    <div class="item_details">
      <div>
        <b-container>
          <b-row class="item_row">
            <b-col cols="4" class="item_label">Nazwa</b-col>
            <b-col cols="8">
              <div v-if="editable">
                <b-form-input
                    v-model="item.name"
                />
              </div>
              <div v-else>{{ item.name }}</div>
            </b-col>
          </b-row>

          <b-row class="item_row">
            <b-col cols="4" class="item_label">Opis</b-col>
            <b-col cols="8">
              <div v-if="editable">
                <b-form-textarea
                    v-model="item.description"
                    rows="3"
                />
              </div>
              <div v-else>{{ item.description }}</div>
            </b-col>
          </b-row>

          <b-row class="item_row">
            <b-col cols="4" class="item_label">Status</b-col>
            <b-col cols="8">
              <div v-if="editable">
                <b-form-select
                    v-model="item.state"
                    :options="dataStorage.getItemStateSelectData()"
                    :number="true"
                />
              </div>
              <div v-else>
                <b-icon
                    :title="itemState.text"
                    :class="itemState.class"
                    :icon="itemState.icon"
                />
                {{ itemState.text }}
              </div>
            </b-col>
          </b-row>

          <b-row class="item_row">
            <b-col cols="4" class="item_label">Źródło</b-col>
            <b-col cols="8">
              <div v-if="editable">
                <b-form-select
                    v-model="item.source"
                    :options="dataStorage.getSourcesSelectData()"
                    :number="true"
                />
              </div>
              <div v-else>{{ dataStorage.getSourceForItem(item).name | capitalize }}</div>
            </b-col>
          </b-row>

          <b-row class="item_row">
            <b-col cols="4" class="item_label">Kategoria</b-col>
            <b-col cols="8">
              <div v-if="editable">
                <b-form-select
                    v-model="item.category"
                    :options="dataStorage.getCategorySelectData()"
                    :number="true"
                />
              </div>
              <div v-else>{{ dataStorage.getCategoryForItem(item).name | capitalize }}</div>
            </b-col>
          </b-row>

          <b-row class="item_row">
            <b-col cols="4" class="item_label">Ilość</b-col>
            <b-col cols="8">
              <div v-if="editable">
                <b-form-input
                    v-model="item.amount"
                    :number="true"
                />
              </div>
              <div v-else>{{ item.amount | formatUnit }}</div>
            </b-col>
          </b-row>

          <b-row class="item_row">
            <b-col cols="4" class="item_label">Cena</b-col>
            <b-col cols="8">
              <div v-if="editable">
                <b-form-input
                    v-model="item.price"
                    :number="true"
                />
              </div>
              <div v-else>{{ item.price | formatCurrency }}</div>
            </b-col>
          </b-row>

          <b-row class="item_row">
            <b-col cols="4" class="item_label">Wartość</b-col>
            <b-col cols="8">
              <div>{{ item.amount * item.price | formatCurrency }}</div>
            </b-col>
          </b-row>

          <b-row class="item_row">
            <b-col cols="4" class="item_label">Utworzono</b-col>
            <b-col cols="8">
              <div>{{ item.created_at | formatDateString }}</div>
            </b-col>
          </b-row>

          <b-row class="item_row">
            <b-col cols="4" class="item_label">Edytowano</b-col>
            <b-col cols="8">
              <div>{{ item.updated_at | formatDateString }}</div>
            </b-col>
          </b-row>

          <b-row class="item_row">
            <b-col cols="4" class="item_label">Autor zmian</b-col>
            <b-col cols="8">
              <div>{{ dataStorage.getUser(item.last_edit_by).name | capitalize }}</div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import dataStorageInstance from '@/Data/DataStorageInstance';
import Filters from '@/utils/Filters';
import Item from '@/Model/Item';

export default {
  name: 'ItemDetailsComponent',
  props: {
    selectedItemId: {
      type: Number,
      required: true,
    },
  },

  data () {
    return {
      dataStorage: dataStorageInstance,
      prevCategory: {
        itemId: null,
        categoryId: null
      },
      editable: false,
    };
  },

  watch: {
    selectedItemId: function (newValue) {
      if(newValue === Item.NULL_ID){
        this.editable = true;
      }
    }
  },

  computed: {
    item: function () {
      if (!this.isDateStorageReady()) {
        return null;
      }

      return this.dataStorage.getItem(this.selectedItemId);
    },

    itemState: function () {
      return this.dataStorage.getItemStateSelectData(this.item);
    }
  },

  filters: {
    formatCurrency: function (value) {
      return Filters.formatCurrency(value);
    },

    capitalize: function (value) {
      return Filters.capitalize(value);
    },

    formatUnit: function (value) {
      return Filters.unit(value);
    },

    formatDateString: function (value) {
      return Filters.formatDateString(value);
    }
  },

  methods: {
    isDateStorageReady: function () {
      return this.dataStorage && this.dataStorage.isReady();
    },

    toggleEditable () {
      this.editable = !this.editable;

      if (!this.editable) {
        this.saveItemChanges();
      }

      this.$emit('editModeSet', this.editable);
    },

    saveItemChanges () {
      console.log(`Saving item:${this.item.name}:${this.item.id}`);

      this.item.save(item => {
        this.$emit('itemWasChanged', item.id);
      });
    }
  }
};
</script>
