import { createTransformer } from 'babel-jest';
import svgTransformer from 'jest-svg-transformer';

const transformer = createTransformer();

export default {
  ...transformer,
  process(sourceText, sourcePath, config, transformOptions) {
    if (sourcePath.endsWith('.svg')) {
      return svgTransformer.process(
        sourceText,
        sourcePath,
        config,
        transformOptions
      );
    }
    return transformer.process(
      sourceText,
      sourcePath,
      config,
      transformOptions
    );
  },
};
