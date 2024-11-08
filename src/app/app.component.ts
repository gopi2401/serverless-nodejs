import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from './footer/footer.component';
import { articlesComponent } from "./articles/articles.component";
import { OnThisPageComponent } from "./onthispage/onthispage.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, FooterComponent, articlesComponent, OnThisPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'serverless-nodejs-docs';
}
