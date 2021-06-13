import fetch from 'isomorphic-unfetch'
import { SERVICE_HOST } from '../constants/serverEev';

/**
 * globalfectch
 * Use only in server side
 * @param {String} fetch path
 */ 
export default async function globalfectch(path, options = {}) {
  const { byProxy, headers: customHeader, useAbsUrl, ...restOptions } = options
  const headers = { ...customHeader };
  let url = `${path}`
  if (useAbsUrl) {
    url = `${SERVICE_HOST}${url}`
  }
  const res = await fetch(
    url,
    {
      compress: false,
      headers,
      ...restOptions
    }
  )
  return {data: await res.json(), status: res.status }
}