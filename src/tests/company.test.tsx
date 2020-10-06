import axios from 'axios';
import { getCompanies, login } from './api';

describe('Company', () => {
  test('should show error when no auth token is provided', async () => {
    // expect.assertions(1);
    const expected = {
      message: 'Auth token required',
    };
    const res = await getCompanies();
    expect(res.data).toEqual(expected);
    // console.log('response', res.data);
    // console.log('am here');
  });
  test('should list registerd companies when auth token is provided', async () => {
    // expect.assertions(1);
    // const expected = [
    //   {
    //     _id: '5f74c0b1abc2f627dc18f7dd',
    //     name: 'Netbritz',
    //     email: 'herberthtk100@gmail.com',
    //     desc:
    //       'This wizard will help you to create your company by asking you few easy step by step questions.',
    //     bank: '443554657566',
    //     fb: 'Netbritz',
    //     location: 'Kampala',
    //     twt: 'Netbritz',
    //     yt: 'Netbritz',
    //     user: {
    //       lastLogin: '2020-10-05T07:27:33.365Z',
    //       _id: '5f68ef5f4a52af2310f1d88d',
    //       email: 'herbertbruce8@gmail.com',
    //       password:
    //         '$2a$12$Ox3.9wIiUp50Ws.YHTcCHOt5qTcooaftEirK0KOQTgDLWHXp4kEuG',
    //       name: 'Herbert Kavuma',
    //       pd: '2020-09-21T18:22:23.608Z',
    //       __v: 0,
    //     },
    //     pd: '2020-09-30T17:30:25.439Z',
    //     __v: 0,
    //   },
    // ];
    const { data } = await login({
      email: 'herbertbruce8@gmail.com',
      password: 'mmmmmm',
    });
    const token = data.token;
    axios.defaults.headers.common['Authorization'] = token;
    const res = await getCompanies();
    expect(res.data.data[0].name).toEqual('Netbritz');
    // console.log('response', res.data);
    // console.log('Token', token);
  });
});
