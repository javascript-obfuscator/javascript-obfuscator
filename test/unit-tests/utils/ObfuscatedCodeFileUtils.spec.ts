import { expect } from 'chai';
import { ObfuscatedCodeFileUtils } from '../../../src/cli/utils/ObfuscatedCodeFileUtils';

describe('ObfuscatedCodeFileUtils', () => {
  let util: ObfuscatedCodeFileUtils;

  beforeEach(() => {
    util = new ObfuscatedCodeFileUtils('src/cli/', {
      output: 'src/cli/dist',
    });
  });

  it('should handle input path ending (or not ending) with forward slash', () => {
    const result = util.getOutputCodePath('src/cli/app.js');
    expect(result).equals('src/cli/dist/app.js');
  });
});
