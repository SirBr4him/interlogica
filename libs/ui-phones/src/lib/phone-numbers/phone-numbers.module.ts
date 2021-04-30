import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PhonesComponent } from './containers/phones/phones.component';
import { PhonesTableComponent } from './components/phones-table/phones-table.component';
import { UploadCsvFileComponent } from './components/upload-csv-file/upload-csv-file.component';
import { PhonesService } from './services/phones.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PhonesComponent,
  },
];

@NgModule({
  declarations: [PhonesComponent, PhonesTableComponent, UploadCsvFileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  providers: [PhonesService],
})
export class PhoneNumbersModule {}
