import React from 'react';
import Dialog from '@material-ui/core/Dialog';

const ModalInfos = props => {


    return (
        <Dialog
            open={true}
        >
        Modal
        <button onClick={()=> props.closeModal(false)}>close</button>
      </Dialog>

    )
}

export default ModalInfos
