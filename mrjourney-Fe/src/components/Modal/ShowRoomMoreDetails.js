import React from 'react';
import { Modal, Col, Row, ModalDialog, ModalHeader, ModalTitle, ModalFooter, ModalBody, Button, Container } from 'react-bootstrap';
import '../../static/css/App.css'
import "../../static/css/Event-Trip.css";

class ShowRoomMoreDetails extends React.Component {

    render(props) {
        return (
            <div>
                <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            รายละเอียดห้อง
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{color:"white",backgroundColor:"orange",borderColor:"orange"}} 
                        onClick={this.props.onClose}>เสร็จสิ้น</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default ShowRoomMoreDetails;