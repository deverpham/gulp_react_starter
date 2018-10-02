import 'rc-progress/assets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import store from './store';
import Question from './components/question';
import {Line} from 'rc-progress';
class App extends React.Component {
    renderQuestion() {
        const nowQuestion = this.props.questions[this.props.questNumber]
        return <Question question = {nowQuestion}/>
    }
    getPercentNumber = () => {
        const nowQuestion = this.props.questNumber+1;
        return nowQuestion/this.props.questions.length * 100;
    }
    render() {
        return (
            <div className='quizz_area'>
                <section className='progressbar col-md-3'>
                    Pregunta {this.props.questNumber+1} de {this.props.questions.length}
                    <Line percent={this.getPercentNumber()} strokeWidth="3" strokeColor="#DD4D4E" />
                </section>
                {this.renderQuestion()}
            </div>

        )
    }
}
const Root = connect(state => state)(App)
var confirmOnPageExit = function (e) 
{
    // If we haven't been passed the event get the window.event
    e = e || window.event;

    var message = '¿Estás seguro de reiniciar el cuestionario?';

    // For IE6-8 and Firefox prior to version 4
    if (e) 
    {
        e.returnValue = message;
    }

    // For Chrome, Safari, IE8+ and Opera 12+
    return message;
};
window.onbeforeunload = confirmOnPageExit;
console.log = () =>{};
ReactDOM.render(
    <Provider store ={store}>
        <Root />
    </Provider>, document.getElementById('quizz'))