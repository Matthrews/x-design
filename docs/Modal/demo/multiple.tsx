/**
 * title: Modal
 * desc: 多个内嵌Modal
 */
import React from 'react';
import { Modal, Button } from '@Matthrews/x-design';

const Demo = () => {
  const [openFirst, setOpenFirst] = React.useState(false);
  const [openSecond, setOpenSecond] = React.useState(false);

  const content = (
    <div>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </div>
  );

  return (
    <>
      <Button onClick={() => setOpenFirst(true)}>打开第一个Modal</Button>
      <Modal visible={openFirst} onClose={() => setOpenFirst(false)}>
        <p>第一个Modal</p>
        <a href="#">Link</a>
        <label htmlFor="lastName">
          Last name
          <input type="text" />
        </label>
        <input type="submit" value="Submit" />
        {content}
        <Button onClick={() => setOpenSecond(true)}>打开第二个Modal</Button>
      </Modal>
      <Modal visible={openSecond} onClose={() => setOpenSecond(false)}>
        <p>第二个Modal</p>
        {content}
      </Modal>
    </>
  );
};

export default Demo;
