
type KeyExtractor<K, V> = (obj: V) => K;

export default class IndexedArray<K, V>{
    extractor: KeyExtractor<K, V>;
    internalMap: Map<K, V>;

    constructor(extractor: KeyExtractor<K, V>, ...elements : V[]) {
        this.extractor = extractor;
        this.internalMap = new Map<K, V>();
        this.addAll(elements);
    }

    add = (obj: V) => {
        this.internalMap.set(this.extractor(obj), obj);
    }

    addAll = (all: V[]) => {
        for (let element of all) {
            this.add(element);
        }
    }

    get = (key: K) => {
        return this.internalMap.get(key);
    }

    contains = (key: K) => {
        return this.internalMap.has(key);
    }

    size = () => {
        return this.internalMap.size;
    }

    asArray = () => {
        return Array.from(this.internalMap.values());
    }

    [Symbol.iterator]() {
        let mapIterator = this.internalMap[Symbol.iterator]();
        return {
            next: () => {
                let itResult: IteratorResult<[K, V]> = mapIterator.next();
                let value = (itResult.value)?itResult.value[1]:null;
                return { value: value, done: value == null };
            }
        }
    };
}