import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setEventDetail, setEventDetailModalStatus } from '../../../../../redux/features/shared/sharedSlice';
import moment from 'moment';

const EventDetail = () => {
    const dispatch: any = useDispatch();
    const sharedActions: any = useSelector((state: any) => state.sharedActions);

    const closeModal = () => {
        dispatch(setEventDetailModalStatus(false))
        dispatch(setEventDetail({}))
    }
    return (
        <Modal backdrop="static" size='lg' show={sharedActions.eventModal} onHide={closeModal} animation={true}>
            <Modal.Header closeButton>
                <Modal.Title>Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <span className='fw-bold'>Room</span> : {sharedActions?.eventDetail?.roomDetail?.roomName}
                </div>
                <div>
                    <span className='fw-bold'>Start Date</span>: {moment(sharedActions?.eventDetail?.startDate).format("DD/MM/YYYY")}
                </div>
                <div>
                    <span className='fw-bold'>End Date</span>: {moment(sharedActions?.eventDetail?.endDate).format("DD/MM/YYYY")}
                </div>
                <div>
                    <div className='mt-2'>
                        <h6>Description</h6>
                    </div>
                    <div>
                        {sharedActions?.eventDetail?.description}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default EventDetail