import * as React from 'react';
import {SortOrder} from 'model/Sorting';

interface ISortButtonProps{
    order : SortOrder;
    txt : string;
    doToggle : () => void;
}

interface ISortButtonState{

}

export default class SortButton extends React.Component<ISortButtonProps, ISortButtonState>{
    constructor(props:ISortButtonProps){
        super(props);
    }

    render(){
        return(

        );
    }
}