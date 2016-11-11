import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BikeProvider } from '../../providers/bike';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {
  public currentStep: number = 1;
  public cities: Array<any>;
  public selectedCity:string;

  constructor(public navCtrl: NavController, private bikeProvider: BikeProvider) {
    bikeProvider.getContracts()
      .subscribe(cities => this.cities = cities,
      err => {
        console.log(err);
      });
  }
}
