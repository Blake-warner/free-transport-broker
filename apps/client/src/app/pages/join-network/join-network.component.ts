import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { TruckProvidersService } from '../../shared/trucking-providers/truck-providers.service';
import { TruckProvider } from '../../shared/trucking-providers/models/truck-provider.model';
import { TruckType } from '../../shared/trucking-providers/models/truck-type.model';
import { Material } from '../../shared/trucking-providers/models/material.model';
import * as CONSTANTS from '../../shared/trucking-providers/truck-provider.constants';

@Component({
  selector: 'app-join-network',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './join-network.component.html',
  styleUrl: './join-network.component.css',
})
export class JoinNetworkComponent implements OnInit {

  constructor(private readonly truckProvidersService: TruckProvidersService) {
    console.log(this.truckDriverForm.value);
  }

  public truckItems!: {id: number, name: string}[];
  @ViewChild('creditCardNumber') creditCardNumber!: ElementRef;

  ngOnInit() {
    this.truckItems = [];
      console.log(CONSTANTS.SAVE_TRUCK_PROVIDER);
  }

  truckTypesGrp = new FormGroup({
    truckType: new FormControl(''),
    //loadCapacity: new FormControl(''),
    //serviceType: new FormControl(''),
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
    name: new FormControl(''),
    cardNumber: new FormControl(''),
    expDate: new FormControl(''),
    securityCode: new FormControl(''),
  });

  addTruck(item: {id: number, name: string}) {
    this.truckItems.push(item);
    console.log(item);
  }

  createTruckItem(): FormGroup {
    return new FormGroup({
      truckType: new FormControl(''),
      //loadCapacity: new FormControl(''),
      //serviceType: new FormControl(''),
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
    console.log('this is second: ', this.truckDriverForm.value);
    const truckProvider = new TruckProvider(
      this.truckDriverForm.value.company as string,
      this.truckDriverForm.value.license as string,
      this.truckDriverForm.value.phone as string,
      this.truckDriverForm.value.address as string,
      this.truckDriverForm.value.city as string,
      this.truckDriverForm.value.zip as string,
      this.truckDriverForm.value.state as string,
      this.truckDriverForm.value.truckTypesArr as TruckType[],
      this.truckDriverForm.value.materialsArr as Material[],
      {
        name: this.truckDriverForm.value.name as string,
        cardNumber: this.truckDriverForm.value.cardNumber as string,
        expDate: this.truckDriverForm.value.expDate as string,
        securityCode: this.truckDriverForm.value.securityCode as string
      }
    );
    this.truckProvidersService.saveProvider(truckProvider).subscribe((response) => {
      console.log(response);
    })
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
  
  public trucks = ['3 Axle Gooseneck dump trailer (7-9 tons)', 'Bobtail single axle trailer dump truck (8-9 tons)', 'Flatbed roll-off dump truck (10-13 tons)', 'Ten wheeler dump truck (12-15 tons)', 'standard non transfer dump truck (13-16 tons)', 'super dump w/ pusher axle dropdown dump truck (15-18 tons)'];
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
