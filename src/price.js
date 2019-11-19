import React from 'react';
class Price extends React.Component {
    constructor(props) {
        super(props);
        
      }
    render() {
        return (
            <div>
                <h3>{this.props.value}</h3>
                
            </div>
        );
    }
}
export default Price;