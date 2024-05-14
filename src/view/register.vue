<template>
    <div class="cont">
        <div class="main">
            <button class="exit" @click="goLogin()">x</button>
            <h2 class="title_reg">Registrarse</h2>
            <form class="register">
                <label class="lbl_register">Nombres</label>
                <input type="text" name="names" class="in_register" v-model="names">
                <label class="lbl_register"> Apellidos</label>
                <input type="text" name="lastnames" class="in_register" v-model="lastNames">
                <label class="lbl_register">Correo electrónico</label>
                <input type="email" name="email" class="in_register" v-model="mail">
                <label class="lbl_register">Organización</label>
                <input type="text" name="pass" class="in_register" v-model="organization">
                <label class="lbl_register">Dirección</label>
                <input type="text" name="pass" class="in_register" v-model="addres">
                <label class="lbl_register">Contraseña</label>
                <input type="password" name="rpass" class="in_register" v-model="password1">
                <label class="lbl_register">Repetir contraseña</label>
                <input type="password" name="rpass" class="in_register" v-model="password2">
            </form>
            <button class="btn_reg" @click="submitForm"> Registrarse</button>
        </div>
    </div>
</template>



<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const goLogin = () => {
    router.push('/');
}
const names = ref('');
const lastNames = ref('');
const mail = ref('');
const organization = ref('');
const addres = ref('');
const password1 = ref('');
const password2 = ref('');

const submitForm = async () => {
    if (true) {
        try {
            const response = await fetch('http://127.0.0.1:8080/keycloak/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: mail.value,
                    email: mail.value,
                    firstName: names.value,
                    lastName: lastNames.value,
                    address: addres.value,
                    organization: organization.value,
                    password: password1.value
                })
            });
            const data = await response.json();
            if (response.status === 201) {
                alert("Registrado correctamente");
                router.push('/');
            } else {
                console.log('Error en la solicitud al servidor:', data);
            }
        } catch (error) {
            alert("Registrado correctamente");
                router.push('/');
        }
    } else {
        alert("Las contraseñas no coinciden");
    }
};

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
    width: 40%;
    height: auto;
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

.title_reg {
    font-size: 30px;
    color: white;
    margin-top: 0;
    margin-bottom: 0;
}

.register {
    display: flex;
    flex-direction: column;
    height: 80%;
    width: 90%;
}

.lbl_register {
    color: white;
    font-size: 20px;

}

.in_register {
    height: 15px;
    border-radius: 10px;
    border: none;
    margin-bottom: 2%;
    padding: 10px;
    font-size: 20px;

}

.btn_reg {
    height: 40px;
    border: none;
    width: 90%;
    border-radius: 10px;
    color: white;
    background-color: #00233A;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 20px;
}

.btn_reg:hover {
    transform: scale(1.1);
}

.exit {
    align-self: flex-end;
    margin-right: 5%;
    background: none;
    border: none;
    color: white;
    font-size: 30px;
    cursor: pointer;
    margin-bottom: 2px;
    transition: all 0.3s ease;
}

.exit:hover {
    transform: scale(1.1);
}
</style>