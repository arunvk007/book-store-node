const getFilePath = (path: string) => {
    const pathToDb =  path.split(/\/|\\/).filter((item)=> item !== "uploads").join('/')

    return `${process.env.BASE_URL}/${pathToDb}`
}
export default getFilePath