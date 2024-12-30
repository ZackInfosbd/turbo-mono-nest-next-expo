import {
  fetchGraphqlStatic,
  FetchResult,
  GraphqlRequestOptions,
} from './fetch-config';

export async function fetchGraphQLClient<TData, V>({
  document,
  variables,
  apiSecret,
  config,
}: Omit<
  GraphqlRequestOptions<TData, V>,
  'token'
>): Promise<FetchResult<TData> | null> {
  try {
    const token = await fetch('/api/auth/token').then(async (res) => {
      if (!res.ok) {
        throw new Error(
          `Log from fetchGraphQLClient - Failed to fetch token: ${res.statusText}`,
        );
      }

      return res.json();
    });

    return await fetchGraphqlStatic({
      document,
      apiSecret,
      config,
      variables,
      token,
    });
  } catch (error) {
    console.error('Log from fetchGraphQLClient - GraphQL Client Error:', error);

    return null; // Return null to indicate failure
  }
}
