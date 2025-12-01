export function getInitialsFromFullName (fullName: string): string {
  if (!fullName || typeof fullName !== 'string') {
    return ''
  }

  const parts = fullName.trim().split(' ')

  const validParts = parts.filter(part => part.length > 0)
  if (validParts.length === 0) {
    return ''
  } else if (validParts.length === 1) {
    return validParts[0][0].toUpperCase()
  } else {
    const firstName = validParts[0]
    const lastName = validParts[validParts.length - 1]

    const firstInitial = firstName[0].toUpperCase()
    const lastInitial = lastName[0].toUpperCase()

    return firstInitial + lastInitial
  }
}
