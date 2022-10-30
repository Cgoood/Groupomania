<script>

import Comment from "./Comment.vue"
export default {
  name: "CardPost",
  components: {
    Comment
  },
  data() {
    return {
      currentComment: null,
      loggedUser: null,
      selectedNewImage: null,
      like: false,
      userLiked:false
    }
  },
  props: ["id", "email", "content", "url", "comments", "currentUser", "likes", "liked", "isAdmin"],
  methods: {

    addComment(e) {
      const {
        VITE_SERVER_ADDRESS,
        VITE_SERVER_PORT
      } =
      import.meta.env
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

      const options = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          comment: this.currentComment
        })
      }

      fetch(url + "/" + this.$props.id, options)
        .then((res) => {
          if (res.status === 200) {
            return res.json()
          } else {
            throw new Error("Echec dans l'exécution de la requête")
          }
        })
        .then((res) => {
          this.$router.go()
        })
        .catch((err) => console.log("err:", err))
    },

    deletePost(e) {
      const {
        VITE_SERVER_ADDRESS,
        VITE_SERVER_PORT
      } =
      import.meta.env
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

      const options = {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      }

      const roleLS = localStorage.getItem("role")
      const emailLS = localStorage.getItem("email")
      if (roleLS == "admin" || emailLS == this.$props.email) {
        fetch(url + "/" + this.$props.id, options)
          .then((res) => {
            if (res.status === 200) {
              return res.json()
            } else {
              throw new Error("Echec de la suppression du post")
            }
          })
          .then((res) => {
            this.$router.go()
          })
          .catch((err) => console.log("err:", err))
      } else {
        console.error("Action non autorisée")
      }
    },

    getDataToUpdate(e) {
      const data = {
        id: this.$props.id,
        email: this.$props.email
      }
      localStorage.setItem("dataToUpdate", JSON.stringify(data))
      
    },

    clickImageToUpdate(e) {
      this.selectedNewImage = e.target.files[0]
    },

    clickToUpdatePost() {
      const {
        VITE_SERVER_ADDRESS,
        VITE_SERVER_PORT
      } =
      import.meta.env
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`
      const formData = new FormData()
      formData.append("content", this.content)
      formData.append("image", this.selectedNewImage)

      const options = {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      }
      const dataToUpdate = JSON.parse(localStorage.getItem("dataToUpdate"))
      const roleLS = localStorage.getItem("role")
      const emailLS = localStorage.getItem("email")
      if (roleLS == "admin" || emailLS == this.$props.email) {
        fetch(url + "/" + dataToUpdate.id, options)
          .then((res) => {
            if (res.status === 200) {
              return res.json()
            } else {
              throw new Error("La modification du post a échoué")
            }
          })
          .then((res) => {
            this.$router.go()
          })
          .catch((err) => console.log("err:", err))
      } else {
        console.error("Action non autorisée")
      }
    },

    addLike() {
      this.like = 1
      const {
        VITE_SERVER_ADDRESS,
        VITE_SERVER_PORT
      } =
      import.meta.env
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

      const options = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          like: this.like
        })
      }

      fetch(url + "/" + this.$props.id + "/like", options)
        .then((res) => {
          if (res.status === 201) {
            return res.json()
          } else {
            throw new Error("Like échoué")
          }
        })
        .then((res) => {
          this.userLiked = res.like
          this.$router.go()
          })
        .catch((err) => console.log("err:", err))
      },

    checkLike(postId){
      const likedPost = JSON.parse(localStorage.getItem("likedPosts"))
      const findLikedPost = !!likedPost.find(x => x.postId === postId )
      return findLikedPost
    } 
  }  
}

</script>

<template>
 <div class="card mb-4 mt-4 m-auto shadow">
   <div class="card-header">
     <span>{{ email }}</span>
     <div v-if="!checkLike(this.$props.id) && this.userLiked == false" class="d-flex likeIcon ms-5">
       <button  class="buttonLike" @click="addLike()"><i class="bi bi-heart"></i></button>
       <div> {{likes}} </div>
      </div>
      <div v-else class="d-flex likeIcon ms-5">
       <button class="buttonLike" @click="addLike()"><i class="bi bi-heart-fill"></i></button>
       <div> {{likes}} </div>
     </div>
     <div v-if="this.isAdmin==true || currentUser===email" class="actionIcons d-flex ms-auto">
       <i class="bi bi-pencil-square me-5" data-bs-toggle="modal" data-bs-target="#exampleModal"
         @click="getDataToUpdate"></i>
       <i class="bi bi-trash" @click="deletePost"></i>
     </div>
     <!-- Modal -->
     <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog modal-dialog-centered">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title" id="exampleModalLabel">Modifier votre post</h5>
             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
           <div class="modal-body">
             <div class="container-sm border-bottom border-dark pb-3 mt-3">
               <div class="form-floating">
                 <input class="form-control" v-model="content" placeholder="Laissez un commentaire"
                   id="floatingTextarea2" style="height: 100px">
                 <label for="floatingTextarea2">Ecrivez quelque chose...</label>
               </div>
               <div class="d-flex">
                 <label for="file-input-updated" class="btn btn-secondary">Ajouter une image</label>
                 <span v-if="selectedNewImage">{{selectedNewImage.name}}</span>
                 <input id="file-input-updated" type="file" @change="clickImageToUpdate" />
                 <button type="button" class="btn btn-warning ms-auto" @click="clickToUpdatePost">Modifier</button>
               </div>
             </div>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Annuler</button>
           </div>
         </div>
       </div>
     </div>
   </div>
   <img v-if="url" class="card-img-top rounded-0" :src="url" alt="l'image du post">
   <div class="card-body">
     <p class="card-text">{{ content }}</p>
     <div v-for="comment in comments">
       <Comment :email="comment.user.email" :content="comment.content"></Comment>
     </div>
     <div class="d-flex">
       <div class="input-group mb-3">
         <input type="text" class="form-control" placeholder="Ajouter un commentaire"
           aria-label="Ajouter un commentaire" aria-describedby="basic-addon2" v-model="currentComment">
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

.buttonLike{
  border: none;
  background-color: transparent;
}

.btn-warning{
  border-radius: 0px 5px 5px 0px;
}

.bi-trash{
  margin-left: -2rem;
}

.card-header{
  display: flex;
  align-items: center;
  gap:1rem
}

.bi-trash:hover, .bi-pencil-square:hover{
  cursor: pointer;
  color: #FD2D01;
  transform: scale(1.1);
}

.bi-heart-fill{
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