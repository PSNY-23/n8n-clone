'use client'

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";

export const Client = () => {
  const trpc = useTRPC();
  const {data: users} = useSuspenseQuery(trpc.getUsers.queryOptions())
  return (
    <div>
      <p>Client component</p>
      <p>{JSON.stringify(users)}</p>
    </div>
  )
}
