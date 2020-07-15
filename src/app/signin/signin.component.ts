import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  showSignInForm = true;
  shibePics;
  // showSignUpForm = false;
  constructor(private apiServ: ApiService, public router: Router, private storage: Storage) { }

  async ngOnInit() {
  }

  goToRegister(input) {
    this.showSignInForm = false;
    input.value = null;
  }

  goToLogin(username, email) {
    username = null;
    email = null;
    this.showSignInForm = true;
  }

  async register(username, email) {
    if (username.value === '' || username.value == null) {
      alert('Please fill in your name');
    } else if (email.value === '' || email.value == null) {
      alert('Email cannot be blank');
    } else {
      const res: any = await this.apiServ.register(username.value, email.value);
      if (res && res.success) {
        this.apiServ.showToast(res.message, 'success');
        this.showSignInForm = true;
      } else {
        this.apiServ.showToast(res.message, 'danger');
      }

    }
  }

  async login(email) {
    if (email.value === '' || email.value == null) {
      alert('Email cannot be blank');
    } else {
      const res: any = await this.apiServ.login(email.value);
      console.log(res);
      if (res && res.success) {
        this.apiServ.showToast(res.message, 'success');
        this.storage.set('MusicApp', {email: res.email, id: res.id, name: res.name});
        this.router.navigate(['/home']);
      } else {
        this.apiServ.showToast(res.message, 'danger');
      }
    }
  }

}
