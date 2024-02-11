'use client';

import {getCurrentUser} from '@/services/auth';
import {useQuery} from '@tanstack/react-query';

export default function InitPage() {
  const {data, isPending, isError} = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });
  console.log(data);

  return null;
}
