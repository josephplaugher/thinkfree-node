const SetUrl = () => {
    //returns the correct url whether in dev or prod
    var url;
    if(process.env.NODE_ENV === 'development') {
        url = process.env.BASE_URL_DEV + "/newComment";
    } else {
        url = process.env.BASE_URL_PROD + "/newComment";
    }
    return url;
}

export default SetUrl;