import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { CorreiosService } from './correios/correios.service';
import { CorreiosController } from './correios/correios.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsController,CorreiosController],
  providers: [AppService, ProductsService,CorreiosService],
})
export class AppModule {}
