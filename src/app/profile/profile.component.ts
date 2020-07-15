import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  details;
  likedSongs;
  link;
  shibePics: any;
  constructor(private storage: Storage, private apiServ: ApiService, private router: Router, private iab: InAppBrowser) { }

  async ngOnInit() {
    const pics: any = await this.apiServ.getPics();
    this.shibePics = pics.image;
    console.log(this.shibePics);
  }

  async ionViewDidEnter() {
    this.details = await this.storage.get('MusicApp');
    this.likedSongs = await this.apiServ.getSongs(this.details.id);
    console.log(this.likedSongs);
  }

  async showTabs(id) {
    const tab = await this.apiServ.showTabs(id);
    this.link = tab;
    this.iab.create(this.link, '_system');
  }

  logout() {
    this.router.navigate(['/signin']);
    this.storage.remove('MusicApp');
    this.apiServ.showToast('Logged Out', 'danger');
  }

  async unlikeTabs(song) {
    const res: any = await this.apiServ.unlikeSongs(song.id, song.song_id);

    if (res && res.success) {
      this.apiServ.showToast(res.message, 'danger');
      this.likedSongs = await this.apiServ.getSongs(this.details.id);
    }
  }

}
