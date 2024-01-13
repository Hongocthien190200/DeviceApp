import Home from '../Pages/Home';
import Devices from '../Pages/Device';
import DeviceById from '../Pages/DeviceById';
import MaintenanceHis from '../Pages/MnHistory';
import RepairHis from '../Pages/RpHistory';
import Category from '../Pages/Category';
import Location from '../Pages/Location';
import Status from '../Pages/Status';
import Repairer from '../Pages/Repairer';
import Login from '../Pages/Login';
import Department from '../Pages/Department';
import Setting from '../Pages/Setting';
//Public Route
const privateRoutes = [
    { path: '/', component: Home },
    { path: '/devices', component: Devices },
    { path: '/devices/:id', component: DeviceById },
    { path: '/maintenance', component: MaintenanceHis },
    { path: '/repair', component: RepairHis },
    { path: '/category', component: Category },
    { path: '/location', component: Location },
    { path: '/status', component: Status },
    { path: '/fixer', component: Repairer },
    { path: '/department', component: Department },
    { path: '/setting', component: Setting },
];
const publicRoutes = [
    { path: '/login', component: Login, layout: null },
];
export { publicRoutes, privateRoutes }