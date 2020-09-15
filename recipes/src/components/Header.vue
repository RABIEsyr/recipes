<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="isAuth">
  <router-link to="/recipes"  active-class="active">
      <a class="navbar-brand">Recipes</a>
  </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">

        <router-link to="/shopping-list" tag="li" active-class="active" exact>
            <a class="nav-link" href="#">Shopping List <span class="sr-only">(current)</span></a>
        </router-link>

      </li>
      <!-- <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li> -->
    </ul>
    <div class="pull-right">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active" v-if="isAuth">
                <a class="nav-link" style="cursor: pointer;"  @click="onLogout">Logout <span class="sr-only">(current)</span></a>
            </li>
            
             <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 Manage
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" style="cursor: pointer;" @click="loadData">Load Data</a>
                    <a class="dropdown-item" style="cursor: pointer;" @click="saveData">Save Data</a>
                </div>
            </li>       
        </ul>    
    </div>
  </div>
</nav>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  computed: {
    // ...mapGetters([
    //   'getAuth'
    // ]),
    isAuth() {
      return  this.$store.getters.getAuth || localStorage.getItem('user') ? true : false;
    },
  },
  methods: {
    onLogout() {
      localStorage.removeItem('user');
      this.$router.push('/login');
      this.$store.dispatch('logout');
    },
    loadData() {
      this.$store.dispatch('getRecipeFromServer');
    },
    saveData() {
      this.$store.dispatch('saveRecipeToServer');
     // const data = this.$store.getters.Get_Recipes;
      
      // axios.post('http://localhost:3000/index', {data})
      //   .then(res => {
      //     console.log('0000', res);
      //   })
    }
  }
}
</script>

<style>

</style>