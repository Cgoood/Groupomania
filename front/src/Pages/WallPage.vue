<script>
import CardPost from "../components/Wall/CardPost.vue"
import PostForm from "../components/Wall/PostForm.vue"

export default {

  name: "WallPage",
  components: {
    CardPost,
    PostForm
  },

  beforeCreate(){
    const token =localStorage.getItem("token")
    if (token==null) (
      this.$router.push("/login")
    )
  },

  mounted(){
    const {
        VITE_SERVER_ADDRESS,
        VITE_SERVER_PORT
      } = import.meta.env
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

      const options = {
        method: "GET",
        headers: {
          "Content-type" : "application/json", 
          "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
        
      }

    fetch(url, options)
      .then((res) => {
        if (res.status===200){
        return res.json()
        } else {
          throw new Error("Echec dans l'attribution du token")
        }      
      })

      .then((res) => {
        const { email,posts } = res
        this.posts = posts
        this.currentUser = email
      })
      .catch((err) => console.log("err:", err))
      },

  data(){
    return{
      posts: [],
      currentUser: null
    }

    
  }
}

</script>

<template>
  <div v-if="currentUser" class="container-sm">
    <div class="col-sm-12">
      <p class="text-center mt-3"> Bienvenue, {{currentUser}}</p>
    </div>
  </div>
      <PostForm v-if="currentUser"></PostForm>
      <a id="postform"></a>
    

  
  <div class="container-sm">
    <div v-for="post in posts">
    <CardPost :currentUser="currentUser" :id = "post.id" :email = "post.user.email" :content = "post.content" :url = "post.imageUrl" :comments="post.comments"></CardPost>
    </div>
  </div>  
</template>

<style>label[for="file-input"] {
  background-color: #4E5166;
}

input {
  display: none;
}

hr {
  background-color: red
}

body {

  background-color: var(--bs-gray-100) !important;
}


</style>