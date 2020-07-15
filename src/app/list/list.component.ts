import { TabsComponent } from './../tabs/tabs.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  inputVal: string;
  loading = false;
  result: any = [];
  public link;
  details;

  constructor(private actRoute: ActivatedRoute, private apiServ: ApiService, private sanitizer: DomSanitizer, public iab: InAppBrowser,
              public modalCtrl: ModalController, private storage: Storage) { }

  async ionViewDidEnter() {
    this.loading = true;
    const value = this.actRoute.snapshot.queryParams.value;
    this.inputVal = value;
    this.result = await this.apiServ.search(value);
    this.loading = false;

    if (this.result.length > 0) {
      this.result.map(res => {
        res.liked = false;
      });
      console.log(this.result);
    }
  }

  ionViewDidLeave() {
    this.inputVal = null;
  }

  async ngOnInit() {
    this.details = await this.storage.get('MusicApp');
  }

  async searchTabs(val) {
    this.loading = true;
    this.result = await this.apiServ.search(val);
    this.loading = false;

    if (this.result.length > 0) {
      this.result.map(res => {
        res.liked = false;
      });
      console.log(this.result);
    }
  }

  async showTabs(id) {
    const tab = await this.apiServ.showTabs(id);
    this.link = tab;
    this.iab.create(this.link, '_system');
  }

  async likeTabs(song, index) {
    console.log(song);
    console.log(this.details);
    if (this.result[index].liked === false) {
      this.result[index].liked = true;
      const url = await this.apiServ.showTabs(song.id);
      this.apiServ.likeSongs(this.details.id, song.id, song.artist.name, song.title, url);
      this.apiServ.showToast('Liked', 'success');
    }
  }
}
