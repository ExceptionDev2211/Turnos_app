<template>
    <div class="container">
        <div class="central">
            <div class="img_izquierda">
                <img src="/src/assets/images/img_main.jpeg" alt="">
            </div>
            <div class="login_container">
                <h2 class="title_log">Iniciar sesión</h2>
                <form class="form_log">
                    <label for="username" class="lbl_log">Correo electrónico:</label><br>
                    <input type="email" id="username" name="username" class="in_log" v-model="username">
                    <label for="password" class="lbl_log">Contraseña:</label><br>
                    <input type="password" id="password" name="password" class="in_log" v-model="password">
                    <a class="forget_pass" href="">¿Haz olvidado tu contraseña?</a>
                </form>
                <button  class="log_button" @click="submitForm">Iniciar sesión</button>
                <p class="log_message"> O ingresa con </p>
                <div class="form_buttons">
                    <button type="submit" class="net_button">Google <img class="net_img"
                            src="../assets/images/google.png" alt=""></button>
                    <button type="submit" class="net_button">GitHub <img class="net_img"
                            src="../assets/images/github.png" alt=""></button>
                    <button type="submit" class="net_button">Facebook <img class="net_img"
                            src="../assets/images/facebook.png" alt=""></button>
                </div>
                <p class="create_account" @click="goRegister()">Crear cuenta</p>
            </div>
        </div>
    </div>
</template>



<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const goRegister = () => {
    router.push('/login/register');
}



const username = ref('')
const password = ref('')
const submitForm = async () => {
    try {
        const formData = new URLSearchParams();
        formData.append('username', username.value);
        formData.append('password', password.value);

        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud al servidor');
        }

        const data = await response.json();

        const yourToken = data.access_token;
        localStorage.setItem('token', yourToken);
        router.push('admin_main');

        console.log("Logueado correctamente");
    } catch (error) {
        console.error('Error en la solicitud al servidor:', error.message);
    }
}



</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
}

.central {
    display: flex;
    width: 90%;
    height: 80vh;
    background-color: none;
    margin: auto;

}

.img_izquierda {
    display: flex;
    position: relative;
    height: 100%;
    width: 50%;
    background-color: black;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    box-shadow: 5px 5px 10px #1f1e3b,
        -5px -5px 10px #040000;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.img_izquierda img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.login_container {
    display: flex;
    height: 100%;
    width: 50%;
    background: #0755B4;
    box-shadow: 5px 5px 8px #001c2e,
        -5px -5px 8px #002a46;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}

.title_log {
    color: white;
    font-size: 30px;
    margin-bottom: 0;
}

.form_log {
    height: 50%;
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5px;

}

.lbl_log {
    color: white;
    font-size: 20px;
    margin-left: 10%;
    margin-top: 5px;


}

.in_log {
    height: 40px;
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    border-radius: 10px;
    border: none;
    background-color: #D9D9D9
}

.forget_pass {
    margin-left: 10%;
    margin-top: 1%;
    color: white;

}

.net_button {
    width: 20%;
    height: 40px;
    border-radius: 10px;
    border: none;

    margin-left: 40px;
    margin-right: 40px;
    margin-bottom: 10px;
    background-color: #00233A;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.net_button:hover {
    transform: scale(1.1);
}

.form_buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1%;
    margin-bottom: 1%;


}

.log_button {
    height: 40px;
    margin-top: 20px;
    width: 80%;
    align-self: center;
    border-radius: 10px;
    border: none;
    background-color: #00233A;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.log_button:hover {
    transform: scale(1.1);
}

.log_message {
    align-self: center;
    margin-top: 10px;
}

.create_account {
    margin-left: 10%;
    margin-right: auto;
    margin-top: 0%;
    color: #ffffff;
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.3s ease;
}

.create_account:hover {
    transform: scale(1.1);
}

.net_img {
    height: 15px;
}
</style>