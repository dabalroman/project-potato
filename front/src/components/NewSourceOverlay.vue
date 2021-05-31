<template>
  <div class="overlay">
    <div class="window">
      <span class="title">Wprowadź nazwę dla nowego źródła</span>
      <div class="input-row">
        <b-form-input
            v-model="sourceName"
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
  name: 'NewSourceOverlay',

  data() {
    return {
      sourceName: ''
    }
  },

  watch: {
    categoryName () {
      this.$emit('input', this.sourceName);
    }
  },

  methods: {
    closeOverlay () {
      this.$emit('closeOverlay', this.sourceName);
    },

    inputKeyConfirmHandler (event) {
      if (event.which === 13) {
        this.closeOverlay();
      }
    },
  }
};
</script>
