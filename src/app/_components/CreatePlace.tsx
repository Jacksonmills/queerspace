"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { api } from "@/trpc/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function CreatePlace({
  name: initialName = "",
  address: initialAddress = "",
}: {
  name: string;
  address: string;
}) {
  const router = useRouter();

  const [name, setName] = useState(initialName);
  const [address, setAddress] = useState(initialAddress);

  const createPlace = api.place.create.useMutation({
    onSuccess: () => {
      setName("");
      setAddress("");

      router.refresh();
    },
  });

  useEffect(() => {
    setName(initialName);
    setAddress(initialAddress);
  }, [initialName, initialAddress]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPlace.mutate({
          name,
          address,
        });
      }}
      className="flex flex-col gap-2"
    >
      <Input
        type="hidden"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="hidden"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button type="submit" disabled={createPlace.isLoading || name === '' && address === ''}>
        {createPlace.isLoading ? "Adding..." : name === '' && address === '' ? "No space selected" : `Add ${name}`}
      </Button>
      {createPlace.error && (
        <p>Something went wrong! {createPlace.error.message}</p>
      )}
    </form>
  );
}
