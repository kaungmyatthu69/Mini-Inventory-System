export function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function formatFullDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`
}

export function statusClass(s: string) {
  const map: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-600',
    completed: 'bg-emerald-50 text-emerald-600',
    cancelled: 'bg-red-50 text-red-600',
    refunded: 'bg-purple-50 text-purple-600',
  }
  return map[s] || 'bg-gray-50 text-gray-600'
}

export function getErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const axiosErr = err as { response?: { data?: { message?: string } } }
    return axiosErr.response?.data?.message || fallback
  }
  return 'Something went wrong. Please try again.'
}
