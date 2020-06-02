export interface ITypeormConfig {
  password: string;
  database: string;
  host: string;
  port: number;
  type: string;
  synchronize: boolean;
  entities: Array<string>;
}
