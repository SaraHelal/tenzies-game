import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Dice from './components/Dice';

function App() {
  const [allDices, setAllDices] = useState([])
  const [holdedDices, setHoldedDices] = useState([])
  useEffect(()=>{
    const diceArr = []
    let randomNum;
    for(let i=1 ; i<11 ; i++){
      randomNum = Math.floor(Math.random()*6 +1)

      diceArr.push({id: i , diceNumber: randomNum, holded: false})
    }
    setAllDices(diceArr)
  }, [])

  //console.log('holdedDices: ', holdedDices)
  console.log('allDices: ', allDices)

  
  const handleHoldedDices =(dice)=>{
    //console.log('holded: ', dice)
    const newDice ={...dice, holded:!dice.holded}
    //console.log('newDice: ', newDice)
    setHoldedDices(oldDices=>{
      return newDice.holded ? [...oldDices, newDice] :
       oldDices.filter(oldDice=> oldDice.id !== dice.id)
      
    }) 
    setAllDices(oldDices=>oldDices.map(el=>{
      return el.id === dice.id ? {...el, holded: !el.holded}
      : el
    }))
    
   /* setHoldedDices(oldDices=>{
      return dice.holded ? oldDices.filter(oldDice=> oldDice.id !== dice.id)
      : [...oldDices, dice] 
    })
    setAllDices(old=>[...old,])*/
  }
  const diceElements = allDices.map(dice=>{
    return(
      <Dice dice={dice} key={dice.id} holdedDices={handleHoldedDices}/>
    )
  })
  /*const randomDices = ()=>{
    const diceArr = []
    let randomNum;
    for(let i=1 ; i<11 ; i++){
      randomNum = Math.floor(Math.random()*6 +1)
      diceArr.push(randomNum)
    }
    setDice(diceArr)
    console.log('dice: ', dice)
   
  } */
  /*function(){
    const diceArr = []
    let randomNum;
    for(let i=1 ; i<11 ; i++){
      randomNum = Math.floor(Math.random()*10 +1)
      diceArr.push(randomNum)
    }
    console.log(diceArr)
    return diceArr
  } */
  function handleRoll(){
  const unHandledDices = allDices.filter(dice=>dice.holded !== true)
    //console.log('checkUnHandledDices: ', checkUnHandledDices)
    const randomNewArr = unHandledDices.map(changeNumRandom)
    setAllDices(oldDices=>oldDices.map(dice=> 
      dice.holded === true
      ? dice
      :  {...dice , diceNumber: changeNumRandom()}
   ))
 

  }
  function changeNumRandom(){
    return Math.floor(Math.random()*6 +1)
  }
  return (

    <main>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='diceContainer'>
        { diceElements }
      </div>
      <button className='roll-btn' onClick={handleRoll}>Roll</button>
    </main>
  );
}

export default App;
