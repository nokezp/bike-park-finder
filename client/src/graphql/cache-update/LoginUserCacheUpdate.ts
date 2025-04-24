import {
  AuthPayload,
  MutationLoginArgs,
  WithTypename
} from "../../lib/graphql/generated/graphql-operations";
import { setToken } from "../../lib/graphql/urqlClient";
import { Cache } from '@urql/exchange-graphcache';

const loginUserCacheUpdate = (
  parent: { login: WithTypename<AuthPayload> },
  args: MutationLoginArgs,
  cache: Cache
) => {
  const result = {
    login: {
      ...parent.login,
      token: parent.login.token || ''
    }
  };
  if (result?.login?.token) {
    setToken(result.login.token);
    cache.invalidate('Query', 'me');
  }
};

export default loginUserCacheUpdate;
