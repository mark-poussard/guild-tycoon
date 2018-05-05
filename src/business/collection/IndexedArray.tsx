
type KeyExtractor<K,V> = (obj : V) => K;

export default class IndexedArray<K,V>{
    extractor : KeyExtractor<K,V>;
    internalMap : Map<K,V>;

    constructor(extractor : KeyExtractor<K,V>){
        this.extractor = extractor;
        this.internalMap = new Map<K,V>();
    }

    add = (obj : V) => {
        this.internalMap.set(this.extractor(obj), obj);
    }

    get = (key : K) => {
        return this.internalMap.get(key);
    }

    contains = (key : K) => {
        return this.internalMap.has(key);
    }

    size = () => {
        return this.internalMap.size;
    }

    asArray = () => {
        return Array.from(this.internalMap.values());
    }
}