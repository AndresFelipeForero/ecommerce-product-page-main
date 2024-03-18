import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgClass],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  isNavActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(19%5)
  }

  toggleNav(): void {
    this.isNavActive = !this.isNavActive;
  }

  closeNav(): void {
    this.isNavActive = false
  }
}
