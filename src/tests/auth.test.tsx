import { login } from './api';

describe('Authentication', () => {
  test('should bring an error when login fails ', async () => {
    // expect.assertions(1);
    const expected = {
      success: false,
      error: 'Wrong crendetials',
    };
    const res = await login({
      email: 'herbertbruce8@gmail.com',
      password: 'mmmmmmnh',
    });
    expect(res.data).toEqual(expected);
    // console.log('response', res.data);
    // console.log('am here');
  });

  test('should login successfuly ', async () => {
    const res = await login({
      email: 'herbertbruce8@gmail.com',
      password: 'mmmmmm',
    });
    // console.log('response', res.data.data);
    expect(res.data.data.name).toEqual('Herbert Kavuma');
  });
});
