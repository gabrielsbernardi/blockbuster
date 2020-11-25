import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private messageService: MessageService,
              private translateService: TranslateService) { }

  success = (summary: string, detail: string) => this.toast('success', summary, detail);

  error = (summary: string, detail: string) => this.toast('error', summary, detail);

  warning = (summary: string, detail: string) => this.toast('warn', summary, detail);

  private toast = (type: string, summary: string, detail: string) =>
    this.messageService.add({
      severity: type,
      summary: this.translateService.instant(summary),
      detail: this.translateService.instant(detail)
    })
}
