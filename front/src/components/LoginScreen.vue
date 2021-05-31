<template>
  <div id="login_screen" class="fullscreen">
    <div class="window">
      <span class="title">POTATO CMS</span>
      <span class="text">Zaloguj się do aplikacji</span>
      <span class="label">Email</span>
      <b-form-input
          autofocus
          placeholder="Twój email"
          type="text"
          v-model="email"
      />
      <span class="label">Hasło</span>
      <b-form-input
          placeholder="Twoje hasło"
          type="password"
          v-model="password"
          @keyup.native="inputKeyConfirmHandler"
      />
      <b-button
        @click="handleLogin"
      >
        Zaloguj
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginScreen',

  props: ['authInstance'],

  data() {
    return {
      email: null,
      password: null
    }
  },

  methods: {
    handleLogin(){
      if(!this.email || !this.password){
        alert("Wypełnij wszystkie pola.");
        return;
      }

      this.authInstance.login(this.email, this.password);
    },

    inputKeyConfirmHandler (event) {
      if (event.which === 13) {
        this.handleLogin();
      }
    },
  }
};
</script>
