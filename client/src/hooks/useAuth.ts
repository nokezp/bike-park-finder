import { gql } from 'urql';

export const MeDocument = gql(`
  query Me {
    me {
      id
      name
      username
      email
      createdAt
      updatedAt
    }
  }
`);

export const LoginDocument = gql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`);

export const RegisterDocument = gql(`
  mutation Register($email: String!, $password: String!, $username: String!, $name: String!) {
    register(email: $email, password: $password, username: $username, name: $name) {
      token
    }
  }
`);
