import React from 'react';
import { FaUserFriends, FaTrophy, FaFighterJet } from 'react-icons/fa';

export default function Instructions(){
    return (
        <React.Fragment>
            <div><center><h1 className="font-bold text-2xl mt-5 mx-5">Instructions for GitHub Battle</h1></center></div>
        <ol className="p-10 flex flex-wrap">
            <li className="bg-gray-800 bg-opacity-25 hover:bg-opacity-10 mx-10 mb-10 p-5 rounded-lg flex-1">
                <h3 className="font-bold text-lg justify-center ml-5">Enter Two GitHub usernames</h3>
                <FaUserFriends className="text-blue-500 ml-5" size={140} />
            </li>
            <li className="bg-gray-800 bg-opacity-25 hover:bg-opacity-10 mx-10 mb-10 p-5 rounded-lg flex-1">
                <h3 className="font-bold text-lg justify-center ml-5">Battle</h3>
                <FaFighterJet className="text-yellow-600 flex align-items-center ml-5" size={140} />
            </li>
            <li className="bg-gray-800 bg-opacity-25 hover:bg-opacity-10 mx-10 mb-10 p-5 rounded-lg flex-1">
                <h3 className="font-bold text-lg justify-center ml-5">See the Winners</h3>
                <FaTrophy className="text-red-500 ml-5" size={140} />
            </li>
        </ol>
        </React.Fragment>
    )
}