<template>
    <main>
        <div class="main-content">
            <div class="Expenses">
                <Expenses/>
            </div>
        </div>
    </main>
</template>

<script>
import Expenses from '../components/Expenses.vue';

export default {
  components: {
    Expenses
  }
};
</script>

<style lang="scss" scoped>
.main-content {
    display: flex;
    flex-direction: column;
    margin-left: 250px;

    .Expenses {
        border-radius: 10px;
        background-color: #f0f0f0;
        padding: 0.5rem;
        height: 100vh;
    }
}



</style>
