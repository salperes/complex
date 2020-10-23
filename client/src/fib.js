import React, {Component} from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount(){
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues(){
        const values = await axios.get('/api/values/current');
        this.setState({values: values.data});
    };

    async fetchIndexes(){
        const seenIndexes = await axios.get('/api/values/all'); 
        this.setState({
            seenIndexes: seenIndexes.data
        });
    }
    renderseenIndexes(){
        return this.state.seenIndexes.map(({number}) => number).join(',');
    }

    renderValues(){
        const entries = [];

        for (let key in this.state.values){
            entries.push(
                <div key={key}>
                    For index {key} I Calculated {this.state.values[key]}
                </div>
            );
        }
        return entries;
    }


    render(){
        return(
            <div>
                <form>
                    <label>
                        Enter your index:
                        <input
                         value = {this.state.index}
                         onChange = {event => this.setState({index: event.target.val})}
                        />
                    </label>
                </form>
                <h3>Indexes I have seen:</h3>
                {this.renderseenIndexes()}
                <h3>Calculated values:</h3>
                {this.renderValues()}
                <button>
                    Submit
                </button>
            </div>

        );
    }
}