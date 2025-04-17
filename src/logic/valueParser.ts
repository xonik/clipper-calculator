function getMultiplier(key: string | undefined) {
    switch(key){
        case 'm': return 1/1000
        case 'k': return 1000
        case 'M': return 1000000
        default: return 1
    }
}

export function parseComponentValue(value?: string) {
    if(!value || value === '') return 0

    // allows multiplier to be used as
    const matches = value.match(/(?<firstDigits>[0-9.]+)(?<multiplier>[mkM]?)(?<fraction>[0-9]*)/)
    if(!matches) return 0

    const firstDigits = matches.groups?.firstDigits ? parseFloat(matches.groups.firstDigits) : 0
    const multiplier = getMultiplier(matches.groups?.multiplier)
    const fraction = matches.groups?.fraction ? parseFloat(`0.${matches.groups.fraction}`) : 0

    // Now, while this DOES support both a dot in firstDigits and a separate fraction at the same time, it
    // yields strange results (e.g. 1.5k5 = 2000)
    return ((firstDigits + fraction) * multiplier)
}

export function printComponentValue(value: number, unit= ''){
    if(value < 1) {
        return `${value * 1000}m${unit}`
    } else if(value < 1000) {
        return `${value}${unit}`
    } else if(value < 1000000) {
        return `${value / 1000}k${unit}`
    } else {
        return `${value / 1000000}M${unit}`
    }
}