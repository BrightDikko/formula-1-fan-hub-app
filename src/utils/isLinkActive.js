// True when the given hash matches the current route
export const isLinkActive = (currentPath, targetHash) =>
    targetHash === ''
        ? currentPath === '/' || currentPath === ''
        : currentPath === targetHash;