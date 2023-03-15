import { Component } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { UserLoginService } from '../login/login.component.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(public navbarService: NavbarService, public userLoginService: UserLoginService) { }

  navigateLogin()
  {
    window.location.href = 'login';
  }

  navigateAbout()
  {
    window.location.href = 'about';
  }

  check()
  {
    if(this.userLoginService.isLogged() === true)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  logOut = () => {
    localStorage.removeItem('User');
    localStorage.setItem('isLogged', "false");
    window.location.href = '/';
  }
}
