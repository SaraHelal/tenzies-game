import React from 'react'

function Dice({dice , holdedDices}) {
  return (
    <div 
        className={`dice ${dice.holded ?'selected' : ''}`}
        onClick={()=>holdedDices(dice)}
    >{dice.diceNumber}</div>
  )
}

export default Dice