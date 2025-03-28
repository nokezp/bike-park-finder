import {
  LoginMutation,
  MutationLoginArgs
} from "../../lib/graphql/generated/graphql-operations";
import { setToken } from "../../lib/graphql/urqlClient";
import { Cache } from '@urql/exchange-graphcache';

const loginUserCacheUpdate = (
  result: LoginMutation, 
  _args: MutationLoginArgs, 
  cache: Cache
) => {
  if (result?.login?.token) {
    setToken(result.login.token);
    cache.invalidate('Query', 'me');
  }
}

export default loginUserCacheUpdate;
