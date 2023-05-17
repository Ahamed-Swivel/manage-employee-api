import type {Config} from 'jest';

export default async (): Promise<Config> => {
  return {
    verbose: true,
    testEnvironment: 'node',
    setupFiles: ["dotenv/config"],
    testTimeout: 90000
  };
};
