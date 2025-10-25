import React, { useState } from 'react';
import { Sparkles, Trophy, Heart, Star } from 'lucide-react';

const LanguageLearningGame = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameData, setGameData] = useState(null);

  const vocabulary = {
    english: {
      animals: [
        { word: 'cat', translation: 'gato', image: '🐱' },
        { word: 'dog', translation: 'perro', image: '🐶' },
        { word: 'bird', translation: 'pájaro', image: '🐦' },
        { word: 'fish', translation: 'pez', image: '🐟' },
        { word: 'lion', translation: 'león', image: '🦁' },
        { word: 'elephant', translation: 'elefante', image: '🐘' }
      ],
      colors: [
        { word: 'red', translation: 'rojo', image: '🔴' },
        { word: 'blue', translation: 'azul', image: '🔵' },
        { word: 'green', translation: 'verde', image: '🟢' },
        { word: 'yellow', translation: 'amarillo', image: '🟡' },
        { word: 'orange', translation: 'naranja', image: '🟠' },
        { word: 'purple', translation: 'morado', image: '🟣' }
      ],
      food: [
        { word: 'apple', translation: 'manzana', image: '🍎' },
        { word: 'banana', translation: 'plátano', image: '🍌' },
        { word: 'bread', translation: 'pan', image: '🍞' },
        { word: 'cheese', translation: 'queso', image: '🧀' },
        { word: 'pizza', translation: 'pizza', image: '🍕' },
        { word: 'water', translation: 'agua', image: '💧' }
      ]
    },
    french: {
      animals: [
        { word: 'chat', translation: 'gato', image: '🐱' },
        { word: 'chien', translation: 'perro', image: '🐶' },
        { word: 'oiseau', translation: 'pájaro', image: '🐦' },
        { word: 'poisson', translation: 'pez', image: '🐟' },
        { word: 'lion', translation: 'león', image: '🦁' },
        { word: 'éléphant', translation: 'elefante', image: '🐘' }
      ],
      colors: [
        { word: 'rouge', translation: 'rojo', image: '🔴' },
        { word: 'bleu', translation: 'azul', image: '🔵' },
        { word: 'vert', translation: 'verde', image: '🟢' },
        { word: 'jaune', translation: 'amarillo', image: '🟡' },
        { word: 'orange', translation: 'naranja', image: '🟠' },
        { word: 'violet', translation: 'morado', image: '🟣' }
      ],
      food: [
        { word: 'pomme', translation: 'manzana', image: '🍎' },
        { word: 'banane', translation: 'plátano', image: '🍌' },
        { word: 'pain', translation: 'pan', image: '🍞' },
        { word: 'fromage', translation: 'queso', image: '🧀' },
        { word: 'pizza', translation: 'pizza', image: '🍕' },
        { word: 'eau', translation: 'agua', image: '💧' }
      ]
    }
  };

  const games = [
    { id: 'memory', name: 'Memoria', icon: '🧠', description: 'Empareja palabras con imágenes' },
    { id: 'translation', name: 'Traducción', icon: '📝', description: 'Traduce las palabras' },
    { id: 'listening', name: 'Escucha', icon: '👂', description: 'Identifica la palabra correcta' }
  ];

  const startGame = (gameType, category) => {
    const words = vocabulary[selectedLanguage][category];
    setSelectedGame(gameType);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    
    if (gameType === 'translation' || gameType === 'listening') {
      const shuffled = [...words].sort(() => Math.random() - 0.5);
      setGameData({
        questions: shuffled.map(word => ({
          question: gameType === 'listening' ? word.image : word.translation,
          correct: word.word,
          translation: word.translation,
          options: generateOptions(word.word, words)
        }))
      });
    }
  };

  const generateOptions = (correct, allWords) => {
    const options = [correct];
    const otherWords = allWords.filter(w => w.word !== correct);
    while (options.length < 4 && otherWords.length > 0) {
      const random = otherWords[Math.floor(Math.random() * otherWords.length)];
      if (!options.includes(random.word)) {
        options.push(random.word);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    const isCorrect = answer === gameData.questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 10);
    } else {
      setLives(lives - 1);
    }

    setTimeout(() => {
      if (currentQuestion < gameData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        if (isCorrect && score + 10 >= level * 50) {
          setLevel(level + 1);
        }
        setSelectedGame(null);
      }
    }, 1500);
  };

  if (!selectedLanguage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Sparkles className="w-12 h-12" />
              Aprende Idiomas
              <Sparkles className="w-12 h-12" />
            </h1>
            <p className="text-xl text-white">¡Diviértete mientras aprendes!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => setSelectedLanguage('english')}
              className="bg-white rounded-3xl p-8 shadow-2xl hover:scale-105 transform transition-all duration-300"
            >
              <div className="text-6xl mb-4">🇬🇧</div>
              <h2 className="text-3xl font-bold text-blue-600 mb-2">Inglés</h2>
              <p className="text-gray-600">English - Learn English words and phrases</p>
            </button>

            <button
              onClick={() => setSelectedLanguage('french')}
              className="bg-white rounded-3xl p-8 shadow-2xl hover:scale-105 transform transition-all duration-300"
            >
              <div className="text-6xl mb-4">🇫🇷</div>
              <h2 className="text-3xl font-bold text-blue-600 mb-2">Francés</h2>
              <p className="text-gray-600">Français - Apprends le français</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setSelectedLanguage(null)}
              className="bg-white px-6 py-3 rounded-full font-bold text-purple-600 hover:bg-purple-100 transition"
            >
              ← Cambiar idioma
            </button>
            <div className="flex gap-4 items-center bg-white px-6 py-3 rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <span className="font-bold text-lg">{score}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-purple-500" />
                <span className="font-bold text-lg">Nivel {level}</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(lives)].map((_, i) => (
                  <Heart key={i} className="w-6 h-6 text-red-500 fill-current" />
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white text-center mb-8">
            Elige una categoría
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {Object.keys(vocabulary[selectedLanguage]).map(category => (
              <div key={category} className="bg-white rounded-3xl p-6 shadow-2xl">
                <h3 className="text-2xl font-bold text-purple-600 mb-4 capitalize">
                  {category === 'animals' ? '🐾 Animales' : category === 'colors' ? '🎨 Colores' : '🍽️ Comida'}
                </h3>
                <div className="space-y-3">
                  {games.map(game => (
                    <button
                      key={game.id}
                      onClick={() => startGame(game.id, category)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl font-bold hover:scale-105 transform transition flex items-center gap-3"
                    >
                      <span className="text-2xl">{game.icon}</span>
                      <div className="text-left">
                        <div>{game.name}</div>
                        <div className="text-xs opacity-90">{game.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedGame === 'translation' || selectedGame === 'listening') {
    const question = gameData.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setSelectedGame(null)}
              className="bg-white px-6 py-3 rounded-full font-bold text-purple-600 hover:bg-purple-100 transition"
            >
              ← Volver
            </button>
            <div className="flex gap-4 items-center bg-white px-6 py-3 rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <span className="font-bold text-lg">{score}</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(lives)].map((_, i) => (
                  <Heart key={i} className="w-6 h-6 text-red-500 fill-current" />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-sm text-gray-500 mb-2">
                Pregunta {currentQuestion + 1} de {gameData.questions.length}
              </div>
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / gameData.questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="text-center mb-8">
              {selectedGame === 'listening' ? (
                <>
                  <div className="text-8xl mb-4">{question.question}</div>
                  <p className="text-xl text-gray-600">({question.translation})</p>
                  <p className="text-2xl font-bold text-purple-600 mt-4">
                    ¿Cómo se dice en {selectedLanguage === 'english' ? 'inglés' : 'francés'}?
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xl text-gray-600 mb-2">Traduce:</p>
                  <h3 className="text-5xl font-bold text-purple-600 mb-4">{question.question}</h3>
                  <p className="text-2xl text-gray-500">
                    al {selectedLanguage === 'english' ? 'inglés' : 'francés'}
                  </p>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showFeedback && handleAnswer(option)}
                  disabled={showFeedback}
                  className={`p-6 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 ${
                    showFeedback
                      ? option === question.correct
                        ? 'bg-green-500 text-white'
                        : option === selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {showFeedback && (
              <div className={`mt-6 p-6 rounded-2xl text-center font-bold text-xl ${
                isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {isCorrect ? '¡Correcto! 🎉' : `Incorrecto. La respuesta era: ${question.correct}`}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LanguageLearningGame;