import React from "react";

function MyHomePage({ name, address }) {
  return (
    <>
      <div class="cardnew card text">
        <div class="bg">
          <div className="">House Name: {name}</div>
          <div className="">House Address:{address}</div>
        </div>
        <div class="blob"></div>
      </div>
    </>
  );
}

export default MyHomePage;
