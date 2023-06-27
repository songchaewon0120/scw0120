import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  <Btn/>
}



function Btn () {
 <button style={{backgroundColor:"black", width:"100px", height:"100px"}}>btn</button>
}


function User (name) {
  this.name = name;

  this.Hi = function() {
    // alert(`안녕하세요 ${this.name} 입니다.`)
  }
}

const bora = new User ("보라")
const v = new User ("왜안돼")
const gg = new User ("gg")

console.log(gg.Hi())



export default App;

