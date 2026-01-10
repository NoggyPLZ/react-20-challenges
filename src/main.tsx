import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import RockPaperScissors from './rockpaperscissors/RockPaperScissors.tsx'
import StopWatch from './stopwatch/StopWatch.tsx'
import DiceRoller from './diceroller/DiceRoller.tsx'
import StopLight from './stoplight/StopLight.tsx'
import QuoteGenerator from './quotegenerator/QuoteGenerator.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Gradients from './gradients/Gradients.tsx'
import TicTacToe from './tictactoe/TicTacToe.tsx'
import WhackAMole from './whackamole/WhackAMole.tsx'
import Quiz from './quiz/Quiz.tsx'
import Expenses from './expenses/Expenses.tsx'
import Calculator from './calculator/Calculator.tsx'
import Hangman from './hangman/Hangman.tsx'
import Password from './password/Password.tsx'
import Split from './split/Split.tsx'
import FileTree from './filetree/FileTree.tsx'
import Memory from './memory/Memory.tsx'
import Histogram from './histogram/Histogram.tsx'
import Simon from './simon/Simon.tsx'
import Hanoi from './hanoi/Hanoi.tsx'
import SpeedTyping from './speedtyping/SpeedTyping.tsx'
import ConnectFour from './connectfour/ConnectFour.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="rock-paper-scissors" element={<RockPaperScissors />} />
        <Route path="stop-watch" element={<StopWatch />} />
        <Route path="dice-roller" element={<DiceRoller />} />
        <Route path="stop-light" element={<StopLight />} />
        <Route path="quote-generator" element={<QuoteGenerator />} />
        <Route path="gradients" element={<Gradients />} />
        <Route path="tictactoe" element={<TicTacToe />} />
        <Route path="whackamole" element={<WhackAMole />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="hangman" element={<Hangman />} />
        <Route path="password" element={<Password />} />
        <Route path="split" element={<Split />} />
        <Route path="filetree" element={<FileTree />} />
        <Route path="memory" element={<Memory />} />
        <Route path="histogram" element={<Histogram />} />
        <Route path="simon" element={<Simon />} />
        <Route path="hanoi" element={<Hanoi />} />
        <Route path="speedtyping" element={<SpeedTyping />} />
        <Route path="connectfour" element={<ConnectFour />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
