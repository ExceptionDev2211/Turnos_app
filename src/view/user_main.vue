<template>
    <div class="cont">
        <Popup :visible="showPopup" :onClose="closePopup">
            <div class="select">
                <p>{{ selectedStation.dependencyName }}</p>
                <p>Turno actual: {{ selectedStation.currentShift }}</p>
                <p>Turnos disponibles: {{ selectedStation.availableShifts }}</p>
                <button @click="fetchAddTurn">Seleccionar</button>

            </div>
        </Popup>
        <div class="main">
            <div class="header">
                <p class="welcome">Bienvenido: {{ user_name }} </p>
                <div class="noti">

                </div>
                <img class="logo_img" src="../assets/images/logo.png" alt="">
            </div>
            <div class="information">
                <div class="interactive_div">
                    <p>Selecciona el módulo en el cual quieres ser atendido</p>
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
                                <tr v-for="station in stations" :key="station.id" @click="show(station)">
                                    <td>{{ station.dependencyName }}</td>
                                    <td>{{ station.personInCharge }}</td>
                                    <td>{{ station.shifts }}</td>
                                    <td>{{ station.assignedShifts }}</td>
                                    <td>{{ station.currentShift }}</td>
                                    <td>{{ station.availableShifts }}</td>
                                </tr>


                            </tbody>

                        </table>

                    </div>


                </div>
            </div>

        </div>
    </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, } from 'vue-router';
import Popup from '../components/popup.vue';
import Cookies from 'js-cookie';

const user_name = ref(Cookies.get('name'));
const selectedStation = ref('')
const openPopup = () => {
    showPopup.value = true;
};
const stations = ref([])



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
        router.push('/user_waiting');
        if (response.ok) {
            const data = await response.json();
            
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

const fetchStations = async () => {
    try {
        const token = Cookies.get('token');

        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await fetch('http://localhost:8080/dependency', config);
        if (response.ok) {
            const data = await response.json();
            stations.value = data;
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
const fetchAddTurn = async () => {
    try {
        const token = Cookies.get('token');
        
        const body = JSON.stringify({
            userId: Cookies.get('id'),
            dependency: selectedStation.value.dependencyName
        
        });

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body 
        };

        const response = await fetch('http://localhost:8080/shift/create', config);
        if (response.ok) {
            const data = await response.json();
            alert("Turno asignado correctamente");
            router.push('/user_waiting');
        } else {
            console.error('Error en la respuesta:', response.statusText);
            if (response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        }
    } catch (error) {
        console.error('Error al añadir el turno:', error);
    }
};





const closePopup = () => {
    showPopup.value = false;
};
const router = useRouter();
const showPopup = ref(false);
const show = (v) => {
    showPopup.value = true;
    selectedStation.value = v;
};

const goLogin = () => {
    router.push('/');
}

onMounted(() => {
    fetchUser();
    fetchStations();

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

.interactive_div p {
    margin-right: auto;
    margin-left: 30px;
}

.table_info {

    height: 80%;
    width: 97%;
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

.select {
    display: flex;
    flex-direction: column;
}

.select p {
    color: white;
    font-size: 20px;

}

.select button {
    height: 40px;
    background-color: #001c2e;
    color: white;
    font-size: 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.select button:hover {
    transform: scale(1.05);

}
</style>