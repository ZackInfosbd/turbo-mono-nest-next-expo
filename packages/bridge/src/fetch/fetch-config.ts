import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

import { print } from 'graphql';

export interface GraphqlRequestOptions<TData, V> {
  apiSecret?: string;
  config?: RequestInit;
  document: TypedDocumentNode<TData, V>;
  token?: string;
  url?: string;
  variables?: V;
}

export interface FetchResult<TData> {
  data?: TData;
  error?: string;
}

export async function fetchGraphqlStatic<TData, V>({
  document,
  variables,
  config,
  token,
  apiSecret,
  url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
}: GraphqlRequestOptions<TData, V>): Promise<FetchResult<TData>> {
  const query = print(document);

  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : null),
      ...(apiSecret ? { 'X-API-Secret': apiSecret } : null),
    },
    body: JSON.stringify({ query, variables }),
    ...config,
  }).then(async (res) => {
    const { data, errors } = await res.json();
    if (errors) {
      return { error: JSON.stringify(errors[0].message) };
    }

    return { data };
  });
}
