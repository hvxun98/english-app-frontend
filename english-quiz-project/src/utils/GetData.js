export const getToken = () => {
    const token = localStorage.getItem("_token");
    return token;
}