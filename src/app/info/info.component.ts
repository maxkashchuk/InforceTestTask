import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InfoModel } from '../models/info-model';

interface objInfo
{
  infoModel: InfoModel;
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  constructor(private router: Router) 
  {
    this.obj = this.router.getCurrentNavigation()?.extras.state as objInfo;
    this.obj.infoModel.date = new Date(this.obj.infoModel.date);
  }

  dateCount()
  {
    return "Year, month, day: " + this.obj.infoModel.date.getFullYear().toString() + ":" +
    this.obj.infoModel.date.getMonth().toString() + ":" +
    this.obj.infoModel.date.getDay().toString() + " | " +
    "Hours, minutes, seconds: " +
    this.obj.infoModel.date.getHours() + ":" +
    this.obj.infoModel.date.getMinutes() + ":" +
    this.obj.infoModel.date.getSeconds();
  }

  public obj = { } as objInfo;
}
