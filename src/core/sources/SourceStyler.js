export function SourceStyler({ data, elements: { sources } }, i, defaultWidth, defaultHeight) {
    const ratio = defaultWidth / defaultHeight;
    let newHeight = 0;

    /**
     * This method takes care of setting sources dimensions.
     * Unfortunately wa cannot only set max width and max height and allow the sources to scale themselves,
     * due tu Youtube source which dimensions needs to be set in advance.
     * In this case we are calculating dimensions mathematically.
     */
    this.styleSize = () => {
        newHeight = data.maxSourceWidth / ratio;

        // wider than higher
        if (newHeight < data.maxSourceHeight) {
            if (defaultWidth < data.maxSourceWidth) {
                newHeight = defaultHeight;
            }
            return updateDimensions();
        }

        // higher than wider
        if (defaultHeight > data.maxSourceHeight) {
            newHeight = data.maxSourceHeight;
        } else {
            newHeight = defaultHeight;
        }

        updateDimensions();
    };

    const updateDimensions = () => {
        const style = sources[i].current.style;
        style.width = newHeight * ratio + 'px';
        style.height = newHeight + 'px';
    }
}
