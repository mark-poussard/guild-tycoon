import Item from "model/Item";

export default class Drop{
    item : Item;
    // Keep parsing array as long as the rate succeeds.
    rates : number[];
}