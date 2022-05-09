import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Dice from './components/Dice';
import Confetti from 'react-confetti'

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [allDices, setAllDices] = useState([])
  const [holdedDices, setHoldedDices] = useState([])
  const [resetAction , setResetAction] = useState(false) 
  const [missionComplete , setMissionComplete] = useState(false)

  
  useEffect(()=>{
    const diceArr = []
    for(let i=1 ; i<11 ; i++){
      diceArr.push({id: i , diceNumber: changeNumRandom(), holded: false})
    }
    setAllDices(diceArr)
  }, [])
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
        setResetAction(true)
        setMissionComplete(true)
        
     } 
      //holdedDicesToString === allDicesToString ? console.log('yes: ') : console.log('no')
      
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
    if(resetAction){
      setAllDices(oldDices=>oldDices.map(dice=> { return {...dice, holded:false}}))
      setHoldedDices([])
      setResetAction(false)
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
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='diceContainer'>
        { diceElements }
      </div>
      <button className='roll-btn' onClick={rollAction}>{resetAction ? 'Reset Game' : 'Roll'}</button>
      { missionComplete && <Confetti
      width={windowSize.width}
      height={windowSize.height}
    />}
    </main>
  );
}

export default App;
