import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { UploadCsvFileComponent } from './upload-csv-file.component';

describe('UploadCsvFileComponent', () => {
  let component: UploadCsvFileComponent;
  let fixture: ComponentFixture<UploadCsvFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadCsvFileComponent],
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadCsvFileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCsvFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
