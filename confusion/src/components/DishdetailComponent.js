import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commenthere: props.dish2s.comments
        }
    }

    renderComments(commenthere) {
        const commments2s = commenthere.map((c) => {
            return (
                <div>
                    <div key={c.id} className="list-unstyled">
                        <ListGroup>
                            <ListGroupItem>{c.comment}</ListGroupItem>
                            <ListGroupItem>-- {c.author}, {c.date}</ListGroupItem>
                        </ListGroup>
                    </div>
                </div>
            );
        });
        return commments2s;
    }
    
    renderDish(dish) {
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
                    { this.renderComments(this.state.commenthere)}
                </div>
            </div>        
        )
    }

    render() {

        return (
            <div className="container">
                {this.renderDish(this.props.dish2s)}
            </div>
        );
    }
}

export default Dishdetail;