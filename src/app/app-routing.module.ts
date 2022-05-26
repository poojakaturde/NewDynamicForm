import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormCreationComponent } from './form-creation/form-creation.component';
import { FormRenderComponent } from './form-render/form-render.component';

const routes: Routes = [
  {path:'formCreate',component:FormCreationComponent},
  { path: '',   redirectTo: '/formCreate', pathMatch: 'full' },
  {path:'form',component:FormRenderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
