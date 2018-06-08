import Item from "model/items/Item";

export default class Drop{
    item : Item;
    // Keep parsing array as long as the rate succeeds.
    rates : number[];
}