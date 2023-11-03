// export class DataSourceOptions 

import { DataSource, DataSourceOptions, Migration } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
 type: 'mysql',
 host: 'localhost',
 port: 3306,
 username: '',
 password: '',
 database: '',
 entities: [__dirname + '/../**/*.entity{.ts,.js}'],

 migrations: [__dirname + 'dist/config/migrations/*{.ts,.js}'],
 synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;