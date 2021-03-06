import { NestStructure } from '../src/nest/structure';
import { NestConfig } from '../src/nest/models/config';
import { auth, getCameras } from '../src/nest/connection';

test('getFaces works as expected', async () => {
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
    const cameraInfo = (await getCameras(config))[0];
    const structure = new NestStructure(cameraInfo, config);
    return expect(structure.getFaces()).resolves.toHaveLength(0);
  } else {
    throw new Error('Could not connect');
  }
});
