import React from "react";

const TodoBanner = (props) => {
  return (
    <h4 className="bg-primary text-white text-center p-2">
      {props.name}'s To Do List ({props.tasks.filter((t) => !t.done).length}{" "}
      items to do)
    </h4>
  );
};

export default TodoBanner;
