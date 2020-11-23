import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blockbuster';

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {label: 'Filme', icon: 'pi pi-plus', routerLink: ['/movie']},
      {label: 'Teste', icon: 'pi pi-download', routerLink: ['/second-component']},
    ];
  }
}
