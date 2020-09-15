<template>
  <div>
     <div class="container">
          <form>
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-sm-offset-6 col-md-6 col-md-offset-6 col-lg-12 col-lg-offset-6">
                    <div class="form-group">
                        <label>Email</label>
                        <input 
                            type="text" 
                            :class="{'form-control': true, validation: isValidEmail}"
                            v-model="email">
                        <label>Password</label>
                        <input 
                            type="text" 
                            :class="{'form-control': true, validation: isValidPassword}"
                            v-model="passsword">    
                    </div>
                </div>
            </div>
          <div class="row text-center">
              <div class="col"><button class="btn btn-primary" @click.prevent = "login">Login</button></div>|
              <div class="col"><button class="btn btn-primary" @click.prevent = "login">register</button></div>
          </div>
      </form>
     </div>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            email: '',
            passsword: ''
        }
    },
    computed: {
        isValidEmail() {
            if (this.email == '') {
                return true
            } else {
                return false
            }
        },
        isValidPassword() {
            if (this.passsword == '') {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        login() {
            if (this.email && this.passsword) {
                this.$store.dispatch('login', {email: this.email, password: this.passsword})
                this.$router.push('/recipes')
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        if (localStorage.getItem('user')) { 
            next('/recipes')            
        } else {
            next();
        }
    }
}
</script>

<style scoped>

.validation {
    border: 1px red solid;
}
</style>