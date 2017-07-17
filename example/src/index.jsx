import React from 'react';
import Clipboard from '../../lib/clipoboard.js';
import {render} from 'react-dom';

var element = document.createElement("div");
document.body.appendChild(element);
render(<Clipboard name="clipboard"/>, element);