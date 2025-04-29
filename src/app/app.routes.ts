import { Routes } from '@angular/router';
import { ClientMagnamentComponent } from './Pages/client-magnament/client-magnament.component';

export const routes: Routes = [
    { path: '', component: ClientMagnamentComponent },
    {
        path: 'client-magnament',
        component: ClientMagnamentComponent,
        title: 'Gestion de Clientes',
    },
];
