import React, {useState, useEffect} from "react";
import { FiSun } from 'react-icons/fi';
import { BsMoonFill } from 'react-icons/bs';
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import PropTypes from 'prop-types';
import { fetchPopularRepos } from "../utils/api";
import ContentLoader from 'react-content-loader';
import ReposGrid from "./ReposGrid";



function LanguagesNav({selectedLanguage, updateSelectedlanguage}){
    const languages = ["All", "javascript", "Ruby", "Java", "CSS", "Python"];

    return (
        <ul className="flex justify-center navlist">
            { 
            languages.map((lang) => {

                return <li key={lang}>
                  <button  
                  style={lang === selectedLanguage ? {color: 'red'} : null}
                  onClick={()=> updateSelectedlanguage(lang)} 
                  className="rounded p-2 font-semibold focus:outline-none list-none">
                      {lang}
                  </button>
                </li>
            })
             }
        </ul>
    )
    
}


LanguagesNav.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    updateSelectedlanguage: PropTypes.func.isRequired
}


export default function Popular() {

  
  const [theme, setTheme] = useState('light');
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [repos, setRepos] = useState({})
  const [error, setError] = useState(null)
  const [menuIsOpen, setMenuIsOpen] = useState(false)


  // componentDidUpdate when theme state is updated
  useEffect(()=>{
    const theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    document.getElementById('root').classList.add(theme)
    setTheme((c)=> c = theme)

}, [theme])

useEffect(()=>{
  updateSelectedlanguage(selectedLanguage)
}, [])

// update function to update selected language
function updateSelectedlanguage(language){
    
    try{
  
      setSelectedLanguage(language)
      setError(e => e = null)
      if (!repos[language]){
        fetchPopularRepos(language)
        .then(data => {
            setRepos(prevRepos => {
             return prevRepos = {
                ...prevRepos,
                [language]: data
              }
            });
          })
          return;
        }

    }
    catch(error){
      setError(error.message)
    }
  }

  // loading function returns true when repos and error states are null
function isLoading(){
    return !repos[selectedLanguage] && error === null
  }



// function to handle dark mode
  function handleDark(){
      let root = document.getElementById('root');
      if (localStorage.getItem('theme') === 'light'){
          root.classList.remove('light')
          document.querySelector(':root').classList.remove('light')
          root.classList.add('dark')
          document.querySelector(':root').classList.add('dark')
        setTheme((c)=> c = 'dark')
      }
    localStorage.setItem('theme', 'dark')
  }

  // function to handle light mode
  function handleLight(){
      let root = document.getElementById('root');
      if (localStorage.getItem('theme') === 'dark'){
          root.classList.remove('dark')
          document.querySelector(':root').classList.remove('dark')
          root.classList.add('light')
          document.querySelector(':root').classList.add('light')
        setTheme((c)=> c = 'light')
      }
    localStorage.setItem('theme', 'light')
  }

  return (
    <div className="sm:justify-items-start">
      <nav className="flex justify-between pl-5">
        <ul className="mx-5 mt-5 font-bold text-red-500">POPULAR <span className="text-gray-600">Battle</span></ul>
        <span className="mt-10">
          { menuIsOpen &&
          <LanguagesNav
          selectedLanguage = {selectedLanguage}
          updateSelectedlanguage = {updateSelectedlanguage}
          /> 
        }
        {
          window.innerWidth > 600 && menuIsOpen === false &&
          <LanguagesNav
          selectedLanguage = {selectedLanguage}
          updateSelectedlanguage = {updateSelectedlanguage}
          /> 
        }
        </span>
          <div className="inline mt-10 transform translate-y-1">
          {
            window.innerWidth < 600 ? 
            <div>
              {menuIsOpen? <FiX onClick={()=> setMenuIsOpen((b)=>b=!b)} />:  <FiMenu onClick={()=> setMenuIsOpen((b)=>b=!b)} /> }
            </div> : null 

          }
          </div>
        <div className="mr-5 mt-5">
        {theme === 'light' && localStorage.getItem('theme') === 'light' ? <button onClick={handleDark} className="font-bold p-1 rounded focus:outline-none hover:text-gray-700"><BsMoonFill /></button> : 
        <button onClick={handleLight} className="font-bold p-1 rounded focus:outline-none hover:text-yellow-400"><FiSun /></button>}
        </div>
      </nav>

      <div className="pl-10 pt-5">
        {isLoading() && <p className=""><ContentLoader /></p>}

        {error && <p className="font-bold">{error}</p>}

        {repos[selectedLanguage] && <ReposGrid repositories={repos[selectedLanguage]} />}

      </div>
    </div>
  );
}
