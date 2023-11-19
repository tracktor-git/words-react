<?php

$data = $_POST['payload'];

if (!isset($data) || empty($data)) {
	$result = ['status' => 'error', 'message' => 'INCORRECT_QUERY'];
	echo json_encode($result);
	exit;
}

include_once('functions.php');

$userWord = json_decode($data['userWord']);
$usedWords = json_decode($data['usedWords']);

/* Если слово пользователя есть в БД */
if (isWordExists($userWord)) {
	/* Очищаем слово от возможного мусора */
	$userWord = cleanWord($userWord);
	
	/* Проверим что слово не повторяется */
	if (isDuplicate($userWord, $usedWords)) {
		$result = ['status' => 'error', 'message' => 'DUPLICATE_WORD'];
		echo json_encode($result);
		exit;
	}
	
	$robotLetter = getFirstRobotLetter($userWord);
	$robotWord = getRobotWord($robotLetter, $usedWords);
	
	/* Проверим, нашёл ли робот ответное слово, если нет - то он проиграл */
	if (!$robotWord) {
		$result = ['status' => 'error', 'message' => 'ROBOT_LOOSE'];
		echo json_encode($result);
		exit;
	}
	
	/* Если робот нашёл ответное слово, отправляем его */
	$result = ['status' => 'ok', 'message' => $robotWord];
	echo json_encode($result);
	exit;
}

/* Если слово не найдено в БД - возвращаем ошибку */
$result = ['status' => 'error', 'message' => 'NO_SUCH_WORD'];
echo json_encode($result);
exit;

?>
