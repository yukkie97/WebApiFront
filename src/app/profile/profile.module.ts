import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [ProfileComponent]
})
export class ProfileModule { }
