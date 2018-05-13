import * as React from 'react';
import { SortOrder } from 'model/Sorting';

interface ISortButtonProps {
    order: SortOrder;
    txt: string;
    toggle: () => void;
}

interface ISortButtonState {

}

export default class SortButton extends React.Component<ISortButtonProps, ISortButtonState>{
    constructor(props: ISortButtonProps) {
        super(props);
    }

    render() {
        let icon = 'angle-up';
        if (this.props.order < 0) {
            icon = 'angle-down';
        }
        return (
            <button onClick={this.props.toggle}>
                {this.props.txt}
                <i className={`fa fa-${icon}`}></i>
            </button>
        );
    }
}