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
import { ResponseApiModel } from '../../core/Models/ResponseApi.models';


@Component({
  selector: 'app-client-magnament',
  standalone: true,
  imports: [MatSidenavModule, SideNavComponent, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, ClientDataTableComponent],
  templateUrl: './client-magnament.component.html',
  styleUrl: './client-magnament.component.scss'
})
export class ClientMagnamentComponent implements OnInit{
  //Side Nav de Opciones de Perfil de usuario.
  @ViewChild('drawer') drawer!: MatSidenav;
  drawerMode: 'side' | 'over' = 'side';
  drawerOpened = true;
  isSmallScreen = false;

  constructor(private dialog: MatDialog, private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef,
    private _ClientApiService:ClientsApiService
  ) {}

  
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
  
}