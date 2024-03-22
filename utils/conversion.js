export function rgbaToHex(red, green , blue, alpha) {
    function componentToHex(color) {
        const hex = color.toString(16)
        return hex.length == 1 ? "0" + hex : hex
    }

    let hex = `#${componentToHex(red)}${componentToHex(green)}${componentToHex(blue)}`

    if(alpha !== undefined) {
        const a = Math.round(alpha * 255)

        hex += componentToHex(a)
    }

    return hex
}

export function hexToRgb(hex) {
    hex = hex.replace(/^#/, '')

    let red = parseInt(hex.substring(0, 2), 16)
    let green = parseInt(hex.substring(2, 4), 16)
    let blue = parseInt(hex.substring(4, 6), 16)

    return [red, green, blue]
}

export function hexToRgba(hex) {
    hex = hex.replace(/^#/, '')

    let red = parseInt(hex.substring(0, 2), 16)
    let green = parseInt(hex.substring(2, 4), 16)
    let blue = parseInt(hex.substring(4, 6), 16)

    return `rgba(${red},${green},${blue},255)` 
}