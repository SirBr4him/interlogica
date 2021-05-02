import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { PhonesModule } from '@interlogica/phones';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MulterModule.register({
      dest: `${__dirname}/uploads`,
    }),
    PhonesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
