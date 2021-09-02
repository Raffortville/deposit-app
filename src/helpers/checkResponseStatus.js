export const checkResponseStatus = status => {

    if (status >= 200 && status < 300) return 'success'
    if (status >= 402 && status < 499) return 'error client'
    if (status === 401) return 'error authorization'
    
}