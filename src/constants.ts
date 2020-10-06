import isCI from 'is-ci';
export const __prod__ = process.env.NODE_ENV === 'production';
export const COOKIE_NAME = 'qid';
export const FORGET_PASSWORD_PREFIX = 'forget-password:';
export const SERVER_URL =
  __prod__ || isCI ? 'https://cohot2.herokuapp.com' : 'http://localhost:8000';
