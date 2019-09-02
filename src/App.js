// > git remote add origin https://github.com/jcrist70/monsters-rolodex.git
// > yarn add gh-pages
// in package.json ->  
//   "homepage": "https://jcrist70.github.io/monsters-rolodex",
//   "predeploy": "yarn build",
// > yarn deploy
// > git add -A
// > git commit -m "initial version"
// > 


import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };
    {/*this.handleChange = this.handleChange.bind(this);*/}
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({ monsters: users }))
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value }, () => {
      console.log(this.state)
    });
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <br></br>
        <h1>Monsters Rolodex</h1>
        {/*<input 
          type='search' 
          placeholder='search monsters' 
          onChange={e => {
            this.setState({ searchField: e.target.value }, () => {
              console.log(this.state)
            });     
          }}
        />*/}
        <SearchBox
          placeholder='search monsters'
          handleChange={this.handleChange}
        />
        {/*<CardList monsters={this.state.monsters}></CardList>*/}
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}

export default App;
