
export const parseVisibility = (value) => {
    // For parse the visibility value, we need to chech the type and take decitions depending of it
    if (typeof value === "string") {
        if (value === "Private") return true
        return false 
    } else {
        if (value) return "Private"
        return "Public"
    }
}

export const toCapitalize = (text) => {
    const firstLetter = text.substr(0, 1).toUpperCase()
    return `${firstLetter}${text.substr(1)}`
}
