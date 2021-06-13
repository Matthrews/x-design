import React from 'react';
import { Mask as PortalWrapper, Button } from '@Matthrews/x-design';

export default () => {
  const divRef = React.useRef();
  const outerRef = React.useRef();

  const [visible, setVisible] = React.useState(false);

  // React.useEffect(() => {
  //   console.log('current divRef', divRef.current);
  // }, []);

  const content = (
    <div style={{ display: visible ? 'block' : 'none' }} ref={divRef}>
      2333
    </div>
  );

  return (
    <>
      <Button
        type="outline"
        onClick={() => {
          setVisible(true);
        }}
      >
        打开Mask
      </Button>
      <PortalWrapper
        visible={visible}
        getContainer={() => outerRef.current}
        maskProps={{ children: content }}
        onClose={() => setVisible(false)}
      />
      <div
        className="outter"
        style={{ background: 'red', height: 20 }}
        ref={outerRef}
      />
    </>
  );
};
