/**
 * @class
 * @param { SwipingTransitioner } swipingTransitioner
 */
export function SwipingSlideChanger(
    {
        setters: {
            setState
        },
        core: {
            sourceHoldersTransformer: { transformStageSourceHolders },
        }
    }, swipingTransitioner
) {
    /** @var {{previous: number | undefined , current: number, next: number | undefined}} stageSourcesIndexes */
    let stageSourcesIndexes;

    this.setStageSourcesIndexes = (indexes) => {
        stageSourcesIndexes = indexes;
    };

    this.changeSlideToNext = () => {
        callTransformsAndSetSlideTo(stageSourcesIndexes.next + 1);
        swipingTransitioner.addTransitionToCurrentAndNext();
    };

    this.changeSlideToPrevious = () => {
        callTransformsAndSetSlideTo(stageSourcesIndexes.previous + 1);
        swipingTransitioner.addTransitionToCurrentAndPrevious();
    };

    const callTransformsAndSetSlideTo = (slide) => {
        setState({
            slide: slide
        });
        transformStageSourceHolders().withoutTimeout();
    };
}