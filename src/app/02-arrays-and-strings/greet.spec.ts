import {greet} from './greet';

describe('greet', () => {
  it('should return phrase with passed name', () => {
    const result = greet('Mike');
    // expect(result).toBe('Welcome Mike'); // BAD!
    expect(result).toContain('Mike');
});

});
