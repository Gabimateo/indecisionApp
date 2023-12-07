<template>
<img :src="imgRef" alt="Imagen no encontrada">
<div class="bg-darl"></div>

<div class="indecision-container">
    <span 
    class="indecision-container__title"
    >
    PREGUNTANDO!!!
</span>
    <input 
    class="indecision-container__input" 
    type="text" 
    id="questions" 
    placeholder="Hazme una pregunta"
    v-model="questionsRef"
    :vue-model="getAnswerYesOrNo()"
    >
    <p class="indecision-container__text">Recuerda terminar con un signo de interrogacion (?)</p>
    <div class="indecision-container__action-area">
        <h2 class="indecision-container__action-area__questions">{{questionsRef}}</h2>
        <h1 class="indecision-container__action-area__answers">{{answerRef}}</h1>
    </div>
</div>




</template>
<script setup>
import { provide, reactive, ref} from 'vue'

import {getYesOrNo} from '../api/yesno.api'

import IndecisionViewState from './indecision.view-state'

const state = new IndecisionViewState();
const state$$ = reactive(state)

const questionsRef = ref('')
const questionsIncludeRef = ref()
const answerRef = ref(null);
const imgRef = ref('https://image.freepik.com/vector-gratis/fondo-preguntas_23-2148159239.jpg')

async function getAnswerYesOrNo(){
    if(!questionsRef.value){
        return
    }
    questionsIncludeRef.value = questionsRef.value.includes('?')
    if(questionsIncludeRef.value === false){
        answerRef.value = null
        state$$.indesicionData.isCacheData = false
        return
    }
    if(state$$.indesicionData.isCacheData === false){
        answerRef.value = '...Pensando'
        const data = await getYesOrNo()
        state$$.indesicionData.isCacheData = true
        answerRef.value = (data.answer === 'yes') ? 'Si' : 'No';
        imgRef.value = data.image;
        return;
    }
    
}



provide('IndecisionViewState$$', state$$)

</script>
<style scope lang="scss">
img, .bg-dark{
    height: 100vh;
    left: 0px;
    max-height: 100%;
    max-width: 100%;
    position: fixed;
    top: 0px;
    width: 100vw;
}
.bg-dark{
    background-color: rgba(0,0,0,0.4);
}
.indecision-container{
    display: flex;
    position: relative;
    z-index: 99;
    flex-direction: column;

    &__title{
        background-color: rgb(98, 98, 98);
        border-radius: 20px;
        color: white;
        font-family: 'Courier New', Courier, monospace;
        font-size: 4rem;
        left: 30%;
        margin-bottom: 2rem;
        max-width: auto;
        min-width: auto;
        position: relative;
        margin-bottom: 2rem;
        font-size: 4rem;
        font-family: 'Courier New', Courier, monospace;
        color: white;
        background-color: black;
    }

    &__input{
        position: relative;
        left: 10%;
        width: 80%;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
    }
    &__input:focus{
        outline: name;
    }
    &__text{
        background-color: rgb(98, 98, 98);
        border-radius: 20px;
        color: white;
        font-size: 28px;
        margin-top:0px;
        background-color: black;
    }
    &__action-area{
        &__questions, &__answers{
            color: white;
        }
        &__questions{
            margin-top:150px ;
        }
    }
    
}
</style>