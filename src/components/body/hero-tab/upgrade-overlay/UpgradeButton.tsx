import * as React from 'react';
import Hero from 'model/Hero';
import HeroHelper from 'business/HeroHelper';
import UpgradeOverlay from './UpgradeOverlay';

interface IUpgradeButtonProps {
    hero: Hero;
}

interface IUpgradeButtonState {
    overlayDisplayed: boolean;
}

export default class UpgradeButton extends React.Component<IUpgradeButtonProps, IUpgradeButtonState>{
    constructor(props: IUpgradeButtonProps) {
        super(props);
        this.state = { overlayDisplayed: false };
    }

    render() {
        if (!this.isMaxRank) {
            return (
                <>
                    <button className={`input-center`} disabled={!this.canRankUp()} onClick={this.displayOverlay}>Rank up</button>
                    <UpgradeOverlay hero={this.props.hero} doCancel={this.hideOverlay} display={this.state.overlayDisplayed} />
                </>
            );
        }
        return null;
    }

    isMaxRank = () => {
        return HeroHelper.isMaxRank(this.props.hero);
    }

    canRankUp = () => {
        return HeroHelper.isMaxLevel(this.props.hero);
    }

    displayOverlay = () => {
        this.setState({ overlayDisplayed: true });
    }

    hideOverlay = () => {
        this.setState({ overlayDisplayed: false });
    }
}