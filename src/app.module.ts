import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargosModule } from './Admin/cargos/cargos.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AppService } from './app.service';
import { EmpresasModule } from './Admin/empresas/empresas.module';
import { TipodespesaModule } from './gbrdv/tipodespesa/tipodespesa.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService) => ({
        type: 'postgres',
        host: configService.get('TYPEORM_HOST'),
        database: configService.get('TYPEORM_DATABASE'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        port: Number(configService.get('TYPEORM_PORT', 5432)),
        entities: [__dirname + '/**/*.entity.js'],
        migrations: [
          'database/migrations/*.ts',
        ],
        synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
        logging: configService.get('TYPEORM_LOGGING') === 'true',
      }),
    }),
    CargosModule,
    AuthModule,
    EmpresasModule,
    TipodespesaModule,
  ],
  controllers: [],
  providers: [
    /* AppService,
     {
       provide: APP_GUARD,
       useClass: JwtAuthGuard,
     },*/
  ],
})
export class AppModule { }
