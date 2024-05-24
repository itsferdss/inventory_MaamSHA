<template>
  <v-app>
    <div class="app" :class="{ 'login-page': isLoginPage }">
      <template v-if="!isLoginPage"> <!-- Only render sidebar if not on login page -->
        <Sidebar class="sidebar" />
        <div class="main-content">
          <router-view></router-view>
        </div>
      </template>
      <template v-else>
        <!-- Render only the login page content -->
        <router-view />
      </template>
    </div>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
  computed: {
    isLoginPage() {
      // Check if the current route is the login page
      return this.$route.path === '/login';
    },
  },
};
</script>

<style lang="scss">
.app {
  display: flex;
  height: 100vh;

  &.login-page {
    display: block;
  }
}

.sidebar {
  flex: 0 0 250px; /* Adjust the width of the sidebar as needed */
  height: 100%;
  background-color: #f4f4f4; /* Example background color */
}

.main-content {
  flex: 1; /* Allow the main content to grow and fill the available space */
  overflow-y: auto;
  padding: 20px; /* Example padding */
}


</style>
