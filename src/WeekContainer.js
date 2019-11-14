import React from 'react';
import key from './apiKeys';
import Day from './Day';
class WeekContainer extends React.Component {
    state = {
        fullData: [],
        dailyData: []
    }
    
    componentDidMount(){
        
        let masterKey = key;
        
        const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=11215,us&APPID=${masterKey.key}`
        fetch(weatherUrl)
            .then(res => res.json())
            .then(data => {
                
                const dailyData = data.list.filter(current => current.dt_txt.includes("18:00:00"))
                
                this.setState({
                    dailyData: dailyData,
                    fullData: data.list
                }, () => console.log(this.state))
            })
    }

    days(){
        return this.state.dailyData.map((data, idx) => (
            <Day key={idx} data={data}/>
        ))
    }


    render(){  
        return (
            <div className="container">
                <h1 className="display-1 jumbotron">Day Forecast</h1>
                <h5 className="display-5 text-muted">New York, US</h5>
                <div className="row justify-content-center">

                {this.days()}
                
                </div>
            </div>
        )
    }
}

export default WeekContainer;