class ObjectUtils {
    getValues = (obj: any) => {
        return Object.keys(obj).map((key) => obj[key]);
    }
}

export default new ObjectUtils();