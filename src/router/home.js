import Home from '@/views/Home.vue';
import MyEvents from '@/components/Home/Events/Events.vue';
import Environments from '@/components/Home/Environments/Environments.vue';
import Users from '@/components/Home/Users/Users.vue';
import Batches from '@/components/Home/Batches/Batches.vue';
import EventTypes from '@/components/Home/Events/EventsOptions/EventTypes.vue';
import TicketTypes from '@/components/Home/Batches/Tickets/TicketTypes.vue';
import EnvironmentTypes from '@/components/Home/Environments/EnvironmentsOptions/EnvironmentTypes.vue';
import EnvironmentFeatures from '@/components/Home/Environments/EnvironmentsOptions/EnvironmentFeatures.vue';

export default {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
        { path: 'events', name: 'Events', component: MyEvents},
        { path: 'event-types', name: 'EventTypes', component: EventTypes},
        { path: 'batches', name: 'Batches', component: Batches},
        { path: 'ticket-types', name: 'TicketTypes', component: TicketTypes},
        { path: 'environments', name: 'Environments', component: Environments },
        { path: 'environment-types', name: 'EnvironmentTypes', component: EnvironmentTypes },
        { path: 'environment-features', name: 'EnvironmentFeatures', component: EnvironmentFeatures},
        { path: 'users', name: 'Users', component: Users },
    ]
};
