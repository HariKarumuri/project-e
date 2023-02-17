import React, { useState, useEffect } from "react";
import { Client } from "../../lib/client";
import "./Deal.css";
import DealCards from "./DealCards";

const Deals = () => {

    const [Dealpost, setDealpost] = useState([]);
    useEffect(() => {
        Client.fetch(
          `*[_type == "dealspost"] {
                    title,
                    slug,
                    body,
                    viewscount,
                    publishedAt,
                    deallink,
                    dealcaption,
                    mainImage {
                      asset -> {
                        _id,
                        url
                      },
                      alt,
                    },
                    "Dtype": dealstype -> dealstype,
                  } | order(publishedAt desc)`
        )
          .then((data) => {
            setDealpost(data);
            console.log(data);
          })
          .catch(console.error);
      }, []);
    return (
        <div className="LatestArticles my-3">
        <div className=" container py-5">
            <h2 className="fw-bold">Top<span className="purpleColor "> Hot Deals</span></h2>
            <div className="d-flex dealcontainer">
            {
                Dealpost.map((d)=>(
                    <div>
                        <h2>{d.Dtype}</h2>
                        <DealCards 
                        title = {d.title}
                        image = {d.mainImage.asset.url}
                        dealcaption = {d.dealcaption}
                        deallink = {d.deallink}
                        body = {d.body}
                        />
                    
                    </div>
                ))
            }
            </div>
        </div>
        </div>
    );
}

export default Deals;
