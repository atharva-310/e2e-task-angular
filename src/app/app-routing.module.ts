import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { HomeComponent } from './home/home.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'form-builder', component: FormBuilderComponent },
  { path: 'form-preview', component: FormPreviewComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
