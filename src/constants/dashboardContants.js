export const DASHBOARD_HOME_MENU = "DASHBOARD_HOME_MENU";
export const DASHBOARD_QUESTIONS_MENU = "DASHBOARD_QUESTIONS_MENU";
export const DASHBOARD_CATEGORIES_MENU = "DASHBOARD_CATEGORIES_MENU";
export const DASHBOARD_EXAMS_MENU = "DASHBOARD_EXAMS_MENU";

export const TOOLTIP_POSITION = "right";
export const QUESTION_CHOOSE_ABCD = 1;

export const questionType = (typeId) => {
  if (typeId === QUESTION_CHOOSE_ABCD) {
    return "Choose one of four";
  }
};
