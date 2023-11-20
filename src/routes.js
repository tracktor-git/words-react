const BACKEND_URL = process.env.NODE_ENV === 'production' ? './backend/index.php' : 'http://192.168.70.134/backend.php';

export default {
  backendUrl: BACKEND_URL,
  vocabularyUrl: (word) => `https://sinonim.org/t/${word}`,
};
