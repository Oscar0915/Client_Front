import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClientsApiService } from '../../core/Services/ApiService/clients-api-service.service';
import { ClientDataModel, ResponseAllClientModel } from '../../core/Models/ResponseAllClient.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StatusDataClientService } from '../../core/Services/StatusClientData/status-data-client.service';
import {  MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-client-data-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatPaginatorModule],
  templateUrl: './client-data-table.component.html',
  styleUrl: './client-data-table.component.scss'
})
export class ClientDataTableComponent implements OnInit {

  displayedColumns: string[];
  dataSource = new MatTableDataSource<ClientDataModel>([]);
  isLoading: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  fullClientData: ClientDataModel[];



  constructor(private _ClientsApiServiceService: ClientsApiService, private snackBar: MatSnackBar,
    private _StatusDataClientService: StatusDataClientService) {

    this.displayedColumns = ['sharedKey', 'businessId', 'email', 'phone', 'date', 'actions'];
    this.isLoading = true;
    this.fullClientData = [];
  }

  ngOnInit(): void {
    this.GetClients();

    this._StatusDataClientService.clients$.subscribe(data => {    
      this.dataSource.data = data;
      this.fullClientData = data;
    });
  }
  

  public GetClients(): void {
    this.isLoading = false;
    this._ClientsApiServiceService.GetClients().subscribe(
      (response: ResponseAllClientModel) => {
        if (response.status == 'success') {
          this._StatusDataClientService.setClients(response.data);
          this.openSnackBar(response.successMessage, 'Cerrar');
        } else {
          this.openSnackBar(response.errorMessage, 'Cerrar');
        }
        this.isLoading = true;
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(error.message, 'Cerrar');
        this.isLoading = true;
      }
    );
  }

  onPageChange(event: any): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
  
    const pagedData = this.fullClientData.slice(startIndex, endIndex); // usa fullClientData
    this.dataSource = new MatTableDataSource<ClientDataModel>(pagedData);
    this.dataSource.paginator = this.paginator;
  }
  


  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
