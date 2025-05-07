<script lang="ts" setup>
import { ref, watch } from 'vue';


const props = defineProps<{
  id: string;
  titre: string;
  done?: boolean;
  edited?: boolean;
}>();


const emit = defineEmits<{
  (e: 'supprimer', id: string): void;
  (e: 'modifier', id: string): void;
  (e: 'actualiser', payload: { id: string; titre: string }): void;
  (e: 'annuler', id:string): void;
  (e: 'inverser-done', id: string): void;
}>();


const ancienTitre = ref<string>(props.titre);


watch(() => props.edited, (nouvelleValeur) => {
  if (nouvelleValeur) ancienTitre.value = props.titre;
});


function actualiser(id: string): void {
  emit('actualiser', { id, titre: ancienTitre.value });
}
</script>

<template>
    <div class="tache hover:bg-[#F6F6F6]  hover:cursor-pointer  hover:text-[#000000] w-[752px] min-h-[72px] flex  flex-row items-center  font-normal text-xl leading-[100%] text-[#939292]  border-b-[1px] border-solid border-[#EFEFEF] ">

        <span class="radio-custom w-[24px] h-[24px] inline-block">
         <svg v-if="done"  class="checked" @click="$emit('inverser-done', id)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#939292"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>           
         <svg  v-else   class="unchecked"  @click="$emit('inverser-done', id)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#939292"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>             
        </span>
        <p  v-if="!edited"  :class="{done:done }" class="px-[10px] m-0 "> {{ titre }}</p>
       <input v-else type="text" v-model="ancienTitre" class=" focus:bg-[#FFFFFF] input-edition w-[670px] min-h-[72px] border-none font-normal text-xl focus:border-none focus:outline-none hover:bg-[#F6F6F6]" />

       <div class="actions flex gap-[8px] ml-auto">
         <template  v-if="!edited">
             <svg class= "edit"  v-if="!done" @click="$emit('modifier', id)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
             <svg  class= "supp"  @click="$emit('supprimer', id)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
         </template>
         <template v-if="edited">
             <svg  class="valider" @click=actualiser(id) xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
            <svg class="annuler" @click="$emit('annuler', id)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
         </template >

        </div>  
 </div>  
</template>

<style>
 .tache:hover{
   
   background-color: #F6F6F6;
   color: #000000;
   cursor: pointer;

    .unchecked path,
    .checked path {
      fill: #000000; 
}

.supp, 
.edit{
   display: block;
}
}

.supp, 
.edit{
   display: none;
}

.done {
    text-decoration: line-through;   
  }

</style>