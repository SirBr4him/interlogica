import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { PhonesService } from '../../services/phones.service';

import { PhonesComponent } from './phones.component';
import { HttpClientModule } from '@angular/common/http';
import { PhonesTableComponent } from '../../components/phones-table/phones-table.component';
import { UploadCsvFileComponent } from '../../components/upload-csv-file/upload-csv-file.component';
import { MatIconModule } from '@angular/material/icon';

describe('PhonesComponent', () => {
  let component: PhonesComponent;
  let fixture: ComponentFixture<PhonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PhonesComponent,
        PhonesTableComponent,
        UploadCsvFileComponent,
      ],
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
        MatTabsModule,
        MatIconModule,
      ],
      providers: [PhonesService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
