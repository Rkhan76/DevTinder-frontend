export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

// Output: 26 Jul, 04:45 AM
