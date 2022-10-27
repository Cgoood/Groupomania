<script>

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      error: null,
      isloginMode: true
    }
  },
  methods: {
    signUpMode,
    signUp,
    loginUser
  },
}

function signUpMode() {
  this.isloginMode = !this.isloginMode
}

function signUp(email, password, confirmPassword, router) {
  const {
    VITE_SERVER_ADDRESS,
    VITE_SERVER_PORT
  } =
  import.meta.env
  const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/auth/signup`

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      email,
      password,
      confirmPassword
    })
  }

  fetch(url, options)
    .then((res) => {
      if (res.ok) return res.json()
      res.text().then((err) => {
        const {
          error
        } = JSON.parse(err)
        this.error = error
        throw new Error(error)
      })
    })
    .then((res) => {
      const token = res.token
      localStorage.setItem("token", token)
      this.$router.go()
    })
    .catch((err) => {
      console.error(err)
    })
}

function loginUser(email, password, router) {
  console.log({
    email,
    password
  })
  const {
    VITE_SERVER_ADDRESS,
    VITE_SERVER_PORT
  } =
  import.meta.env
  const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/auth/login`

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  }
  fetch(url, options)
    .then((res) => {
      if (res.ok) return res.json()
      res.text().then((err) => {
        const {
          error
        } = JSON.parse(err)
        this.error = error
        throw new Error(error)
      })
    })
    .then((res) => {
      const token = res.token
      localStorage.setItem("token", token)
      localStorage.setItem("role", res.role)
      localStorage.setItem("email", res.email)
      localStorage.setItem("id", res.id)
      router.push("/home")
    })
    .catch((err) => {
      console.error(err)
    })
}

</script>

<template>
<img src="../../Logos/icon-left-font transparent.png" class="img-fluid mx-auto d-block" alt="Responsive image">

<main class="form-signin mx-auto p-2 shadow p-3 mb-5 bg-white rounded">
  <form>
    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="email"
        required>
      <label for="floatingInput">Email</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password"
        required>
      <label for="floatingPassword">Mot de passe</label>
    </div>
    <div v-if="!isloginMode" class="form-floating">
      <input type="password" class="form-control rounded" id="confirmPassword" placeholder="Password"
        v-model="confirmPassword" required>
      <label for="confirmPassword">Confirmer le mot de passe</label>
    </div>
    <span v-if="error" class="error-msg">{{error}}</span>

    <button v-if="isloginMode" class="w-100 btn btn-lg btn-warning my-3" type="submit"
      @click.prevent="() => loginUser(this.email, this.password, this.$router)">
      Se connecter</button>
    <button v-if="!isloginMode" class="w-100 btn btn-lg btn-warning my-3" type="submit"
      @click.prevent="signUp(this.email, this.password, this.confirmPassword, this.$router)">
      Créer un compte</button>
    <div class="dropdown-divider bg-dark"></div>
    <p class="mb-1 mt-2" @click.prevent="signUpMode"> <a
        href="">{{this.isloginMode? "Vous n'avez pas encore de compte?":"Retour à l'écran de connexion"}}</a></p>
  </form>
</main>

</template>

<style scoped>

html,
body {
  height: 100%;
}

.dropdown-divider{
height:1px;
}

p{
font-size: 15px;
text-align:center
}

body {
  align-items: center;
  padding-bottom: 40px;
  background-color: #fff;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  margin-top: 20px;
  background-color: white;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

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
      
.img-fluid{

  margin-top:180px;
  max-width:55%
}

.error-msg{
  color: red

}
.form-control{
  background-color: rgb(232, 240, 254);
}

</style>