import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TruckProvidersService } from '../../shared/trucking-providers/truck-providers.service';
import { TruckProvider } from '../../shared/trucking-providers/models/truck-provider.model';
//import * as CONSTANTS from '../../shared/trucking-providers/truck-provider.constants';
import { TrucksService } from '../../shared/trucks/trucks.service';
import { Truck } from '../../shared/trucks/truck.inteface';
import { LocalStorageService } from '../auth/local-storage.service';
import { User } from '../auth/user/user';
import { UserService } from '../auth/user.service';
import { MaterialsService } from '../../shared/materials/materials.service';
import { Material } from '../../shared/materials/materials.interface';
import { TruckModelProps } from '../../shared/trucks/truck-model-props.interface';

@Component({
  selector: 'app-join-network',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './join-network.component.html',
  styleUrl: './join-network.component.css',
})
export class JoinNetworkComponent implements OnInit {
  public imgSrc!: string;
  public states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']


  constructor(
    private readonly truckProvidersService: TruckProvidersService,
    private readonly trucksService: TrucksService,
    private readonly localStorageService: LocalStorageService,
    private readonly usersService: UserService,
    private readonly materialsService: MaterialsService,
  ) {
    console.log('form fields ', this.truckDriverForm.value);
  }

  // Truck selection props
  public truckArr: Truck[] = [];
  public trucks: {id: number, type: string}[] = [];
  public truckItems: Truck[] = [];

  // Material selection props
  public materialArr: Material[] = [];

  @ViewChild('creditCardNumber') creditCardNumber!: ElementRef;
  public currentUser!: User;
  public addedPricePerMile: number | null = null;
  public selectedTruckModel: Truck | null = null;
  public setTruckModelPropsArr: TruckModelProps[] = [];
  
  ngOnInit() {
    this.truckItems = [];
      this.trucksService.getTrucks().subscribe((response: Truck[]) => {
        this.truckArr = response;
        console.log(this.truckArr);
        this.trucks = response.map((truck) => {
          return {
            id: truck.id,
            type: truck.type,
          }
        });
      });
    this.materialsService.getMaterials().subscribe((response: Material[]) => {
      this.materialArr = response;
      console.log(this.materialArr);
    });
    this.currentUser = JSON.parse(this.localStorageService.getItem('user') as string);
    console.log(this.setTruckModelPropsArr);
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

  // create new form group for each truck added to the form
  createTruckItem(): FormGroup {
    // initiate an empty initial object for the truck model properties so the user can set properties as they please
    this.setTruckModelPropsArr.push(new TruckModelProps());
    // new Form group for the truck values
    return new FormGroup({
      type: new FormControl(''),
      pricePerMile: new FormControl(''),
      minCapacity: new FormControl(''),
      maxCapacity: new FormControl(''),
      serviceType: new FormControl(''),
      image: new FormControl('')
    });
  }

  // create new form group for each material added to the form
  createMaterialItem(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      pricePerUnit: new FormControl(''),
    });
  }

  onSubmit() {
    console.log('submitted form value: ', this.truckDriverForm.value);
    this.truckDriverForm.value.truckTypesArr?.map((truckType) => {
      console.log(truckType);
      const truckObj = this.truckArr.find((truck) => truck.id === Number(truckType.type)) as Truck;
      if(truckObj) {
        this.truckItems.push(truckObj);
      }
    });
    console.log(this.truckArr);
    const truckProvider = new TruckProvider (
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
    /*this.truckProvidersService.saveProvider(truckProvider).pipe(
      switchMap((response) => {
        console.log(response);
        const profileId = response.id;
        const userId = this.currentUser.id;
        return this.usersService.updateUser(userId, {profileId})
      }) 
    ).subscribe((response) => {
      console.log(response);
    });*/
  }

  onTruckModelSelect(truckModel: any, index: number) {
    this.selectedTruckModel = this.truckArr.find(truck => truck.type === truckModel) as Truck;
    const selectedTruckModelsArr = this.truckDriverForm.controls.truckTypesArr;
    console.log(this.selectedTruckModel);
    console.log(selectedTruckModelsArr);
    if(this.selectedTruckModel) {
      const controls = this.getTruckItems();
      const controlValues = {
        image: this.selectedTruckModel.image,
        maxCapacity: this.selectedTruckModel.maxCapacity,
        minCapacity: this.selectedTruckModel.minCapacity,
        serviceType: this.selectedTruckModel.serviceType,
        type: this.selectedTruckModel.type
      }
      console.log(controlValues);
      controls.at(index).patchValue(controlValues);
      console.log(selectedTruckModelsArr);
    }
  }

  setTruckModelProps(truckModel: any, index: number) {
    console.log(truckModel);
    const selectedTruckModel = this.truckArr.find(truck => truck.type === truckModel) as Truck;
    const props = {
      type: selectedTruckModel.type,
      minCapacity: selectedTruckModel.minCapacity,
      maxCapacity: selectedTruckModel.maxCapacity,
      serviceType: selectedTruckModel.serviceType,
      image: selectedTruckModel.image,
    }
    console.log(props);
    this.setTruckModelPropsArr[index] = props;
    console.log(this.setTruckModelPropsArr[index]);
  }

  onPricePerMileSelect(price: any, index: number) {
      const control = (this.truckDriverForm.get('truckTypesArr') as FormArray).at(index);
      control.get('pricePerMile')?.setValue(price);
      console.log(control);
  }

  onImageSelected(event: any, index: number) {
    const file = event.target.files[0];
    console.log(file);
    if(file) {
      // display preview of selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.imgSrc = reader.result as string;
        this.setTruckModelPropsArr[index].imgUrl = this.imgSrc;
      };
      reader.readAsDataURL(file);
      // set formArray's formgroup's image control at current index
      const control = (this.truckDriverForm.get('truckTypesArr') as FormArray).at(index);
      control.get('image')?.setValue(file);
      console.log(this.truckDriverForm.controls.truckTypesArr);
    }
  }

  onMaterialSelect(truckModel: any, index: number) {
    this.selectedTruckModel = this.truckArr.find(truck => truck.type === truckModel) as Truck;
    const selectedTruckModelsArr = this.truckDriverForm.controls.truckTypesArr;
    console.log(this.selectedTruckModel);
    console.log(selectedTruckModelsArr);
    if(this.selectedTruckModel) {
      const controls = this.getTruckItems();
      const controlValues = {
        image: this.selectedTruckModel.image,
        maxCapacity: this.selectedTruckModel.maxCapacity,
        minCapacity: this.selectedTruckModel.minCapacity,
        serviceType: this.selectedTruckModel.serviceType,
        type: this.selectedTruckModel.type
      }
      console.log(controlValues);
      controls.at(index).patchValue(controlValues);
      console.log(selectedTruckModelsArr);
    }
  }

  setMaterialProps(materialType: any, index: number) {
    const selectedMaterial = this.materialArr.find(material => material.name === materialType) as Material;
    const props = {
      id: selectedMaterial.id,
      name: selectedMaterial.name,
      imgUrl: selectedMaterial.imgUrl,
    }
    console.log(props);
    this.setTruckModelPropsArr[index] = props;
    console.log(this.setTruckModelPropsArr[index]);
  }

  selectAllText(event: any) {
    event.target.select();
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
