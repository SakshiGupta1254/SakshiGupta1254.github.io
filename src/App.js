import React from 'react';
import Table from './table';
import customData from './campaign.json'
import './App.css';
import { exportDefaultSpecifier } from '@babel/types';
class App extends React.Component  {
constructor(props) {
super(props);
this.handleStateChange=this.handleStateChange.bind(this);
this.state = { 
data:[],
live: {
showLiveData: false,
data:[]
},
UpComing:{
showUpcomingData:true,
data:[]
},
past:{
showPastData:false,
data:[]
},  
}
}
handleStateChange(value,id){
  if(value.getTime()< new Date().getTime()){
    const upComingData = this.state.UpComing.data.filter(c => c.id != id);    
    let filteredObj = this.state.UpComing.data.filter(c => c.id == id);
    filteredObj[0].createdOn=value.getTime();
    const pastData = [...this.state.past.data, ...filteredObj];
    this.setState({
      UpComing: Object.assign({},this.state.UpComing,{data:upComingData}),
      past:  Object.assign({},this.state.past,{data:pastData})
    });
 // this.state.past.data.push(date);
} else {
      const upComingData = this.state.UpComing.data.map((c) => {
        if(c.id == id){
          c.createdOn = value.getTime();
        }
        return c;
      });
    this.setState({
      UpComing: Object.assign({},this.state.UpComing,{data:upComingData})
    });      
}
console.log(this.state.UpComing.data);
}
componentDidMount(){
let liveEvent=[]; let pastEvent=[];let Upcoming=[]; 
customData.data.map((data) =>{ if(data.createdOn > new Date().getTime()){Upcoming.push(data);}
else if(data.createdOn < new Date().getTime()){pastEvent.push(data);}
else{liveEvent.push(data);}
});
this.setState({
UpComing:  Object.assign({},this.state.UpComing,{data:Upcoming}),
live:  Object.assign({},this.state.live,{data:liveEvent}),
past:  Object.assign({},this.state.past,{data:pastEvent})
});
}
upcomingClicked = () => {  
this.setState({
UpComing:  Object.assign({},this.state.UpComing,{showUpcomingData:true}),
live:  Object.assign({},this.state.live,{showLiveData:false}),
past:  Object.assign({},this.state.past,{showPastData:false})
});
}
liveClicked = () => {  
this.setState({
UpComing:  Object.assign({},this.state.UpComing,{showUpcomingData:false}),
live:  Object.assign({},this.state.live,{showLiveData:true}),
past:  Object.assign({},this.state.past,{showPastData:false})
});
}
pastClicked = () => {       
this.setState({
UpComing:  Object.assign({},this.state.UpComing,{showUpcomingData:false}),
live:  Object.assign({},this.state.live,{showLiveData:false}),
past:  Object.assign({},this.state.past,{showPastData:true})
});
}
render()
{console.log(this.state.UpComing);console.log(this.state.past);
let campaignData = [];
if(this.state.UpComing.showUpcomingData) {
  campaignData = this.state.UpComing.data;
} else if(this.state.past.showPastData) {
  campaignData = this.state.past.data;
} else {
  campaignData = this.state.live.data;
}
  return (

<div>
   {
   <React.Fragment>
      <div class="mainpage">
         <div class="tabs">
            <a onClick={this.upcomingClicked}>Upcoming Campaigns</a>
            <a onClick={this.liveClicked}>Live Campaigns</a>
            <a onClick={this.pastClicked}>Past Campaigns</a>
         </div>
          <Table data={campaignData} handleStateChange = {this.handleStateChange}/>
      </div>
   </React.Fragment>
   }
</div>
)
}
}
export default App;