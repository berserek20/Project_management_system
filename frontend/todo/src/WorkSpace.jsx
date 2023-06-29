import React from "react";
import Create from "./Create";
import Retrieve from "./RetrieveAndDelete";
import "./WorkSpace.css"

const Todo = () => {
  return (
    <React.Fragment>
        <div className="container">
                <h1>Workspace</h1>
      <div className="spaceContainer">
            <div className="workspaceContainer1">

                <Create />
                <br />

              

            </div>
          <br />
          <div className="workspaceContainer2">

              <Retrieve />
              
          </div>
      </div>
      </div>
    </React.Fragment>
  );
};

export default Todo;
