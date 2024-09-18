import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-inicio-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.scss'
})
export class InicioPageComponent {
  muted = true
}
