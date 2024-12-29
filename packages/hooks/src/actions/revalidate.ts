'use server';

import { revalidateTag } from 'next/cache';

export async function revalidate(tag: string) {
  try {
    revalidateTag(tag);

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
