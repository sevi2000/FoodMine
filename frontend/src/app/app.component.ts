import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/partials/header/header.component";
import { HomeComponent } from "./components/pages/home/home.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
