import React from 'react';
import ButtonAni from '../button-animation/Button-ani';
import "./Deal.css";

const DealCards = (props) => {
    return (
        <div>
            <div className="card" style={{width:'18rem',height:'auto'}}>
                        <img className="card-img-top" src={props.image} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{props.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted sb">{props.dealcaption}</h6>
                            <p className="card-text">
                                {props.body[0].children[0].text.slice(0, 250)}....
                            </p>

                            <a href={props.deallink}>
                            <ButtonAni
                                widht={"100px"}
                                height={"30px"}
                                text={"Learn More"}
                                background={"#8659c2"}
                                color={"#fff"}
                                borderRad={"17px"}
                            />
                            </a>
                        </div>
                        </div>
        </div>
    );
}

export default DealCards;
