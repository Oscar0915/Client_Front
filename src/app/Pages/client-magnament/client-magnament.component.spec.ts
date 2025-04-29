import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMagnamentComponent } from './client-magnament.component';

describe('ClientMagnamentComponent', () => {
  let component: ClientMagnamentComponent;
  let fixture: ComponentFixture<ClientMagnamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientMagnamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMagnamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
