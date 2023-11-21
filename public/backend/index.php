<?php

$data = $_POST['payload'];

if (!isset($data) || empty($data)) {
	setError('INCORRECT_QUERY');
}

include_once('functions.php');

$userWord = json_decode($data['userWord']);
$usedWords = json_decode($data['usedWords']);

/* Проверяем длину слова пользователя */
if (mb_strlen($userWord) > 25) {
	setError('INCORRECT_LENGTH');
}

/* Если слово пользователя есть в БД */
if (isWordExists($userWord)) {
	/* Очищаем слово от возможного мусора */
	$userWord = cleanWord($userWord);
	
	/* Проверим что слово не повторяется */
	if (isDuplicate($userWord, $usedWords)) {
		setError('DUPLICATE_WORD');
	}
	
	$robotLetter = getFirstRobotLetter($userWord);

	/* Передаём роботу не тоьлко использованные слова, но и	текущее 
	слово пользователя, чтобы робот его тоже не повторил */
	$robotWord = getRobotWord($robotLetter, [$userWord, ...$usedWords]);
	
	/* Проверим, нашёл ли робот ответное слово, если нет - возвращаем null */
	if (!$robotWord) {
		sleep(3); // Даём роботу немного "подумать" :)
		$result = ['status' => 'ok', 'message' => null];
		echo json_encode($result);
		exit;
	}
	
	/* Если робот нашёл ответное слово, отправляем его */
	$result = ['status' => 'ok', 'message' => $robotWord];
	echo json_encode($result);
	exit;
}

/* Если слово не найдено в БД - возвращаем ошибку */
setError('NO_SUCH_WORD');

?>
