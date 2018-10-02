import {createStore} from 'redux';
function convert(questions) {
    return Object.values(questions);
}
function reducers (defaultStore = {
    questions: convert(JSON.parse(document.getElementById('data_fs').innerHTML).question),
    questNumber:0,
    site_url: JSON.parse(document.getElementById('data_fs').innerHTML).siteurl,
    answers: {}
}, action) {
    switch(action.type) {
        case 'NEXT_QUESTION' : {
            return {
                ...defaultStore,
                questNumber: defaultStore.questNumber+1
            }
        }
        case 'PREVIOUS_QUESTION' : {
           
            return {
                ...defaultStore,
                questNumber: defaultStore.questNumber-1
            }
        }
        case 'ANSWER' : {
            const answers = defaultStore.answers;
            answers[action.payloads.question_id] = action.payloads.answer_id;
            return {
                ...defaultStore,
                answers: {...answers}
            }
        }
        default: {
            return defaultStore
        }
    }
}   
const store = createStore(reducers);
export default store