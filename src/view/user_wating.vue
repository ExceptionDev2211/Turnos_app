<template>
    <div class="cont">
        <Popup :visible="showPopup" :onClose="closePopup">
            <div class="select">
                <p>Tienes un turno pendiente en el modulo: {{user_info.dependency}}</p>
                <p>Turno actual: {{dependency.currentShift}}</p>
                <p>Tu turno: {{user_info.shift}}</p>
                <p>Te atenderá: {{dependency.personInCharge}}</p>

            </div>
        </Popup>
        <Popup2 :visible="showPopup2" :onClose="closePopup2">
            <div class="select">
                <p>¡Ya es tu turno! , por favor acercate al modulo: {{user_info.dependency}} </p>
                <button @click="fetchDeleteShift" class="btn_noti_turn">Aceptar</button>

            </div>
        </Popup2>
        <div class="main">
            <div class="header">
                <p class="welcome">Bienvenido: {{ user_name }}</p>
                <div class="noti">
                    <button class="btn_noti" v-show="showNotificationButton" @click="openPopup">
                    <img class="logo_img" src="../assets/images/noti.png" alt="">
                </button>
                </div>
                <div class="exit">
                    <button @click="deleteAllCookies"> <img src="../assets/images/salir.png" alt=""></button>
                </div>
                <img class="logo_img" src="../assets/images/logo.png" alt="">
            </div>
            <div class="information">
                <div class="interactive_div">
                    <div class="waitingImg">
                        <img src="../assets/images/espera.png" alt="">
                    </div>
                    <div class="waitingInfo">
                        <div class="waitingContain">
                            <p>Módulo: {{ user_info.dependency }}</p>
                            <p>Turno actual: {{ dependency.currentShift }} </p>
                            <p>Tu turno: {{ user_info.shift }} </p>
                            <p>Seras atendido por:{{ dependency.personInCharge }} </p>
                            <button @click="fetchDeleteShift(userId)">Cancelar turno</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>



<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import Popup from '../components/popup.vue';
import Popup2 from '../components/popup.vue';
import Cookies from 'js-cookie';

const userId = ref(Cookies.get('id'))
const user_name = ref(Cookies.get('name'));
const openPopup = () => {
    showPopup.value = true;
};

const closePopup = () => {
    showPopup.value = false;
};
const router = useRouter();
const showPopup = ref(false);
const showPopup2 = ref(false);
const openPopup2 = () => {
    showPopup2.value = true;
};
const closePopup2 = () => {
    showPopup2.value = false;
};
const fetchDeleteShift = async (userId) => {
    try {
        const token = Cookies.get('token');

        const config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await fetch(`http://localhost:8080/shift/${userId}`, config);
        if (response.ok) {
            const data = await response.json();
            alert('Turno cancelado correctamente')
            router.push('/user_main');
        } else {
            console.error('Error en la respuesta:', response.statusText);
            router.push('/user_main');
            if (response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        }
    } catch (error) {
        console.error('Error al eliminar el turno:', error);
        router.push('/user_main');
    }
};

const user_info = ref('')
const fetchUser = async () => {
    try {
        const token = Cookies.get('token');

        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await fetch(`http://localhost:8080/shift/${Cookies.get('id')}`, config);

        if (response.ok) {
            const data = await response.json();
            user_info.value = data;
        } else {
            console.error('Error en la respuesta:', response.statusText);
            if (response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        }
    } catch (error) {
        console.error('Error al obtener estaciones:', error);

    }
};
const deleteAllCookies = () => {
    const allCookies = Cookies.get();
    for (let cookie in allCookies) {
        Cookies.remove(cookie);
    }
    router.push('/');
};
const showNotificationButton = ref(false);
const dependency = ref('')
const fetchDependency = async () => {
    try {
        const token = Cookies.get('token');

        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await fetch(`http://localhost:8080/dependency/${user_info.value.dependency}`, config);

        if (response.ok) {
            const data = await response.json();
            dependency.value = data;

            const isClose = (actual_turn, user_turn, range = 10) => {
                return Math.abs(actual_turn - user_turn) <= range;
            }
            if (isClose(dependency.value.currentShift, user_info.value.shift)) {
                showNotificationButton.value = true;
            }else{
                showNotificationButton.value = false;
            }
            if(dependency.value.currentShift == user_info.value.shift ){
                openPopup2();
            }
        } else {
            console.error('Error en la respuesta:', response.statusText);
            if (response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        }
    } catch (error) {
        console.error('Error al obtener estaciones:', error);

    }
};
const startFetching = () => {
    intervalId.value = setInterval(fetchDependency, 3000);
};
const intervalId = ref(null);
onBeforeUnmount(() => {
    clearInterval(intervalId.value);
});
onMounted(() => {
    fetchUser();
    fetchDependency();
    startFetching();

});


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
    display: flex;
    width: 10%;
    height: 50%;
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

.waitingImg {
    display: flex;
    height: 90%;
    width: 50%;
    justify-content: center;
    align-items: center;

}

.waitingImg img {
    height: 105%;


}
.exit{
    margin-left: 10px;
    display: flex;
    height: 80px;
    width: 80px;
    
}
.exit button{
    display: flex;
    width: 70px;
    align-items: center;
    justify-content: center;
    background:none;
    border: none;
    cursor: pointer;
}
.exit button:hover{
    transform: scale(1.05);
}

.exit button img{
    height: 100%;
    filter: invert();

}

.waitingInfo {

    height: 90%;
    width: 50%;
}

.waitingContain {
    background-color: #DCE0E6;
    height: 90%;
    width: 85%;
    margin: auto;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    gap: 5%;
}

.waitingContain p {
    font-size: 20px;

}

.waitingContain button {
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

.waitingContain button:hover {
    transform: scale(1.05);

}
.btn_noti{
    background: none;
    cursor: pointer;
    border: none;
    transform: all 0.3s ease;
    
}
.btn_noti img{
    filter: invert();
}    


.btn_noti:hover{
    transform: scale(1.1);
}
.btn_noti_turn{
    height: 40px;
    background-color: #001c2e;
    color: white;
    font-size: 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
}
.btn_noti_turn:hover{
    transform: scale(1.05);
}
.select p{
    color: white;
}
</style>