import React, { useState, useEffect, useRef } from 'react';
import 'emoji-slider';
import '../styles/cardData.scss';
import { EditorState } from 'draft-js';
import { TextEditor } from './textEditor';

export const Zero = props => {
  return (
    <div>
      <div className="title">Mood Reflection Platform 4</div>
      <div className="subtitle">Let's create an encouraging learning environment together!</div>
      <div className="info"> 5 Questions</div>
    </div>
  )
}

export const One = props => {
  const [data, setData] = useState({
    anger: props.pageStatus[1].anger || null,
    happiness: props.pageStatus[1].happiness || null,
    sadness: props.pageStatus[1].sadness || null,
    calmness: props.pageStatus[1].calmness || null,
    anxiousness: props.pageStatus[1].anxiousness || null
  })
  const references = {
    anger: useRef(null),
    happiness: useRef(null),
    sadness: useRef(null),
    calmness: useRef(null),
    anxiousness: useRef(null)
  }
  const emojis = {
    anger: ['😶','😠','😡','🤬'],
    happiness: ['😶', '🙂', '😄', '🤣'],
    sadness: ['😶', '😕', '🙁', '😢'],
    calmness: ['😶', '😐', '🥱 ', '😴'],
    anxiousness: ['😶', '😯', '😧 ', '😖']
  }


  const updateField = e => {
    setData({
      ...data,
      [e.target.id]: e.target.value
    })

    let emotion = e.target.id
    let emotionref = references[emotion].current
    if (emotionref.value < 0.25) {
      emotionref.emoji = emojis[emotion][0];
    } else if (emotionref.value < 0.5) {
      emotionref.emoji = emojis[emotion][1];
    } else if (emotionref.value < 0.75) {
      emotionref.emoji = emojis[emotion][2];
    } else {
      emotionref.emoji = emojis[emotion][3];
    }
  };

  useEffect(() => {
    if (data.anger !== null && 
        data.happiness !== null && 
        data.sadness !== null && 
        data.calmness !== null && 
        data.anxiousness!== null) {
      props.updatePageStatus(1, data);
    }
    if (props.pageStatus[1]) {
      references.anger.current.value = data.anger;
      references.happiness.current.value = data.happiness;
      references.sadness.current.value = data.sadness;
      references.calmness.current.value = data.calmness;
      references.anxiousness.current.value = data.anxiousness
    }
  }, [props, data, references])


  return (
    <div>
      <div className="question">How much of each of the following emotions are you feeling now? <span className="requiredLabel">* required</span></div>
      <div className="description">
    Use the sliders to indicate the intensity of the emotions. Slide all the way to the left, if you do not feel this feeling at all. Slide all the way to the right if the feeling is very intense.</div>
      <div className="emojiBox"><span>Anger <span className="requiredLabel">*</span></span><emoji-slider ref={references.anger} id="anger" class={data.anger === null ? 'inactive' : ''} emoji="😶" onClick={updateField} onTouchEnd={updateField}></emoji-slider></div>
      <div className="emojiBox"><span>Happiness <span className="requiredLabel">*</span></span><emoji-slider ref={references.happiness} id="happiness" class={data.happiness === null ? 'inactive' : ''} emoji="😶" onClick={updateField} onTouchEnd={updateField}></emoji-slider></div>
      <div className="emojiBox"><span>Sadness <span className="requiredLabel">*</span></span><emoji-slider ref={references.sadness} id="sadness" class={data.sadness === null ? 'inactive' : ''} emoji="😶" onClick={updateField} onTouchEnd={updateField}></emoji-slider></div>
      <div className="emojiBox"><span>Calmness <span className="requiredLabel">*</span></span><emoji-slider ref={references.calmness} id="calmness" class={data.calmness === null ? 'inactive' : ''} emoji="😶" onClick={updateField} onTouchEnd={updateField}></emoji-slider></div>
      <div className="emojiBox"><span>Anxiousness <span className="requiredLabel">*</span></span><emoji-slider ref={references.anxiousness} id="anxiousness" class={data.anxiousness === null ? 'inactive' : ''} emoji="😶" onClick={updateField} onTouchEnd={updateField}></emoji-slider></div>
    </div>
  )
}


export const Two = props => {
  const [data, setData] = useState(props.pageStatus[2] || EditorState.createEmpty())

  useEffect(() => {
    props.updatePageStatus(2, data)
  }, [data])

  return (
    <div>
      <div className="question">Care to describe your feelings?</div>
      <div className="description">Use a word, a phrase or a short sentence to describe how you feel right now.</div>
      <TextEditor setData={setData} existingContent={data}/>
    </div>
  )
}

export const Three = props => {
  const [data, setData] = useState(props.pageStatus[3] || EditorState.createEmpty())

  useEffect(() => {
    props.updatePageStatus(3, data)
  }, [data])

  return (
    <div>
      <div className="question">Why do you feel this way?</div>
      <div className="description">Share a reason why is it that you feel this way.</div>
      <TextEditor setData={setData} existingContent={data}/>
    </div>
  )
}

export const Four = props => {
  const [data, setData] = useState(typeof props.pageStatus[4] === 'boolean' ? '' : props.pageStatus[4])

  const updateField = e => {
    setData(e.target.value)
    props.updatePageStatus(4, e.target.value || true)
  }

  return (
    <div>
      <div className="question">Care to let us know who you are?</div>
      <div className="description">You can indicate your index number in the space below if you will like me to know who you are. This is completely optional but it will certainly help. :)</div>
      <div className="splitInputs"><input type="text" placeholder="Index number" onChange={updateField} value={data}></input></div>
    </div>
  )
}

export const Five = props => {
  const [data, setData] = useState("")

  const change = (e) => {
    setData(e.target.value)
  }

  useEffect(() => { 
    if (data) {
      props.updatePageStatus(5, data);
    }
    else {
      props.updatePageStatus(5, false);
    }
  }, [data])

  return (
    <div>
      <div className="question">Which class are you from? <span className="requiredLabel">* required</span></div>
      <select id="classes" onChange={change} >
        <option value="" defaultValue>Select</option>
        <option value="1e4">1E4</option>
        <option value="2n1">2N1</option>
      </select>
    </div>
  )
}

export const Six = props => {
  return (
    <div>
      <div className="closing">Your response has been recorded. Thank you!</div>
    </div>
  )
}

