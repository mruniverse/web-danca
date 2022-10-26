import Login from '@/views/account/Login'
import Home from '@/views/account/Home/Home.vue';
import MyEvents from '@/components/account/Home/EventsComponents/MyEvents.vue';
import Workspace from '@/components/account/Home/WorkspaceComponents/Workspace.vue';
import Places from '@/components/account/Home/EnvironmentsComponents/Places.vue';

export default {
    path: '/account/home',
    name: 'Home',
    component: Home,
    children: [
        { path: 'workspace', name: 'Workspace', component: Workspace },
        { path: 'events', name: 'Events', component: MyEvents },
        { path: 'places', name: 'Places', component: Places },
    ]
};
