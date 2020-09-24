// Presentational Component
// Converted into functional component - A component just used for presentation and contains no state properties or constructor

import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, Breadcrumb, BreadcrumbItem,Modal, ModalBody, ModalHeader, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form'; 

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

function RenderComments({ comments, onClick, isModalOpen, handleSubmit }) {

    const commments2s = comments.map((c) => {
        return (
            <div>
                <div key={c.id} className="list-unstyled">
                    <ListGroup>
                        <ListGroupItem>{c.comment}</ListGroupItem>
                        <ListGroupItem>-- {c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(c.date)))}</ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        );
    });
    return (
        <div>
            <div>
                {commments2s}
            </div>
            <div className="mt-3">
                <Button outline onClick={onClick}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={isModalOpen} toggle={onClick}>
                    <ModalHeader toggle={onClick}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>
                                    Rating
                                </Label>
                                <Col md={12}>
                                    <Control.select model=".rating" className="form-control" name="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={12}>
                                    Your Name
                                </Label>
                                <Col md={12}>
                                    <Control.text model=".yourname" className="form-control" id="yourname" name="yourname" placeholder="Your Name" validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                                    <Errors className="text-danger" model=".yourname" show="touched" messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength:'Must be 15 characters or less'
                                    }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>
                                Comment
                                </Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" className="form-control" id="comment" name="comment" rows="6"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary" onClick={onClick}>
                                        Submit
                                   </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    );
}

function RenderDish({ dish, comments, onClick, isModalOpen, handleSubmit }) {
    return (
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" object src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
            <div className="col-12 col-md-5 m-1">
                <header>
                    <h4>
                        Comments
                    </h4>
                </header>
                <RenderComments comments={comments} onClick={onClick} isModalOpen={isModalOpen} handleSubmit={handleSubmit}/>
            </div>
        </div>
    )
}

class Dishdetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }

    render() {

        if (this.props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <RenderDish dish={this.props.dish} comments={this.props.comments} onClick={this.toggleModal} isModalOpen={this.state.isModalOpen} handleSubmit={this.handleSubmit}/>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default Dishdetail;