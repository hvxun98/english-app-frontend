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

export const renderContent = (text) => {
  if (text?.length >= 70) {
    const stringRender = text.slice(0, 70);
    return `${stringRender}...`;
  }
  return text;
};

export const flatDataTable = (data, callback) => {
  if (data && data.length) {
    const newData = data.map((item) => {
      return { ...item, key: item.id };
    });
    callback(newData);
  }
};