import Class from "model/Class";

class ClassHelper{

    computeClassList = (cls : Class, atRank : number = null) => {
        const result : string[] = [];
        if(atRank == null || cls.onRank <= atRank){
            result.push(cls.name)
        }
        while(cls.previous){
            cls = cls.previous;
            if(atRank == null || cls.onRank <= atRank){
                result.push(cls.name)
            }
        }
        return result;
    }

}

export default new ClassHelper();