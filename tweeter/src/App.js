import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

const loadTweets = (callback) => {
  const xhr = new XMLHttpRequest()
  const method = 'GET'
  const url = 'http://localhost:8000/api/tweets/'
  const responseType = 'json'
  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function() {
    callback(xhr.response, xhr.status)
  }
  xhr.onerror = function (e) {
    callback({'message': 'The request was an error'}, 400)
  }
  xhr.send()
}

function LikeBtn(props) {
  const { tweet } = props
  return <button className="btn btn-sm btn-primary">{tweet.likes} Like</button>
}

function Tweet(props) {
  const {tweet} = props
  return <div className='col-10 mx-auto col-md-6'>
    <p>
      {tweet.content}
    </p>
    <div className='btn btn-group'>
      <LikeBtn tweet={tweet} />
    </div>
  </div>
}

function App() {
  const [tweets, setTweets] = useState([])


  useEffect(() => {
    const myCallback = (response, status) => {
      if (status === 200) {
        setTweets(response)
      } else {
        alert('There was an error loading tweets.')
      }
    }
    loadTweets(myCallback)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {tweets.map((tweet, index) => {
            return <Tweet tweet={tweet} key={index} />
          })}
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
