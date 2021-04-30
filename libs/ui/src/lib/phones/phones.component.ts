import { Component, OnInit } from '@angular/core';
import { PhoneNumber } from '@prisma/client';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PhonesService } from '../phones.service';

@Component({
  selector: 'interlogica-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss'],
})
export class PhonesComponent implements OnInit {
  validPhoneNumbers$: Observable<PhoneNumber[]>;
  correctedPhoneNumbers$: Observable<PhoneNumber[]>;
  invalidPhoneNumbers$: Observable<PhoneNumber[]>;

  constructor(private readonly phonesService: PhonesService) {}

  ngOnInit(): void {
    this.phonesService.getPhones();

    this.validPhoneNumbers$ = this.phonesService.phoneNumbers$.pipe(
      map((items) => items.filter((item) => item.valid))
    );
    this.correctedPhoneNumbers$ = this.phonesService.phoneNumbers$.pipe(
      map((items) => items.filter(({ valid, original }) => valid && !!original))
    );
    this.invalidPhoneNumbers$ = this.phonesService.phoneNumbers$.pipe(
      map((items) => items.filter((item) => !item.valid))
    );
  }
}
