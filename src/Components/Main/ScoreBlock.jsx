function pluralize(count) {
  if (count % 10 === 1 && count % 100 !== 11) return 'слово';
  if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return 'слова';
  return 'слов';
}

const ScoreBlock = ({ score }) => {
  if (!score) {
    return null;
  }

  return (
    <p className="score">
      <span>Вы назвали </span>
      <span className="score-count">
        {score}
        &nbsp;
      </span>
      {pluralize(score)}
    </p>
  );
};

export default ScoreBlock;
