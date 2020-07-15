import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private toastCtrl: ToastController) { }

  async search(queries) {
    const result = await this.http.post(environment.REST_API + '/search', {query: queries}).toPromise();
    return result;
  }

  async showTabs(id) {
    const result = await this.http.get(environment.REST_API + '/showTabs/' + id).toPromise();
    return result;
  }

  async likeSongs(userId, songId, artistName, songName, urlLink) {
    const body = {id: userId, song_id: songId, artist: artistName, title: songName, url: urlLink};
    const result = await this.http.post(environment.REST_API + '/likeSongs', body).toPromise();
    return result;
  }

  async unlikeSongs(userId, songId) {
    const body = {id: userId, song_id: songId};
    const result = await this.http.post(environment.REST_API + '/unlikeSongs', body).toPromise();
    return result;
  }

  async getSongs(userId) {
    const result = await this.http.get(environment.REST_API + '/getSongs/' + userId).toPromise();
    return result;
  }

  async login(userEmail) {
    const body = {email: userEmail};
    const result = await this.http.post(environment.REST_API + '/login', body).toPromise();
    return result;
  }

  async register(userName, userEmail) {
    const body = {name: userName, email: userEmail};
    const result = await this.http.post(environment.REST_API + '/register', body).toPromise();
    return result;
  }

  async getPics() {
    const result = await this.http.get(environment.REST_API + '/getShibePics').toPromise();
    return result;
  }

  async showToast(msg, colors) {
    const result = await this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      duration: 3000,
      color: colors
    });
    return await result.present();
  }
}
