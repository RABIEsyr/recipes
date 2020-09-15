<template>
<div class="row" style="margin-top: 30px;">
    <!-- <div class="col-xs-12 col-sm-6 col-sm-offset-2 col-md-6 col-md-offset-3"> -->
    <div class="col">
        <transition  name="slide" appear>
            <ul class="list-group">
                    <app-recipe 
                        class="list-group-item" 
                        v-for="(recipe, index) in getRecipes" 
                        :recipe="recipe"
                        :active = "index == activeLiIndex"
                        :index = "index"
                        style="cursor: pointer;"
                        @click.native="showRecipe(recipe, index)"
                        @active="activeLiIndex = $event"      
                    >
                    </app-recipe>
                    
            </ul>  
            </transition>      
    </div>
    <div class="col">
        <app-recipe-details></app-recipe-details>
    </div>
</div>
    
</template>

<script>
import Recipe from './Recipe';
import RecipeDetails from './RecipeDetails';

import { Bus } from '../../main';

export default {
    data: function() {
        return {
            activeLiIndex: null
        }
    },
    computed: {
        getRecipes() {
            return this.$store.getters.Get_Recipes;
        }
    },
    methods: {
        showRecipe(recipe) {
            Bus.recpieDetails(recipe);
        }
    },
    components: {
        appRecipe: Recipe,
        appRecipeDetails: RecipeDetails,
    }
}
</script>

<style scoped>

.slide-enter-active {
    animation: slide-in 1s ease-out forwards;
}

@keyframes slide-in {
     0% {
      transform: translateX(-100px);
    }
    100% {
      transform: translateX(0);
    }
}

.col {
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 100%;
    margin-left: 20px;
}
</style>