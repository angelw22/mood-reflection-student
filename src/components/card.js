import React from 'react';
import '../styles/card.scss';
import { Zero, One, Two, Three, Four, Five, Six } from './cardData';

const Card = props =>  {
  const cardData = [
    <Zero />, 
    <One updatePageStatus={props.updatePageStatus} pageStatus={props.pageStatus}/>, 
    <Two updatePageStatus={props.updatePageStatus} pageStatus={props.pageStatus}/>, 
    <Three updatePageStatus={props.updatePageStatus} pageStatus={props.pageStatus}/>, 
    <Four updatePageStatus={props.updatePageStatus} pageStatus={props.pageStatus}/>, 
    <Five updatePageStatus={props.updatePageStatus} pageStatus={props.pageStatus}/>, 
    <Six />
  ]

  return (
    <div className={`cardBody ${props.pageNum === 0 ? 'start': ''}`}> 
      <div className ="cardWrapper">
        <div className="cardContents">
          {cardData[props.pageNum]}
        </div>
        {
          props.pageNum === 6 ?
          '' :
          <div className="cardButtons">
            {props.pageNum > 1 && props.pageNum!== 6 ? <div className="buttons left" onClick={props.prevPage}><span>Previous</span></div> : ''}
            <div className={`buttons right ${props.pageStatus[props.pageNum] ? '' : 'inactive'}`} onClick={props.pageStatus[props.pageNum] ? props.nextPage : null}><span>{props.pageNum === 0 ? 'Start' : props.pageNum < 5 ? 'Next' : 'Submit'}</span></div>
          </div>
        }
      </div>
    </div>
  );
};


export default Card;