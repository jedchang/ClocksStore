export default function(time) {
  const date = new Date(time * 1000)
  const yyyy = date.getFullYear()
  const mm = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)
  const dd = (date.getDate() < 10 ? '0' : '') + date.getDate()
  const dateValue = yyyy + '-' + mm + '-' + dd
  return dateValue
}
