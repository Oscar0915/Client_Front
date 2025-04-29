import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseAllClientModel } from '../../Models/ResponseAllClient.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestApiModel } from '../../Models/RequestApi.models';
import { ResponseApiExporModel, ResponseApiModel } from '../../Models/ResponseApi.models';

@Injectable({
  providedIn: 'root'
})
export class ClientsApiService {

  private clientApiUrl: string;
  private headers: HttpHeaders;

  constructor(private _httpClient: HttpClient) {

    this.clientApiUrl = environment.apiUrl;
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer Token',
      'Content-Type': 'application/json',
      'X-Custom-Header': 'value'
    });
  }

  public GetClients(): Observable<ResponseAllClientModel> {
    return this._httpClient.get<ResponseAllClientModel>(this.clientApiUrl, {
      headers: this.headers
    });
  }

  public SaveClient(Request: RequestApiModel): Observable<ResponseApiModel> {
    return this._httpClient.post<ResponseApiModel>(`${this.clientApiUrl}/save`, Request, {
      headers: this.headers
    });
  }

  public ExportData(): Observable<ResponseApiExporModel> {
    return this._httpClient.get<ResponseApiExporModel>(`${this.clientApiUrl}/export`,  {
      headers: this.headers
    });
  }
}
