<template>
  <div id="main_view" class="fullscreen">

    <div class="navbar">
      <span>POTATO CMS</span>
      <div>
        <span v-if="isDateStorageReady()" class="me-3">{{ dataStorage.getLoggedUser().name }}</span>
        <b-icon
            class="icon"
            icon="person-circle"
            title="Wyloguj"
            @click="handleLogout"
        ></b-icon>
      </div>
    </div>

    <b-container fluid="true">
      <b-row>

        <b-col cols="8" class="left_panel">
          <div v-if="isDateStorageReady()">
            <div class="item_list" v-for="category in categories" :key="category.id">
              <CategoryComponent
                  :category="category"
                  @setSelectedItem="setSelectedItem"
              />
            </div>
          </div>
        </b-col>

        <b-col cols="4" class="right_panel">
          <div v-if="isDateStorageReady()">
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
import authInstance from '@/Model/AuthInstance';
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
      authInstance: authInstance,
      selectedItemId: Item.NULL_ID,
      lockItemSelect: false,
    };
  },

  mounted () {
    this.dataStorage.loadData();
    this.dataStorage.loggedAsId = authInstance.loggedAsId;
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

    itemWasChanged: function (itemId = Item.NULL_ID) {
      this.selectedItemId = itemId;
      this.dataStorage.rebuildCategoryToItemMaps();
    },

    newItem: function () {
      this.dataStorage.items.data.push(Item.createEmpty(this.dataStorage));
      this.selectedItemId = Item.NEW_ITEM_ID;
    },

    handleLogout: function () {
      this.dataStorage.loggedAsId = null;
      this.authInstance.logout();
    }
  },

};
</script>
