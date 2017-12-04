import regex from './regex';

describe('regex', () => {
  it('English', () => {
    expect('A beautiful mind.'.match(regex)).toEqual([
      'A',
      'beautiful',
      'mind',
    ]);
  });
  it('Deutsch', () => {
    expect('Intelligenz hoch 8.'.match(regex)).toEqual([
      'Intelligenz',
      'hoch',
      '8',
    ]);
    expect('ä ö ü ß'.match(regex)).toEqual(['ä', 'ö', 'ü', 'ß']);
    expect('Ä Ö Ü'.match(regex)).toEqual(['Ä', 'Ö', 'Ü']);
  });
  // it('中文', () => {
  //   expect('美在智慧。'.match(regex)).toEqual(['美', '在', '智', '慧']);
  // });
});
