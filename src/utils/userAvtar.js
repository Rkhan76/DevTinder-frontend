export const getAvatarColor = (name) => {
  // Default color if name is invalid
  const defaultColor = 'bg-gray-300'

  // Validate input
  if (!name || typeof name !== 'string') return defaultColor

  const trimmedName = name.trim()
  if (!trimmedName) return defaultColor

  // Color palette (Tailwind CSS classes)
  const colors = [
    'bg-red-300', // 0
    'bg-blue-300', // 1
    'bg-green-300', // 2
    'bg-yellow-300', // 3
    'bg-purple-300', // 4
    'bg-pink-300', // 5
    'bg-indigo-300', // 6
    'bg-teal-300', // 7
    'bg-orange-300', // 8
    'bg-cyan-300', // 9
    'bg-lime-300', // 10
    'bg-amber-300', // 11
    'bg-emerald-300', // 12
    'bg-violet-300', // 13
    'bg-fuchsia-300', // 14
    'bg-rose-300', // 15
  ]

  // Generate consistent hash
  let hash = 0
  for (let i = 0; i < trimmedName.length; i++) {
    hash = trimmedName.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash // Convert to 32bit integer
  }

  // Ensure index is within bounds
  const index = Math.abs(hash) % colors.length
  return colors[index] || defaultColor
}
// Function to get initials from name
export const getInitials = (name) => {
  if (!name || typeof name !== 'string') return ''

  const trimmedName = name.trim()
  if (!trimmedName) return ''

  const nameParts = trimmedName.split(/\s+/).filter((part) => part.length > 0)

  // Handle single-word names (return first 2 letters)
  if (nameParts.length === 1) {
    return nameParts[0].slice(0, 2).toUpperCase()
  }

  // Handle multiple words (first letter of first and last words)
  return (
    nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
  ).toUpperCase()
}
