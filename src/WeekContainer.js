import React from 'react';
import key from './apiKeys';
class WeekContainer extends React.Component {

    
    componentDidMount(){
        debugger
        let masterKey = key;
        debugger
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${masterKey.key}`
        fetch(weatherUrl)
            .then(res => res.json())
            .then(data => console.log(data))
    }


    render(){
        
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        )
    }
}

export default WeekContainer;