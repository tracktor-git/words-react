const UsedWordsBlock = ({ words }) => {
  if (words.length < 1) {
    return null;
  }
  return (
    <div className="used-words">
      <p>
        <span className="used-words-title">Ранее использованные слова: </span>
        <span className="used-words-body">{words.join(', ')}</span>
      </p>
    </div>
  );
};

export default UsedWordsBlock;
