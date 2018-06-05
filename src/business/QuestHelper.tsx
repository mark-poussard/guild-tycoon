class QuestHelper {

    // Linear success chance between 80% to 120% of the reqPower
    // <80% -> 0% chance success | >120% -> 100% chance success
    computeSuccessRate = (questPower: number, heroPower: number) => {
        return (5 * heroPower) / (2 * questPower) - 2;
    }
}

export default new QuestHelper();