import './App.css';
import { useState } from 'react';
import SingleCard from './component/SingleCard';
import { useEffect } from 'react';

const cardImages = [
    {"src" : "/img/helmet-1.png", matched:false},
    {"src" : "/img/potion-1.png", matched:false},
    {"src" : "/img/ring-1.png", matched:false},
    {"src" : "/img/scroll-1.png", matched:false},
    {"src" : "/img/shield-1.png", matched:false},
    {"src" : "/img/sword-1.png", matched:false}
]
const App = () => {

    const [Cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne]  = useState(null);
    const [choiceTwo, setChoiceTwo]  = useState(null);
    const [disabled, setdisabled] = useState(false);

    const shuffleCards = () => 
    {
        const shuffledcards = [...cardImages, ...cardImages]
        .sort(()=>
            Math.random() - 0.5
        )
        .map((card)=>
       (
        {...card, id: Math.random()}
       ))

       setChoiceOne(null);
       setChoiceTwo(null);
       setCards(shuffledcards); 
       setTurns(0);
       setdisabled(false);

    };
   // Handle the choice
    const handleChoice = (card) =>
    {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }

    // compare two se;ected cards
    useEffect(()=> {
        
        if(choiceOne && choiceTwo)
        {
            setdisabled(true);
            if(choiceOne.src === choiceTwo.src)
            {
                
                setCards((prevCards)=>
                {
                    return prevCards.map((card) =>
                    {
                        if(card.src===choiceOne.src)
                        {
                            return {...card, matched:true}
                        }
                        else{
                            return {...card};
                        }
                    })
                })

                resetTurn();
                 
            }else{
               setTimeout(()=>resetTurn(),1000);
            }
        }
        
         
    },[choiceOne,choiceTwo])
    // redet the choices and increase turn

     const resetTurn = () => {
     
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns+1);
        setdisabled(false);
     }
     
   // start a new game automatically

   useEffect(()=>{   
    shuffleCards();
    },[])
    const allCardsMatched = Cards.every(card => card.matched);
    return ( 
        <div className="App">
         <h1>Magic Match</h1>
         <button onClick={shuffleCards}>New Game</button>
         <div className='card-grid'>
            {Cards.map(card => (
               <SingleCard 
               key={card.id} 
               card={card}
                handleChoice = {handleChoice}
                flipped ={card===choiceOne || card === choiceTwo || card.matched}
                 disabled={disabled} > 
               </SingleCard>
            ))}
         </div>
         <p>Turns : {turns}</p>
         {allCardsMatched && (
        <div className="congratulations">
          <p>Congratulations! You've matched all the cards.</p>
          <button onClick={shuffleCards}>Play Again</button>
        </div>
      )}
        </div>
     );
}
 
export default App;



