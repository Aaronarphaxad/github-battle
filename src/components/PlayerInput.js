import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimesCircle } from 'react-icons/fa';
import Results from './Results';


// Form to receive github usernames

function PlayerForm({ label, onSubmit }){
    const [ username, setUsername] = useState('');

    function handleSubmit (event){
        event.preventDefault();
        onSubmit(username)
    }

    function handleChange(event){
        setUsername(u => u = event.target.value)
    }

    return (
        <React.Fragment>
             { 
            <div className="mr-5">
            <center>
                <form onSubmit={handleSubmit} className="space-x-3 w-full">
                        <label htmlFor='username' className="font-bold mb-10" >
                            {label}
                        </label>
                    <div className="w-full">
                        <input onChange={handleChange} id="username" value={username} placeholder={label} type="text"
                            className="mb-5 shadow appearance-none border w-90 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <button type="submit" disabled={!username} className="btn font-bold mb-10">
                            Submit
                        </button>
                    </div>
                </form>
                </center>
            </div>
        }
        </React.Fragment>
    )
}

// Defining proptypes for Player Form component
PlayerForm.propTypes = {
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}


// Player Preview component to display when player data is received
function PlayerPreview({username, onReset, label}){
    return (
        <div className="mx-5 space-x-3 mb-3">
            <h3 className="font-bold ml-5 mb-3">{label}</h3>
            <div>
                <div className="flex bg-gray-800 bg-opacity-25 p-4 rounded">
                    <img src={`https://github.com/${username}.png?size=200`}
                        alt={`Avatar for ${username}`}
                        className="w-10 mr-3 rounded-full"
                    />
                    <a 
                        href={`https://github.com/${username}`}
                        className="font-bold text-red-700 mt-2"
                    >
                        {username}
                    </a>
                    <button onClick={onReset} className="ml-5 text-red-700 focus:outline-none">
                        <FaTimesCircle />
                    </button>
                </div>
            </div>
        </div>
    )
}

// defining proptypes for Player Preview component
PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}


//Player input class component. I used class component because of the object based state for manipulation
export default class PlayerInput extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            playerOne: null,
            playerTwo: null,
            battle: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.resetBattle = this.resetBattle.bind(this);
    }


    handleSubmit(id, player){
       this.setState({
           [id]: player
        })
    }

    handleReset(id){
        this.setState({
            [id]: null
        })
    }

    resetBattle(){
        this.setState({
            battle: false,
            playerOne: null,
            playerTwo: null
        })
    }

render(){

    if(this.state.battle === true){
        return (
        <Results 
            playerOne={this.state.playerOne}
            playerTwo={this.state.playerTwo}
            resetBattle={this.resetBattle}
        />
        )
    }
    return (
        <div className="m-10 mb-20">
            <center><h1 className="font-bold text-xl mb-5 ml-10">Let the Battle begin</h1></center>
       
            <div className="flex justify-center flex-wrap">
                { this.state.playerOne === null ? 
                    <PlayerForm 
                    onSubmit={player => this.handleSubmit('playerOne', player)}
                    label='Player One'
                /> : <PlayerPreview 
                username={this.state.playerOne}
                label="Player One"
                onReset={()=>this.handleReset('playerOne')} 
                /> }

                {/* <span className="font-extrabold ml-5">VS</span> */}

                { this.state.playerTwo === null ? 
                <PlayerForm 
                    onSubmit={player => this.handleSubmit('playerTwo', player)}
                    label='Player Two'            
                /> : <PlayerPreview 
                username={this.state.playerTwo}
                label="Player Two"
                onReset={()=>this.handleReset('playerTwo')}  
                />}
            </div>

            { 
                this.state.playerOne && this.state.playerTwo &&
            <center>
                <button
                    onClick={()=> this.setState({battle: true})} 
                className="bg-blue-600 rounded-full hover:bg-blue-500 font-bold px-5 py-3 text-white mt-10 focus:outline-none">
                    Battle
                </button>
            </center>

            }

        </div>
    )
}
    
}