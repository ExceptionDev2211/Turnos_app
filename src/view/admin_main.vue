<template>
    <div class="cont">
        <Popup :visible="showPopup" :onClose="closePopup">
            <div class="stationP">
                <p>Agregar módulo</p>
                <form action="" class="popformstation">
                    <label class="lbl_module" >Nombre del módulo</label>
                    <input type="text" name="names" class="in_module" v-model="module_name" required>
                    <label class="lbl_module">Dependiente</label>
                    <input type="text" name="lastnames" class="in_module" v-model="dependency" required>
                    <label class="lbl_module">Numero de turnos</label>
                    <input type="number" name="email" class="in_module" v-model="turns_number" required>
                    <button class="addmodulebtn" @click="addModule">Agregar</button>
                </form>
            </div>


        </Popup>
        <Popup2 :visible="showPopup2" :onClose="closePopup2">
            <div class="stationP">
                <p>Cancelar turno</p>
                <form action="" class="popformstation">
                    <label class="lbl_module" >Usuario</label>
                    
                    <select class="in_module" v-model="user_cancel"  >
                        <option v-for="user in users" :value="user.id">
                            {{ user.firstname }} {{ user.lastname }}
                        </option>
                    </select>          
                    <button class="addmodulebtn" @click="cancelTurn" >Cancelar</button>
                </form>
            </div>
        </Popup2>
        <Popup3 :visible="showPopup3" :onClose="closePopup3">
            <div class="stationP">
                <p>Apartar turno</p>
                <form action="" class="popformstation">
                    <label class="lbl_module" >Usuario</label>
                    <select class="in_module" v-model="user_apart"  >
                        <option v-for="user in users" :value="user.id">
                            {{ user.firstname }} {{ user.lastname }}
                        </option>
                    </select>          
                    
                    <label class="lbl_module" >Módulo</label>
                    <select class="in_module" v-model="user_module"  >
                        <option v-for="station in stations" :key="station.name">
                            {{ station.name }} 
                        </option>
                    </select>      
                    <button class="addmodulebtn" @click="fetchApartTurn">Apartar</button>
                </form>
            </div>
        </Popup3>
        <Popup4 :visible="showPopup4" :onClose="closePopup4">
            <div class="stationP">
                <p>Módulo A {{selectedStation.dependencyName}}</p>
                <div class="moduleconfigure">
                    <p>Dependiente: {{selectedStation.personInCharge}}</p>
                    <p>N° disponibles: {{selectedStation.shifts}} </p>
                    <p>N° asignados: {{selectedStation.assignedShifts}}</p>
                    <p>Turno actual: {{selectedStation.currentShift}}</p>
                    <p>Añadir turnos: <input type="number" v-model="add_turns_number"> <button @click="addTurns()">añadir</button></p>
                    <button class="nextbtn" @click="nextTurn()">Siguiente turno</button>
                </div>
            </div>
        </Popup4>
       
        
        <div class="main">
            <div class="header">
                <p class="welcome">Bienvenido: {{ user_name }} </p>
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
                                <tr v-for="station in stations" :key="station.id" @click="openPopup4(station)">
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import Popup from '../components/popup.vue';
import Popup2 from '../components/popup.vue';
import Popup3 from '../components/popup.vue';
import Popup4 from '../components/popup.vue';
import Cookies from 'js-cookie';
const selectedStation = ref('')
const showPopup = ref(false);
const showPopup2 = ref(false);
const showPopup3 = ref(false);
const showPopup4 = ref(false);
const user_name = ref(Cookies.get('name'));
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
const openPopup4 = (v) => {
    showPopup4.value = true;
    selectedStation.value = v;
};

const closePopup4 = () => {
    showPopup4.value = false;
};
const stations = ref([])
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
const users = ref([])
const fetchUsers = async () => {
    try {
        const token = Cookies.get('token');

        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await fetch('http://localhost:8080/search', config);
        if (response.ok) {
            const data = await response.json();
            users.value = data;
        } else {
            console.error('Error en la respuesta:', response.statusText);
            if (response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                
            }
        }
    } catch (error) {
        console.error('Error al obtener usuarios:', error);

    }
};

const user_apart = ref('');
const user_module = ref('');
const fetchApartTurn = async () => {
    try {
        const token = Cookies.get('token');
        
        const body = JSON.stringify({
            userId: user_apart.value.id,
            dependency: user_module.value.name
        
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
            closePopup3()
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

const user_cancel = ref('')
const cancelTurn = async () => {
    try {
        const token = Cookies.get('token');
        

        const config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            
        };

        const response = await fetch(`http://localhost:8080/dependency/${user_cancel.value.id}`, config);
        if (response.ok) {
            const data = await response.json();
            alert("Turno cancelado correctamente");
            closePopup2()
            fetchStations();
        } else {
            console.error('Error en la respuesta:', response.statusText);
            if (response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        }
    } catch (error) {
        console.error('Error al añadir modulo', error);
    }
};

const module_name = ref('')
const dependency = ref('')
const turns_number = ref('')
const addModule = async () => {
    try {
        const token = Cookies.get('token');
        
        const body = JSON.stringify({
            dependencyName: module_name.value,
            personInCharge: dependency.value,
            shifts: turns_number.value
        });

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body 
        };

        const response = await fetch('http://localhost:8080/dependency/create', config);
        if (response.ok) {
            const data = await response.json();
            alert("Modulo agregado correctamente");
            fetchStations();
        } else {
            console.error('Error en la respuesta:', response.statusText);
            if (response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        }
    } catch (error) {
        console.error('Error al añadir modulo', error);
    }
};

const add_turns_number = ref('')
const addTurns = async () => {
    try {
        const token = Cookies.get('token');

        const url = `http://localhost:8080/dependency/updateShifts?dependencyName=${selectedStation.value.name}&newShifts=${add_turns_number.value}`;

        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await fetch(url, config);
        if (response.ok) {
            const data = await response.json();
            alert("Módulo editado correctamente");
            closePopup4(); 
        } else {
            console.error('Error en la respuesta:', response.statusText);
            if (response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        }
    } catch (error) {
        console.error('Error al editar módulo:', error);
    }
};


const nextTurn = async () => {
    try {
        const token = Cookies.get('token');

        const url = `http://localhost:8080/dependency/updateCurrentShift?dependencyName=${selectedStation.value.name}&newCurrentShifts=${selectedStation.value.currentShift + 1}`;

        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await fetch(url, config);
        if (response.ok) {
            const data = await response.json();
            alert("Módulo editado correctamente");
            closePopup4(); 
        } else {
            console.error('Error en la respuesta:', response.statusText);
            if (response.status === 401) {
                alert("No está autorizado. Por favor, inicie sesión.");
                router.push('/');
            }
        }
    } catch (error) {
        console.error('Error al editar módulo:', error);
    }
};




const goLogin = () => {
    router.push('/');
}


onMounted(() => {
    fetchStations();
    fetchUsers();
    

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