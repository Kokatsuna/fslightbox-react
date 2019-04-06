/**
 * @class
 * @param { FsLightbox.data.deviceType } deviceType
 * @param { FsLightbox.setters.setState | Function } setState
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference, isSourceDownEventTarget} } swipingProps
 */
export function SlideSwipingDown({ setters: { setState } }, swipingProps) {
    /** @var { MouseEvent | TouchEvent } event */
    let event;

    this.listener = (e) => {
        event = e;
        // TODO: TEST AND REFACTOR
        if (e.target.classList.contains('fslightbox-single-source')) {
            swipingProps.isSourceDownEventTarget = true;
        }
        preventDefaultIfNeeded();
        setIsSwipingSlideStateToTrue();
        setDownClientX();
        resetSwipedDifference();
    };

    const preventDefaultIfNeeded = () => {
        if (!event.target.tagName)
            return;
        if (event.target.tagName === 'VIDEO' || event.touches)
            return;
        event.preventDefault();
    };

    const setIsSwipingSlideStateToTrue = () => {
        setState({
            isSwipingSlides: true
        });
    };

    const setDownClientX = () => {
        (event.touches) ?
            swipingProps.downClientX = event.touches[0].clientX :
            swipingProps.downClientX = event.clientX;
    };

    const resetSwipedDifference = () => {
        swipingProps.swipedDifference = 0;
    }
}

