import {
    IMAGE_TYPE,
    INVALID_TYPE,
    VIDEO_TYPE,
    YOUTUBE_TYPE,
} from "../../../constants/coreConstants";
import { SourceTypeGetterHelpers } from "./SourceTypeGetterHelpers";

/**
 * @constructor
 */
export function SourceTypeGetter(
    {
        collections: { xhrs },
        injector: {
            dom: {
                getXMLHttpRequest
            }
        }
    }
) {
    let url = '';
    let sourceType = null;
    let callbackSourceType = null;
    let xhr;

    this.setUrlToCheck = (urlToCheck) => {
        url = urlToCheck;
    };

    /**
     * Asynchronous method takes callback which will be called after source type is received with source type as param.
     * @param { Function } callback
     */
    this.getSourceType = (callback) => {
        if (SourceTypeGetterHelpers.isUrlYoutubeOne(url)) {
            sourceType = YOUTUBE_TYPE;
            return callback(sourceType);
        }
        callbackSourceType = callback;
        checkSourceTypeUsingXhr();
    };

    const checkSourceTypeUsingXhr = () => {
        xhr = getXMLHttpRequest();
        xhrs.push(xhr);
        xhr.open('GET', url, true);
        xhr.onreadystatechange = onRequestStateChange;
        xhr.send();
    };

    const onRequestStateChange = () => {
        if (xhr.readyState !== 2) {
            return;
        }
        if (xhr.status !== 200) {
            sourceType = INVALID_TYPE;
            abortRequestAndResolvePromise();
            return;
        }
        setSourceTypeDependingOnResponseContentType(
            SourceTypeGetterHelpers.getTypeFromResponseContentType(
                xhr.getResponseHeader('content-type')
            )
        );
        abortRequestAndResolvePromise();
    };

    const abortRequestAndResolvePromise = () => {
        xhr.abort();
        callbackSourceType(sourceType);
    };

    const setSourceTypeDependingOnResponseContentType = (type) => {
        switch (type) {
            case IMAGE_TYPE:
                sourceType = IMAGE_TYPE;
                break;
            case VIDEO_TYPE:
                sourceType = VIDEO_TYPE;
                break;
            default:
                sourceType = INVALID_TYPE;
        }
    };
}