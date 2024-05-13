<template>
    <div v-if="visible" class="popup-overlay">
        <div class="popup-content" :style="{height:pheight}">
            <button class="close" @click="closePopup">X</button>
            <slot></slot>
            
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps(['visible','onClose','pheight']);
const closePopup = () => {
    props.onClose();
};
</script>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    background-color: #0755B4;
    
    width: 35%;
    box-shadow: 5px 5px 8px #001c2e,
        -5px -5px 8px #002a46;
}
.close{
    display: flex;
    margin-left: auto;
    color: white;
    background: none;
    font-size: 20px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

}
.close:hover {
    transform: scale(1.1);
}
</style>
