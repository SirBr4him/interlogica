import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'phones',
    loadChildren: async () =>
      (await import('./phone-numbers/phone-numbers.module')).PhoneNumbersModule,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [],
  exports: [],
})
export class UiPhonesModule {}
