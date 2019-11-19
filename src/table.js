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
handleDate=(id) => {

document.getElementById(id).style.display="block";

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
handleCalendar(e, id, itemId)  {
if(e < new Date()){
    alert("you have entered Past Value");
}
else this.props.handleStateChange(e,itemId);
document.getElementById(id).style.display="none";

}
openPopup=() => {
this.setState({
showPrice: !this.state.showPrice,
});
}
render() {
  const {data} = this.props; 
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
      {
        data.map((item, index) => {
         return <tr key={index}>
            <td>{this.displayDate(item.createdOn)}</td>
            <td><img src={first} />{item.name}</td>
            <td onClick={this.openPopup}>
               <img src={Priceimg}/>{this.state.showPrice &&
               <Price value={item.price}/>}
            </td>
            <td><img src={file} />CSV</td>
            <td><img src={stat} />Report</td>
            <td onClick={(e)=> this.handleDate(`calendar-${index}`)}><img src={calendar}/>
                Schedule Again
                <div id={`calendar-${index}`}><Calendar onChange={(e)=>
                  this.handleCalendar(e, `calendar-${index}`, item.id)} value={new Date(item.createdOn)}/></div>
            </td>
         </tr>
       })
      }
      </tbody>
      </table>
</div>
);
}
}
export default Table;