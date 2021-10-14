import React, { useState, useEffect } from 'react';
import{ battle } from '../utils/api';
import ContentLoader from 'react-content-loader';
import { FaGift, FaTwitter, FaCompass, FaUser, FaSuitcase, FaCode, FaUsers } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';

export default function Results(props) {
    const [winner, setWinner] = useState(null)
    const [loser, setLoser] = useState(null)
    const [error, setError] = useState(null)
    const [isloading, setIsLoading] = useState(true)

    useEffect(()=>{
        const { playerOne, playerTwo } = props

        battle([playerOne, playerTwo])
        .then(players => {
            setWinner(w => w = players[0])
            setLoser(l => l = players[1])
            setError(null)
            setIsLoading(false)
        })
        .catch(({message})=>{
            setIsLoading(false)
            setError(e => e = message)
        })
    }, [])

    return ( 
        <div>
            <center><h2 className="font-extrabold text-2xl underline mb-10">Results</h2></center>
            <div className="m-10 ml-20">
                { isloading && <ContentLoader /> }
                { error && <p className="font-bold">{error} :( Try again</p> }
            </div>
            { 
                winner && loser && 
            <div className="m-10 p-5 flex flex-wrap justify-center">
                <div className="p-5 mx-5 bg-gray-800 bg-opacity-25 flex-col justify-center rounded-md shadow-md space-y-2 w-78 mb-3">
                    { winner.score === loser.score ? <center><h2 className="font-extrabold text-yellow-500 justify-center ml-5 my-3">DRAW</h2></center> :
                        <center><h2 className="font-extrabold text-green-500 justify-center ml-5 my-3">WINNER <FaGift className="ml-2 mb-1 inline" /></h2></center>
                    }
                    <center><img className="h-48 w-48 rounded-full mb-3" src={winner.profile.avatar_url} alt="Winner avatar" /></center>
                        <center><p className="font-bold">Score: {winner.score.toLocaleString()}</p></center>
                        <center><h3 className="font-extrabold text-red-700 hover:text-red-500 my-3"><a href={winner.profile.html_url}>{winner.profile.login}</a></h3></center>
                        <p className="space-x-5 flex-wrap"><FaUser className="inline ml-2" /> {winner.profile.name}</p>
                        <p className="space-x-5"><FaCompass className="inline ml-2" /> {winner.profile.location}</p>
                        <p className="space-x-5"><FaSuitcase className="inline ml-2" /> {winner.profile.company? winner.profile.company : 'Not available'}</p>
                        <p className="space-x-5"><FaUsers className="inline ml-2" /> {winner.profile.followers} followers</p>
                        <p className="space-x-5"><FiUsers className="inline ml-2" /> {winner.profile.following} following</p>
                        <p className="space-x-5"><FaCode className="inline ml-2" /> {winner.profile.public_repos} repositories</p>
                        <p className="space-x-5"><FaTwitter className="inline ml-2" /> 
                            <a className="hover:text-blue-500" href={`https://twitter.com/${winner.profile.twitter_username}`}>
                            {winner.profile.twitter_username}
                            </a>
                        </p>
                </div>
                <div className="p-5 mx-5 bg-gray-800 bg-opacity-25 flex-col justify-center rounded-md shadow-md space-y-2 w-78">
                    {
                        winner.score === loser.score ? <center><h2 className="font-extrabold text-yellow-500 justify-center ml-5 my-3">DRAW</h2></center> :
                        <center><h2 className="font-extrabold text-red-500 justify-center ml-5 my-3">LOSER</h2></center>
                    }
                    <center><img className="h-48 w-48 rounded-full mb-3" src={loser.profile.avatar_url} alt="loser avatar" /></center>
                    <center><p className="font-bold">Score: {loser.score.toLocaleString()}</p></center>
                    <center><h3 className="font-extrabold text-red-700 hover:text-red-500 my-3"><a href={loser.profile.html_url}>{loser.profile.login}</a></h3></center>
                    <p className="space-x-5 flex-wrap"><FaUser className="inline ml-2" /> {loser.profile.name}</p>
                    <p className="space-x-5"><FaCompass className="inline ml-2" /> {loser.profile.location}</p>
                    <p className="space-x-5"><FaSuitcase className="inline ml-2" /> {loser.profile.company? loser.profile.company : 'Not available'}</p>
                    <p className="space-x-5"><FaUsers className="inline ml-2" /> {loser.profile.followers} followers</p>
                    <p className="space-x-5"><FiUsers className="inline ml-2" /> {loser.profile.following} following</p>
                    <p className="space-x-5"><FaCode className="inline ml-2" /> {loser.profile.public_repos} repositories</p>
                    <p className="space-x-5"><FaTwitter className="inline ml-2" /> 
                        <a className="hover:text-blue-500" href={`https://twitter.com/${loser.profile.twitter_username}`}>
                            {loser.profile.twitter_username}
                        </a>
                    </p>
                </div>

            </div>
            
            }
                <center>
                    <button className="block bg-blue-600 hover:bg-blue-500 font-semibold rounded-full text-white px-5 py-3 mb-20" 
                    onClick={()=> {props.resetBattle()}}>
                        Reset
                    </button>
                </center>

        </div>
     );
}

