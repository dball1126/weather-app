import React from 'react';
import key from './apiKeys';
import Day from './Day';
class WeekContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullData: [],
            dailyData: [],
            zipcode: 11215,
            city: "Brooklyn",
            country: "US"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
        
    
    componentDidMount(){
        
        let masterKey = key;
        let zipcode = this.state.zipcode;
        const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&APPID=${masterKey.key}`
        fetch(weatherUrl)
            .then(res => res.json())
            .then(data => {
                
                const dailyData = data.list.filter(current => current.dt_txt.includes("18:00:00"))
                
                debugger
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

    handleSubmit(e){
        debugger
        e.preventDefault();
        
            let masterKey = key;
            let zipcode = this.state.zipcode;
            const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&APPID=${masterKey.key}`
            fetch(weatherUrl)
                .then(res => res.json())
                .then(data => {

                    const dailyData = data.list.filter(current => current.dt_txt.includes("18:00:00"))

                    this.setState({
                        dailyData: dailyData,
                        fullData: data.list,
                        zipcode: zipcode,
                        city: data.city.name,
                        country: data.city.country
                    })
                })
       
    }

    update(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        };
    };


    render(){  
        return (
            <div className="container">
                <h1 className="display-1 jumbotron">Day Forecast</h1>
                 <h5 className="display-4 text-muted">{this.state.city}, {this.state.country}</h5>
                <form className="display-5 text-muted" onSubmit={this.handleSubmit}>
                    <label className="zipcode">Enter your Zipcode:
    
                <input type="text" placeholder='zipcode' value={this.state.zipcode} onChange={this.update('zipcode')}>

                </input>
                </label>
                <button onClick={this.handleSubmit}>Submit</button>
                </form>
                <div className="row justify-content-center">

                {this.days()}
                
                </div>
            </div>
        )
    }
}

export default WeekContainer;