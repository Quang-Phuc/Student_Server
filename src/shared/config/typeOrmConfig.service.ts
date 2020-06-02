import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as ormTypeConfig from '../../../ormconfig.json';
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      username: ormTypeConfig.username,
      password: ormTypeConfig.password,
      database: ormTypeConfig.database,
      host: ormTypeConfig.host || 'localhost',
      port: Number(ormTypeConfig.port) || 3306,
      synchronize: ormTypeConfig.synchronize,
      entities: ['dist/**/*.entity{.ts,.js}'],
    };
  }
}
