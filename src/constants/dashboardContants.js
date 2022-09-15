export const DASHBOARD_HOME_MENU = "DASHBOARD_HOME_MENU";
export const DASHBOARD_QUESTIONS_MENU = "DASHBOARD_QUESTIONS_MENU";
export const DASHBOARD_CATEGORIES_MENU = "DASHBOARD_CATEGORIES_MENU";
export const DASHBOARD_EXAMS_MENU = "DASHBOARD_EXAMS_MENU";

export const TOOLTIP_POSITION = "right";
export const QUESTION_CHOOSE_ABCD = 1;
export const QUESTION_FIND_WORD = 2;

export const renderQuestionType = (typeId) => {
  if (typeId === QUESTION_CHOOSE_ABCD) {
    return "Choose ABCD";
  }
  if (typeId === QUESTION_FIND_WORD) {
    return "Find word";
  }
};

export const questionType = [
  { id: 1, name: "Choose ABCD" },
  { id: 2, name: "Find word" },
  { id: 3, name: "Reading" },
];

export const questionLevel = [
  { id: 1, name: "Easy" },
  { id: 2, name: "Normal" },
  { id: 3, name: "Hard" },
];

export const questionPoint = [
  { id: 1, value: 5 },
  { id: 2, value: 10 },
  { id: 3, value: 20 },
];

export const renderQuestionLevel = (levelId) => {
  if (levelId) {
    const level = questionLevel.find((lev) => lev.id === levelId);
    return level.name;
  }
};
