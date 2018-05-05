import * as React from 'react';

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
}