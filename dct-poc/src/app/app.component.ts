import { Component } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public authService: AuthService, public permissionsService: NgxPermissionsService) { }

  logout() {
    this.authService.doLogout()
  }

}
