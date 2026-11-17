import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { OrdersController } from './routes/orders';
import { OrderService } from './services/OrderService';
import { OrderRepositoryImpl } from './repositories/OrderRepositoryImpl';
import { ORDER_REPOSITORY } from './repositories/OrderRepository';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

@Module({
  controllers: [OrdersController],
  providers: [
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepositoryImpl,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  exports: [OrderService, ORDER_REPOSITORY],
})
export class AppModule {}