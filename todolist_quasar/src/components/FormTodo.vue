<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits<{
  (e: 'ajouter-tache', tache: string): void;
}>();


const ajout = ref<HTMLInputElement | null>(null);

function ajouterTache(e: MouseEvent) {
  
  e.preventDefault();

  if (!ajout.value || !ajout.value.value.trim()) {
    alert("Veuillez renseigner votre tâche");
    return;
  }

  emit('ajouter-tache', ajout.value.value);
  (<HTMLFormElement | null>document.getElementById("form"))?.reset();
}

function onInput() {
  const input = document.getElementById('ajout') as HTMLInputElement | null;
  const closeSvg = document.querySelector('.form_svg');
  const btn = (<HTMLButtonElement | null>document.getElementById("btn"));

  if (!(input instanceof HTMLInputElement) || !(closeSvg instanceof HTMLElement) || !(btn instanceof HTMLButtonElement)) return;

  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      closeSvg.style.display = 'block';
      btn.disabled = false;
    } else {
      closeSvg.style.display = 'none';
      btn.disabled = true;
    }
  });

  closeSvg.addEventListener('click', () => {
    input.value = '';
    closeSvg.style.display = 'none';
    input.focus();
  });
}

onMounted(() => {
  onInput();
});
</script>

<template>

        <form method="post" id="form" class="  w-[752px] h-[56px] flex items-center  bg-[#F7F7F7] mt-[30px] mb-[30px]" >
            <svg class="form_svg ml-[8px] cursor-pointer hidden" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            <input type="text" name="ajout" ref="ajout" class="ajout focus:border-none focus:outline-none  w-[553px] h-[30px] bg-[#F7F7F7] p-[8px] border-none m-[5px] font-normal text-[20px]"  id="ajout" placeholder="Ajouter une nouvelle tâche"  @input="onInput"  >
            <button class="btn h-[37px] w-[123px] justify-center flex items-center gap-[8px] bg-[#FFFFFF] active:shadow-[0_1px_1px_1px_#939292] active:translate-y-[2px] hover:scale-[1.05] hover:cursor-pointer" id="btn" type="submit" @click="ajouterTache" > 
                <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                AJOUTER</button>     
          </form>       
   
</template>

