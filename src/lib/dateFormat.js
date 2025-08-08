export const dateFormat = (date) => new Date(date).toLocaleDateString('en-US', {
  weekday: 'short',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
})