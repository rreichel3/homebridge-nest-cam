import { NestSession } from '../src/nest/session';
import { NestConfig } from '../src/nest/models/config';
import { auth } from '../src/nest/connection';

test('getSessionInfo works as expected', async () => {
  expect.assertions(1);
  const issueToken = process.env.ISSUE_TOKEN || '';
  const cookies = process.env.COOKIES || '';
  const accessToken = await auth(issueToken, cookies);
  if (accessToken) {
    const config: NestConfig = {
      platform: 'test',
      fieldTest: false,
      access_token: accessToken,
    };
    const user = new NestSession(config);
    const session = await user.getSessionInfo();
    return expect(session).toBeDefined();
  } else {
    throw new Error('Could not connect');
  }
});
