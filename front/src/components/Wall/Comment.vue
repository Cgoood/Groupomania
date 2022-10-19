<script>

export default {
    name: "Comment",

    props:{
        email: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    }
}
</script>

<template>
    <div class="d-flex flex-column comment_text p-1 mb-1">
        <p> {{ email }} </p>
        <p> {{ content }} </p>
    </div>

    
</template>

<style scoped>
.comment_text{
    background-color: var(--bs-gray-200);
    border-radius: 5px;
    width:100%;
}

.card-body > .d-flex {
    margin-bottom: 0.5rem;
}

d-flex


.d-flex p{
    margin-bottom: 0rem !important;
    padding-left: 0.75rem;
}

p{
margin-bottom: 0rem !important;
    
}


.d-flex p:nth-child(1){
    font-weight: 500;
}

    
</style>