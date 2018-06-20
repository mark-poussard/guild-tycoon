export enum TabType {
    HEROES = 'heroes',
    IMPROVEMENTS = 'improvements',
    CFH = 'cfh',
    QUESTS = 'quests',
    ITEMS = 'items',
    LOG = 'log'
}

type Listener = (tab: TabType) => void;

class NavigationStore {
    listener: Listener;

    constructor() {
    }

    navigateTo = (tab: TabType) => {
        this.listener(tab);
    }

}

export default new NavigationStore();