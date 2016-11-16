import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BikeProvider } from '../../providers/bike';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {
  public currentStep: number = 1;
  public stations: Array<any>;
  public contracts: Array<any>;
  public selectedContract: string = '';
  public selectedStartingStation: string = '';
  public selectedEndingStation: string = '';
  public contractSelected: boolean = false;

  constructor(public navCtrl: NavController, private bikeProvider: BikeProvider) {
    bikeProvider.getContracts()
      .subscribe(contracts => this.contracts = contracts,
      err => {
        console.log(err);
      });
  }

  public onContractChange(newContract: string) {
    this.contractSelected = true;

    //TODO add loading indicator
    //TODO order by name
    this.bikeProvider.getStations(newContract)
      .subscribe(stations => this.stations = stations,
      err => {
        console.log(err);
      });
  }

  public onStartingStationChange(startingStation: string) {

  }

  public onEndingStationChange(endingStation: string) {

  }
}
