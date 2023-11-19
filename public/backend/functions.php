<?php

/* Очистка строки от мусора */
function cleanWord($word) {
	// Удаление пробелов в начале и в конце строки
	$word = trim($word);
	
	// Очистка от опасных символов
	$word = preg_replace('/[^\p{L}\p{N}\s\-]/u', '', $word);
	
	// Применение htmlspecialchars для защиты от XSS-атак
	$word = htmlspecialchars($word, ENT_QUOTES, 'UTF-8');
	
	// Удаление HTML и PHP-тегов
	$word = strip_tags($word);
	
	// Фильтрация с помощью регулярного выражения, разрешающего только русские буквы и дефис
	$word = filter_var($word, FILTER_VALIDATE_REGEXP, array('options' => array('regexp' => '/^[а-яА-ЯёЁ\-\s]+$/u')));
  
	// Приведение к нижнему регистру
	$word = mb_strtolower($word, 'UTF-8');
  
	// Возвращение очищенного слова
	return $word;
}

/* Поиск в БД слова на заданную букву */
function getRobotWord($letter, $excluded = []) {
	if (empty($letter) || !isset($letter)) {
		return null;
	}

	$separator = "', '";
	$excludedString = "'" . implode($separator, $excluded) . "'";
	
	$sql = "SELECT word FROM words WHERE word NOT IN ({$excludedString}) AND word LIKE '{$letter}%' ORDER BY RANDOM() LIMIT 1";
	$db = new SQLite3('Words.SQLITE');
	$result = $db->querySingle($sql);
	$db->close();
	
	return $result;
}

/* Проверка, есть ли слово в БД */
function isWordExists($word) {
	$sql = "SELECT word FROM words WHERE word == '{$word}';";
	
	$db = new SQLite3('Words.SQLITE');
	$result = $db->querySingle($sql);
	$db->close();
	
	return !!$result;
}

/* Определение, с какой буквы начинать слово роботу */
function getFirstRobotLetter($word) {
	$wrongLetters = ['ь', 'ъ', 'ы'];
	$lastLetter = mb_substr($word, -1, 1, 'UTF-8');
	$prelastLetter = mb_substr($word, -2, 1, 'UTF-8');

	if (in_array($lastLetter, $wrongLetters)) {
		return $prelastLetter;
	}

	return $lastLetter;
}

/* Определение, с той ли буквы начинает слово пользователь */
function isRightLetter($usedWords) {
	if (count($usedWords) == 0) {
		return true;
	}

	$firstUserWordLetter = mb_substr($userWord, 0, 1, 'UTF-8');
	return $firstUserWordLetter == getFirstRobotLetter($usedWords[0]);
}

/* Определение, повторяются ли слова */
function isDuplicate($userWord, $usedWords) {
	return in_array($userWord, $usedWords);
}

?>
