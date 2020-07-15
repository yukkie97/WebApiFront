import { TabsComponent } from './tabs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent
  }
];

@NgModule({
  declarations: [TabsComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [TabsComponent]
})
export class TabsModule { }
