/* eslint-disable max-len */
import './Rules.css';

const Rules = () => (
  <section className="rules" id="rules">
    <div className="container rules-container">
      <div className="rules-title">
        <h3>Правила игры</h3>
      </div>
      <div className="rules-text">
        <p>Вы играете с роботом.</p>
        <ol>
          <li>Игра начинается с того, что пользователь предлагает любое существительное в единственном числе, которое начинается с любой буквы.</li>
          <li>Робот отвечает существительным в единственном числе, которое начинается на последнюю букву предложенного пользователем слова.</li>
          <li>Пользователь продолжает игру, предлагая слово, которое начинается на последнюю букву слова робота, и так далее.</li>
          <li>
            Если слово, предложенное игроком, оканчивается на буквы, из которых невозможно составить новое слово (
            <i>&quot;ъ&quot;</i>, <i>&quot;ь&quot;</i>, и <i>&quot;ы&quot;</i>){ /* eslint-disable-line */ }
            , то игрок должен начать новое слово, используя предпоследнюю букву предыдущего слова.
          </li>
          <li>Слова, предлагаемые игроками, должны соответствовать русскому литературному языку.</li>
          <li>Буквы &quot;е&quot; и &quot;ё&quot; - взаимозаменяемы (&quot;ёлка\елка&quot;, &quot;ковер\ковёр&quot; и т. д.)</li>
          <li>Слова не должны повторяться. Допускаются однокоренные слова.</li>
          <li>Игра продолжается до тех пор, пока игроки могут предлагать новые существительные в единственном числе, соответствующие правилам игры.</li>
          <li>Побеждает игрок, который первым не сможет придумать новое слово.</li>
          <li>Нажатием на кнопку &quot;Завершить игру&quot; пользователь обнуляет результаты текущей игры, и может начать игру с нуля.</li>
        </ol>
      </div>
    </div>
  </section>
);

export default Rules;
