/**
 * 获取cookie
 * @param cookie 
 * @param variable 
 * @returns 
 */
export function getQueryCookie(cookie: string, variable: string) {
  const vars = cookie.split(';')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0].indexOf(variable) !== -1) { return pair[1] }
  }
  return (false)
}
