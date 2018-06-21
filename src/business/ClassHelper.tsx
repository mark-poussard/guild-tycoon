import Class from "model/Class";

class ClassHelper {

    computeClassList = (cls: Class, atRank: number = null) => {
        const result: string[] = [];
        if (atRank == null || cls.onRank <= atRank) {
            result.push(cls.name)
        }
        while (cls.previous) {
            cls = cls.previous;
            if (atRank == null || cls.onRank <= atRank) {
                result.push(cls.name)
            }
        }
        return result;
    }

    contains = (cls: Class, rank: number, klassList: string[]) => {
        const classList = this.computeClassList(cls, rank);
        for(const klass of klassList){
            if(classList.indexOf(klass) > -1){
                return true;
            }
        }
        return false;
    }

}

export default new ClassHelper();