export const getContentABCD = (answer) => {
  if (answer.optionA) {
    return (
      answer.optionA.trim() +
      "|" +
      answer.optionB.trim() +
      "|" +
      answer.optionC.trim() +
      "|" +
      answer.optionD.trim()
    );
  }
  return "";
};
