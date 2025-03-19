import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-urql',
      ],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

export default config; 