import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CityContractModel } from 'src/app/models/city-contract.model';
import { StateContractModel } from 'src/app/models/state-contract.model';
import { FormContractModel } from 'src/app/models/form-contract.model';
import { RegistrationService } from 'src/app/services/registration.service';
import { SnackBarDataModel } from 'src/app/models/snackbar-data.model';
import { RegistrationModel } from 'src/app/models/registration.model';
import { GenericResult } from 'src/app/models/core/generic-result.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public formTile:string="Inscrição do canditado";
  public submitTile: string="Salvar inscrição";
  public isLoading:boolean=false;
  @Output() isBtnLoading:EventEmitter<boolean> = new EventEmitter();
  @Output() showDataForm:EventEmitter<FormContractModel> = new EventEmitter();
  @Output() showSnacbar:EventEmitter<SnackBarDataModel> = new EventEmitter();
  public cities:Array<CityContractModel>=[];
  public states:Array<StateContractModel>=[];
  constructor(
    private service:RegistrationService 
  ) { }

  ngOnInit(): void {
   /*  this.service.getRegistration().subscribe(
      (value:any)=>{
        console.log(value);

      }
    ); */
    this.service.getCities().subscribe(
      (value:any)=>{
        this.cities = value.data.cities;
        this.states = value.data.states;
        console.log("kd os dados?",this.states);

      }
    );
  }
  onSubmit(value:FormContractModel){
    
    this.service.postRegistration(value).subscribe(
      (value:any)=>{
        let data:SnackBarDataModel = {
          message:value.message,
          color:'bg-success'
        };
        this.showSnacbar.emit(data);
        this.isBtnLoading.emit(false);
      },
      (error:any)=>{
        let data:SnackBarDataModel = {
          message:error.error.message,
          color:'bg-danger'
        };
        this.showSnacbar.emit(data);
        this.isBtnLoading.emit(false);
      }
    )
    
  }
  showData(cpf:string){
    this.service.getRegistrationByCPF(cpf).subscribe(
      (data:GenericResult)=>{
       let value = data.data[0];
        console.log(value)
        this.showDataForm.emit({
          name:value.nome,
          job:value.cargo,
          address:value.endereco,
          cityId: value.cidade_id,
          stateId:value.estado_id,
          CPF:value.cpf
        })
      },
      (error:any)=>{
        let data:SnackBarDataModel = {
          message:error.error.message,
          color:'bg-warning'
        };
        this.showSnacbar.emit(data);
        this.showDataForm.emit({});
      }
    )
  }
  
  onIsFormLoading(value:boolean){
    this.isLoading=value;
    console.log(value)
  }

}
