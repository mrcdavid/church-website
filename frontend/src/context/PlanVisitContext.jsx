import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import PlanVisitModal from '../components/PlanVisitModal.jsx'

// Lets any button on the site open the "Plan Your Visit" modal.
const PlanVisitContext = createContext({ openPlanVisit: () => {} })

export function PlanVisitProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openPlanVisit = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  const value = useMemo(() => ({ openPlanVisit }), [openPlanVisit])

  return (
    <PlanVisitContext.Provider value={value}>
      {children}
      <PlanVisitModal open={open} onClose={close} />
    </PlanVisitContext.Provider>
  )
}

export const usePlanVisit = () => useContext(PlanVisitContext)
