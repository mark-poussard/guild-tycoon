import * as React from 'react';
import Class from 'model/Class';
import ToolTip from 'components/generic/ToolTip';
import './ClassInfo.css'

interface IClassInfoProps{
    classList : string[];
}

export default class ClassInfo extends React.Component<IClassInfoProps>{

    constructor(props : IClassInfoProps){
        super(props);
    }

    render(){
        const classDetails = this.props.classList.length > 1;
        const classTxt = <span className='class-txt'>{this.props.classList[0]}</span>
        if(classDetails){
            return (
                <ToolTip toolTipContent={this.renderClassDetails()} width={120}>
                {classTxt}
                </ToolTip>
            );
        }
        return classTxt;
    }

    renderClassDetails = () => {
        const result : JSX.Element[] = [];
        let i=0;
        let color = 'green';
        for(let className of this.props.classList){
            result.push(<div key={`CLASSNAME_${i++}`} style={{color:color}}>{className}</div>);
            color = 'white';
        }
        return result;
    }
}