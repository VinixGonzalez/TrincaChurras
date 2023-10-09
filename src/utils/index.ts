export const real = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
})

export const normalizeValue = (value: string): number => {
    return +value.replace(",",".");
}