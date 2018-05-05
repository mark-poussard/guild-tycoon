export enum TabType {
    HEROES = 'heroes',
    RECRUIT = 'recruit'
}

type Listener = (tab : TabType) => void;

class NavigationStore{
    listener : Listener;

    constructor(){
    }

    navigateTo = (tab : TabType) => {
        this.listener(tab);
    }
    
}

export default new NavigationStore();