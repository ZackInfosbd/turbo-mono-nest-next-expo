'use client';

import { useFormCreateItem } from '@repo/hooks/schemas';
import { Label } from '../atoms/label';
import { Input } from '../atoms/input';
import { Button } from '../atoms/button';
import { fetchGraphQLClient } from '@repo/bridge/src';
import { CreateItemDocument, namedOperations } from '@repo/bridge/src';
import { revalidate } from '@repo/hooks/actions';

export const FormCreateItemClient = () => {
  const { register, handleSubmit } = useFormCreateItem();

  // const handler = async ({ name }: { name: string }) => {
  //   const { data, error } = await fetchGraphQLClient({
  //     document: CreateItemDocument,
  //     variables: { createItemInput: { name } },
  //   });

  //   if (data) {
  //     revalidate(namedOperations.Query.MyItems);
  //   }

  //   if (error) {
  //     alert('Mutation failed.');
  //   }
  // };
  const handler = async ({ name }: { name: string }) => {
    try {
      const response = await fetchGraphQLClient({
        document: CreateItemDocument,
        variables: { createItemInput: { name } },
      });

      if (!response) {
        throw new Error(
          'Thrown from FormCreateItemClient -  No response from GraphQL client.',
        );
      }

      const { data, error } = response;

      if (data) {
        revalidate(namedOperations.Query.MyItems);
      }

      if (error) {
        console.error('Log from FormCreateItemClient:', error);
      }
    } catch (err) {
      console.error('from FormCreateItemClient Handler error:', err);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(handler)}>
      <Label title="Item">
        <Input {...register('name')} placeholder="Enter item name" />
      </Label>
      <Button>Create</Button>
    </form>
  );
};
