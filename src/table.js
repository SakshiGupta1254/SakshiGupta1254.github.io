import React from 'react';
import first from './images/first.png';
import calendar from './images/calendar.png';
import ReactDOM from 'react-dom';
import file from './images/file.png';
import Price from './price';
import Priceimg from './images/Price.png';
import stat from './images/statistics-report.png';
import Calendar from 'react-calendar'; 
//import '../images';
class Table extends React.Component {
constructor(props) {
super(props);
}
state = { 
callCalendar:false,
showPrice:false
}
handleDate=() => {

document.getElementById('calendar').style.display="block";

}
displayDate=(date)=>{
var event = new Date(date);
var options = { month: 'short', year: 'numeric', day: 'numeric' };
var frame;
if(new Date(date)>= new Date()){
var Difference_In_Time = new Date(date).getTime()-new Date().getTime();
frame= "Days Ahead";
}
else
{var Difference_In_Time = new Date().getTime()-new Date(date).getTime();
frame=" Days Ago";
}
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);       
return `${event.toLocaleDateString('en-EN', options)} ${parseInt(Difference_In_Days)}  ${frame}`;
}
handleCalendar(date)  {
this.props.handleStateChange(date,this.props.id);
document.getElementById('calendar').style.display="none";

}
openPopup=() => {
this.setState({
showPrice: !this.state.showPrice,
});
}
render() { 
return ( 
<div>
   <table>
      <thead>
         <tr>
            <th>Date</th>
            <th>Campaign</th>
            <th>View</th>
            <th>Action</th>
         </tr>
      </thead>
      <tbody>
         <tr>
            <td>{this.displayDate(this.props.date)}</td>
            <td><img src={first} />{this.props.name}</td>
            <td onClick={this.openPopup}>
               <img src={Priceimg}/>{this.state.showPrice &&
               <Price value={this.props.price}/>}
            </td>
            <td><img src={file} />CSV</td>
            <td><img src={stat} />Report</td>
            <td onClick={this.handleDate}><img src={calendar}/>
                Schedule Again
            </td>
         </tr>
      </tbody>
      </table>
      <div id="calendar"><Calendar onChange={(e)=>
    this.handleCalendar(e)} value={new Date(this.props.date)}/></div>
</div>
);
}
}
export default Table;