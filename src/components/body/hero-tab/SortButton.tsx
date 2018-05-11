import * as React from 'react';
import { SortOrder } from 'model/Sorting';

interface ISortButtonProps {
    order: SortOrder;
    txt: string;
    doToggle: () => void;
}

interface ISortButtonState {

}

export default class SortButton extends React.Component<ISortButtonProps, ISortButtonState>{
    constructor(props: ISortButtonProps) {
        super(props);
    }

    render() {
        let icon = null;
        switch (this.props.order) {
            case SortOrder.ASC:
                icon = 'angle-up';
                break;
            case SortOrder.DESC:
                icon = 'angle-down';
                break
        }
        return (
            <button onClick={this.props.doToggle}>
                {this.props.txt}
                <i className={`fa fa-${icon}`} />
            </button>
        );
    }
}