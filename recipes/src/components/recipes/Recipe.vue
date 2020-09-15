<template>
        <div 
            class="col-xs-12 col-sm-6 col-sm-offset-2 col-md-6 col-md-offset-3"
            :class="{'active': active}" @click.stop="toggleRowActive"
            
        >
            <div class="row">
                <div class="col-sm">
                    <h1>  {{ recipe.name }} </h1>
                    <p> {{ recipe.title }} </p>   
                </div>
                <div class="col-sm">
                    <img :src="recipe.img" class="img-fluid img-thumbnail">
                </div>
            </div>
    </div>
</template>

<script>

export default {
    props: ['recipe', 'active', 'index'],
    
    methods: {
       toggleRowActive() {
            this.$emit('active', this.index);
          }
    }
}
</script>

<style scoped>
    h1 {
        font-size: 1rem;
    }
</style>