import * as React from 'react';
import * as fbEmitter from 'fbemitter';
import Hero from 'model/Hero';
import Overlay from 'components/generic/Overlay';
import BaseHero from 'model/BaseHero';
import { HeroDataArray } from 'data/HeroData';
import ItemCollection from 'model/serializable/ItemCollection';
import ItemInfo from 'components/body/items-tab/ItemInfo';
import GameModelStore from 'store/game-model/GameModelStore';
import './UpgradeOverlay.css'

interface IUpgradeOverlayProps {
    display: boolean;
    doCancel: () => void;
    hero: Hero;
}

interface IUpgradeOverlayState {
    items: ItemCollection;
}

export default class UpgradeOverlay extends React.Component<IUpgradeOverlayProps, IUpgradeOverlayState> {
    storeSubscribe: fbEmitter.EventSubscription;

    heroData: BaseHero;
    constructor(props: IUpgradeOverlayProps) {
        super(props);
        this.heroData = HeroDataArray.get(this.props.hero.data);
        this.state = { items: Object.assign({}, GameModelStore.getState().items) };
    }

    componentDidMount() {
        this.storeSubscribe = GameModelStore.addListener(() => {
            this.setState({
                items: Object.assign({}, GameModelStore.getState().items)
            });
        });
    }

    componentWillUnmount() {
        this.storeSubscribe.remove();
    }

    render() {
        const requirements = this.heroData.upgradeRequirements[this.props.hero.rank];
        if (requirements) {
            const requireItems: JSX.Element[] = [];
            for (const wrapper of requirements) {
                const hasEnough = this.state.items[wrapper.item.id] >= wrapper.quantity;
                const classname = (hasEnough) ? 'upgrade-items-enough' : 'upgrade-items-not-enough';
                requireItems.push(<ItemInfo key={`REQ_ITEM_${wrapper.item.id}`} className={classname} item={wrapper.item} quantity={wrapper.quantity} />);
            }
            return (
                <Overlay display={this.props.display} closeOverlayCallback={this.props.doCancel} width={30} height={30}>
                    {requireItems}
                    <button disabled={!this.canUpgrade()}>Rank up</button>
                </Overlay>
            );
        }
        return null;
    }

    canUpgrade = () => {
        const requirements = this.heroData.upgradeRequirements[this.props.hero.rank];
        for (const wrapper of requirements) {
            const hasEnough = this.state.items[wrapper.item.id] >= wrapper.quantity;
            if (!hasEnough) {
                return false;
            }
        }
        return true;
    }
}