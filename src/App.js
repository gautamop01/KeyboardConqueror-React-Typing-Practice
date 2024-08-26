import React, { useState } from 'react'; // Import the useState hook from React
import randomWords from 'random-words'; // Import the random-words library to generate random words
import './App.css' // Import the App.css file for styling
import sound from './soundPlay.mp3'; // Import the soundPlay.mp3 file for the keypress sound effect
import spacebar from './spacebar.mp3' // Import the spacebar.mp3 file for the spacebar sound effect
import Feedback from './components/Feedback' // Import the Feedback component
import TopNav from './components/TopNav' // Import the TopNav component
import Timer from './components/Timer' // Import the Timer component
import ContactIcon from './components/ContactIcon' // Import the ContactIcon component

function App() { // Define the App component
  const [wordNums, setWordNums] = useState(100); // Initialize the wordNums state to 100
  const [seconds, setSeconds] = useState(60); // Initialize the seconds state to 60
  const [words, setWords] = useState([]); // Initialize the words state to an empty array
  const [timer, setTimer] = useState(seconds); // Initialize the timer state to the seconds state
  const [inputWord, setInputWord] = useState(''); // Initialize the inputWord state to an empty string
  const [wordIndex, setWordIndex] = useState(0); // Initialize the wordIndex state to 0
  const [correct, setCorrect] = useState(0); // Initialize the correct state to 0
  const [charIndex, setCharIndex] = useState(-1); // Initialize the charIndex state to -1
  const [char, setChar] = useState(''); // Initialize the char state to an empty string
  const [inCorrect, setInCorrect] = useState(0); // Initialize the inCorrect state to 0
  const [status, setStatus] = useState('start'); // Initialize the status state to 'start'
  const [isChecked, setIsChecked] = useState(true); // Initialize the isChecked state to true
  
  // handleCheckboxChange function is used to manage the state of the checkbox that controls whether the keyboard sound effects are enabled or disabled
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

// Audio Playback Functions: Functions to play sounds for normal keypress and spacebar keypress events.
  const Normalplay = () => {
    new Audio(sound).play() // Play the soundPlay.mp3 file for the normal keypress sound effect
  }

const Spacebar = () => {
  new Audio(spacebar).play() // Play the spacebar.mp3 file for the spacebar sound effect
}

// Timer Management Functions: Functions to start the timer and generate random words for the game.
// startTimer: Starts the game timer and generates a new set of random words. If the timer reaches zero, it stops the game and updates the status.
// startTimer function is used to start the game timer and generate random words for the game.
const startTimer = () => {
  // If the game is already disabled, reset the game state and enable it again.
  if (status === 'disable') { 
    setWords(generateWords()); // Generate new random words.
    setWordIndex(0); // Reset the word index.
    setCorrect(0); // Reset the correct count.
    setInCorrect(0); // Reset the incorrect count.
    setStatus('enable'); // Enable the game.
    setCharIndex(-1); // Reset the character index.
    setChar(''); // Reset the character.
  }

  // If the game is in the start state, start the timer and update the game status.
  if (status === 'start') {
    setStatus('enable'); // Enable the game.
    setWords(generateWords()); // Generate new random words.
    let time = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          setStatus('disable'); // Disable the game when the timer reaches zero.
          clearInterval(time); // Clear the interval.
          setInputWord(''); // Reset the input word.
        } else {
          return prevTimer - 1; // Decrement the timer by 1 second.
        }
      });
    }, 1000); // Update the timer every 1 second.
  }
};

// generateWords: Generates an array of random words using the random-words library.
  const generateWords = () => {
    const wordsArray = [];
    while (wordsArray.length < wordNums) {
      const randomWord = randomWords();
      wordsArray.push(randomWord);
    }
    return wordsArray;
  };

  // Handle User Input: Function to handle user input and check for keypress events.
  // event parameter is used to capture the keypress event.
  const handleInput = (event) => {
    // Check if the spacebar key is pressed
    if (event.key === ' ') {
      // Call the checkMatch function to compare the input word with the current word
      checkMatch();
      // Reset the input word
      setInputWord('');
      // Move to the next word in the words array
      setWordIndex(wordIndex + 1);
      // Reset the character index
      setCharIndex(-1);
      // Play the spacebar sound if the checkbox is checked
      if (isChecked) {
        Spacebar();
      }
    } 
    // Check if the backspace key is pressed
    else if (event.key === 'Backspace') {
      // Move the character index back by one
      setCharIndex(charIndex - 1);
      // Reset the character
      setChar('');
      // Play the normal keypress sound if the checkbox is checked
      if (isChecked) {
        Normalplay();
      }
    } 
    // For any other key press
    else {
      // Move the character index forward by one
      setCharIndex(charIndex + 1);
      // Set the current character
      setChar(event.key);
      // Play the normal keypress sound if the checkbox is checked
      if (isChecked) {
        Normalplay();
      }
    }
  };

  // checkMatch: Compares the input word with the current word in the game and updates the correct and incorrect counts accordingly.
  const checkMatch = () => {
    const wordToCompare = words[wordIndex];
    const doesItMatch = wordToCompare === inputWord.trim();
    if (doesItMatch) {
      setCorrect(correct + 1); // Increment the correct count if the input word matches the current word
    } else {
      setInCorrect(inCorrect + 1); // Increment the incorrect count if the input word does not match the current word
    }
  };

  // getCharClass: Determines the CSS class for each character based on the current character index and game status to highlight correct or incorrect characters.
  // wordInd: Index of the current word in the words array
  // CharInd: Index of the current character in the word
  // character: The character being typed
    
  const getCharClass = (wordInd, CharInd, character) => {
    // Check if the current character is the one being typed and if the game is not disabled
    if (wordInd === wordIndex && CharInd === charIndex && char && status !== 'disable') {
      // Check if the character matches the input character
      if (character === char) {
        // Return CSS class for correct character
        // console.log('correct');
        return 'has-background-success';
      } else {
        // Return CSS class for incorrect character
        // console.log('incorrect');
        return 'has-background-danger';
      }
    } else if (wordInd === wordIndex && charIndex >= words[wordIndex].length) {
      // Return CSS class for extra characters typed after the word is completed
      // console.log('extra');
      return 'has-background-danger';
    }
  };

  // Handle Timer and Word Count Changes: Functions to handle changes in the timer and word count input fields.
  // numberChange: Updates the seconds and timer state when the value of the input field for countdown is changed.
  // event parameter is used to capture the change event.
  const numberChange = (event) => {
    const inputValue = event.target.value; // Get the value from the input field
    setSeconds(inputValue); // Update the seconds state
    setTimer(inputValue); // Update the timer state
  };

  // wordNumChange: Updates the wordNums state when the value of the input field for word count is changed.
  const wordNumChange = (event) => {
    const wordValue = event.target.value; /// Get the value from the input field
    setWordNums(wordValue); // Update the wordNums state
  };


  // Render Function: The main render function that displays the game interface based on the game status.
  return (
    <>
    <TopNav/> 


    {/* Top Navigation and Timer Components */}
          <Timer status={status} timer={timer} />
      {/* Input Section */}
      {status === 'enable' && (
        <div className='inputSection'>
          <input placeholder='Type word here and hit spacebar' disabled={status === 'disable'} type='text' onKeyDown={handleInput} value={inputWord} onChange={(event) => setInputWord(event.target.value)} />
        </div>

      )}


{/* Countdown and Word Count Settings */}
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

{/* Random Words Display */}
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
{/* Stop Button */}
      {status === 'enable' && (
        <div className='buttonStop'>
          <button onClick={() => window.location.reload()}>click here to stop</button></div>

      )}
      {/* Start Button */}
      <div className='buttonStart'>
        {status === 'start' && (<>
          <span>Set countdown and number of words, then hit Start</span>
          <button onClick={() => startTimer()}>
            click to start
          </button></>
        )}

      </div>
      {/* Results Display */}
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
