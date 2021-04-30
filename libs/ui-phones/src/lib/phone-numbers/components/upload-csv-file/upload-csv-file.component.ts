import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileValidator } from '../../../file-validator';

@Component({
  selector: 'interlogica-upload-csv-file',
  templateUrl: './upload-csv-file.component.html',
  styleUrls: ['./upload-csv-file.component.scss'],
})
export class UploadCsvFileComponent implements OnInit {
  fileControl: FormControl;

  @Output()
  changed = new EventEmitter<File>();

  ngOnInit(): void {
    this.fileControl = new FormControl('', [
      FileValidator.fileExtensions(['csv']),
    ]);

    this.fileControl.valueChanges.subscribe((file) => {
      this.changed.emit(file);
    });
  }

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.fileControl.patchValue(file);
    this.fileControl.updateValueAndValidity();
  }

  get error() {
    if (!this.fileControl.hasError('fileExtension')) {
      return '';
    }
    return `Only supports csv file`;
  }
}
