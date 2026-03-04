import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { loggerMiddleware } from './common/middleware/logger.middleware';
import { envSchema } from './config/env.schema';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, validationSchema: envSchema}),
    PrismaModule,
    AuthModule,
    TenantModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 10,
        },
      ]
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(loggerMiddleware)
      .forRoutes('*');
  }
}
