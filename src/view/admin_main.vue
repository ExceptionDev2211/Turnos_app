<template>
    <div class="cont">
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
                                    <th class="tableTitle">Estacíon</th>
                                    <th class="tableTitle">Dependiente</th>
                                    <th class="tableTitle">N° Turnos</th>
                                    <th class="tableTitle">N° Turnos asignados</th>
                                    <th class="tableTitle">T. actual</th>
                                    <th class="tableTitle">N° turnos disponibles</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>A</td>
                                    <td>Juan Reyes</td>
                                    <td>150</td>
                                    <td>30</td>
                                    <td>10</td>
                                    <td>120</td>
                                </tr>
                                <tr>
                                    <td>A</td>
                                    <td>Juan Reyes</td>
                                    <td>150</td>
                                    <td>30</td>
                                    <td>10</td>
                                    <td>120</td>
                                </tr>
                                <tr>
                                    <td>A</td>
                                    <td>Juan Reyes</td>
                                    <td>150</td>
                                    <td>30</td>
                                    <td>10</td>
                                    <td>120</td>
                                </tr>
                                <tr>
                                    <td>A</td>
                                    <td>Juan Reyes</td>
                                    <td>150</td>
                                    <td>30</td>
                                    <td>10</td>
                                    <td>120</td>
                                </tr>
                                <tr>
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
                        <button class="adm_buttons">Agregar estación</button>
                        <button class="adm_buttons">Cancelar turno</button>
                        <button class="adm_buttons">Apartar turno</button>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>



<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
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
    overflow-y:auto;
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
.adm_buttons{
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
.adm_buttons:hover{
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
.table_shifts td{
    
    padding: 30px 30px;
}
.table_shifts tr{
    transition: all 0.3s ease;
}

.table_shifts tbody tr:nth-child(n+1):hover {
    transform: scale(1.04);
    cursor: pointer;
}

</style>