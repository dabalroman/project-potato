<template>
  <div id="app">
    <Main v-if="auth.loggedIn === true"/>
    <LoginScreen v-else :authInstance="auth"/>
  </div>
</template>

<script>
import Main from './views/Main';
import authInstance from '@/Model/AuthInstance';
import LoginScreen from '@/components/LoginScreen';

export default {
  name: 'App',
  components: {
    LoginScreen,
    Main
  },

  data () {
    return {
      auth: authInstance
    };
  },
};
</script>
