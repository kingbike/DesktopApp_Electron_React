/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import React from 'react';
import { Link } from 'react-router-dom';
// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab';
// import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
// import TabPane from 'react-bootstrap/TabPane'
// import FormControl from 'react-bootstrap/FormControl';
// import styles from './Home.css';
// import axios from 'axios';
// import LoadingOverlay from 'react-loading-overlay';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import routes from '../constants/routes.json';

export default function Home() {
  const [lgShow, setLgShow] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [errorMsg, setMessage] = React.useState(undefined);
  const [imageSource, setImageSource] = React.useState('User');
  const [validated, setValidated] = React.useState(false);

  const modalBeforSubmit = formInput => {
    const form = formInput.currentTarget;
    if (form.checkValidity() === false) {
      formInput.preventDefault();
      formInput.stopPropagation();
    }
    setValidated(true);

    // console.log('formInput = ', formInput);
    // console.log('formInput.currentTarget = ', formInput.currentTarget);
    // console.log('formInput.target', formInput.target);
    console.log('formInput.target.elements', formInput.target.elements);
    console.log(
      'formInput.target.elements.formHorizontalEmail.value',
      formInput.target.elements['key-path'].value
    );
    const inputArray =
      imageSource === 'User'
        ? [
            'key-path',
            'platform',
            'image-name',
            'disk-format',
            'visibility',
            'be-used',
            'file',
            'description',
            'image-storage-endpoint',
            'image-endpoint',
            'min-disk',
            'min-ram',
            'vdc-esin',
            'image-source',
            'os-type'
          ]
        : [
            'key-path',
            'platform',
            'image-name',
            'disk-format',
            'visibility',
            'be-used',
            'file',
            'description',
            'image-storage-endpoint',
            'image-endpoint',
            'min-disk',
            'min-ram',
            'region-id',
            'image-source',
            'os-type'
          ];

    const totalArray = inputArray.map((item, index, array) => {
      const obj = {};
      if (
        formInput.target.elements[item].id === 'key-path' ||
        formInput.target.elements[item].id === 'file'
      ) {
        obj[formInput.target.elements[item].id] =
          formInput.target.elements[item].files[0].path;
      } else {
        obj[formInput.target.elements[item].id] =
          formInput.target.elements[item].value;
      }
      return obj;
    });

    // case 1 : run in image-importer
    // eslint-disable-next-line no-console
    // console.log('totalArray', totalArray);
    // const commandParamsString = `${totalArray.reduce(
    //   (prev, element, currentIndex, arr) => {
    //     // console.log(element);
    //     // console.log(Object.keys(element).toString());
    //     if (
    //       Object.keys(element).toString() !== 'vdc-esin' &&
    //       Object.keys(element).toString() !== 'region-id'
    //     ) {
    //       const objectKey = Object.keys(element).toString();
    //       const tmpCommand = `--${objectKey} "${element[objectKey].trim()}" `;
    //       return prev + tmpCommand;
    //     }
    //     const objectKey = Object.keys(element).toString();
    //     const tmpCommand = `--${objectKey}=${element[objectKey].trim()} `;
    //     return prev + tmpCommand;
    //   },
    //   '.\\ecc-image-importer import '
    // )}--verbose`;

    // case 2 : run in api
    // eslint-disable-next-line no-console
    // console.log('commandParamsString', commandParamsString);
    // axios.get(`https://hosenmassage.ddns.net/api/listEvent`)
    //   .then(res => {
    //     // const persons = res.data
    //     console.log(res);
    //     console.log(res.data);
    //     console.log(res.data.message);
    //     // this.setState({ persons });
    //   })

    // case 3 : run in caculator
    // eslint-disable-next-line global-require
    const { exec } = require('child_process');
    // eslint-disable-next-line global-require
    const path = require('path');
    const rootPath = path.resolve(__dirname, '..');
    const nwDir = path.dirname(process.execPath);
    console.log('nwDirr', nwDir );  // electron-react-boilerplate\node_modules\electron\dist
    console.log('rootPath', rootPath ); // electron-react-boilerplate
    const commandParamsString = 'calc.exe';

    setLoading(true);
    setLgShow(true);
    setMessage('Command was Sended. Waiting for response!');
    exec(commandParamsString, (error, stdout, stderr) => {
      if (stdout) {
        console.log('stdout', stdout.toString());
        setLoading(true);
        // setMessage(stdout.toString());
        setMessage('Upload Success!');
        setLoading(false);
      }
      if (stderr) {
        console.log('stderr', stderr.toString());
        setLoading(true);
        setMessage(stderr.toString());
        setLoading(false);
      }
      if (error) {
        setMessage(error.toString());
        setLoading(true);
        console.log('error', error.toString());
        setLoading(false);
      }
    });

    // prevent Flashing back
    formInput.preventDefault();
    formInput.stopPropagation();
  };

  return (
    <div
      style={{
        overflowX: 'hidden'
        /* overflowY: 'scroll'  , maxWidth: "260px" */
      }} /* className={styles.container} */
    >
      {/* <div>
        <h2>Home</h2>
        <Link to={routes.COUNTER}>to Counter</Link>
      </div> */}
      <Navbar bg="dark" variant="dark">
        {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
        <Nav className="mr-auto">
          <p>
            <Link to={routes.HOME}>ImageUpload</Link>
          </p>
          <p>&nbsp;&nbsp;</p>
          <p>
            <Link to={routes.COUNTER}>ImageExport</Link>
          </p>
          {/* <p>&nbsp;&nbsp;</p>
          <p>
            <Link to={routes.IMAGEEXPORT}>ImageExport</Link>
          </p> */}
        </Nav>
      </Navbar>
      <br />
      <Form validated={validated} onSubmit={modalBeforSubmit}>
        <Form.Group
          as={Form.Row}
          controlId="key-path"
          // inputref={input => (this.textInput = input)}
        >
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            key-path
          </Form.Label>
          <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control required type="file" placeholder="Key" />
            <Form.Control.Feedback type="invalid">
              Please input key-path.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="file">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            image-file
          </Form.Label>
          <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control required type="file" placeholder="image-file" />
            <Form.Control.Feedback type="invalid">
              Please input image-file.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="image-name">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            image-name
          </Form.Label>
          <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control type="text" placeholder="ex: centos_5_32" required />
            <Form.Control.Feedback type="invalid">
              Please input image-name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Row>
          <Col sm={6}>
            <Form.Group as={Form.Row} controlId="platform">
              <Form.Label style={{ textAlign: 'right' }} column sm={4}>
                platform
              </Form.Label>
              <Col sm={8} style={{ paddingRight: '50px' }}>
                <Form.Control as="select">
                  <option>Linux</option>
                  <option>Windows</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group as={Form.Row} controlId="os-type">
              <Form.Label style={{ textAlign: 'right' }} column sm={4}>
                os-type
              </Form.Label>
              <Col sm={8} style={{ paddingRight: '50px' }}>
                <Form.Control type="text" placeholder="centos_5_32" required />
              </Col>
              <Form.Control.Feedback type="invalid">
                Please input os-type.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col sm={6}>
            <Form.Group as={Form.Row} controlId="be-used">
              <Form.Label style={{ textAlign: 'right' }} column sm={4}>
                be-used
              </Form.Label>
              <Col sm={8} style={{ paddingRight: '50px' }}>
                <Form.Control as="select">
                  <option>instance</option>
                  <option>ebs</option>
                  <option>host</option>
                  <option>vnf</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group as={Form.Row} controlId="disk-format">
              <Form.Label style={{ textAlign: 'right' }} column sm={4}>
                disk-format
              </Form.Label>
              <Col sm={8} style={{ paddingRight: '50px' }}>
                <Form.Control as="select">
                  <option>qcow2</option>
                  <option>vmdk</option>
                  <option>ISO</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col sm={6}>
            <Form.Group
              as={Form.Row}
              controlId="min-disk"
              // defaultValue="30"
            >
              <Form.Label style={{ textAlign: 'right' }} column sm={4}>
                min-disk
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="number" placeholder="" required />
                <Form.Control.Feedback type="invalid">
                  Please input min-disk.
                </Form.Control.Feedback>
              </Col>
              <Col sm={1}>GB</Col>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group as={Form.Row} controlId="min-ram">
              <Form.Label style={{ textAlign: 'right' }} column sm={4}>
                min-ram
              </Form.Label>
              <Col sm={6}>
                <Form.Control type="number" placeholder="" required />
                <Form.Control.Feedback type="invalid">
                  Please input min-ram.
                </Form.Control.Feedback>
              </Col>
              <Col sm={1} style={{ paddingRight: '50px' }}>
                MB
              </Col>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col sm={6}>
            <Form.Group as={Form.Row} controlId="image-source">
              <Form.Label style={{ textAlign: 'right' }} column sm={4}>
                image-source
              </Form.Label>
              <Col sm={8} style={{ paddingRight: '50px' }}>
                <Form.Control
                  as="select"
                  onChange={e => {
                    // console.log('select', e.target.value);
                    setImageSource(e.target.value);
                  }}
                >
                  <option>User</option>
                  <option>Operation</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group as={Form.Row} controlId="visibility">
              <Form.Label style={{ textAlign: 'right' }} column sm={4}>
                visibility
              </Form.Label>
              <Col sm={8} style={{ paddingRight: '50px' }}>
                <Form.Control as="select">
                  <option>PRIVATE</option>
                  <option>PUBLIC</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Col>
        </Form.Row>
        {imageSource === 'User' ? (
          <Form.Group as={Form.Row} controlId="vdc-esin">
            <Form.Label style={{ textAlign: 'right' }} column sm={2}>
              vdc-esin
            </Form.Label>
            <Col sm={10} style={{ paddingRight: '50px' }}>
              <Form.Control
                type="text"
                placeholder="ex: VDC2001140006"
                required={imageSource === 'User'}
              />
              <Form.Control.Feedback type="invalid">
                Please input vdc-esin.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        ) : (
          <Form.Group as={Form.Row} controlId="region-id">
            <Form.Label style={{ textAlign: 'right' }} column sm={2}>
              region-id
            </Form.Label>
            <Col sm={10} style={{ paddingRight: '50px' }}>
              <Form.Control
                type="text"
                placeholder="ex: north"
                required={imageSource === 'Operation'}
              />
              <Form.Control.Feedback type="invalid">
                Please input region-id.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        )}
        <Form.Group as={Form.Row} controlId="image-endpoint">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            image-endpoint
          </Form.Label>
          <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control
              type="text"
              placeholder="ex: https://10.144.225.186/u/image"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please input image-endpoint.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="image-storage-endpoint">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            storage-endpoint
          </Form.Label>
          <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control
              type="text"
              placeholder="ex: https://10.144.225.186/u/storage/imagestorage"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please input image-storage-endpoint.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Form.Row} controlId="description">
          <Form.Label style={{ textAlign: 'right' }} column sm={2}>
            description
          </Form.Label>
          <Col sm={10} style={{ paddingRight: '50px' }}>
            <Form.Control required type="text" placeholder="ex: description" />
          </Col>
        </Form.Group>

        <Form.Group as={Form.Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Loading…' : 'Submit'}
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <Modal
        size="xl"
        show={lgShow}
        onHide={() => {
          setLgShow(false);
          setMessage('');
        }}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <p style={{ color: 'blue' }}>Output Message : </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ color: 'blue' }}>{errorMsg}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}
