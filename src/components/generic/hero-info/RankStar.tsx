import * as React from 'react';
import Hero from 'model/Hero';

interface IRankStarProps {

}

interface IRankStarState {

}

export default class RankStar extends React.Component<IRankStarProps, IRankStarState>{
    constructor(props: IRankStarProps) {
        super(props);
    }

    render() {
        return (
            <span>
                <img src="img/star.png" />
            </span>
        );
    }

    static generateRank = (rank: number) => {
        const result: JSX.Element[] = [];
        for (let i = 0; i < rank; i++) {
            result.push(<RankStar key={`RANKSTAR_${i}`} />);
        }
        return result;
    }
}