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
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function Home() {
  // const [key, setKey] = React.useState('home');
  const [email, setEmali] = React.useState('');
  // const [show, setShow] = React.useState(false);
  const [lgShow, setLgShow] = React.useState(false);
  const [errorMsg, setMessage] = React.useState(undefined);

  const modalBeforSubmit = (formInput) => {
      // console.log('test');
      // console.log('formInput = ', formInput);
      // console.log('formInput.currentTarget = ', formInput.currentTarget);
      // console.log('formInput.target', formInput.target);
      console.log('formInput.target.elements', formInput.target.elements);
      // console.log('formInput.target.elements.formHorizontalEmail.value', formInput.target.elements.key-path.value);
      // console.log('formInput.target.elements.formHorizontalEmail.value', formInput.target.elements.formPlatform.value);
      console.log('formInput.target.elements.formHorizontalEmail.value', formInput.target.elements['key-path'].value);
      const inputArray = [ 'key-path', 'platform' ] ;

      const totalArray = inputArray.map(function(item, index, array){
        // console.log('formInput.target.elements[item]', formInput.target.elements[item]);
        console.log('formInput.target.elements[item].id', formInput.target.elements[item].id);
        console.log('formInput.target.elements[item].value', formInput.target.elements[item].value);

        var obj = {};
        obj[formInput.target.elements[item].id] = formInput.target.elements[item].value ;
        return obj  ;
      }) ;
      // console.log('totalArray', totalArray[0].value);
      console.log('totalArray', totalArray);

      const commandParamsString = totalArray.reduce( function(prev, element, currentIndex, arr) {
        // 與之前的數值加總，回傳後代入下一輪的處理
        console.log( element ) ;
        console.log( Object.keys(element).toString() ) ;
        const objectKey = Object.keys(element).toString() ;
        const tmpCommand = '--' + objectKey + ' ' + element[objectKey] + ' ' ;
        return prev + tmpCommand;
      }, ".\\ecc-image-importer.exe importer ");

      console.log('commandParamsString', commandParamsString);

      //ecc-image-importer import --key-path mykey.key --image-name "My-Image-Name" --platform "Linux"

      // console.log('formInput.currentTarget', formInput.currentTarget);
      // console.log('formInput.currentTarget.checkValidity() ', formInput.currentTarget.checkValidity() );
      // const form = formInput.currentTarget;
      // if (form.checkValidity() === false) {
      //   formInput.preventDefault();
      //   formInput.stopPropagation();
      // }

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
      //const command = 'calcj.exe';
      const exec = require('child_process').exec;
      exec( commandParamsString, (error, stdout/*, stderr*/) => {
     // exec( 'ecc-image-importer.exe', (error, stdout, stderr) => {

          // console.log('stderr', stderr.toString());
          // console.log('error', error.toString());
          if( stdout ) {
            console.log('stdout', stdout.toString());
          }
          // if( stderr ) {
          //   console.log('stderr', stderr.toString());
          // }
          if( error ) {
            //setShow(true)
            setLgShow(true) ;
            setMessage( error.toString() ) ;
            console.log('error', error.toString());
          }
      });
      // run_script("dir", ["/A /B /C"], null);
      // setValidated(true);

    }

  // onSelectChange = (field, cb) => (e) => {
  //   field && this.setState({ [field]: e.target.value });
  //   typeof cb === 'function' && cb(e);
  // };


  // return (
  //   <div className={styles.container} data-tid="container">
  //     <h2>Home</h2>
  //     <Link to={routes.COUNTER}>to Counter</Link>
  //   </div>
  // );

  return (
    <div style={{ overflowX: 'hidden' /*, overflowY: 'scroll' , maxWidth: "260px"*/  }} /*className={styles.container}*/>
       <br/>
      <Form onSubmit={ modalBeforSubmit }>
        <Form.Group as={Form.Row} controlId="key-path"
          inputRef={input => this.textInput = input}
          value={'eemmaaiill'} onChange={ k => { console.log('k',k) ;setEmali(k) } } >
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            Key
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="text" placeholder="Key" />
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="image-name">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            image-name
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="text" placeholder="centos_5_32" />
          </Col>
        </Form.Group>
        {/* <Form.Group as={Form.Row} controlId="formPassword">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            Image Name
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group> */}
        <Form.Group as={Form.Row} controlId="platform">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            platform
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
          <Form.Control as="select">
              <option>Linux</option>
              <option>Windows</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="formOsType">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            os-type
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="text" placeholder="centos_5_32" />
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="formDiskFormat">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            disk-format
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
          <Form.Control as="select">
              <option>qcow2</option>
              <option>vmdk</option>
              <option>ISO</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="formImageSource">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            image-source
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
          <Form.Control as="select">
              <option>Operation</option>
              <option>User</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="formImageSource">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
          visibility
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
          <Form.Control as="select">
              <option>Operation</option>
              <option>PUBLIC</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="formVdcEsin">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            vdc-esin
          </Form.Label>
          <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="text" placeholder="VDC2001140006" />
          </Col>
        </Form.Group>

        <Form.Group as={Form.Row}  controlId="formMinDisk">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            min-disk
          </Form.Label>
          <Col sm={4}>
            <Form.Control type="text" placeholder="30" />
          </Col>
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            min-ram
          </Form.Label>
           <Col sm={4} style={{ paddingRight: '50px' }}>
            <Form.Control type="text" placeholder="1024" />
          </Col>
        </Form.Group>
        {/* <Form.Group controlId="formMinRam">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            min-ram
          </Form.Label>
           <Col sm={4} style={{ paddingRight: '50px' }}>
            <Form.Control type="text" placeholder="1024" />
          </Col>
        </Form.Group> */}

        <Form.Group as={Form.Row} controlId="formImageEndpoint">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            image-endpoint
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="text" placeholder="https://10.144.225.186/u/image" />
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="formStorageEndpoint">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            storage-endpoint
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="text" placeholder="https://10.144.225.186/u/storage/imagestorage " />
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
        </fieldset>
        <Form.Group as={Form.Row} controlId="formHorizontalCheck">
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

      <Modal
        size="xl"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          <p style={{backgroundColor: 'black'}}>Error Message : </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body><p style={{backgroundColor: 'black'}}>{errorMsg}</p></Modal.Body>
      </Modal>
    </div>
  );
}
