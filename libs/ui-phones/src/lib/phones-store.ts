import { PhoneNumber } from '.prisma/client';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

export interface PhonesState {
  [key: string]: any;
  phoneNumbers: PhoneNumber[];
}

const initialState: PhonesState = {
  phoneNumbers: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class PhonesStore {
  private subject = new BehaviorSubject<PhonesState>(initialState);

  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: unknown) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
