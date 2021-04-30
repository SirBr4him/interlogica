import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PhoneNumber } from '@prisma/client';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { PhonesStore } from '../../phones-store';

interface UploadResponse {
  originalname: string;
  filename: string;
}
@Injectable()
export class PhonesService {
  phoneNumbers$ = this.store
    .select<PhoneNumber[]>('phoneNumbers')
    .pipe(filter((items) => !!items?.length));

  constructor(private http: HttpClient, private store: PhonesStore) {}

  getPhones(): Observable<PhoneNumber[]> {
    return this.http.get<PhoneNumber[]>('/api/phones').pipe(
      tap((phoneNumbers) => {
        this.store.set('phoneNumbers', phoneNumbers);
      })
    );
  }

  uploadFile(file: File): Observable<UploadResponse> {
    const body = new FormData();
    body.append('file', file);
    return this.http.post<UploadResponse>('/api/phones/upload-csv', body);
  }
}
