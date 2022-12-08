<script lang="ts">
    import RestaurantCard from './../components/RestaurantCard.svelte';
    import Search from '../components/Search.svelte';

    let searchTerm = '';

    const searchBooks = () => {
        console.log(searchTerm, 'searchTerm');
    };
</script>

<Search bind:searchTerm="{searchTerm}" on:input="{searchBooks}" />
<RestaurantCard />
