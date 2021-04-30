import { PhoneNumber } from '.prisma/client';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'interlogica-phones-table',
  templateUrl: './phones-table.component.html',
  styleUrls: ['./phones-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhonesTableComponent {
  @Input()
  set phones(value: PhoneNumber[]) {
    if (value) {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.paginator = this.paginator;
      this.show = true;
    }
  }

  @Input()
  displayedColumns: string[];

  dataSource: MatTableDataSource<PhoneNumber>;

  show = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
}
