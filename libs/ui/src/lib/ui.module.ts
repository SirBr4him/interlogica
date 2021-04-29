import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { PhonesComponent } from './phones/phones.component';
import { PhonesTableComponent } from './phones-table/phones-table.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, MatTableModule, MatIconModule],
  declarations: [PhonesComponent, PhonesTableComponent],
  exports: [PhonesComponent],
})
export class UiModule {}
