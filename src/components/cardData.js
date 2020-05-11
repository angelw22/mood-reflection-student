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
    setEmojis(e.target.id)
  };

  const setEmojis = (scope) => {
    if (scope === "all") {
      for (var key in data) {
        loopThroughEmojis(key, references[key].current)
      }
    }
    else {
      loopThroughEmojis(scope, references[scope].current)
    }
  } 

  const loopThroughEmojis = (emotion, ref) => {
    if (ref.value < 0.25) {
      ref.emoji = emojis[emotion][0];
    } else if (ref.value < 0.5) {
      ref.emoji = emojis[emotion][1];
    } else if (ref.value < 0.75) {
      ref.emoji = emojis[emotion][2];
    } else {
      ref.emoji = emojis[emotion][3];
    }
  }

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
      setEmojis("all");
    }
  }, [data])


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
  var editor = null;

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

  const change = e => {
    if (e.target.value > 0 && e.target.value < 50 || e.target.value == '') {
      setData(e.target.value)
      console.log('right!', e.target.value);
      props.updatePageStatus(4, e.target.value || true)
    }
    else {
      setData(e.target.value);
      props.updatePageStatus(4, false)
      console.log('wrong index', e.target.value)
    }
  }

  return (
    <div>
      <div className="question">Care to let us know who you are?</div>
      <div className="description">You can indicate your index number in the space below if you will like me to know who you are. This is completely optional but it will certainly help. :)</div>
      <div className="inputContainer"><input type="text" placeholder="e.g. 1 - 49" onChange={change} value={data}></input></div>
    </div>
  )
}

export const Five = props => {
  const [data, setData] = useState(typeof props.pageStatus[5] === 'boolean' ? '' : props.pageStatus[5])

  const change = (e) => {
    if (/^[A-Za-z]{2}\d{3}$/.test(e.target.value)) {
      console.log('right string!!', e.target.value)
      setData(e.target.value)
      props.updatePageStatus(5, e.target.value);
    }
    else {
      setData(e.target.value)
      console.log('wrong string!!!', e.target.value)
      props.updatePageStatus(5, false);
    }
  }

  return (
    <div>
      <div className="question">
        {/* Which class are you from?  */}
        Please enter the class code assigned by your teacher: 
        <span className="requiredLabel"> * required</span>
      </div>
      <div className="description">Please check with your teacher if you are unsure.</div>
      <div className="inputContainer">
        <input type="text" placeholder="e.g. AB001" onChange={change} value={data}></input>
      {/* <select id="classes" onChange={change} >
        <option value="" defaultValue>Select</option>
        <option value="1e4">1E4</option>
        <option value="2n1">2N1</option>
      </select> */}
      </div>
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

