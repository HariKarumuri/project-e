import React, { useState,useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import urlBuilder from "@sanity/image-url";
import { format } from "date-fns";
import BlockContent from "@sanity/block-content-to-react";
import { Client } from "../../lib/client";
import "./BlogPage.css";
import ButtonAni from '../button-animation/Button-ani';


const urlFor = (source) =>
  urlBuilder({ projectId: "hb758s0i", dataset: "production" }).image(source);

  

const serializer = {
  types: {
  image: (props) => (
      <figure>
        <img
          src={urlFor(props.node.asset).width(1000).url()}
          alt={props.node.alt}
        />

        <figcaption>{props.node.caption}</figcaption>
      </figure>
    ),
  },
};



const BlogPostPage = () => {
    const [blogpost,setBlogpost] = useState([])
    const { slug } = useParams();
    const scrolltoview = () => {
      var element = document.getElementById('dam');
      if (element){
        element.scrollIntoView();
      }
    }
    const scrollUp = () => {
    window.scroll(0, 0);
    };

    useEffect(() => {
        // scrollUp();
        scrolltoview();
    }, []);

    useEffect(() => {
        Client
          .fetch(
            `*[slug.current == "${slug}"] {
            title,
            slug,
            body,
            publishedAt,
            mainImage {
              asset -> {
                _id,
                url
              },
              alt,
            },
            "name": author -> name,
            "authimg": author -> image {
              asset -> {
                _id,
                url
              },
              alt,
            },
          }`
          )
          .then((data) => {
            setBlogpost(data[0]);
          })
          .catch(console.error);
      }, [slug]);

    return (
        <div className="BlogSingle mb-4" >
        <div className="container" id="dam" >
          {blogpost && (
            <section className="p-3 Banner_Content">
              {blogpost.mainImage && (
                <img
                  src={blogpost.mainImage.asset.url}
                  alt={blogpost.mainImage.alt}
                  height="300px"
                  className="BannerImg"
                />
              )}
              <h1 className="Banner_Title">{blogpost.title}</h1>
              <div className="Author-icons">
              </div>
              <p className="Banner_author">
                By {blogpost.name}:
                {blogpost.publishedAt && (
                  <>{format(new Date(blogpost.publishedAt), "dd MMMM yyyy")}</>
                )}
              </p>
  
              <BlockContent
                blocks={blogpost.body}
                projectId="okbuvnoj"
                // imageOptions={{w: 400, h: 440, fit: 'max'}}
                dataset="production"
                serializers={serializer}
                className="BlockContent "
              />

              <div className="d-flex justify-content-center align-items-center">

                <Link
                  to="/blog"
                  // className="Banner_Read_More"
                >
                  <ButtonAni
                    widht={"180px"}
                    height={"60px"}
                    text={"View More Blogs"}
                    background={"#8659c2"}
                    color={"#fff"}
                    borderRad={"18px"}
                  />
                  
                </Link>
              </div>
              
            </section>
            
          )}
        </div>
      </div>
    );
}

export default BlogPostPage;
