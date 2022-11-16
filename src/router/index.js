import {createWebHistory, createRouter} from "vue-router"
import ShiftAssignment from '../views/ShiftAssignment.vue'
import ServiceAssignment from '../views/ServiceAssignment.vue'
import EmployeeAssignment from '../views/EmployeeAssignment.vue'

const routes = [
    {
        path: '/',
        name: 'ShiftAssignment',
        component: ShiftAssignment
    },
    {
        path: '/service_assignment',
        name: 'ServiceAssignment',
        component: ServiceAssignment
    },
    {
        path: '/employee_assignment',
        name: 'EmployeeAssignment',
        component: EmployeeAssignment
    }
];

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active', //Don't work because router link use <a> tag by default and active work only in <li> tag
    routes
});

export default router;
