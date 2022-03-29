const baseUrl = "https://english-backend-v2.herokuapp.com";

export const ApiUrl = {
  questions: baseUrl + "/questions",
  exam: baseUrl + "/exams",
  getGame: baseUrl + "/games/getGame",
  finishGame: baseUrl + "/games/finishGame",
  login: baseUrl + "/users/authenticate",
  register: baseUrl + "/users/register",
  categories: baseUrl + "/categories",
  getTop: baseUrl + "/results/rate",
};
