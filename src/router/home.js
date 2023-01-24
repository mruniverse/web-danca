import Home from '@/views/Home.vue';
import MyEvents from '@/components/Home/Events/Events.vue';
import Settings from '@/components/Home/Account/SettingsComponents/Settings.vue';
import Places from '@/components/Home/Environments/Environments.vue';
import Users from '@/components/Home/Users/Users.vue';
import Batches from '@/components/Home/Batches/Batches.vue';

export default {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
        { path: 'account/settings', name: 'Settings', component: Settings },
        { path: 'events', name: 'Events', component: MyEvents},
        { path: 'batches', name: 'Batches', component: Batches },
        { path: 'places', name: 'Places', component: Places },
        { path: 'users', name: 'Users', component: Users },
    ]
};
