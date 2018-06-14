import { NomAndClassesPipe } from './nom-classes-user.pipe';

describe('nomAndClasses', () => {
  it('create an instance', () => {
    const pipe = new NomAndClassesPipe();
    expect(pipe).toBeTruthy();
  });
});
