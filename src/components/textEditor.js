import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'emoji-slider';
import '../styles/cardData.scss';
import '../styles/wysiwg.scss';

export class TextEditor extends React.Component {
  constructor(props) {
    super(props); 

    this.contentStateChange = this.contentStateChange.bind(this)
  }
 
  contentStateChange = (content) => {
    if (content) {    
      this.props.setData(content)
    }
  }

  render () {
    return (
      <Editor
        defaultContentState= {typeof this.props.existingContent === 'boolean' ? {
          "blocks": [],
          "entityMap": {}
        } : this.props.existingContent}
        onContentStateChange={this.contentStateChange} 
        editorClassName="wysiwg-editor"
        toolbarClassName="wysiwg-toolbar"
        toolbar={{
          options: ['inline', 'fontSize', 'fontFamily', 'list', 'colorPicker', 'emoji', 'image', 'history'],
          inline: {
            inDropdown: false,
            options: ['bold', 'italic', 'underline'],
          },
          list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['unordered', 'ordered'],
          },
        }}
      />
    )
  }
  
}
