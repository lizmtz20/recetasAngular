import { difficultPipe } from './difficult.pipe';

describe('difficultPipe', () => {
  it('create an instance', () => {
    const pipe = new difficultPipe();
    expect(pipe).toBeTruthy();
  });
});
