import React from 'react';
import { Button } from 'antd'

const HvxButton = ({ text, type, onClick, onBlur, style, className }) => {
    return (
        <Button className={`hvxButton ${className}`} style={style} type={type} onClick={onClick} onBlur={onBlur}>
            {text}
        </Button>
    );
}

export default HvxButton;
