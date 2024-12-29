'use server';

import { cookies } from 'next/headers';

import {
  fetchGraphqlStatic,
  FetchResult,
  GraphqlRequestOptions,
} from './fetch-config';

export async function fetchGraphQLServer<TData, V>({
  document,
  variables,
  apiSecret,
  config,
}: Omit<GraphqlRequestOptions<TData, V>, 'token'>): Promise<
  FetchResult<TData>
> {
  const getCookies = await cookies();
  const token = getCookies.get('next-auth.session-token')?.value ?? '';

  return fetchGraphqlStatic({ document, apiSecret, config, variables, token });
}
