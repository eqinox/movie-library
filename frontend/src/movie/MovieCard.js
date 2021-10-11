import React from "react";

import "./MovieCard.css";

const Article = (props) => {
  const publisher = props.owner.email;
  const month = props.publishingDate.toLocaleString("BG", { month: "long" });
  const day = props.publishingDate.toLocaleString("BG", { day: "2-digit" });
  const year = props.publishingDate.getFullYear();

  const deleteHandler = async () => {
    // TODO
  };

  const editHandler = async () => {
    // TODO
  };

  return (
    <div className="article">
      <img alt="something" src={props.image} />
      <div className="title">{props.title}</div>
      <div className="date-elements">
        <p>{day}</p>
        <p>{month}</p>
        <p>{year}</p>
      </div>
      <div className="text">{props.body.substring(0, 50)}</div>
      <div className="author">Author: {publisher}</div>
      <div className="actions">
        <button type="button" onClick={editHandler}>
          Edit
        </button>
        <button type="button" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Article;
