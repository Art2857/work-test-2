import { config } from 'dotenv';
import * as Joi from 'joi';

config({ path: '.env' });

export interface IEnvironment {
  DATABASE_URL: string;
  AUTH_PORT: number;
  MAIN_PORT: number;
}

const schema = Joi.object<IEnvironment>({
  DATABASE_URL: Joi.string().required(),
  AUTH_PORT: Joi.number().required(),
  MAIN_PORT: Joi.number().required(),
});

const { DATABASE_URL, AUTH_PORT, MAIN_PORT } = process.env;

const { error, value } = schema.validate({
  DATABASE_URL,
  AUTH_PORT,
  MAIN_PORT,
});

if (error) {
  throw new Error(`Error validation environment: ${error.message}, ${value}`);
}

export const Environment = <IEnvironment>value;
