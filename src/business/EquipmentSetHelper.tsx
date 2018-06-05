import EquipmentSet from "model/EquipmentSet";

class EquipmentSetHelper{
    computeBA = (set : EquipmentSet) => {
        let result = 0;
        if(set.head){
            result += set.head.ba;
        }
        if(set.torso){
            result += set.torso.ba;
        }
        if(set.hands){
            result += set.hands.ba;
        }
        if(set.legs){
            result += set.legs.ba;
        }
        if(set.feet){
            result += set.feet.ba;
        }
        if(set.leftHand){
            result += set.leftHand.ba;
        }
        if(set.rightHand){
            result += set.rightHand.ba;
        }
        return result;
    }
}

export default new EquipmentSetHelper();