import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TruckProvidersService } from '../../shared/trucking-providers/truck-providers.service';
import { TruckProvider } from '../../shared/trucking-providers/models/truck-provider.model';
//import { TruckType } from '../../shared/trucks/truck-type.model';
//import { Material } from '../../shared/trucking-providers/models/material.model';
import * as CONSTANTS from '../../shared/trucking-providers/truck-provider.constants';
import { TrucksService } from '../../shared/trucks/trucks.service';
import { Truck } from '../../shared/trucks/truck.inteface';
import { LocalStorageService } from '../auth/local-storage.service';
import { User } from '../auth/user/user';
import { UserService } from '../auth/user.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-join-network',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './join-network.component.html',
  styleUrl: './join-network.component.css',
})
export class JoinNetworkComponent implements OnInit {

  constructor(
    private readonly truckProvidersService: TruckProvidersService,
    private readonly trucksService: TrucksService,
    private readonly localStorageService: LocalStorageService,
    private readonly usersService: UserService,
  ) {
    console.log('form fields ', this.truckDriverForm.value);
  }

  public truckArr: Truck[] = [];
  public trucks: {id: number, type: string}[] = [];
  public truckItems: Truck[] = [];
  @ViewChild('creditCardNumber') creditCardNumber!: ElementRef;
  public currentUser!: User;

  ngOnInit() {
    this.truckItems = [];
      console.log(CONSTANTS.FETCH_TRUCKS);
      this.trucksService.getTrucks().subscribe((response: Truck[]) => {
        this.truckArr = response;
        this.trucks = response.map((truck) => {
          return {
            id: truck.id,
            type: truck.type,
          }
        });
      });
      this.currentUser = JSON.parse(this.localStorageService.getItem('user') as string);
  }

  truckTypesGrp = new FormGroup({
    truckType: new FormControl(''),
    pricePerMile: new FormControl('')
  });

  truckDriverForm = new FormGroup({
    // Comany section
    company: new FormControl('', Validators.required),
    license: new FormControl('', Validators.required),
    address: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
    zip: new FormControl(''),
    state: new FormControl(''),
    // Truck section
    truckTypesArr: new FormArray([
      this.createTruckItem()
    ]),
    materialsArr: new FormArray([
      this.createMaterialItem()
    ]),
    // Payment Info
    cardholderName: new FormControl(''),
    cardNumber: new FormControl(''),
    expDate: new FormControl(''),
    securityCode: new FormControl(''),
    experience: new FormControl(''),
    // comments
    comments: new FormControl('')
  });

  createTruckItem(): FormGroup {
    return new FormGroup({
      truckType: new FormControl(''),
      pricePerMile: new FormControl(''),
    });
  }

  createMaterialItem(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      //unitForWeight: new FormControl(''),
      pricePerUnit: new FormControl(''),
    });
  }

  onSubmit() {
    console.log('submitted form value: ', this.truckDriverForm.value);
    this.truckDriverForm.value.truckTypesArr?.map((truckType) => {
      console.log(truckType);
      const truckObj = this.truckArr.find((truck) => truck.id === Number(truckType.truckType)) as Truck;
      if(truckObj) {
        Object.defineProperty(truckObj, 'price_per_mile', {
          value: truckType.pricePerMile,
          enumerable: true,
          writable: true
        });
        this.truckItems.push(truckObj);
      }
    });
    console.log(this.truckArr);
    const truckProvider = new TruckProvider(
      this.truckDriverForm.value.company as string,
      this.truckDriverForm.value.license as string,
      this.truckDriverForm.value.phone as string,
      this.truckDriverForm.value.address as string,
      this.truckDriverForm.value.city as string,
      this.truckDriverForm.value.zip as string,
      this.truckDriverForm.value.state as string,
      this.truckDriverForm.value.cardholderName as string,
      this.truckDriverForm.value.cardNumber as string,
      this.truckDriverForm.value.expDate as string,
      this.truckDriverForm.value.securityCode as string,
      this.truckDriverForm.value.comments as string,
      this.truckItems,
      //this.truckDriverForm.value.materialsArr as Material[],
    );
    console.log(truckProvider);
    this.truckProvidersService.saveProvider(truckProvider).pipe(
      switchMap((response) => {
        const profileId = response.id;
        const userId = this.currentUser.id;
        return this.usersService.updateUser(userId, {profileId})
      }) 
    ).subscribe((response) => {
      console.log(response);
    });
  }

  getTruckItems(): FormArray {
    return this.truckDriverForm.get('truckTypesArr') as FormArray;
  }

  getMaterialsItems(): FormArray {
    return this.truckDriverForm.get('materialsArr') as FormArray;
  }

  addTruckItem(): void {
    this.getTruckItems().push(this.createTruckItem());
  }

  addMaterialsItem(): void {
    this.getMaterialsItems().push(this.createMaterialItem());
  }

  loopThroughTruckArray(): void {
    const formArray = this.getTruckItems();
    for (let i = 0; i < formArray.length; i++) {
      const formGroup = formArray.at(i) as FormGroup;
      console.log(formGroup.value); // Access values of each FormGroup
    }
  }

  public states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
  public loadCapacity = ['1 Ton', '5 Tons', '10 Tons', '15 Tons', '20 Tons', '25 Tons'];
  public serviceTypes = ['Material', 'Demo', 'Material/Demo'];

  public materials = ['Aggregate', 'Concrete', 'Sand', 'Dirt', 'Rock'];
  public unitForWeight = ['Pounds', 'Kilo tons'];

  formatCreditCardNumber(event: any) {
    console.log(event.target.value);
    const formattedInputNumber = event.target.value.replaceAll(" ", "");
    const formattedOutputNumber = formattedInputNumber.split("").reduce((seed: string, next: string, index: number) => {
      if (index !== 0 && !(index % 4)) seed += " ";
      return seed + next;
    }, "");
    this.creditCardNumber.nativeElement.value = formattedOutputNumber;
  }
}
