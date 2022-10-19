<script>
import LogoNavbar from "../UI/LogoNavbar.vue"

export default {
name:"NavigationBar",
components: { LogoNavbar },

  data(){
  return{
    isLoggedIn: false
  }
  },

  beforeCreate(){
    const token = localStorage.getItem("token")
    if (token != null){
      this.isLoggedIn= true
    }
  },
  methods:{
    logOut(){
      localStorage.removeItem("token")
      this.$router.push("/login")
    }

  }
}
</script>

<template>
    
    <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <router-link to ="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <LogoNavbar class="bi me-3 mt-1" role="img" aria-label="Bootstrap"/>
        </router-link>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          
          <li><router-link to="/home" href="#" class="nav-link px-2 text-white">Accueil</router-link></li>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" class="form-control form-control-dark" placeholder="Rechercher..." aria-label="Rechercher">
        </form>

        <div class="text-end">
          <button type="button" class="btn btn-primary me-3"  @click="logOut">Se déconnecter</button>
        </div>
      </div>
    </div>
  </header>


</template>

<style scoped>

.bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}


</style>

