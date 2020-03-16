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
  const [keyPath, setKeyPath] = React.useState(undefined);


  const modalBeforSubmit = (formInput) => {
      // console.log('test');
      // console.log('formInput = ', formInput);
      // console.log('formInput.currentTarget = ', formInput.currentTarget);
      // console.log('formInput.target', formInput.target);
      console.log('formInput.target.elements', formInput.target.elements);
      // console.log('formInput.target.elements.formHorizontalEmail.value', formInput.target.elements.key-path.value);
      // console.log('formInput.target.elements.formHorizontalEmail.value', formInput.target.elements.formPlatform.value);
      console.log('formInput.target.elements.formHorizontalEmail.value', formInput.target.elements['key-path'].value);
      const inputArray = [ 'key-path', 'platform', 'image-name', 'disk-format', 'visibility', 'be-used',
      'file', 'description', 'image-storage-endpoint', 'image-endpoint', 'min-disk', 'min-ram', 'vdc-esin',
      'image-source', 'os-type' ] ;

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
        const tmpCommand = '--' + objectKey + ' "' + element[objectKey] + '" ' ;
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
          // onChange={ k => { console.log('k',k)  ;
          // console.log('k.target.target.value', k.target.value) ;
          // setKeyPath(k.target.value) } }
          >
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            key-path
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="file" placeholder="Key" /*value={keyPath}*/ />
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="image-name">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            image-name
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="text" placeholder="ex: centos_5_32" />
          </Col>
        </Form.Group>
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
        <Form.Group as={Form.Row} controlId="os-type">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            os-type
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="text" placeholder="centos_5_32" />
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="be-used">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            be-used
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
          <Form.Control as="select">
              <option>instance</option>
              <option>ebs</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="disk-format">
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
        <Form.Group as={Form.Row} controlId="image-source">
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
        <Form.Group as={Form.Row} controlId="visibility">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
          visibility
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
          <Form.Control as="select">
              <option>PRIVATE</option>
              <option>PUBLIC</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="vdc-esin">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            vdc-esin
          </Form.Label>
          <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="text" placeholder="VDC2001140006" />
          </Col>
        </Form.Group>

        <Form.Row>
          <Col sm={6}>
            <Form.Group as={Form.Row} controlId="min-disk" >
              <Form.Label style={{ textAlign: 'right' }} column sm={4}>
                min-disk
              </Form.Label>
              <Col sm={8}>
                <Form.Control type="text" placeholder="30"/>
              </Col>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group as={Form.Row}  controlId="min-ram" >
              <Form.Label style={{ textAlign: 'right' }} column sm={4}>
                min-ram
              </Form.Label>
              <Col sm={8} style={{ paddingRight: '50px' }}>
                <Form.Control type="text" placeholder="1024" />
              </Col>
            </Form.Group>
          </Col>
        </Form.Row>

        <Form.Group as={Form.Row} controlId="image-endpoint">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            image-endpoint
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="text" placeholder="https://10.144.225.186/u/image" />
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="image-storage-endpoint">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            image-storage-endpoint
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="text" placeholder="https://10.144.225.186/u/storage/imagestorage " />
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="description">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
          description
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="text" placeholder="description" />
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="file">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            file
          </Form.Label>
           <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="file" placeholder="file" />
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
