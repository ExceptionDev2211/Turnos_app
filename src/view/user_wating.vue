<template>
    <div class="cont">
        <Popup :visible="showPopup" :onClose="closePopup">
            <div class="select">
                <p>Módulo A</p>
                <p>Turno actual</p>
                <p>Turnos disponibles</p>
                <button>Solicitar turno</button>

            </div>
        </Popup>
        <div class="main">
            <div class="header">
                <p class="welcome">Bienvenido: </p>
                <div class="noti">
                    
                </div>
                <img class="logo_img" src="../assets/images/logo.png" alt="">
            </div>
            <div class="information">
                <div class="interactive_div">
                    <div class="waitingImg">
                        <img src="../assets/images/espera.png" alt="">
                    </div>
                    <div  class="waitingInfo">
                        <div class="waitingContain">
                            <p>Módulo:</p>
                            <p>Turno actual: </p>
                            <p>Tu turno: </p>
                            <p>Seras atendido por: </p>
                            <button>Cancelar turno</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>



<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Popup from '../components/Popup.vue';
const openPopup = () => {
    showPopup.value = true;
};

const closePopup = () => {
    showPopup.value = false;
};
const router = useRouter();
const showPopup = ref(false);
const goLogin = () => {
    router.push('/');
}

</script>

<style scoped>
.cont {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
}

.main {
    display: flex;
    width: 90%;
    height: 95vh;
    background-color: none;
    margin: auto;
    background-color: #0755B4;
    border-radius: 10px;
    box-shadow: 5px 5px 8px #001c2e,
        -5px -5px 8px #002a46;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
}

.header {
    display: flex;
    height: 20%;
    width: 100%;
    align-items: center;

}

.welcome {
    color: white;
    font-size: 30px;
    margin: 5%;

}

.information {
    height: 80%;
    width: 100%;
    display: flex;

    justify-content: center
}

.noti {

    width: 10%;
    height: 80%;
    margin-left: auto;
}

.logo_img {
    height: 90%;

}

.interactive_div {
    background-color: #09B4F8;
    height: 95%;
    width: 95%;
    border-radius: 10px;
    box-shadow: 5px 5px 8px #001c2e,
        -5px -5px 8px #002a46;
    display: flex;
    justify-content: center;
    align-items: center;
    
}

.waitingImg{
    display: flex;
    height: 90%;
    width: 50%;
    justify-content: center;
    align-items: center;
    
}
.waitingImg img{
    height: 105%;
    
    
}
.waitingInfo{
    
    height: 90%;
    width: 50%;
}
.waitingContain{
    background-color: #DCE0E6;
    height: 90%;
    width: 85%;
    margin: auto;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding:20px ;
    gap: 5%;
}
.waitingContain p{
    font-size: 20px;
    
}
.waitingContain button{
    height: 40px;
    width: 200px;
    border-radius: 10px;
    border: none;
    background-color: red;
    color: white;
    margin-left: auto;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s ease;

}
.waitingContain button:hover{
    transform: scale(1.05);

}
</style>