import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormCreationComponent } from './form-creation/form-creation.component';
import { FormGenerateComponent } from './form-generate/form-generate.component';
import { FormRenderComponent } from './form-render/form-render.component';
import { FormSubmissionComponent } from './form-submission/form-submission.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'formCreate',component:FormCreationComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {path:'formPreview',component:FormRenderComponent},
  {path:'home',component:HomeComponent},
  {path:'formGenerate',component:FormGenerateComponent},
  {path:'formSubmit',component:FormSubmissionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
