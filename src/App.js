import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import './App.css';
import Dice from './components/Dice';
import Confetti from 'react-confetti'

function App() {
  
  const [allDices, setAllDices] = useState(newDices())
  const [holdedDices, setHoldedDices] = useState([])
  const [missionComplete , setMissionComplete] = useState(false)

  function generateNewDie(){
    return{
      id:nanoid(),
      diceNumber:Math.ceil(Math.random() * 6),
      holded:false
    }
  }
  function newDices(){
    const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
  }
  
  
  useEffect(()=>{
    if(allDices.length && holdedDices.length === allDices.length){
      const holdedDicesArr= holdedDices.map(dice=>dice.diceNumber).sort()
     // const allDicesToString= JSON.stringify(allDices.map(dice=>dice.diceNumber).sort())
     const missionCompleted = holdedDicesArr.every(el=>{
       if(el === holdedDicesArr[0] ){
         return true
       } 
       return false
     }) 
     if(missionCompleted){
        setMissionComplete(true)
     } 
      
    } 
  }, [holdedDices])

  //onClick function for Dice after holding/unholding 
  const handleHoldedDices =(dice)=>{
    const newDice ={...dice, holded:!dice.holded}

    //update handled dices Array after holding/unholding Dice
    setHoldedDices(oldDices=>{
      return newDice.holded ? [...oldDices, newDice] :
       oldDices.filter(oldDice=> oldDice.id !== dice.id)
    }) 
    
      //update all dices Array after holding/unholding Dice
      setAllDices(oldDices=>oldDices.map(el=>{
        return el.id === dice.id ? {...el, holded: !el.holded}
        : el
      }))
    
    
  
  }
 
  //Roll onClick change unholded dices
  const rollAction = function handleRoll(){
    if(missionComplete){
      setAllDices(oldDices=>oldDices.map(dice=> { return {...dice, holded:false}}))
      setHoldedDices([])
      setMissionComplete(false)
      setAllDices(oldDices=>oldDices.map(dice=> { return {...dice , diceNumber: changeNumRandom()}}
        ))
    }
    else{
      setAllDices(oldDices=>oldDices.map(dice=> 
        dice.holded === true
        ? dice
        :  {...dice , diceNumber: changeNumRandom()}
      ))
    }
 
  }
  //change number randomly
  function changeNumRandom(){
    return Math.floor(Math.random()*6 +1)
  }

  // display dice components
  const diceElements = allDices.map(dice=>{
    return(
      <Dice dice={dice} key={dice.id} holdedDices={handleHoldedDices}/>
    )
  })

  return (

    <main>
      <h1>Tenzies Game</h1>
      <p>{!missionComplete ? 'Roll until all dice are the same. Click each die to freeze it at its current value between rolls.':'Congratulations!'}</p>
      <div className='diceContainer'>
        {  diceElements }
      </div>
      <button className='roll-btn' onClick={rollAction}>{missionComplete ? 'Reset Game' : 'Roll'}</button>
      { missionComplete && <Confetti />}
    </main>
  );
}

export default App;
