export default function() {
  const nowDate = new Date()
  const year = nowDate.getFullYear()
  let month = nowDate.getMonth() + 1
  let day = nowDate.getDate()
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  return year + '-' + month + '-' + day
}
