<template>
  <div id="app">
    <Main v-if="auth.loggedIn === true"/>
  </div>
</template>

<script>
import Main from './views/Main';
import authInstance from '@/Model/AuthInstance';

export default {
  name: 'App',
  components: {
    Main
  },

  data () {
    return {
      auth: authInstance
    };
  },

  mounted () {
    if(!this.auth.loggedIn) {
      this.auth.login('admin@localhost', 'admin');
    }
  }
};
</script>
