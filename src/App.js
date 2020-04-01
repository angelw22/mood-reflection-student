import React from 'react';
import './styles/App.scss';
import Form from './components/form';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="App">
        <Form />
      </div>
    )
  }
}
export default App;
