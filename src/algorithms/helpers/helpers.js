
export const sequenceGenerator = (start, end) => {
    return Array.from({ length: end - start }, (_, i) => i + start)
}