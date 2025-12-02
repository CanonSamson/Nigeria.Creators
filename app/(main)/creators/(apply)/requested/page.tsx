import { Suspense } from 'react'
import RequestedContent from './RequestedContent'

export default function Requested() {
  return (
    <Suspense fallback={null}>
      <RequestedContent />
    </Suspense>
  )
}
