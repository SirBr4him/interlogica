import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PhoneNumber } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhonesService {
  constructor(private http: HttpClient) {}

  getPhones(): Observable<PhoneNumber[]> {
    return this.http.get<PhoneNumber[]>('/api/phones');
  }
}
