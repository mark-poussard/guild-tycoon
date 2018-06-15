import * as React from 'react';
import Class from 'model/Class';
import ToolTip from 'components/generic/ToolTip';

interface IClassInfoProps{
    class : Class;
    forRank ?: number;
}

export default class ClassInfo extends React.Component<IClassInfoProps>{
    classList : string[];

    constructor(props : IClassInfoProps){
        super(props);
        this.classList = this.computeClassList(props.class, props.forRank);
    }

    static get defaultProps() {
        return {
            forRank : 10000
        }
      }

    render(){
        return (
            <ToolTip toolTipContent={this.renderClassDetails()} width={120}>
            {this.classList[0]}
            </ToolTip>
        );
    }

    renderClassDetails = () => {
        const result : JSX.Element[] = [];
        let i=0;
        let color = 'green';
        for(let className of this.classList){
            result.push(<div key={`CLASSNAME_${i++}`} style={{color:color}}>{className}</div>);
            color = 'white';
        }
        return result;
    }

    computeClassList = (cls : Class, forRank : number) => {
        const result : string[] = [];
        if(cls.onRank <= forRank){
            result.push(cls.name)
        }
        while(cls.previous){
            cls = cls.previous;
            if(cls.onRank <= forRank){
                result.push(cls.name)
            }
        }
        return result;
    }
}