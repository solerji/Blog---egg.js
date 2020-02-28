const moment = require('moment')
export default function format(time) {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}