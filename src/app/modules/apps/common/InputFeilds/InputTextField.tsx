import * as React from 'react';

import { Form } from 'react-bootstrap';
import { getIn } from 'formik';

const FieldInputText = ({ field, form, ...props }: any) => {
    const error = getIn(form.errors, field.name);
    const touch = getIn(form.touched, field.name);
    return (
        <div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>{props.label}<span>{props?.isRequired ?'*':''}</span></Form.Label>
                <Form.Control
                    name={props.name}
                    type={props.type}
                    placeholder={props.placeholder ? props.placeholder : `Enter ${props.label}`}
                    {...field} {...props}
                ></Form.Control>
                {touch && error ? <span style={{ color: '#ff8080', 'marginTop': '5px', 'fontSize': '13px' }} className="error">{error}</span> : null}
            </Form.Group>

        </div >
    )
};


export default FieldInputText;
