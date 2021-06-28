<template>
    <section>FILTER</section>
    <section>
        <div class="controls">
            <button>Refresh</button>
            <router-link :to="'/register'">Register as Coach</router-link>
        </div>
        <ul v-if="hasCochaes">
            <li v-for="coach in filteredCoaches" :key="coach.id">{{ coach }}</li>
        </ul>
        <h3 v-else>No coaches found.</h3>
    </section>
    
</template>
<script>
export default {
    computed: {
        filteredCoaches() {
            return this.$store.getters['coaches/coaches'];
        },
        hasCochaes() {
            return this.$store.getters['coaches/hasCochaes'];
        },
    }
}
</script>