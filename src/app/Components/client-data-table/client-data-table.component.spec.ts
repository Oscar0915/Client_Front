import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDataTableComponent } from './client-data-table.component';

describe('ClientDataTableComponent', () => {
  let component: ClientDataTableComponent;
  let fixture: ComponentFixture<ClientDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
