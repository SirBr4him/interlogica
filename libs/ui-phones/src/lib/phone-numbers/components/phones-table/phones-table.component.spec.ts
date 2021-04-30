import { DebugElement, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { PhonesTableComponent } from './phones-table.component';

describe('PhonesTableComponent', () => {
  let component: PhonesTableComponent;
  let fixture: ComponentFixture<PhonesTableComponent>;

  const data = [
    {
      id: '103343262',
      original: '6478342944',
      number: '',
      valid: false,
    },
    {
      id: '103426540',
      original: '84528784843',
      number: '',
      valid: false,
    },
    {
      id: '103278808',
      original: '263716791426',
      number: '',
      valid: false,
    },
    {
      id: '103426733',
      original: '27736529279',
      number: '27736529279',
      valid: true,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhonesTableComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        NoopAnimationsModule,
        MatIconModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonesTableComponent);
    component = fixture.componentInstance;
    component.phones = data;
    component.displayedColumns = ['id', 'original', 'number', 'valid'];
    component.ngOnChanges({
      phones: new SimpleChange(null, component.phones, false),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display table', () => {
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.paginator).toBeInstanceOf(MatPaginator);

    fixture.whenStable().then(() => {
      const tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(data.length + 1);

      const headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toBe('ID');
      expect(headerRow.cells[1].innerHTML).toBe('Phone number');
      expect(headerRow.cells[2].innerHTML).toBe('Corrected version');
      expect(headerRow.cells[3].innerHTML).toBe('Validity');

      const row1 = tableRows[1];
      expect(row1.cells[0].innerHTML).toBe(data[0].id);
      expect(row1.cells[1].innerHTML).toBe(data[0].original);
      expect(row1.cells[2].innerHTML).toBe(data[0].number);
    });
  });
});
