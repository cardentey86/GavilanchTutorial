import {Route} from '@angular/router';
import {PersonasComponent} from './personas/personas.component';
import {PersonasFormComponent} from './personas/personas-form/personas-form.component';
import {DeletePersonaComponent} from './personas/delete-persona/delete-persona.component';


export const RouterConfig: Route[]=[
    { path: 'personas', component: PersonasComponent },
    { path: 'addPersonas', component: PersonasFormComponent },
    { path: 'editPersonas/:id', component: PersonasFormComponent },
    { path: 'deletePersonas/:id', component: DeletePersonaComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];