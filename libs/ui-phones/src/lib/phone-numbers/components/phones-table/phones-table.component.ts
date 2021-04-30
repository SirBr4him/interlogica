import { PhoneNumber } from '.prisma/client';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
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
export class PhonesTableComponent implements OnChanges {
  @Input()
  phones: PhoneNumber[];

  @Input()
  displayedColumns: string[];

  dataSource: MatTableDataSource<PhoneNumber>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnChanges(changes: SimpleChanges): void {
    const { phones } = changes;
    if (!phones.firstChange) {
      this.dataSource = new MatTableDataSource(this.phones);
      this.dataSource.paginator = this.paginator;
    }
  }
}
