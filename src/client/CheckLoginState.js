const checkLoginState = () => {
    if(sessionStorage.getItem('thinkfreeuser')){
        return true;
    }else{
        return false;
    }
}

export default checkLoginState;