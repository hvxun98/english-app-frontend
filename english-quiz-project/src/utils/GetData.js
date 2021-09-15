export const getToken = () => {
    const token = localStorage.getItem("_token");
    return token;
}

export const getRefreshToken = () => {
    const rfToken = localStorage.getItem("_rfToken");
    return rfToken;
}

export const getTimeExpr = () => {
    const time = localStorage.getItem("_timeExpr");
    return time;
}