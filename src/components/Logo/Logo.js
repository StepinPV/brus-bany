import React, { memo } from 'react';
import logo from './resources/logo.png';

export default memo((props) => (
    <img src={logo} alt="" className={props.className} />
));
