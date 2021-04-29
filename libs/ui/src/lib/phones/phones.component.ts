import { Component, OnInit } from '@angular/core';
import { PhoneNumber } from '@prisma/client';
import { Observable } from 'rxjs';
import { PhonesService } from '../phones.service';

@Component({
  selector: 'interlogica-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss'],
})
export class PhonesComponent implements OnInit {
  phones$: Observable<PhoneNumber[]>;

  constructor(private readonly phonesService: PhonesService) {}

  ngOnInit(): void {
    this.phones$ = this.phonesService.getPhones();
  }
}
