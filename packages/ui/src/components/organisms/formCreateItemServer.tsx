import { Label } from '../atoms/label';
import { Input } from '../atoms/input';
import { Button } from '../atoms/button';
import { createItem } from '@repo/hooks/actions';

export const FormCreateItemServer = () => {
  async function handleCreateItem(formData: FormData) {
    const result = await createItem(formData);
    if (result) {
      throw result;
    }
  }

  return (
    <form className="flex flex-col gap-2" action={handleCreateItem}>
      <Label title="Item">
        <Input placeholder="Enter item name" name="name" />
      </Label>
      <Button type="submit">Create</Button>
    </form>
  );
};
