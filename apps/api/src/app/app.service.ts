import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as csvParse from 'csv-parse/lib/sync';
import { CsvContentModel } from './models/csv-content-model';
@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }

  async parseFile(filePath: string): Promise<CsvContentModel[]> {
    const content = await fs.readFile(filePath);
    const entities: CsvContentModel[] = await csvParse(content, {
      columns: true,
      bom: true,
    });
    return entities;
  }
}
