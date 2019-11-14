import React from 'react'
const moment = require('moment');
// const moment = require('moment');

const Day = ({data}) => {
        let newDate = new Date();
        const weekday = data.dt * 1000;
        newDate.setTime(weekday);
    const imgURL = `owf owf-${data.weather[0].id} owf-5x`;
        
        return (
            <div className="col-sm-2">
                <div className="card">
                    <h3 className="card-title">{moment(newDate).format('ddd')}</h3>
                    <p className="text-muted">{moment(newDate).format('MMM Do, h:mm a')}</p>
                    <i className={imgURL}></i>
                    <h2>{Math.round((data.main.temp - 273.15) * 9/5 + 32)} °F</h2>
                    <div className="card-body">
                        <p className="card-text">{data.weather[0].description}</p>
                    </div>
                </div>
            </div>
        )
}

export default Day;