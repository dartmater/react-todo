import React from "react";

function AddTodoForm(){
return(
    <>
    {<form>
        <label htmlFor = "todoTitle" >Title</label>
        <input className = "text" id = "todoTitle"/>
        <button className = "btn">Add</button>
        </form>}
    </>
);
}

export default AddTodoForm;