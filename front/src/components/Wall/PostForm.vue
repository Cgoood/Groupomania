<script>
export default {
    name: "PostForm",
    data() {
        return {
            content: "",
            selectedImage: null,
        }
    },

    methods: {
        clickImage(e) {
            this.selectedImage = e.target.files[0]
        },

        clickToPost() {
            const {
                VITE_SERVER_ADDRESS,
                VITE_SERVER_PORT
            } =
            import.meta.env
            const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

            const formData = new FormData()

            formData.append("content", this.content)
            formData.append("image", this.selectedImage)

            const options = {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    // "Content-type" : "multipart/form-data", 
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: formData
            }

            fetch(url, options)
                .then((res) => {
                    if (res.status === 200) {
                        return res.json()
                    } else {
                        throw new Error("Echec dans l'attribution du token")
                    }
                })
                .then((res) => {
                    this.$router.go()
                })
                .catch((err) => console.log("err:", err))
        }
    }
}
</script>

<template>
<div class="container-sm border-bottom border-dark pb-3 mt-3">
    <div class="form-floating">
        <input class="form-control" v-model="content" placeholder="Laissez un commentaire" id="floatingTextarea2"
            style="height: 100px">

        <label for="floatingTextarea2">Ecrivez quelque chose...</label>
    </div>

    <div class="d-flex">
        <label for="file-input" class="btn btn-secondary">Ajouter une image</label>
        <span v-if="selectedImage">{{selectedImage.name}}</span>
        <input id="file-input" type="file" @change="clickImage" />
        <button @click="clickToPost" type="button" class="btn btn-warning ms-auto">Envoyer</button>
    </div>
</div>
</template>

<style scoped>

div span{
    font-size: 0.8rem;
    display:grid;
    place-content: center;
    padding-left: 0.25rem;
}

</style>