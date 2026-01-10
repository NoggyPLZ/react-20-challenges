import { Link } from 'react-router'
import 'react-toastify/dist/ReactToastify.css';


type Projects = {
  name: string;
  path: string;
}[];

function App() {
  const projects: Projects = [
    {name:'RPS', path:'rock-paper-scissors'},
    {name:'StopWatch', path:'stop-watch'},
    {name:'DiceRoller', path:'dice-roller'},
    {name:'StopLight', path:'stop-light'},
    {name:'QuoteGenerator', path:'quote-generator'},
    {name:'Gradients', path:'gradients'},
    {name:'TicTacToe', path:'tictactoe'},
    {name:'WhackAMole', path:'whackamole'},
    {name:'Quiz', path:'quiz'},
    {name:'Expenses', path:'expenses'},
    {name:'Calculator', path:'calculator'},
    {name:'Hangman', path:'hangman'},
    {name:'Password', path:'password'},
    {name:'Split', path:'split'},
    {name:'File Tree', path:'filetree'},
    {name:'Memory', path:'memory'},
    {name:'Histogram', path:'histogram'},
    {name:'Simon', path:'simon'},
    {name:'Hanoi', path:'hanoi'},
    {name:'SpeedTyping', path:'speedtyping'},
    {name:'ConnectFour', path:'connectfour'},
  ];

  return (
    <main className="bg-gray-900 h-dvh text-gray-100 p-10">
      <section className='grid lg:grid-cols-4 gap-8 mx-auto md:w-8/12'>
        {projects.map((project, index) =>(
          <Link to={project.path} key={index} className='p-5 text-center bg-gray-100 text-gray-900 rounded-2xl hover:bg-gray-400 font-bold'>
          {project.name}
        </Link>
        ))}
      </section>
    </main>
  )
}

export default App
