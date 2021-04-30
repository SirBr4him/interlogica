import { Component, OnInit } from '@angular/core';
import { PhoneNumber } from '@prisma/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  private loadPhoneNumbers() {
    this.phonesService.getPhones().subscribe();
  }

  ngOnInit(): void {
    this.loadPhoneNumbers();

    this.validPhoneNumbers$ = this.phonesService.phoneNumbers$.pipe(
      map((items) =>
        items.filter(
          ({ valid, number, original }) => valid && original === number
        )
      )
    );
    this.correctedPhoneNumbers$ = this.phonesService.phoneNumbers$.pipe(
      map((items) =>
        items.filter(
          ({ valid, number, original }) => valid && original !== number
        )
      )
    );
    this.invalidPhoneNumbers$ = this.phonesService.phoneNumbers$.pipe(
      map((items) => items.filter((item) => !item.valid))
    );
  }

  onFileChanged(event: File) {
    this.phonesService.uploadFile(event).subscribe(() => {
      this.loadPhoneNumbers();
    });
  }
}
