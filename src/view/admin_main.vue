<template>
    <div class="cont">
        <Popup :visible="showPopup" :onClose="closePopup">
            <div class="stationP">
                <p>Agregar módulo</p>
                <form action="" class="popformstation">
                    <label class="lbl_module" >Nombre del módulo</label>
                    <input type="text" name="names" class="in_module" v-model="names" required>
                    <label class="lbl_module">Dependiente</label>
                    <input type="text" name="lastnames" class="in_module" v-model="lastNames" required>
                    <label class="lbl_module">Numero de turnos</label>
                    <input type="number" name="email" class="in_module" v-model="mail" required>
                    <button class="addmodulebtn">Agregar</button>
                </form>
            </div>


        </Popup>
        <Popup2 :visible="showPopup2" :onClose="closePopup2">
            <div class="stationP">
                <p>Cancelar turno</p>
                <form action="" class="popformstation">
                    <label class="lbl_module" >Usuario</label>
                    <input type="text" name="names" class="in_module" v-model="names" required>                    
                    <button class="addmodulebtn">Cancelar</button>
                </form>
            </div>
        </Popup2>
        <Popup3 :visible="showPopup3" :onClose="closePopup3">
            <div class="stationP">
                <p>Apartar turno</p>
                <form action="" class="popformstation">
                    <label class="lbl_module" >Usuario</label>
                    <input type="text" name="names" class="in_module" v-model="names" required>
                    <label class="lbl_module" >Módulo</label>
                    <input type="text" name="names" class="in_module" v-model="names" required>                                        
                    <button class="addmodulebtn">Apartar</button>
                </form>
            </div>
        </Popup3>
        <Popup4 :visible="showPopup4" :onClose="closePopup4">
            <div class="stationP">
                <p>Módulo A</p>
                <div class="moduleconfigure">
                    <p>Dependiente: </p>
                    <p>N° disponibles: </p>
                    <p>N° asignados: </p>
                    <p>Turno actual</p>
                    <p>Añadir turnos: <input type="number"> <button>añadir</button></p>
                    <button class="nextbtn">Siguiente turno</button>
                </div>
            </div>
        </Popup4>
       
        
        <div class="main">
            <div class="header">
                <p class="welcome">Bienvenido: </p>
                <div class="noti">

                </div>
                <img class="logo_img" src="../assets/images/logo.png" alt="">
            </div>
            <div class="information">
                <div class="interactive_div">
                    <div class="table_info">
                        <table class="table_shifts">
                            <thead>
                                <tr>
                                    <th class="tableTitle">Módulo</th>
                                    <th class="tableTitle">Dependiente</th>
                                    <th class="tableTitle">N° Turnos</th>
                                    <th class="tableTitle">N° Turnos asignados</th>
                                    <th class="tableTitle">T. actual</th>
                                    <th class="tableTitle">N° turnos disponibles</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr @click="showPopup4 = true">
                                    <td>A</td>
                                    <td>Juan Reyes</td>
                                    <td>150</td>
                                    <td>30</td>
                                    <td>10</td>
                                    <td>120</td>
                                </tr>
                              


                            </tbody>

                        </table>

                    </div>
                    <div class="buttons">
                        <button class="adm_buttons" @click="showPopup = true">Agregar estación</button>
                        <button class="adm_buttons" @click="showPopup2 = true">Cancelar turno</button>
                        <button class="adm_buttons" @click="showPopup3 = true" >Apartar turno</button>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>



<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import Popup from '../components/popup.vue';
import Popup2 from '../components/popup.vue';
import Popup3 from '../components/popup.vue';
import Popup4 from '../components/popup.vue';
import Cookies from 'js-cookie';

const showPopup = ref(false);
const showPopup2 = ref(false);
const showPopup3 = ref(false);
const showPopup4 = ref(false);

const openPopup = () => {
    showPopup.value = true;
};

const closePopup = () => {
    showPopup.value = false;
};

const openPopup2 = () => {
    showPopup2.value = true;
};

const closePopup2 = () => {
    showPopup2.value = false;
};
const openPopup3 = () => {
    showPopup3.value = true;
};

const closePopup3 = () => {
    showPopup3.value = false;
};
const openPopup4 = () => {
    showPopup4.value = true;
};

const closePopup4 = () => {
    showPopup4.value = false;
};



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
    flex-direction: column;
}

.table_info {

    height: 70%;
    width: 95%;
    border-radius: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: #999999 #f2f2f2;

}

.buttons {
    height: 20%;
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;


}

.table_shifts {
    margin: 5px;
    height: 90%;
    width: 99%;
    text-align: center;
    border-collapse: collapse;
    border-radius: 10px;
    background-color: white;


}

.adm_buttons {
    height: 50px;
    width: 20%;
    background-color: #001c2e;
    color: white;
    border-radius: 10px;
    border: none;
    font-size: 20px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.adm_buttons:hover {
    transform: scale(1.1);
}

.table_shifts thead {
    position: sticky;
    border-radius: 10px;
    color: white;
    background-color: #001c2e;
    height: 60px;
    top: 0;
    z-index: 1;
}

.table_shifts th:first-child {
    border-top-left-radius: 10px;
}

.table_shifts th:last-child {
    border-top-right-radius: 10px;
}

.table_shifts td {

    padding: 30px 30px;
}

.table_shifts tr {
    transition: all 0.3s ease;
}

.table_shifts tbody tr:nth-child(n+1):hover {
    transform: scale(1.04);
    cursor: pointer;
}

.stationP p {
    text-align: center;
    color: white;
    font-size: 30px;

    
}
.popformstation{
    
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.lbl_module{
    color: white;
    font-size: 20px;

}
.in_module{
    border-radius: 10px;
    height: 25px;
    margin-bottom: 10px;
    border: none;
    padding: 5px;

}
.addmodulebtn{
    margin-top: 15px;
    color: white;
    height: 40px;
    cursor: pointer;
    border-radius: 10px;
    border: none;
    font-size: 20px;
    background-color: #001c2e;
    transition: all 0.3s ease;
}
.addmodulebtn:hover{
    transform: scale(1.05);
}
.moduleconfigure{
    display: flex;
    flex-direction: column;
    
}
.moduleconfigure p{
    text-align: left;
    font-size: 20px
}
.moduleconfigure p input{
    height: 40px;
    width:60px;
    margin: none;
    font-size: 20px;
}
.moduleconfigure p button{
    height: 40px;
    width: 50px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    background-color: #001c2e;
    color: white;

}
.nextbtn{
    background-color: #001c2e;
    color: white;
    font-size: 20px;
    border-radius: 10px;
    height: 45px;
    border: none;
}
button{
    cursor: pointer;
    transition: all 0.3s ease;
}
button:hover{
    transform: scale(1.05);
}


</style>