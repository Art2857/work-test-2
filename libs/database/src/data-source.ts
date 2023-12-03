import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  parse as parsePgConnectionString,
  ConnectionOptions,
} from 'pg-connection-string';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { UserEntity } from 'apps/auth/src/entities/user.entity';
import { TaskEntity } from 'apps/main/src/entities/task.entity';
import { GroupEntity } from 'apps/main/src/entities/group.entity';

export enum Environment {
  DEVELOPMENT = 'development',
  TESTING = 'testing',
  PRESTABLE = 'prestable',
  PRODUCTION = 'production',
  PRODUCTION_DEBUG = 'production_debug',
}

export const isDevelopment = process.env.NODE_ENV === Environment.DEVELOPMENT;
export const isTesting = process.env.NODE_ENV === Environment.TESTING;
export const isPrestable = process.env.NODE_ENV === Environment.PRESTABLE;
export const isProduction = process.env.NODE_ENV === Environment.PRODUCTION;
export const isProductionDebug =
  process.env.NODE_ENV === Environment.PRODUCTION_DEBUG;

export const getEntities = () /*: DataSourceOptions['entities']*/ => [
  UserEntity,
  TaskEntity,
  GroupEntity,
];

const getDatabaseConnectionString = (env: Environment): string => {
  if (isDevelopment) {
    config({ path: '.development.env' });
    return process.env.DATABASE_URL!;
  }

  if (isProduction) {
    config({ path: '.env' });
    return process.env.DATABASE_URL!;
  }

  throw new Error('Unknown environment');
};

/**
 * @param pgConfigMaster - конфигурация подключения к главной БД
 * @returns конфигурацию репликации БД
 */
const getReplicationConfig = (
  pgConfigMaster: ConnectionOptions,
): PostgresConnectionOptions['replication'] => ({
  master: {
    host: String(pgConfigMaster.host!),
    port: Number(pgConfigMaster.port!),
    username: pgConfigMaster.user,
    password: pgConfigMaster.password,
    database: String(pgConfigMaster.database!),
  },
  slaves: [],
});

/**
 * @param pgConfigMaster - конфигурация подключения к главной БД
 * @returns опции подключения к БД
 */
const getConnectionOptions = (
  pgConfigMaster: ConnectionOptions,
): DataSourceOptions => ({
  type: 'postgres',
  replication: getReplicationConfig(pgConfigMaster),
  entities: getEntities(),
  synchronize: isDevelopment,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  cache: true,
  migrations: [],
});

/**
 * @returns соединение с БД
 */
const getConnection = () => {
  const env = isDevelopment ? Environment.DEVELOPMENT : Environment.PRODUCTION;
  const databaseConnectionString = getDatabaseConnectionString(env);
  const pgConfigMaster = parsePgConnectionString(databaseConnectionString);
  const connectionOptions = getConnectionOptions(pgConfigMaster);

  return new DataSource(connectionOptions);
};

export const AppDataSource = getConnection();
