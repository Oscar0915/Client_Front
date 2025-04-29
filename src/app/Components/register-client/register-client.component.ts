import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { RequestApiData, RequestApiModel } from '../../core/Models/RequestApi.models';
import { ClientsApiService } from '../../core/Services/ApiService/clients-api-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatusDataClientService } from '../../core/Services/StatusClientData/status-data-client.service';

@Component({
  selector: 'app-register-client',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.scss'
})
export class RegisterClientComponent {
  clientForm: FormGroup;
  buttonContent: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterClientComponent>,
    private _ClientsApiServiceService: ClientsApiService,
    private snackBar: MatSnackBar,
    private _StatusDataClientService: StatusDataClientService
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.buttonContent = "OK"
  }

  submit() {
    if (this.clientForm.valid) {
      if(this.clientForm.get('startDate')!.value >=  this.clientForm.get('endDate')!.value){
        this.openSnackBar("Error: The start date cannot be later than the end date.", "Cerrar");
      }else{

        this.buttonContent = "Loading..."
        
        let data: RequestApiData = new RequestApiData(this.clientForm.get('name')!.value, this.clientForm.get('phone')!.value,
        this.clientForm.get('email')!.value, this.clientForm.get('startDate')!.value, this.clientForm.get('endDate')!.value);
        let request: RequestApiModel = {
          data: data,
          token: ""
        };
        
        this._ClientsApiServiceService.SaveClient(request).subscribe(
          (Response) =>{
            if(Response.status == "success"){
              this._StatusDataClientService.addClient(Response.data);
              this.openSnackBar(Response.successMessage, "Cerrar");
              this.clientForm.reset();
              this.closeDialog();
            }else{
              this.openSnackBar(Response.errorMessage, "Cerrar");  
            }
            this.buttonContent = "OK";
          }, 
          (Error)=>{
            this.openSnackBar(Error.message, "cerrar");
          }
        )};
      }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
