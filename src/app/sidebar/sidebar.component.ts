import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: 'sidebar.component.html',
})
export class SideBarComponent {
}
