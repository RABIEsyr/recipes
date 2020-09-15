import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        auth: false,
        credintial: {
            email: '',
            password: ''
        },
        recipes: [
            {
                id: 1,
                name: 'Flafel',
                title: 'Syrian food',
                img: 'https://cdn.shortpixel.ai/spai/w_740+q_+ret_img+to_webp/https://goodiegodmother.com/wp-content/uploads/2013/06/homemade-falafel-pita-recipe.jpg',
                ingredients: [
                    {id:1, name: 'tomatoe', quantity: 2},
                    {id:2, name: 'bread', quantity: 1},
                    {id:3, name: 'cucumber', quantity: 5},
                ]
            },
            {
                id: 2,
                name: 'shawrma',
                title: 'Turkish food',
                img: 'https://cdn.shortpixel.ai/spai/w_740+q_+ret_img+to_webp/https://goodiegodmother.com/wp-content/uploads/2013/06/homemade-falafel-pita-recipe.jpg',
                ingredients: [
                    {id:1, name: 'pickled', quantity: 2},
                    {id:2, name: 'chicken', quantity: 1},
                    {id:3, name: 'bread', quantity: 1},
                ]
            }
            
        ],
        shoppingList: []
    },

    getters: {
        getAuth: state => {
            return state.auth
        },
        'Get_Recipes': (state, payload)=> {
            return state.recipes;
        },
        'Get_Shopping_List': (state, payload) => {
            return state.shoppingList;
        }

    },

    mutations: {
        'Auth': (state, payload) => {
            state.auth = true
            state.credintial.email = payload.email
            state.credintial.password = payload.password

            const data = JSON.parse(JSON.stringify(state.credintial))
            localStorage.setItem('user', (JSON.stringify(data)))
            
        },
        'Logout': (state, payload) => {
            state.auth = false;
        },
        'New_Ingredient': (state, payload) => {
            state.recipes.map(el => {
                if (el.id == payload) {
                    el.ingredients.push({
                        id: 4,
                        name: 'ingred',
                        quantity: 0
                    });
                }
                
            })
        },
        'New_Recipe': (state, payload) => {
                state.recipes.push(payload)
        },
        'Delete_Recipe' : (state, payload) => {
            state.recipes.find((recipe) => {
                if (recipe.id == payload) {
                    const index = state.recipes.indexOf(payload)
                    state.recipes.splice(index, 1);
                }
            })
        },
        'Delete_Ingredient': (state, payload) => {
            state.recipes.find((recipe) => {
                if (recipe.id == payload.recipeId) {
                    recipe.ingredients.find((ingredient) => {
                        if (ingredient.id == payload.ingredientID) {
                            recipe.ingredients.splice(recipe.ingredients.indexOf(ingredient), 1)
                        }
                    })
                    
                }
            })
        },
        'Edit_Recipe': (state, payload) => {
                        for (var i = 0; i < state.recipes.length; i++) {
                            if (state.recipes[i].id == payload.id) {
                                if (payload.name) {
                                    state.recipes[i].name = payload.name;
                                }
                                if (payload.title) {
                                    state.recipes[i].title = payload.tilte;
                                }
                                if (payload.img) {
                                    state.recipes[i].img = payload.img;
                                }
                            break;
                        
                    }
                        }
                            
        },
        'GetRecipe'(state, payload) {
            state.recipes.push(payload.body)
        },
        'PostRecipe'(state, payload) {
        },
        'Set_Shop_List': (state, payload) => {
            state.shoppingList.push(...JSON.parse(JSON.stringify(payload)))
        }
    },

    actions: {
        login( { commit }, payload ) {
            commit('Auth', payload);
        },
        logout( { commit }, payload ) {
            commit('Logout', false);
        },
        newIngredient( { commit }, payload) {
            commit('New_Ingredient', payload);
        },
        getRecipeFromServer({ commit }, payload ) {
            Vue.http.get('http://localhost:3000/index')
                .then(data => {
                    commit('GetRecipe', data);
            })
        },
        saveRecipeToServer( { commit }, payload) {
            Vue.http.post('http://localhost:3000/index', {data: this.state.recipes})
                .then(res => {
                    if (res.body.success) {
                        commit('PostRecipe', res.body.success);
                    }
                });
        },
        newRecipe( { commit }, payload ) {
            commit('New_Recipe', payload);
        },
        editRecipe( { commit }, payload ) {
            // console.log('333', payload)
            commit('Edit_Recipe', payload)
        },
        deleteRecipe( { commit }, payload ) {
            commit('Delete_Recipe', payload)
        },
        deleteIngredient( { commit }, payload ) {
            commit('Delete_Ingredient', payload);
        },
        setShopList( { commit }, payload ) {
            commit('Set_Shop_List', payload);
        }   
    }
})