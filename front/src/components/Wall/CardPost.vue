<script>
import Comment from "./Comment.vue"
export default {
    name: "CardPost",
    components: { Comment },
    data(){
      return{
        currentComment: null,
        loggedUser: null
      }
    },
    props: ["id", "email", "content", "url", "comments", "currentUser", "like"],
    methods:{
      addComment(e){
        const {
            VITE_SERVER_ADDRESS,
            VITE_SERVER_PORT
        } = import.meta.env
        const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

        const options = {
            method: "POST",
            headers: {
            "Accept" : "application/json",    
            "Content-type" : "application/json", 
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
              comment: this.currentComment
            })
            
            
        }

        console.log("currentComment:", this.currentComment)
        console.log(this.$props.id)

        fetch(url + "/" + this.$props.id, options)
        .then((res) => {
            if (res.status === 200){
            return res.json()
            } else {
            throw new Error("Echec dans l'exécution de la requête")
            }      
        })

        .then((res) => {
            console.log("res:", res)
            this.$router.go()
        })
        .catch((err) => console.log("err:", err))

      },

      deletePost(e) {
        const {
            VITE_SERVER_ADDRESS,
            VITE_SERVER_PORT
        } = import.meta.env
        const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

        const options = {
            method: "DELETE",
            headers: {
            "Accept" : "application/json",    
            "Content-type" : "application/json", 
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
            },
        }
        console.log("id of the post:", this.$props.id)
        
        fetch(url + "/" + this.$props.id, options)
        .then((res) => {
            if (res.status === 200){
            return res.json()
            } else {
            throw new Error("Echec de la suppression du post")
            }      
        })

        .then((res) => {
            console.log("res:", res)
            this.$router.go()
        })
        .catch((err) => console.log("err:", err))
      },
     
      getDataToUpdate(e){
        const data = [this.$props.id, this.$props.email]
        console.log(data)
      },
      

    clickToUpdatePost(e){
          const {
            VITE_SERVER_ADDRESS,
            VITE_SERVER_PORT
        } = import.meta.env
        const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

        const formData = new FormData()

        formData.append("content", this.content)
        formData.append("image", this.selectedImage)

        const options = {
            method: "PUT",
            headers: {
            "Accept" : "application/json",    
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
            },
            body:formData
            
        }

        console.log("id of the post:", this.$props.id)
        console.log("email of the post:", this.$props.email)
        console.log("content of the post:", this.$props.content)
        console.log("url of the post:", this.$props.url)
        fetch(url + "/" + this.$props.id, options)
        .then((res) => {
            if (res.status === 200){
            return res.json()
            } else {
            throw new Error("La modification du post a échoué")
            }      
        })

        .then((res) => {
            console.log("res:", res)
            this.$router.go()
        })
        .catch((err) => console.log("err:", err))
        },

    addLike(e){
      console.log(this.$props.id)

      const {
            VITE_SERVER_ADDRESS,
            VITE_SERVER_PORT
        } = import.meta.env
        const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

      const options = {
        method: "POST",
        headers: {
        "Accept" : "application/json",    
        "Content-type" : "application/json", 
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
        },
      }

      fetch(url + "/" + this.$props.id, options)
        .then((res) => {
            if (res.status === 200){
            return res.json()
            } else {
            throw new Error("La modification du post a échoué")
            }      
        })

        .then((res) => {
            console.log("res:", res)
            this.$router.go()
        })
        .catch((err) => console.log("err:", err))
        

    }

    }
  }

</script>

<template>
<div class="card mb-4 mt-4 m-auto shadow">
    <div class="card-header">
      <span>{{ email }}</span>
      <i class="bi bi-hand-thumbs-up" @click="addLike"></i>
      <i class="bi bi-hand-thumbs-up-fill"></i>
      
        <i v-if="currentUser===email" class="bi bi-pencil-square me-5" data-bs-toggle="modal" data-bs-target="#exampleModal" @click.prevent="getDataToUpdate"></i>
      
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier votre post{{id}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container-sm border-bottom border-dark pb-3 mt-3">
    <div class="form-floating">
      <input class="form-control" v-model="content" placeholder="Laissez un commentaire" id="floatingTextarea2" style="height: 100px">

      <label for="floatingTextarea2">Ecrivez quelque chose...</label>
    </div>

    <div class="d-flex">
      <label for="file-input" class="btn btn-secondary">Ajouter une image</label>
      <span v-if="selectedImage">{{selectedImage.name}}</span>
      <input id="file-input" type="file" @change="updateImage"/>
      <button type="button" class="btn btn-warning ms-auto" @click="clickToUpdatePost" >Modifier</button>
    </div>
  </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Annuler</button>
      </div>
    </div>
  </div>
</div>
        <i v-if="currentUser===email" class="bi bi-trash" @click="deletePost"></i>
    
    </div>
  <img v-if="url" class="card-img-top rounded-0" :src="url" alt="l'image du post">
  <div class="card-body">
    <p class="card-text">{{ content }}</p>
      
    <div v-for="comment in comments">
    <Comment :email="comment.user.email" :content="comment.content"></Comment>
    </div>
    <div class="d-flex">
      <div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Ajouter un commentaire" aria-label="Ajouter un commentaire" aria-describedby="basic-addon2" v-model="currentComment">
  <div class="input-group-append">
    <button class="btn btn-warning rounded-right" type="button" @click="addComment">Commenter</button>
  </div>
</div>
    
    </div>


  </div>
</div>

</template>

<style scoped>


.card{

    max-width: 40rem;
}

.btn-warning{
  border-radius: 0px 5px 5px 0px;
}

.bi-trash{
  margin-left: auto;
}

.bi-pencil-square{
  margin-left: auto;
}

.card-header{
  display: flex;
  align-items: center;
  gap:1rem
}
.bi-trash:hover, .bi-pencil-square:hover, .bi-hand-thumbs-up:hover {
  cursor: pointer;
  color: #FD2D01;
  transform: scale(1.1);
}

.bi-hand-thumbs-up-fill{
  color: #FD2D01;
}

.bi-trash::before, .bi-pencil-square::before {
  font-size: 15px;
}

.card-img-top{
 max-height:17rem;
 object-fit: cover;
}

.input{
  padding-left: 15px;
}

</style>