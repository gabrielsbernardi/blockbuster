import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blockbuster';

  items: MenuItem[];

  constructor(private translate: TranslateService,
              private router: Router,
              private spinner: NgxSpinnerService) {
    this.translate.setDefaultLang('pt-BR');
  }

  ngOnInit(): void {
    this.items = [
      {label: this.translate.instant('menu.film'), icon: PrimeIcons.VIDEO, routerLink: ['/movie']}
    ];

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.spinner.show();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.spinner.hide();
      }
    });
  }
}
