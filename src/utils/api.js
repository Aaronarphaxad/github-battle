const id = '7bdd908e3dcaf7bbd278'
const sec = 'c1dc145a22b179e4b864ce8d7311185df445c57b'
const params = `?client_id=${id}&client_secret=${sec}`

// function to get error message
function getErrorMessage(message, username){
    if(message === 'Not Found'){
        return `Sorry, ${username} does not exist`
    }

    return message
}

// function to get user profile from github api
function getProfile(username){
    const endpoint = `https://api.github.com/users/${username}${params}`;

    return fetch(endpoint)
    .then(response => response.json())
    .then(profile => {
        if(profile.message){
            throw new Error(getErrorMessage(profile.message, username))
        }

        return profile
    })
}

// function to get user repositories info. receives username as parameter
function getRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    .then(response => response.json())
    .then(repos => {
        if(repos.message){
            throw new Error(getErrorMessage(repos.message, username))
        }

        return repos
    })
}

// function to calculate star count from all user repos
function getStarCount(repos){
    return repos.reduce((count, { stargazers_count })=>{ 
        return count + stargazers_count }, 0)
}

// function to calculate the score of user using follower count and stars from user repos
function calculateScore(followers, repos){
    return (followers * 3) + getStarCount(repos)
}

// function to get all user data from one player, then return an object of the profile and the count
function getUserData(player){
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ])
    .then(([profile, repos])=>({
        profile,
        score: calculateScore(profile.followers, repos),
    }))
}

// function to sort the players according to their score, highest count comes first
function sortPlayers(players){
    return players.sort((a, b)=> b.score - a.score)
}

// main function to get the final result which will contain an array of 2 objects. 
// Each object will contain player profile and their score
export function battle(players){
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ]).then(results => sortPlayers(results))
}

// function to fetch popular repositories
export function fetchPopularRepos(language){
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:
    ${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
    .then(response => response.json())
    .then((data) => {
        if(!data.items){ 
            throw new Error(`${data.name}: ${data.message}`)
        }
        return data.items
    })
    .catch(error =>{
        // throw new Error(`Failed while fetching data`,error.message)
        console.log(error.message)
    })
}