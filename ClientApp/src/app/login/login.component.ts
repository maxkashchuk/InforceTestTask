import { Component, OnDestroy } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserLoginService } from '../login/login.component.service';
import { UserLogin } from '../models/user-login.model';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public navbarService: NavbarService, protected userLogin: UserLoginService, private _snackBar: MatSnackBar) 
  { 
    navbarService.hide();
    this.user.Login = "";
    this.user.Password = ""; 
  }

  ngOndestroy()
  {
    this.navbarService.show();
  }

  authentication()
  {
    if(this.user.Login === "" || this.user.Password === "")
    {
      this.openSnackBar("All field shouldn't be empty", "Close");
      return;
    }
    this.userLogin.loginUser(this.user);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  user = { } as UserLogin;

  LoginMatcher = new FormControl('', [Validators.required]);
  PasswordMatcher = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

}
