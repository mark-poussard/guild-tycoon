import * as React from 'react';
import Tab, { ITabProps } from './Tab';

interface ITabsProps {
    defaultTab ?: string;
}

interface ITabsState {
    currentTab: string;
}

export default class Tabs extends React.Component<ITabsProps, ITabsState>{
    childTabs: { [name: string]: React.ReactChild }

    constructor(props: ITabsProps) {
        super(props);
        this.state = { currentTab: null };
        this.childTabs = {};
    }

    componentDidMount() {
        React.Children.forEach(this.props.children, (child, index) => {
            if (React.isValidElement<ITabProps>(child)) {
                this.childTabs[child.props.name] = child;
            }
        });
        const childTabKeys = Object.keys(this.childTabs)
        if (childTabKeys.length > 0) {
            if(this.props.defaultTab){
                this.setState({ currentTab: this.props.defaultTab });
            }
            else{
                this.setState({ currentTab: childTabKeys[0] });
            }
        }
    }

    render() {
        const tabsHeader: JSX.Element[] = [];
        for (const name of Object.keys(this.childTabs)) {
            tabsHeader.push(<button key={`TAB_HEADER_${name}`} onClick={this.changeTab(name)}>{name}</button>)
        }
        return (
            <div>
                <div>
                    {tabsHeader}
                </div>
                {this.state.currentTab &&
                    this.childTabs[this.state.currentTab]}
            </div>
        );
    }

    changeTab = (name: string) => {
        return () => {
            this.setState({ currentTab: name });
        }
    }
}