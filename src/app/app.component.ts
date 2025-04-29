import { Component } from '@angular/core';
import { SideNavComponent } from "./Components/side-nav/side-nav.component";
import { ClientMagnamentComponent } from "./Pages/client-magnament/client-magnament.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
