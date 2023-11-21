const UserWordBlock = ({ word }) => {
  if (!word) {
    return null;
  }

  return (
    <div className="user">
      <p>
        <span>Ваше слово: </span>
        <span className="user-word">{`«${word}»`}</span>
      </p>
    </div>
  );
};

export default UserWordBlock;
