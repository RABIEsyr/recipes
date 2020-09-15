<template>
    <form >
        <div class="row" v-if="name != ''">
        <div class="container">
            <button class="btn btn-warning" @click.prevent="clear">Clear</button>
            <button class="btn btn-success" @click.prevent="save">Save</button>
            <button class="btn btn-danger" @click.prevent="deleteRecipe">Delete</button>

            <div class="form-group">
                <!-- <h2> {{ name }} </h2> -->
                <label >Name</label>
                <input type="text" v-model="name" class="form-control">

                <label >Title</label>
                <input type="text" v-model="title" class="form-control">

                <br>
                <input type="text" v-model="img" class="form-control" style="margin-bottom: 10px">
                <div v-if="img !='image url'">
                    <img :src="img" alt="'img src'"> 
                    <!-- 
                        https://blog.modernistpantry.com/wp-content/uploads/2019/10/mp_blog_.jpg
                     -->
                </div> 
                <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Manage Recipe
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item"  style="cursor: pointer;" @click="toShopList">To Shopping List</a>
                            <a class="dropdown-item" style="cursor: pointer;" @click="editRecipe">Edit</a>
                            <a class="dropdown-item" style="cursor: pointer;"  @click="deleteRecipe">Delete Recipe</a>
                        </div>
                </div>
            </div>
          <hr>
          <ul class="list-group">
              <li class="list-group-item" v-for="ingredient in ingredients">
                  <input type="text"  v-model="ingredient.name" >
                  <input type="number" class="quantity" :value="ingredient.quantity">
                  <button class="btn btn-danger float-right" @click.prevent="deleteIngredient(ingredient.id)">X</button>
              </li>
          </ul>
          <hr>
          <button class="btn btn-success" @click.prevent="addIngredient">Add Ingredient</button>
      </div>
      <hr>
  </div>
    </form>
</template>

<script>
import { Bus } from '../../main';

export default {
    data: function() {
        return {
            name: '',
            title: '',
            img: '',
            ingredients: [],
            id: ''
        }
    },
    computed: {
        // ingredients() {

        // }
    },
    methods: {
        clear() {
            this.name = 'Name';
            this.title = 'Description'
            this.img = 'image url';
            this.ingredients = [];
        },
        addIngredient() {
             this.$store.dispatch('newIngredient', this.id)
             console.log('000', this.$store.getters.Get_Recipes);
        },
        save() {

            const recipe = {
                name: this.name,
                title: this.title,
                img: this.img,
                ingredients: this.ingredients,
                id: this.$store.getters.Get_Recipes.length + 1
            }

            this.$store.dispatch('newRecipe', recipe)
        },
        deleteRecipe() {
            this.$store.dispatch('deleteRecipe', this.id)
        },
        deleteIngredient(ingredientID) {
            this.$store.dispatch('deleteIngredient', {recipeId: this.id, ingredientID});
        },
        editRecipe() {
            this.$store.dispatch('editRecipe', 
                {id: this.id, name: this.name, title: this.title, img: this.img})
        },
        toShopList() {
            this.$store.dispatch('setShopList', this.ingredients);
        }
    },
    created() {
        Bus.$on('showRec', (recipe) => {
            this.name = recipe.name;
            this.title = recipe.title;
            this.img = recipe.img;
            this.ingredients = recipe.ingredients;
            this.id = recipe.id;
        })
    }
}
</script>

<style scoped>
    .quantity {
        width: 40px;
    }
    img {
    max-width: 100%;
    max-height: 200px;
    width: fit-content;
    margin-bottom: 5px;;
    }
</style>