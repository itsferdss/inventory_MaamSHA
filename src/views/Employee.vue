<template>
    <main>
        <div class="main-content">
            <div class="Employee">
                <Employee/>
            </div>
        </div>
    </main>
</template>

<script>
import Employee from '../components/Employee.vue';

export default {
  components: {
    Employee
  }
};
</script>

<style lang="scss" scoped>
.main-content {
    display: flex;
    flex-direction: column;
    margin-left: 250px;

    .Employee {
        border-radius: 10px;
        background-color: #f0f0f0;
        padding: 0.5rem;
        height: 100vh;
    }
}



</style>
