import axios from 'axios';
import { SERVER_URL } from '../constants';

export const login = async (options: unknown) =>
  await axios.post(`${SERVER_URL}/auth/login`, options);
export const getCompanies = async () =>
  await axios.get(`${SERVER_URL}/company/companies`);
