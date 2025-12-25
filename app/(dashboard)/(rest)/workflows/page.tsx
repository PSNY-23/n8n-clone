
import { requireAuth } from '@/lib/auth-utils'
import React from 'react'

const Page = async() => {
  await requireAuth();
  return (
    <div>workflows</div>
  )
}

export default Page