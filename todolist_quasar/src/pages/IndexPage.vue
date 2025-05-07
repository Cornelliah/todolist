<script lang="ts" setup>
import { ref,onMounted} from 'vue'
import FormTodo from '../components/FormTodo.vue'
import CarteComponent from '../components/CarteComponent.vue'
import TacheComponent from '../components/TacheComponent.vue'

const accomplir= ref<string>('Tâches à accomplir')
const effectuer= ref<string>('Tâches effectuées')
const fontSize = ref<number>(20)


interface Tache {
  id: string;
  titre: string;
  done: boolean;
  edited: boolean;
}

const todos = ref<Tache[]>([])

async function ajouterTache(nouvelleTache: string){
  
  if (nouvelleTache && nouvelleTache.trim() !== "") {
    try {
      console.log('Voici la tache',{
          titre: nouvelleTache,
          done: false,
          edited: false
        });
        const response = await fetch(`${process.env.BASE_URL!}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titre: nouvelleTache,
          done: false,
          edited: false
        })
      })
      if (!response.ok) throw new Error('Erreur lors de l\'ajout')
      const data = await response.json()
   
      todos.value.push(data)
    } catch (error) {
      console.error('Erreur lors de l\'ajout', error)
    }
  }
}

async function supprimerTache(id:string) {
  try {
    const response = await fetch(`${process.env.BASE_URL!}/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Erreur de suppression')
    todos.value = todos.value.filter(t => t.id !== id ) 
  } catch (error) {
    console.error('Erreur de suppression', error)
  }
}
  function modifierTache(id:string): void {
    const tache = todos.value.find(t => t.id === id)
    if (tache) tache.edited = true
  }

  function annulerEdition(id:string): void {
    const tache = todos.value.find(t => t.id === id)
    if (tache) tache.edited = false
  }

  async function actualiserTache(payload:{ id:string, titre:string })
 {
  try {
    const tache = todos.value.find(t => t.id === payload.id)

    const response = await fetch(`${process.env.BASE_URL!}/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        ...tache,
        titre: payload.titre,
        edited:false
  
      })
    })
    if (!response.ok) throw new Error('Erreur de mise à jour') 
      if (tache){
        tache.edited = false; 
        tache.titre = payload.titre;
      } 
    
   
    
  } catch (error) {
    console.error('Erreur de mise à jour', error)
  }
}

async function inverserDone(id:string) {
  const tache = todos.value.find(t => t.id === id)
  if (tache) {
    try {
      const response = await fetch(`${process.env.BASE_URL!}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...tache,
          done: !tache.done
        })
      })
      if (!response.ok) throw new Error('Erreur lors de l\'inversion BD')
      else {
        tache.done = !tache.done }
    
      
    } catch (error) {
      console.error('Erreur lors de l\'inversion', error)
    }
  }
}

//Stockage 
onMounted(async () => {
  try {
    const response = await fetch(`${process.env.BASE_URL!}`)
      const taches = await response.json();
     todos.value = Array.isArray(taches) ? taches : []
  } catch (error) {
    console.error('Erreur de chargement des tâches', error)
  }
})


</script>


<template >

<div class="container ">
           
    <div>
       <h1 class="text-center mb-[50px]  leading-[100%] font-medium text-[40px] mt-[60px]">Todo List</h1>
    </div>
    <div id="cartes" class=" flex flex-row gap-[48px]">
          <!-- insertion  des cartes -->
          
          <CarteComponent :description="accomplir" :count="todos.filter(t => !t.done).length"/>  
          <CarteComponent :description="effectuer" :count="todos.filter(t => t.done).length" />  
    </div>

         <!-- insertion du formulaire -->
           <FormTodo  @ajouter-tache="ajouterTache" />          
   
    <hr class="mb-[40px] text-[#EFEFEF]">
    <div v-if="todos.length==0" :style="{ 'font-size': fontSize + 'px'}">
            Vous n'avez pas de tâche 
          </div>
     <div id="liste"  v-for="todo in todos" :key="todo.id">
          <!-- insertion des tâches-->
        
          <TacheComponent  :id="todo.id"  :titre="todo.titre "  :done="todo.done" :edited="todo.edited"  @supprimer="supprimerTache"   @modifier="modifierTache"  @annuler="annulerEdition"   @actualiser="actualiserTache"     @inverser-done="inverserDone"/>

     </div>
</div>

</template>

