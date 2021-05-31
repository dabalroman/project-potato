<template>
  <div class="overlay">
    <div class="window">
      <span class="title">Wprowadź nazwę dla nowej kategorii</span>
      <div class="input-row">
        <b-form-input
            v-model="categoryName"
            @keyup.native="inputKeyConfirmHandler"
            autofocus
        />
        <b-icon
            icon='check-square'
            class="icon green"
            title="Zapisz"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewCategoryOverlay',

  data() {
    return {
      categoryName: ''
    }
  },

  watch: {
    categoryName () {
      this.$emit('input', this.categoryName);
    }
  },

  methods: {
    closeOverlay () {
      this.$emit('closeOverlay', this.categoryName);
    },

    inputKeyConfirmHandler (event) {
      if (event.which === 13) {
        this.closeOverlay();
      }
    },
  }
};
</script>
