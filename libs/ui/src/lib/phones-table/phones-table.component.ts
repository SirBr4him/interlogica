import { PhoneNumber } from '.prisma/client';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'interlogica-phones-table',
  templateUrl: './phones-table.component.html',
  styleUrls: ['./phones-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhonesTableComponent {
  @Input()
  phones: PhoneNumber[];

  displayedColumns = ['id', 'number', 'original', 'valid'];
}
