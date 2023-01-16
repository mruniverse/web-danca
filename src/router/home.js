import Home from '@/views/Home.vue';
import MyEvents from '@/components/Home/EventsComponents/MyEvents.vue';
import Settings from '@/components/Home/SettingsComponents/Settings.vue';
import Places from '@/components/Home/EnvironmentsComponents/Environments.vue';
import NewEnvironmentStepper from '@/components/Home/EnvironmentsComponents/NewEnvironmentStepper.vue';

export default {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
        { path: 'account/settings', name: 'Settings', component: Settings },
        { path: 'events', name: 'Events', component: MyEvents },
        { path: 'places', name: 'Places', component: Places },
        { path: 'new_environment', name: 'NewEnvironment', component: NewEnvironmentStepper },
    ]
};
