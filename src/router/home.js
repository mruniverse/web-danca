import Home from '@/views/account/Home.vue';
import MyEvents from '@/components/account/Home/EventsComponents/MyEvents.vue';
import Settings from '@/components/account/Home/SettingsComponents/Settings.vue';
import Places from '@/components/account/Home/EnvironmentsComponents/Environments.vue';
import NewEnvironmentStepper from '@/components/account/Home/EnvironmentsComponents/NewEnvironmentStepper.vue';

export default {
    path: '/home/account',
    name: 'Home',
    component: Home,
    children: [
        { path: 'settings', name: 'Settings', component: Settings },
        { path: 'events', name: 'Events', component: MyEvents },
        { path: 'places', name: 'Places', component: Places },
        { path: 'new_environment', name: 'NewEnvironment', component: NewEnvironmentStepper },
    ]
};
