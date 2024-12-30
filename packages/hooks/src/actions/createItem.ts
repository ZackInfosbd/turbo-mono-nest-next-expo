'use server';

import {
  CreateItemDocument,
  fetchGraphQLServer,
  namedOperations,
} from '@repo/bridge/src';
import { revalidateTag } from 'next/cache';

import { formSchemaCreateItem } from '../schemas';

export async function createItem(formData: FormData) {
  const input = Object.fromEntries(formData.entries());

  const result = formSchemaCreateItem.safeParse(input);

  if (result.success) {
    const { data } = await fetchGraphQLServer({
      document: CreateItemDocument,
      variables: { createItemInput: { name: result.data.name } },
    });

    if (data) {
      revalidateTag(namedOperations.Query.MyItems);
    }
  } else {
    console.error('Validation failed:', result.error);
  }
}
