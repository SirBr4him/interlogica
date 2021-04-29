import {
  Controller,
  Get,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';

import { AppService } from './app.service';
import { CsvContentModel } from './models/csv-content-model';
import { csvFileFilter, editFileName } from './utils/file-upload';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private validateCsvContent(content: CsvContentModel[]): any[] {
    return content.reduce((results, { id, sms_phone }) => {
      let number: string;
      let valid: boolean;

      if (sms_phone.match(/^27[0-9]{9}/)) {
        number = sms_phone;
        valid = true;
      } else if (sms_phone.match(/^[0-9]{9}/)) {
        number = `27${sms_phone}`;
        valid = true;
      } else {
        (number = ''), (valid = false);
      }

      results = [...results, { id, original: sms_phone, number, valid }];
      return results;
    }, []);
  }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('upload-csv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${__dirname}/uploads`,
        filename: editFileName,
      }),
      fileFilter: csvFileFilter,
    })
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { originalname, filename } = file;
    const csvContent = await this.appService.parseFile(
      `${__dirname}/uploads/${filename}`
    );
    const entities = this.validateCsvContent(csvContent);
    this.appService.setPhoneNumbers(entities).catch((err) => {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Errore durante l'inserimento dei dati`,
        error: err,
      };
    });
    return {
      status: HttpStatus.OK,
      message: 'File csv uploaded successfully!',
      data: {
        originalname,
        filename,
        entities,
      },
    };
  }

  @Get('phones')
  async getPhones() {
    try {
      const numbers = await this.appService.getPhoneNumbers();
      return numbers;
    } catch (error) {
      return {
        message: `Errore durante la richiesta dei dati`,
        error,
      };
    }
  }
}
