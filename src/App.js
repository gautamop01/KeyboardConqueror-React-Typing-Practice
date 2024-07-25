import React, { useState } from 'react';
import randomWords from 'random-words';
import './App.css'
import sound from './soundPlay.mp3';
import spacebar from './spacebar.mp3'
import Feedback from './components/Feedback'
import TopNav from './components/TopNav'
import Timer from './components/Timer'
import ContactIcon from './components/ContactIcon'

function App() {
  const [wordNums, setWordNums] = useState(100);
  const [seconds, setSeconds] = useState(60);
  const [words, setWords] = useState([]);
  const [timer, setTimer] = useState(seconds);
  const [inputWord, setInputWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [charIndex, setCharIndex] = useState(-1);
  const [char, setChar] = useState('');
  const [inCorrect, setInCorrect] = useState(0);
  const [status, setStatus] = useState('start');
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


  const Normalplay = () => {
    new Audio(sound).play()
  }

const Spacebar = () => {
  new Audio(spacebar).play()
}
  const startTimer = () => {
    if (status === 'disable') {
      setWords(generateWords());
      setWordIndex(0);
      setCorrect(0);
      setInCorrect(0);
      setStatus('enable');
      setCharIndex(-1);
      setChar('');
    }

    if (status === 'start') {
      setStatus('enable');
      setWords(generateWords())
      let time = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            setStatus('disable');
            clearInterval(time);
            setInputWord('');
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    }
  };

  const generateWords = () => {
    const wordsArray = [];
    while (wordsArray.length < wordNums) {
      const randomWord = randomWords();
      wordsArray.push(randomWord);
    }
    return wordsArray;
  };

  const handleInput = (event) => {
    
    if (event.key === ' ') {
      checkMatch();
      setInputWord('');
      setWordIndex(wordIndex + 1);
      setCharIndex(-1);
      if(isChecked){ Spacebar() }
      

    } else if (event.key === 'Backspace') {
      setCharIndex(charIndex - 1);
      setChar('');
      if(isChecked){Normalplay();}
      

    } else {
      setCharIndex(charIndex + 1);
      setChar(event.key);
      if(isChecked){Normalplay();}
    }
  };

  const checkMatch = () => {
    const wordToCompare = words[wordIndex];
    const doesItMatch = wordToCompare === inputWord.trim();
    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setInCorrect(inCorrect + 1);
    }
  };

  const getCharClass = (wordInd, CharInd, character) => {
    if (wordInd === wordIndex && CharInd === charIndex && char && status !== 'disable') {
      if (character === char) {
        return 'has-background-success';
      } else {
        return 'has-background-danger';
      }
    } else if (wordInd === wordIndex && charIndex >= words[wordIndex].length) {
      return 'has-background-danger';
    }
  };

  const numberChange = (event) => {
    const inputValue = event.target.value;
    setSeconds(inputValue);
    setTimer(inputValue);
  };

  const wordNumChange = (event) => {
    const wordValue = event.target.value;
    setWordNums(wordValue);
  };

  return (
    <>
    <TopNav/>


   
          <Timer status={status} timer={timer} />
      
      {status === 'enable' && (
        <div className='inputSection'>
          <input placeholder='Type word here and hit spacebar' disabled={status === 'disable'} type='text' onKeyDown={handleInput} value={inputWord} onChange={(event) => setInputWord(event.target.value)} />
        </div>

      )}



      {status === 'start' && (
        <div className='selectTimeWord'>
          <span>
            <span>Set countdown : </span>
            <input className='inputword' type='number' value={seconds} defaultValue={seconds} onChange={numberChange} />
          </span>
          <span>
            <span>Words Count : </span>
            <input className='inputword' type='number' defaultValue={wordNums} value={wordNums} onChange={wordNumChange} />
          </span>
          <span>
            <span>Keyboard Sound : </span>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <label for="on"> ON</label>
          </span>
        </div>
      )}


      {status === 'enable' && (
        <div className='randomWords'>
          {words.map((word, i) => (
            <span key={i}>
              {word.split('').map((char, idx) => (
                <span className={getCharClass(i, idx, char)} key={idx}>
                  {char}
                </span>
              ))}
              <span> </span>
            </span>
          ))}
        </div>
      )}

      {status === 'enable' && (
        <div className='buttonStop'>
          <button onClick={() => window.location.reload()}>click here to stop</button></div>

      )}
      <div className='buttonStart'>
        {status === 'start' && (<>
          <span>Set countdown and number of words, then hit Start</span>
          <button onClick={() => startTimer()}>
            click to start
          </button></>
        )}

      </div>

      {status === 'disable' && (
        <div className='Result'>
          <div className='resultportion'>
            <p className='resultText'>Words Per Minute : </p>
            <p className='ResultValue'>{correct + inCorrect}</p>
          </div>
          <div className='resultportion'>
            <p className='resultText'>Accuracy : </p>
            <p className='ResultValue'>{Math.round((correct / (correct + inCorrect)) * 100)}%</p>
          </div>
        </div>
      )}
      {status === 'disable' && (
        <div className='Result'>
          <div className='resultportion'>
            <p className='resultText'>Correct Words : </p>
            <p className='ResultValue'>{correct}</p>
          </div>
          <div className='resultportion'>
            <p className='resultText'>Incorrect words : </p>
            <p className='ResultValue'>{inCorrect}</p>
          </div>
        </div>
      )}
      {status === 'disable' && (
        <div className='buttonRetry'>
          <button onClick={() => window.location.reload()}>Click here to retry</button>
        </div>
      )}
      {(status === 'start' || status === 'disable') && (<>
        <div className='created'>
        
          <ContactIcon/>
        </div>

      </>
      )}
      {status === 'start' && (

        <div className='about'>
          <p>
          Your typing speed and accuracy will be put to the test in this entertaining and engaging game. The aim of the game is to type as many words as you can in a predetermined amount of time while maintaining accuracy. It's a terrific approach to increase your typing speed, sharpen your skills, and set a goal for yourself to type more quickly.

          </p>
         </div>
      )}


      {status === 'start' && (
        <div className='HowToPlay'>


<ol>

   {/* <li> */}
        <center><strong> How to Play:</strong> </center>
    {/* </li>     */}
    <li>
        <strong>Game Initialization:</strong> At the commencement of the game, a countdown timer will be initiated, and a random assortment of words will be displayed on the screen.
    </li>
    <li>
        <strong>Word Typing:</strong> Engage in rapid and error-free typing of the presented words. Each word should be entered accurately and followed by a space.
    </li>
    <li>
        <strong>Tracking Accuracy and Speed:</strong> The game diligently monitors your typing accuracy and speed. Successfully entered words contribute to your score, while any inaccuracies are counted as errors.
    </li>
    <li>
        <strong>Time Limit:</strong> The game imposes a specific time constraint within which you must strive to type as many words as possible. Make an effort to complete as many words as you can before the timer expires.
    </li>
    <li>
        <strong>Performance Feedback and Results:</strong> Once the game concludes, you will receive detailed feedback on your performance, including your words per minute (WPM) score and accuracy percentage.
    </li>
    <li>
        <strong>Retry Option:</strong> If you wish to improve your score or engage in another challenge, you have the option to retry the game and aim for a higher WPM and increased accuracy.
    </li>
</ol>


        </div>
      )}

      {status === 'disable' && (
        <div className='HowToPlay'>
          <p>
    Tips for Success:
    <ul>
        <li>
            <strong>Focus on Accuracy:</strong> Prioritize accuracy over speed when typing. It is preferable to type correctly rather than making errors in an attempt to type quickly. Accuracy is paramount.
        </li>
        <li>
            <strong>Regular Practice:</strong> Consistently practicing the speed typing game will yield substantial improvements in your typing skills over time. Make it a habit to play regularly.
        </li>
        <li>
            <strong>Utilize Proper Techniques:</strong> Employ proper typing techniques and utilize all your fingers while typing. This will enhance your typing speed and efficiency.
        </li>
        <li>
            <strong>Maintain Good Posture:</strong> Sit upright and maintain a comfortable typing posture to prevent any discomfort or strain while typing.
        </li>
    </ul>
</p>

        </div>
      )}

      <Feedback />
    </>
  );

}

export default App;
