import { Component, OnInit } from '@angular/core';
import { UserLoginService } from '../login/login.component.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HomeService } from './home.component.service';
import { UrlAdd } from '../models/url-add.model';
import { URLOrdinary } from '../models/url.model';
import { MatTableDataSource } from '@angular/material/table';
import { InfoModel } from '../models/info-model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface UrlTable {
  id: number;
  longUrl: string;
  shortUrl: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public userLoginService: UserLoginService, private homeService: HomeService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.homeService.urlGet().subscribe((data) => {
      const newData = [ ...this.dataSource.data ];
      let obj: URLOrdinary[] = data.body as URLOrdinary[];
      for(let i: number = 0; i < obj.length; i++)
      {
        let temp = { } as UrlTable;
        temp.id = obj[i].id;
        temp.longUrl = obj[i].longUrl;
        temp.shortUrl = obj[i].shortUrl;
        newData.push(temp);
      }
      this.dataSource.data = newData;
    })
  }

  displayedColumns: string[] = ['id', 'longUrl', 'shortUrl'];
  dataSource = new MatTableDataSource<UrlTable>([]);
  clickedRows = new Set<UrlTable>();
  certainRow = { } as UrlTable;

  URL: string = "";

  urlMatcher = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  AddURL()
  {
    if(this.URL === "")
    {
      this.openSnackBar("URL value can't be empty", "Close");
      return;
    }
    let urlAdd = { } as UrlAdd;
    urlAdd.Url = this.URL;
    urlAdd.Login = this.userLoginService.userGetLogin();
    this.homeService.urlAdd(urlAdd).subscribe((data) => 
      { 
        const newData = [ ...this.dataSource.data, data.body as UrlTable ];
        this.dataSource.data = newData;
      }, res => 
      {
          if(res.status !== 200)
          {
            this.openSnackBar("Such URL already exists", "Close");
          }
      })
  }

  DeleteURL()
  {
    if(this.URL === "")
    {
      this.openSnackBar("URL value can't be empty", "Close");
      return;
    }
    this.homeService.urlDelete(this.URL).subscribe((data) => 
      {
        const newData = [ ...this.dataSource.data.filter(el => el.longUrl !== (data.body as URLOrdinary).longUrl) ];
        this.dataSource.data = newData;
      }, res => 
      {
          if(res.status !== 200)
          {
            this.openSnackBar("Icorrect URL", "Close");
          }
      })
  }

  navigateInfo()
  {
    setTimeout(()=>
    { 
      this.homeService.urlInfo(this.certainRow.shortUrl).subscribe(data => 
        { 
          console.log(data.body as InfoModel);
          this.router.navigate(['/info'], {state: {infoModel: data.body as InfoModel}});
        })
    }, 200)
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
