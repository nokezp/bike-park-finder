import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/generated/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations'
      ],
      config: {
        enumsAsTypes: true,
        skipTypename: true,
        avoidOptionals: false,
        maybeValue: 'T | null | undefined',
      },
    },
  },
};

export default config; 