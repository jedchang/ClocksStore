export default function(time) {
  let date = new Date(time * 1000)
  let yyyy = date.getFullYear()
  let mm = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)
  let dd = (date.getDate() < 10 ? '0' : '') + date.getDate()
  let dateValue = yyyy + '-' + mm + '-' + dd
  return dateValue
}
