import {connect} from 'react-redux';
import React from 'react';
import Img from 'react-image';
import {Spinner} from './spinner';
class Question extends React.Component {
    constructor() {
        super();
        this.state = {
            showerror: false
        }
    }
    nextQuestion = () => {
        if(this.nowAnswer() != null) {

            this.setState({
                showerror: false
            })
            if (this.props.last_question_id == this.props.question.general.question_id) {
                window.onbeforeunload= null;
                this.submit();
            } else {
                this.props.dispatch({
                    type: 'NEXT_QUESTION'
                })
            }
        } else {
            this.setState({
                showerror: true
            })
            //this.forceUpdate();
        }
    }
    JSON_to_URLEncoded(element,key,list){
        var list = list || [];
        if(typeof(element)=='object'){
          for (var idx in element)
            this.JSON_to_URLEncoded(element[idx],key?key+'['+idx+']':idx,list);
        } else {
          list.push(key+'='+encodeURIComponent(element));
        }
        return list.join('&');
      }
    submit = () => {
        const answers = this.convertToArray(this.props.answers);
        this.postData(`${this.props.site_url}`, {
            answers
        }).then(res => {
            window.location.href = `${this.props.site_url}results/`+ res.quiz_code
        })
    }
    postData(url = ``, data = {}) {
        // Default options are marked with *
          return fetch(url, {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              mode: "cors", // no-cors, cors, *same-origin
              cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              credentials: "same-origin", // include, same-origin, *omit
              headers: {
                  //"Content-Type": "application/json; charset=utf-8",
                   "Content-Type": "application/x-www-form-urlencoded",
              },
              redirect: "follow", // manual, *follow, error
              referrer: "no-referrer", // no-referrer, *client
              body: this.JSON_to_URLEncoded(data), // body data type must match "Content-Type" header
          })
          .then(response => response.json()); // parses response to JSON
      }
    convertToArray(answers) {
        const answersArray = [];
        Object.keys(answers).map(question_id => {
            const answer = {
                question_id,
                answer_id : answers[question_id]
            }
            answersArray.push(answer);
        })
        return answersArray;
    }
    nextBtnText =() => {
        if (this.props.last_question_id == this.props.question.general.question_id) {
            return 'Enviar Cuestionario'
        } else {
            return 'Siguiente Pregunta'
        }
    }
    previousQuestion = () => {
        this.props.dispatch({
            type: 'PREVIOUS_QUESTION'
        });
    }
    onSelect = (e) => {
        const answer_id = e.target.value;
        this.props.dispatch({
            type: 'ANSWER',
            payloads  : {
                question_id : this.props.question.general.question_id,
                answer_id: answer_id
            }
        });
    }
    nowAnswer = () => {
        return this.props.answers[this.props.question.general.question_id];
    }
    isSelect = (answer_id) => {
        return this.nowAnswer() == answer_id;
    }
    render() {
        return (
            <div className='row quiz_question'>
                <div className='col-md-12 description'>
                    {this.props.question.general.question_desc}
                </div>
                
                <div className ='col-md-12 d-flex flex-wrap'>
                    <div className ='col-md-7'>
                       {this.props.question.answers.map(answer => (
                           <div className='d-flex flex-nowrap answer' key ={answer.answer_id}>
                                <label htmlFor={answer.answer_id}>{answer.answer_desc}</label> 
                                <input type='radio' name='answer'  id ={answer.answer_id} value={answer.answer_id} onChange = {this.onSelect} checked = {this.isSelect(answer.answer_id)}/>
                            </div>
                       ))} 
                    </div>
                    <div className='col-md-5'>
                    
                        <Img  className = 'img-fluid' src = {this.props.site_url + 'assets/images/' + this.props.question.general.question_picture}
                            loader = {<Spinner />}/>
                    </div>
                </div>
                {this.state.showerror? 
                <div className="alert alert-danger col-md-7">
                    Selecciona tu respuesta antes de continuar con la siguiente pregunta
                </div>
                 :''}
                <div className=' controls col-md-7 d-flex justify-content-between'>
                        <button className='btn btn-primary' onClick ={this.previousQuestion} disabled  = {this.props.questNumber == 0}>Anterior</button>
                        <button className='btn btn-success' onClick ={this.nextQuestion} >{this.nextBtnText()}</button>
                 </div>
            </div>
        )
    }
}
export default connect(state => {
    console.log(state);
    return {
        answers : state.answers,
        last_question_id: state.questions[state.questions.length -1].general.question_id,
        first_question_id: state.questions[0].general.question_id,
        questNumber: state.questNumber,
        site_url: state.site_url,
    }
})(Question)