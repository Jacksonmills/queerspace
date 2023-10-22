'use client';

import React from 'react';
import { Button } from './ui/button';
import { api } from '@/trpc/react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();
  const mutation = api.place.delete.useMutation();

  const handleDelete = () => {
    mutation.mutate({
      id,
    });

    router.refresh();
  };

  return (
    <>
      <Button onClick={handleDelete} size="icon" variant={`ghost`}><Trash2 /></Button>
      {mutation.error && <p>Something went wrong! {mutation.error.message}</p>}
    </>
  );
}
