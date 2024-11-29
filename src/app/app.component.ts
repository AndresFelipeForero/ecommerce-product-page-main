import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoaderService } from './services/loader.service';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent, AsyncPipe, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  _loaderService = inject(LoaderService)
  isLoading$ = this._loaderService.isLoading$
  title = 'ecommerce-product-page-main';
}
