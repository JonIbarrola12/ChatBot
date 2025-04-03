import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-init-button',
  imports: [],
  templateUrl: './init-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitButtonComponent { }
