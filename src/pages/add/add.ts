import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BikeProvider } from '../../providers/bike';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { RouteProvider } from '../../providers/route';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {
  public currentStep: number = 1;
  public stations: Array<any>;
  public contracts: Array<any>;
  public selectedContract: string = null;
  public selectedStartingStation: number = null;
  public selectedEndingStation: number = null;
  public contractSelected: boolean = false;

  constructor(public navCtrl: NavController, public toastController: ToastController, private storage: Storage, private bikeProvider: BikeProvider, private routeProvider: RouteProvider) {
    bikeProvider.getContracts()
      .subscribe(contracts => this.contracts = contracts,
      err => {
        console.log(err);
      });
  }

  public onContractChange(newContract: string) {
    this.contractSelected = true;
    this.selectedContract = newContract;

    //TODO add loading indicator
    //TODO order by name
    this.bikeProvider.getStations(newContract)
      .subscribe(stations => this.stations = stations,
      err => {
        console.log(err);
      });
  }

  public addRoute() {
    if (this.selectedContract !== null && this.selectedStartingStation !== null && this.selectedEndingStation !== null) {
      this.routeProvider.addRoute({
        contract: this.selectedContract,
        startStationNumber: this.selectedStartingStation,
        endStationNumber: this.selectedEndingStation
      }).then((result) => {
        this.navCtrl.setPages([{ page: HomePage }]);
      }).catch((error) => {
        this.toastController.create({
          message: 'Error while saving the route',
          duration: 3000
        }).present();
      });
    }
  }
}
