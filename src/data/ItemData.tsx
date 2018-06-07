import Item from "model/Item";
import IndexedArray from "business/collection/IndexedArray";

export const ItemData = new IndexedArray<string, Item>(x => x.id);
ItemData.addAll([
    {
        id:"ITEM1"
    }
]);