"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";
import { Button } from "./ui/button";

export default function CreatePlace() {
  const router = useRouter();
  const [payload, setPayload] = useState({
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
  });

  const createPlace = api.place.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPlace.mutate(payload);
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={payload.name}
        onChange={(e) => setPayload({ ...payload, name: e.target.value })}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Address"
        value={payload.address}
        onChange={(e) => setPayload({ ...payload, address: e.target.value })}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="number"
        placeholder="Latitude"
        value={payload.latitude}
        onChange={(e) =>
          setPayload({ ...payload, latitude: Number(e.target.value) })
        }
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="number"
        placeholder="Longitude"
        value={payload.longitude}
        onChange={(e) =>
          setPayload({ ...payload, longitude: Number(e.target.value) })
        }
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <Button type="submit" disabled={createPlace.isLoading}>
        {createPlace.isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
