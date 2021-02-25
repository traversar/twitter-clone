import React, {useEffect, useState} from 'react';

import { loadTweets } from '../lookup'


export function TweetsComponent(props) {
    const textAreaRef = React.createRef()
    const handleSubmit = e => {
        e.preventDefault()
        const newVal = textAreaRef.current.value
        console.log(newVal)
        textAreaRef.current.value = ''
    }

    return (
        <div className={props.className}>
            <div className='col-12 mb-3'>
                <form onSubmit={handleSubmit}>
                    <textarea ref={textAreaRef} required={true} className='form-control' name='tweet'>

                    </textarea>
                    <button type='submit' className='btn btn-primary my-3'>Tweet</button>
                </form>
            </div>
            <TweetsList />
        </div>

    )
}

export function TweetsList(props) {
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

    return tweets.map((tweet, index) => {
      return <Tweet tweet={tweet} key={index} className='my-5 py-5 border bg-white text-dark' />
    })
  }

export function ActionBtn(props) {
    const { tweet, action } = props
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
    const [liked, setLiked] = useState(tweet.userLike)
    const actionDisplay = action.display ? action.display : 'Action'
    const handleClick = e => {
        e.preventDefault()
        if (action.type === 'like') {
            if (liked === true) {
                setLiked(false)
                setLikes(likes - 1)
            } else {
                setLiked(true)
                setLikes(tweet.likes + 1)
            }
        }
    }
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
    return <button onClick={handleClick} className="btn btn-sm btn-primary">{display}</button>
  }

export function Tweet(props) {
    const {tweet} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return <div className={className}>
      <p>
        {tweet.content}
      </p>
      <div className='btn btn-group'>
        <ActionBtn action={{type: 'like', display: 'Likes'}} tweet={tweet} />
        <ActionBtn action={{type: 'unlike', display: 'Unlike'}} tweet={tweet} />
        <ActionBtn action={{type: 'retweet', display: 'Retweet'}} tweet={tweet} />
      </div>
    </div>
  }
