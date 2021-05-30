<template>
  <div id="main_view" class="fullscreen">

    <div class="navbar">
      <span>POTATO CRM</span>
      <b-icon icon="person-circle"></b-icon>
    </div>

    <b-container fluid="true">
      <b-row>

        <b-col cols="8" class="left_panel">
          <div v-if="categories && dataStorage">
            <div class="item_list" v-for="category in categories" :key="category.id">
              <CategoryComponent
                  :category="category"
                  @setSelectedItem="setSelectedItem"
              />
            </div>
          </div>
        </b-col>

        <b-col cols="4" class="right_panel">
          <div v-if="dataStorage">
            <ItemDetailsComponent
                :selectedItemId="selectedItemId"
                @editModeSet="itemEditModeSet"
                @itemWasChanged="itemWasChanged"
            />
          </div>
        </b-col>

      </b-row>
    </b-container>

    <div class="add_item_button" @click="newItem">
      <b-icon icon="plus" aria-hidden="true"></b-icon>
    </div>
  </div>
</template>

<script>
import './../style/style.css';

import dataStorageInstance from '@/Data/DataStorageInstance';
import CategoryComponent from '@/components/CategoryComponent';
import ItemDetailsComponent from '@/components/ItemDetailsComponent';
import Item from '@/Model/Item';

export default {
  name: 'Main',
  components: { CategoryComponent, ItemDetailsComponent },

  data () {
    return {
      /** @var {DataStorage} dataStorage */
      dataStorage: dataStorageInstance,
      selectedItemId: 2,
      lockItemSelect: false,
    };
  },

  mounted () {
    this.dataStorage.loadData();
  },

  computed: {
    categories: function () {
      if (!this.isDateStorageReady()) {
        return null;
      }

      return this.dataStorage.getCategories();
    },
  },

  methods: {
    isDateStorageReady: function () {
      return this.dataStorage && this.dataStorage.isReady();
    },

    setSelectedItem: function (itemId) {
      if (this.lockItemSelect) {
        alert('Zakończ edytowanie przedmiotu by wybrać inny.');
        return;
      }

      this.selectedItemId = itemId;
    },

    itemEditModeSet: function (itemDetailsEditableState) {
      this.lockItemSelect = itemDetailsEditableState;
    },

    itemWasChanged: function (itemId) {
      this.selectedItemId = itemId;
      this.dataStorage.rebuildCategoryToItemMaps();
    },

    newItem: function () {
      this.dataStorage.items.data.push(Item.createEmpty(this.dataStorage));
      this.selectedItemId = Item.NULL_ID;
    }
  },

};
</script>
