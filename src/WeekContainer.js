import React from 'react';
import key from './apiKeys';
import Day from './Day';
import Geocode from "react-geocode";

class WeekContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullData: [],
            dailyData: [],
            zipcode: 11215,
            city: "Brooklyn",
            country: "US",
            address: "Brooklyn, NY 11215, USA"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
        
    
    componentDidMount(){
        
        let masterKey = key;
        let zipcode = this.state.zipcode;
        const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&APPID=${masterKey.weatherKey}`
        
        fetch(weatherUrl)
            .then(res => res.json())
            .then(data => {
                
                const dailyData = data.list.filter(current => current.dt_txt.includes("18:00:00"))
                
                
                this.setState({
                    dailyData: dailyData,
                    fullData: data.list
                })
            })
    }

    days(){
        return this.state.dailyData.map((data, idx) => (
            <Day key={idx} data={data}/>
        ))
    }

    handleSubmit(e){
        
        e.preventDefault();
        let address = undefined
        let masterKey = key;
        let zipcode = this.state.zipcode;
        const weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&APPID=${masterKey.weatherKey}`
        Geocode.setApiKey(`${masterKey.googlekey}`)
        Geocode.setLanguage("en");
        Geocode.setRegion("us");
        
            fetch(weatherUrl)
                .then(res => res.json())
                .then(data => {

                    const dailyData = data.list.filter(current => current.dt_txt.includes("18:00:00"))
                    Geocode.fromLatLng(`${data.city.coord.lat}`, `${data.city.coord.lon}`).then(
                        response => {

                            
                            address = response.results[0].formatted_address.split(",").slice(1).join(",");

                        }, error => {
                            console.error(error)
                        }
                    ).then(() => this.setState({ address: address}))
                        
                        this.setState({
                            dailyData: dailyData,
                            fullData: data.list,
                            zipcode: zipcode,
                            city: data.city.name,
                            country: data.city.country
                        })
                        
                })
        document.getElementById('elementId').value = '';
    }

    update(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        };
    };


    render(){  
        let {address} = this.state
        return (
            <div className="container">
                <h1 className="display-3 jumbotron-fluid" style={{ "backgroundColor": "#dff2f8", "color": "#e81296"}}>5 Day Forecast</h1>
                 <h5 className="display-4 text-muted">{address}</h5>
                <form className="display-5 text-muted" onSubmit={this.handleSubmit}>
                    <label className="zipcode">Enter your: {' '}
    
                <input id="elementId" type="text" placeholder=' Zipcode'  onChange={this.update('zipcode')}>

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