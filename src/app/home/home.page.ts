import { ApiService } from './../services/api.service';
import { Component } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public router: Router, public storage: Storage, public apiServ: ApiService) {}

  async searchTabs(val) {
    this.router.navigate(['/list'], {queryParams: {value: val}});
  }

  logout() {
    this.router.navigate(['/signin']);
    this.storage.remove('MusicApp');
    this.apiServ.showToast('Logged Out', 'danger');
  }
}
