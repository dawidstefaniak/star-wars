const getLastURLSegment = (url: string) => {
    if (!url) return null
    const parts = url.split('/')
    return parts.pop() || parts.pop()
}

const getQueryParamsByKey = (url: string, key: string) => {
    if (!url) return null
    const urlParams = new URLSearchParams(new URL(url).search)
    return urlParams.get(key)
}
export { getLastURLSegment, getQueryParamsByKey }
