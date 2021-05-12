<template>
  <div id="app">
    <Main v-if="auth.loggedIn === true"/>
  </div>
</template>

<script>
import Main from './views/Main';
import Auth from '@/Model/Auth';

export default {
  name: 'App',
  components: {
    Main
  },

  data () {
    return {
      auth: new Auth()
    };
  },

  mounted () {
    if(!this.auth.loggedIn) {
      this.auth.login('admin@localhost', 'admin');
    }
  }
};
</script>
