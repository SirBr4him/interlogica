import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { PhonesComponent } from './phones/phones.component';
import { PhonesTableComponent } from './phones-table/phones-table.component';
import { UploadCsvFileComponent } from './upload-csv-file/upload-csv-file.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatTabsModule,
  ],
  declarations: [PhonesComponent, PhonesTableComponent, UploadCsvFileComponent],
  exports: [PhonesComponent],
})
export class UiModule {}
