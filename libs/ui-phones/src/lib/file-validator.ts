import { ValidatorFn, FormControl } from '@angular/forms';

interface FileError {
  fileExtension: {
    allowedExtensions: string[];
    actualExtension: string;
    file: File;
  };
}

export class FileValidator {
  static fileExtensions(allowedExtensions: Array<string>): ValidatorFn {
    const validatorFn = (file: File): null | FileError => {
      if (allowedExtensions.length === 0) {
        return null;
      }

      if (file instanceof File) {
        const ext = FileValidator.getExtension(file.name);
        if (allowedExtensions.indexOf(ext) === -1) {
          return {
            fileExtension: {
              allowedExtensions: allowedExtensions,
              actualExtension: file.type,
              file,
            },
          };
        }
      }
    };
    return FileValidator.fileValidation(validatorFn);
  }

  private static getExtension(filename: string): null | string {
    if (filename.indexOf('.') === -1) {
      return null;
    }
    return filename.split('.').pop();
  }

  private static fileValidation(
    validatorFn: (File) => null | FileError
  ): ValidatorFn {
    return (formControl: FormControl) => {
      if (!formControl.value) {
        return null;
      }

      const files: File[] = [];
      const isMultiple = Array.isArray(formControl.value);
      isMultiple
        ? formControl.value.forEach((file: File) => files.push(file))
        : files.push(formControl.value);

      for (const file of files) {
        return validatorFn(file);
      }

      return null;
    };
  }
}
