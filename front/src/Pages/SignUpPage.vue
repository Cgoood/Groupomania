<script>
export default {
name: "SignUpPage"
}

</script>

<template>

<img src="../../Logos/icon-left-font transparent.png" class="img-fluid mx-auto d-block" alt="Responsive image">


<main class="form-signin mx-auto p-2 shadow p-3 mb-5 bg-white rounded">
  <form>
    
    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">Email</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Mot de passe</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="confirmPassword">
      <label for="floatingPassword">Confirmer</label>
    </div>
   <button class="w-100 btn btn-lg btn-success my-3" type="submit">Créer un compte</button>
 </form>
</main>

</template>

<style scoped>

html,
body {
  height: 100%;
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



</style>