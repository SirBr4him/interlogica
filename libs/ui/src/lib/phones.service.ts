import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PhoneNumber } from '@prisma/client';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Store } from './ui.store';

@Injectable({
  providedIn: 'root',
})
export class PhonesService {
  phoneNumbers$ = this.store
    .select<PhoneNumber[]>('phoneNumbers')
    .pipe(filter((items) => !!items));

  constructor(private http: HttpClient, private store: Store) {}

  getPhones(): Observable<PhoneNumber[]> {
    return this.http.get<PhoneNumber[]>('/api/phones').pipe(
      tap((phoneNumbers) => {
        this.store.set('phoneNumbers', phoneNumbers);
      })
    );
  }
}
