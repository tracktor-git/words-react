const getCurrentScore = (state) => state.scoreSlice.score;
const getUsedWords = (state) => state.usedWordsSlice.usedWords;
const getLastRobotWord = (state) => state.usedWordsSlice.usedWords[0];
const getErrorText = (state) => state.errorSlice.text;

const getLastRobotChar = (state) => {
  if (!state.usedWordsSlice.usedWords.length) {
    return '';
  }

  const invalidChars = ['ь', 'ъ', 'ы'];
  const [word] = state.usedWordsSlice.usedWords;

  if (word === null) {
    return null;
  }

  const lastChar = invalidChars.includes(word[word.length - 1])
    ? word[word.length - 2]
    : word[word.length - 1];

  return lastChar;
};

export default {
  getCurrentScore,
  getUsedWords,
  getLastRobotChar,
  getLastRobotWord,
  getErrorText,
};
