import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';

export const csvFileFilter = (req, file: Express.Multer.File, callback) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    return callback(
      new HttpException('Only csv files are allowed!', HttpStatus.BAD_REQUEST),
      false
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.replace(/ /g, '_').replace(/\./g, '_');
  const fileExtName = extname(file.originalname);
  const randomName = new Date().toISOString().replace(/[^\w]/g, '');
  callback(null, `${name}_${randomName}${fileExtName}`);
};
