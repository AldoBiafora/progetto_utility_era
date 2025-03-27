import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/Home/home.component';
import { SplitStringComponent } from './components/utility/split-string.component';
import { CreateScriptComponent } from './components/create-script/create-script.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect alla home
  { path: 'home', component: HomeComponent },
  { path: 'split-string', component: SplitStringComponent },
  { path: 'create-script', component: CreateScriptComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
