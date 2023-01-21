import Home from '@/views/Home.vue';
import MyEvents from '@/components/Home/EventsComponents/MyEvents.vue';
import Settings from '@/components/Home/Account/SettingsComponents/Settings.vue';
import Places from '@/components/Home/Environments/Environments.vue';
import NewEnvironment from '@/components/Home/Environments/NewEnvironment.vue';
import Users from '@/components/Home/Users/Users.vue';

export default {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
        { path: 'account/settings', name: 'Settings', component: Settings },
        { path: 'events', name: 'Events', component: MyEvents },
        { path: 'places', name: 'Places', component: Places },
        { path: 'new_environment', name: 'NewEnvironment', component: NewEnvironment },
        { path: 'users', name: 'Users', component: Users },
    ]
};
