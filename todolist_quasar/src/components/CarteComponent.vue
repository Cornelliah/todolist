
<template>
   <div  class="carte flex flex-col  h-[113px] w-[352px] rounded-3xl overflow-hidden text-ellipsis text-center justify-center pt-[8px]  pr-[8px] pb-[12px] pl-[8px] border border-solid border-[#EFEFEF]  shadow-[0_4px_8px_0_rgba(0,0,0,0.10)]">
            <p class="number font-normal text-5xl m-[0px] overflow-hidden whitespace-nowrap">{{ count }}</p>
            <p class=" m-[0px] overflow-hidden whitespace-nowrap">{{ description }} </p>
        </div>    
</template>

<script  lang="ts" setup>

defineProps({
 description: {
    type: String,
    required: true,
  },
 count: {
    type: Number   
  },
})
</script>