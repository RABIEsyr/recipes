<template>
    <div class="container">
        <div class="row"></div>
        <div class="row">
        <div class="col" style="margin-left: 20px;">
            <ul class="list-group">
            <li class="list-group-item" v-for="ingredient in shopList">
                {{ ingredient.name }} ({{  ingredient.quantity }})
            </li>
        </ul>
        </div>
    </div>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex';
export default {
    computed: {
        shopList() {
            let list = [...new Set(this.$store.getters.Get_Shopping_List)];

            console.log('123123', list)
            
            const result = Object.values([...list].reduce((acc, { name, quantity }) => {
                            acc[name] = { name, quantity: (acc[name] ? acc[name].quantity : 0) + quantity  };
                            return acc;
            }, {}));
            
            console.log('44444', result)
            return result
        }
    },
}   
</script>

<style>

</style>