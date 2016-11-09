import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BikeProvider } from '../../providers/bike';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {

  constructor(public navCtrl: NavController, private bikeProvider: BikeProvider) {

  }

}
