export function changeTheme(primaryColor) {
    if (primaryColor) document.documentElement.style.setProperty('--primary-color', primaryColor)
    // if (textColor) document.documentElement.style.setProperty('--text-color', textColor)
}
export function getActiveTextTheme() {
    return window.getComputedStyle(document.documentElement).getPropertyValue('--text-color')
}
export function getActiveBgTheme() {
    return window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color')
}
export function getPrimaryTheme() {
    return window.getComputedStyle(document.documentElement).getPropertyValue('--primary-color')
}
