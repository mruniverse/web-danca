import Login from '@/views/Login.vue'
import LoginComponent from '@/components/Login/Login.vue'
import RegisterComponent from '@/components/Login/Register.vue'

export default {
    path: '/',
    name: '',
    component: Login,
    children: [
        { path: 'login', name: 'Login', component: LoginComponent },
        { path: 'register', name: 'Register', component: RegisterComponent }
    ]
};
