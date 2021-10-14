import React from 'react';
import PropTypes from 'prop-types';
import { FaUser, FaStar,  FaExclamationTriangle, FaCodeBranch } from 'react-icons/fa';

export default function Grid({repos}){
    return (
        <div className="flex flex-wrap">
            
            { repos.map((repo, index)=>{
                const { name, owner, html_url, stargazers_count, forks, open_issues} = repo;
                const { login, avatar_url } = owner;
                return (
                    <div key={html_url} className="">
                        <div className="rounded-lg bg-gray-800 m-3 p-3 w-72 hover:bg-opacity-10 bg-opacity-25 text-lg text-center font-semibold">
                            <h3 className="mb-3">#{index+1}</h3>
                            <center><img className="h-48" src={avatar_url} alt={`Avatar for ${login}`} /> </center><br />
                            <center><h2 className="text-red-700 font-bold capitalize">{name}</h2></center>
                            <span><a href={html_url} ><h4 className="hover:text-red-500"><FaUser className="inline mb-2 mr-2 text-yellow-500" /> {login}</h4></a></span> <br />
                            <span><FaCodeBranch className="inline mb-2 mr-2 text-blue-500" /> {forks}</span> <br />
                            <span><FaStar className="inline mb-2 mr-2 text-yellow-500" /> {stargazers_count}</span> <br />
                            <span><FaExclamationTriangle  className="inline mb-1 mr-4 text-red-500" /> {open_issues}</span>
                        </div>
                    </div>
                )
            }) }

        </div>
    )
}

Grid.propTypes = {
    repos: PropTypes.object.isRequired,
}