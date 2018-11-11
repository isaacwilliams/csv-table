
export const isIncluded = (exclusionList) => (headerValue) => {
    if (!exclusionList) return true;
    return exclusionList.indexOf(headerValue) === -1
};
