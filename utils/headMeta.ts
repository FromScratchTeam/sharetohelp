export const setClientHeadTitle = (value: string) => {
  if (process.client) {
    document.title = `${value} | Share To Help` 
  }
}