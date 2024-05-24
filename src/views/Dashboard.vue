<template>
    <main>
        <div class="main-content">
            <div class="Dashboard">
                <Dashboard/>
            </div>
        </div>
    </main>
</template>

<script>
import Dashboard from '../components/Dashboard.vue';

export default {
  components: {
    Dashboard
  }
};
</script>

<style lang="scss" scoped>
.main-content {
    display: flex;
    flex-direction: column;
    margin-left: 250px;

    .Dashboard {
        border-radius: 10px;
        background-color: #f0f0f0;
        padding: 0.5rem;
        height: 100vh;
    }
}



</style>
