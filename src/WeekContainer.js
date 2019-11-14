import React from 'react';
import key from './apiKeys';
class WeekContainer extends React.Component {
    state = {
        fullData: [],
        dailyData: []
    }
    
    componentDidMount(){
        debugger
        let masterKey = key;
        debugger
        const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=11215,us&APPID=${masterKey.key}`
        fetch(weatherUrl)
            .then(res => res.json())
            .then(data => {
                debugger
                const dailyData = data.list.filter(current => current.dt_txt.includes("18:00:00"))
                debugger
                this.setState({
                    dailyData: dailyData,
                    fullData: data.list
                }, () => console.log(this.state))
            })
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