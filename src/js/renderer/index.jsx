import React from 'react';

let Content = React.createClass({
    render() {
    return (
        <div><h1>This is React generated contents.</h1></div>
);
}
});

React.render(
<Content/>,
    document.getElementById('content')
);
