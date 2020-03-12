import React from 'react';
import { Link } from 'react-router-dom';
// import routes from '../constants/routes.json';
// import styles from './Home.css';
// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
// import TabPane from 'react-bootstrap/TabPane'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import axios from 'axios';

export default function Home() {
  // return (
  //   <div className={styles.container} data-tid="container">
  //     <h2>Home</h2>
  //     <Link to={routes.COUNTER}>to Counter</Link>
  //   </div>
  // );
  // const [key, setKey] = React.useState('home');

  const [email, setEmali] = React.useState('');

  const modalBeforSubmit = (formInput) => {
    // console.log('test');
    // console.log('formInput = ', formInput);
    // console.log('formInput.currentTarget = ', formInput.currentTarget);

    // console.log('formInput.target', formInput.target);
    // console.log('formInput.target.elements', formInput.target.elements);
    // console.log('formInput.target.elements.formHorizontalEmail', formInput.target.elements.formHorizontalEmail);


    console.log('formInput.target.elements.formHorizontalEmail.value', formInput.target.elements.formHorizontalEmail.value);

    // console.log('formInput.currentTarget', formInput.currentTarget);
    // console.log('formInput.currentTarget.checkValidity() ', formInput.currentTarget.checkValidity() );

    const form = formInput.currentTarget;
    if (form.checkValidity() === false) {
      // formInput.preventDefault();
      // formInput.stopPropagation();
    }

    // axios.get(`https://hosenmassage.ddns.net/api/listEvent`)
    //   .then(res => {
    //     // const persons = res.data
    //     console.log(res);
    //     console.log(res.data);
    //     console.log(res.data.message);
    //     // this.setState({ persons });
    //   })

    // const path = require('path');
    // const rootPath = path.resolve(__dirname, '..');
    // const nwDir = path.dirname(process.execPath);
    // console.log('nwDirr', nwDir );  // electron-react-boilerplate\node_modules\electron\dist
    // console.log('rootPath', rootPath ); //electron-react-boilerplate

      const exec = require('child_process').exec;
      // exec( 'calcj.exe', (error, stdout, stderr) => {
      exec( 'calcj.exe', (error, stdout, stderr) => {
        callback(stdout);
        console.log(stdout.toString());
    });
    // run_script("dir", ["/A /B /C"], null);

    // setValidated(true);
  }

  // onSelectChange = (field, cb) => (e) => {
  //   field && this.setState({ [field]: e.target.value });
  //   typeof cb === 'function' && cb(e);
  // };

  return (
    <div>
       <br/>
       {/* <ButtonToolbar>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="info">Info</Button>
        <Button variant="light">Light</Button>
        <Button variant="dark">Dark</Button>
        <Button variant="link">Link</Button>
      </ButtonToolbar> */}
      {/* <h2>Home</h2> */}
      <Form onSubmit={ modalBeforSubmit }>
        <Form.Group as={Form.Row} controlId="formHorizontalEmail"
          inputRef={input => this.textInput = input}
          value={'eemmaaiill'} onChange={ k => { console.log('k',k) ;setEmali(k) } } >
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            Key
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="email" placeholder="Email" />
          </Col>
        </Form.Group>

        <Form.Group as={Form.Row} controlId="formHorizontalPassword">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            Image Name
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="formHorizontalPlatform">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            platform
          </Form.Label>
          <Col sm={9}>
          <Form.Control as="select">
              <option>Linux</option>
              <option>Windows</option>
            </Form.Control>
          </Col>
        </Form.Group>
        {/* <fieldset>
          <Form.Group as={Form.Row}>
            <Form.Label as="legend" column sm={2}>
              Radios
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="first radio"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                type="radio"
                label="second radio"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
              <Form.Check
                type="radio"
                label="third radio"
                name="formHorizontalRadios"
                id="formHorizontalRadios3"
              />
            </Col>
          </Form.Group>
        </fieldset> */}
        {/* <Form.Group as={Form.Row} controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" />
          </Col>
        </Form.Group> */}

        <Form.Group as={Form.Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Sign in</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}
