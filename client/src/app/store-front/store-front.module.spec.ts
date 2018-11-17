import { StoreFrontModule } from './store-front.module';

describe('StoreFrontModule', () => {
  let storeFrontModule: StoreFrontModule;

  beforeEach(() => {
    storeFrontModule = new StoreFrontModule();
  });

  it('should create an instance', () => {
    expect(storeFrontModule).toBeTruthy();
  });
});
