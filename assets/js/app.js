import '../css/app.css';

import React from 'react';
import ReactDOM from 'react-dom';

//const el = React.createElement('h2', null, 'Hakuna matata');
const el = <h2>Hakuna matata</h2>

ReactDOM.render(el, document.getElementById('test'));