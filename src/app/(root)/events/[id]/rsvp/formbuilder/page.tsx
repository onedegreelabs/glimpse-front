'use client';
import {useState} from 'react';

import RsvpFormBuilder from './sections/RsvpFormBuilder/RsvpFormBuilder';
import PendingApproval from './sections/PendingApproval/PendingApproval';
import Approved from './sections/Approved/Approved';
import Rejected from './sections/Rejected/Rejected';

type PageType = 'default' | 'pending' | 'approve' | 'reject';

export default function RsvpFormBuilderPage() {
  const [page, setPage] = useState<PageType>('default');

  return (
    <>
      {page === 'default' && <RsvpFormBuilder setPage={setPage} />}
      {page === 'pending' && <PendingApproval />}
      {page === 'approve' && <Approved />}
      {page === 'reject' && <Rejected />}
    </>
  );
}
