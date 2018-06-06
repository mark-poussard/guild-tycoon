export enum TabType {
    HEROES = 'heroes',
    RECRUIT = 'recruit',
    DUNGEON = 'dungeon',
    IMPROVEMENTS = 'improvements',
    CFH = 'cfh',
    QUESTS = 'quests'
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