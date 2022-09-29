import Login from '@/views/account/Login'
import LoginComponent from '@/components/account/Login'
import RegisterComponent from '@/components/account/Register'

export default {
    path: '/account',
    component: Login,
    children: [
        { path: 'login', name: 'Login', component: LoginComponent },
        { path: 'register', name: 'Register', component: RegisterComponent }
    ]
};
