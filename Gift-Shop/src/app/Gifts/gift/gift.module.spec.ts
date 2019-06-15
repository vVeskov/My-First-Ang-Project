import { GiftModule } from './gift.module';

describe('GiftModule', () => {
  let giftModule: GiftModule;

  beforeEach(() => {
    giftModule = new GiftModule();
  });

  it('should create an instance', () => {
    expect(giftModule).toBeTruthy();
  });
});
