import { Injectable } from '@angular/core';
import { ClientDataModel } from '../../Models/ResponseAllClient.models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusDataClientService {

  private clientsSubject: BehaviorSubject<ClientDataModel[]> = new BehaviorSubject<ClientDataModel[]>([]);
  public clients$: Observable<ClientDataModel[]> = this.clientsSubject.asObservable();

  constructor() {}

  getClients(): ClientDataModel[] {
    return this.clientsSubject.getValue();
  }

  setClients(clients: ClientDataModel[]): void {   
    this.clientsSubject.next(clients);
  }

  addClient(client: ClientDataModel): void {
    const current = this.clientsSubject.getValue();
    this.clientsSubject.next([...current, client]);
  }

  removeClient(sharedKey: string): void {
    const filtered = this.clientsSubject.getValue().filter(c => c.sharedKey !== sharedKey);
    this.clientsSubject.next(filtered);
  }

  updateClient(updated: ClientDataModel): void {
    const current = this.clientsSubject.getValue().map(c =>
      c.sharedKey === updated.sharedKey ? updated : c
    );
    this.clientsSubject.next(current);
  }
}
