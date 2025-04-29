import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SideNavComponent } from "../../Components/side-nav/side-nav.component";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientDataTableComponent } from "../../Components/client-data-table/client-data-table.component";
import { RegisterClientComponent } from '../../Components/register-client/register-client.component';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ClientsApiService } from '../../core/Services/ApiService/clients-api-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestApiSearchModel } from '../../core/Models/RequestApi.models';
import { ResponseApiModel } from '../../core/Models/ResponseApi.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatusDataClientService } from '../../core/Services/StatusClientData/status-data-client.service';
import { ClientDataModel } from '../../core/Models/ResponseAllClient.models';


@Component({
  selector: 'app-client-magnament',
  standalone: true,
  imports: [MatSidenavModule, SideNavComponent, MatIconModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, ClientDataTableComponent, ReactiveFormsModule],
  templateUrl: './client-magnament.component.html',
  styleUrl: './client-magnament.component.scss'
})
export class ClientMagnamentComponent implements OnInit{
  //Side Nav de Opciones de Perfil de usuario.
  @ViewChild('drawer') drawer!: MatSidenav;
  drawerMode: 'side' | 'over' = 'side';
  drawerOpened = true;
  isSmallScreen = false;

  searchForm!: FormGroup;


  constructor(private dialog: MatDialog, private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef,
    private _ClientApiService:ClientsApiService, private fb: FormBuilder, private snackBar: MatSnackBar,
        private _StatusDataClientService: StatusDataClientService
  ) {

    this.searchForm = this.fb.group({
      parameter: ['', Validators.required]
    });
  }

  
  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
    .subscribe(result => {
      if (result.matches) {
        this.drawerMode = 'over';
        this.drawerOpened = false;
        this.isSmallScreen = true;
      } else {
        this.drawerMode = 'side';
        this.drawerOpened = true;
        this.isSmallScreen = false;
      }
      this.cdr.detectChanges(); 

    });  
  }

  openCreateClientDialog(): void {
    const dialogRef = this.dialog.open(RegisterClientComponent, {
      width: '500px',
      disableClose: true, 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Formulario enviado:', result);      }
    });
  }

  public GetDataToExport(){
    this._ClientApiService.ExportData().subscribe(
      (Response) => this.downloadCSV(Response.data))
  }

  private downloadCSV(base64Data:string): void {
  
    // 1. Decodificar base64 a texto
    const decodedData = atob(base64Data);
  
    // 2. Crear blob tipo CSV
    const blob = new Blob([decodedData], { type: 'text/csv;charset=utf-8;' });
  
    // 3. Crear enlace de descarga
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'ClientsData.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  onSearch(): void {
    if(!this.searchForm.valid) return;

    const key = this.searchForm.get('parameter')?.value;
    let Request:RequestApiSearchModel = new RequestApiSearchModel("", key);
    
    this.openSnackBar("Consultando Cliente", "Cerrar");

    let Clients:ClientDataModel[] = [];
    this._ClientApiService.GetClientFind(Request).subscribe(
      (Response:ResponseApiModel) =>{
        if(Response.status == "success"){
          Clients.push(Response.data);
          this._StatusDataClientService.findClient(Clients);
          this.openSnackBar(Response.successMessage, "Cerrar");
        }else{
          this.openSnackBar(Response.errorMessage, "Cerrar");
        }
        this.searchForm.reset();
      },
      (Error) => {
        this.openSnackBar(Error.message, "Cerrar");
      });

  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  
}