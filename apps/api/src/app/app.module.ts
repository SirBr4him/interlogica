import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhonesController, PhonesService } from '@interlogica/phones';

@Module({
  imports: [
    MulterModule.register({
      dest: `${__dirname}/uploads`,
    }),
  ],
  controllers: [AppController, PhonesController],
  providers: [AppService, PhonesService],
})
export class AppModule {}
