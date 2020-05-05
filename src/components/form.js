import React, { useState } from 'react';
import Card from './card';
import '../styles/form.scss';
import draftToHtml from 'draftjs-to-html';
const htmlToText = require('html-to-text');


const Form = () => {

  const [pageNum, setPageNum] = useState(0);
  const [pageStatus, setPageStatus] = useState([true, false, true, true, true, false])

  function updatePageStatus (id, data) {
    setPageStatus({...pageStatus, [id]:data})
  }

  function nextPage() {
    if (pageNum < 6) {
      setPageNum(pageNum + 1)
      if (pageNum === 5) {
        sendData(organiseData()) 
      }
    }
  }
  function organiseData() {
    var organisedData = [];
    for (var key in pageStatus) {
      let item = pageStatus[key];
      if (typeof item === 'boolean') {
        organisedData.push('-');
      } else if (key === '1') {
        for (var i in item) {
          organisedData.push(item[i]);
        }
      }
      else if (key === '2' || key === '3') {
        organisedData.push(htmlToText.fromString(draftToHtml(item)))
      }
      else {
        organisedData.push(item);
      }
    }
    let date = new Date()
    organisedData[0] = date.toString();

    return organisedData;
  }

  async function sendData(data) {
    try {
      let response = await fetch(
        "https://mood-reflection.cf/api/upload",
        {
          method: "POST", 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log('ok')
      }
    } catch (errors) {
      console.log(errors);
     } 
  
  }

  function prevPage () {
    pageNum === 0 || setPageNum(pageNum -1)
  }


  return (
    <div className="formWrapper">
      <Card 
        pageNum={pageNum} 
        prevPage={prevPage} 
        nextPage={nextPage} 
        pageStatus = {pageStatus}
        updatePageStatus={updatePageStatus}
      />
      {pageNum === 6 ? '' :
      <div className={`mobileNavBar ${pageNum === 0 ? 'start': ''}`}>
        {pageNum > 1 && pageNum!== 6 ? <div className="buttons left" onClick={prevPage}></div> : ''}
        <div className={`buttons right ${pageStatus[pageNum] ? '' : 'inactive'}`} onClick={pageStatus[pageNum] ? nextPage : null}><span>{pageNum === 0 ? 'Start' : ''}</span></div>
      </div>
      }
      {pageNum > 0 && pageNum !== 6 ? <div className="progressBar"> <span className="activePage">{pageNum}</span>/5</div> : ''}
      
      </div>
  )
}

export default Form;