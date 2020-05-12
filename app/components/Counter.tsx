import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import routes from '../constants/routes.json';
import styles from './Counter.css';

type Props = {
  getVdcList: () => void;
  increment: () => void;
  incrementIfOdd: () => void;
  incrementAsync: () => void;
  decrement: () => void;
  // counter: number;
  counter: object;
};

export default function Counter(props: Props) {
  const {
    getVdcList,
    increment,
    incrementIfOdd,
    incrementAsync,
    decrement,
    counter
  } = props;

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

    // eslint-disable-next-line no-console
    console.log('totalArray', totalArray);

    const commandParamsString = `${totalArray.reduce(
      (prev, element, currentIndex, arr) => {
        // console.log(element);
        // console.log(Object.keys(element).toString());
        if (
          Object.keys(element).toString() !== 'vdc-esin' &&
          Object.keys(element).toString() !== 'region-id'
        ) {
          const objectKey = Object.keys(element).toString();
          const tmpCommand = `--${objectKey} "${element[objectKey].trim()}" `;
          return prev + tmpCommand;
        }
        const objectKey = Object.keys(element).toString();
        const tmpCommand = `--${objectKey}=${element[objectKey].trim()} `;
        return prev + tmpCommand;
      },
      '.\\ecc-image-importer import '
    )}--verbose`;

    // eslint-disable-next-line no-console
    console.log('commandParamsString', commandParamsString);

    // axios.get(`https://hosenmassage.ddns.net/api/listEvent`)
    //   .then(res => {
    //     // const persons = res.data
    //     console.log(res);
    //     console.log(res.data);
    //     console.log(res.data.message);
    //     // this.setState({ persons });
    //   })

    // const { exec } = require('child_process');
    // const path = require('path');
    // const rootPath = path.resolve(__dirname, '..');
    // const nwDir = path.dirname(process.execPath);
    // console.log('nwDirr', nwDir );  // electron-react-boilerplate\node_modules\electron\dist
    // console.log('rootPath', rootPath ); //electron-react-boilerplate
    // const command = 'calcj.exe';

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
    <div>
      <div data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
        <p className="fa fa-3x">Image Expoter</p>
      </div>
      <div>
        <Form validated={validated} onSubmit={modalBeforSubmit}>
          <Form.Group as={Form.Row} controlId="key-path">
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
          <Form.Group as={Form.Row} controlId="image-endpoint">
            <Form.Label style={{ textAlign: 'right' }} column sm={2}>
              endpoint
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
          {/* <Form.Group as={Form.Row} controlId="disk-format">
            <Form.Label style={{ textAlign: 'right' }} column sm={2}>
              VDC
            </Form.Label>
            <Col sm={10} style={{ paddingRight: '50px' }}>
              <Form.Control as="select">
                <option>VDC2001170008</option>
                <option>VDC2001170009</option>
                <option>VDC2001170010</option>
              </Form.Control>
            </Col>
          </Form.Group> */}
          <Form.Group as={Form.Row} controlId="disk-format">
            <Form.Label style={{ textAlign: 'right' }} column sm={2}>
              VM Esin
            </Form.Label>
            <Col sm={10} style={{ paddingRight: '50px' }}>
              <Form.Control
                type="text"
                placeholder="ex: centos_5_32"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input VM-ESIN.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          {/* <Form.Group as={Form.Row} controlId="image-name">
            <Form.Label style={{ textAlign: 'right' }} column sm={2}>
              Image-name
            </Form.Label>
            <Col sm={10} style={{ paddingRight: '50px' }}>
              <Form.Control
                type="text"
                placeholder="ex: centos_5_32"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input image-name.
              </Form.Control.Feedback>
            </Col>
          </Form.Group> */}
          <Form.Group as={Form.Row} controlId="description">
            <Form.Label style={{ textAlign: 'right' }} column sm={2}>
              Description
            </Form.Label>
            <Col sm={10} style={{ paddingRight: '50px' }}>
              <Form.Control
                required
                type="text"
                placeholder="ex: description"
              />
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
      </div>
      {/* <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <div className={`counter ${styles.counter}`} data-tid="counter">
        {counter.count}
      </div>
      <div className={`counter ${styles.counter}`} data-tid="counter">
        {counter.vdcList}
      </div>
      <div className={styles.btnGroup}>
        <Button onClick={getVdcList}>getVDC</Button>
      </div>
      <div className={styles.btnGroup}>
        <button
          className={styles.btn}
          onClick={increment}
          data-tclass="btn"
          type="button"
        >
          <i className="fa fa-plus" />
        </button>
        <button
          className={styles.btn}
          onClick={decrement}
          data-tclass="btn"
          type="button"
        >
          <i className="fa fa-minus" />
        </button>
        <button
          className={styles.btn}
          onClick={incrementIfOdd}
          data-tclass="btn"
          type="button"
        >
          odd
        </button>
        <button
          className={styles.btn}
          onClick={() => incrementAsync()}
          data-tclass="btn"
          type="button"
        >
          async
        </button>
      </div> */}
    </div>
  );
}
