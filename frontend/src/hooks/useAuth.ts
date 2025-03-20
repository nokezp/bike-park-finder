import { useCallback } from 'react';
import { useMutation, gql } from 'urql';

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;

export function useAuth() {
  const [{ data: loginData, error: loginError }, login] = useMutation(LOGIN_MUTATION);
  const [{ data: registerData, error: registerError }, register] = useMutation(REGISTER_MUTATION);

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      const result = await login({ input: { email, password } });
      if (result.data?.login.token) {
        localStorage.setItem('token', result.data.login.token);
      }
      return result;
    },
    [login]
  );

  const handleRegister = useCallback(
    async (username: string, email: string, password: string) => {
      const result = await register({ input: { username, email, password } });
      if (result.data?.register.token) {
        localStorage.setItem('token', result.data.register.token);
      }
      return result;
    },
    [register]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
  }, []);

  return {
    login: handleLogin,
    register: handleRegister,
    logout,
    loginError,
    registerError,
    isAuthenticated: !!localStorage.getItem('token'),
  };
} 