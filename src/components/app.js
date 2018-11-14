import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import '../assets/css/app.css';
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';
import List from './list';
import AddItem from './add_item';


const BASE_URL = 'http://api.reactprototypes.com/todos';
const API_KEY ='?key=pizza_at_learningfuze';


class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            list: [],
            error: ''
        }
    }

    deleteItem = async (id) => {
        // console.log("Delete item with ID:", id);


        const resp = await axios.delete(`${BASE_URL}/${id + API_KEY}`);
        this.getListData();
    }

    addItem = async (item) => {
        const resp = await axios.post(BASE_URL + API_KEY, item);

        this.getListData();
    }

    componentDidMount(){
        this.getListData();
    }

    async getListData(){
        // //http://api.reactprototypes.com/todos?key=c718_demouser
        // axios.get(BASE_URL + API_KEY).then((resp) => {
        //     console.log('Server resp:', resp);

        //     this.setState({
        //         list:resp.data.todos
        //     });
        // }).catch((err) => {
        //     console.log('Request Error:', err);
        //     this.setState({
        //         error:'Error getting todos'
        //     });
        // });

        try{

        const resp = await axios.get(BASE_URL + API_KEY);

        this.setState({
            list:resp.data.todos
        });
    }catch(err){

        this.setState({
            error: 'Error getting todos'
            });
        }

    }

    render (){
        const {error, list} = this.state;

        return (
            <div className="container">

                <Route exact path="/" render={() => {
                    return <List delete={this.deleteItem} data={list} error={error}/>
                }}/>

                <Route path="/add-item" render = {() => {
                    return <AddItem add={this.addItem} />
                }}/>
            </div>
        );
    }
}

export default App;
