import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PhonesComponent } from './phones/phones.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [PhonesComponent],
  exports: [PhonesComponent],
})
export class UiModule {}
