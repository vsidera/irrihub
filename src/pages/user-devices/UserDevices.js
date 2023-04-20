import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import AppsCard from "../../components/appsCard/appsCard";
import { userDevices } from "../../actions/device/deviceAction";

const UserDevices = () => {
  const [clientDevices, setUserDevices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const userId = 2

  const getUserDevices = () => {
    userDevices({userId})
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setUserDevices(res.data);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserDevices();
  }, []);

  return (
    <>
    {isLoaded ? <div className="flex justify-center h-screen bg-gray-100 shadow-2xl shadow-top rounded-lg ">
  <div
          className="flex flex-col justify-center items-center mt-6 mx-auto "
    style={{ width: "60vw" }}
  >
     <h4 className="text-lg text-primary flex justify-center mb-6 font-serif">
        Select a Device
      </h4>
    {clientDevices.map((app, index) => (
      <Link
        to={`/${app.imei}/profile`}
        key={index}
        className="bg-white rounded-lg shadow-md p-4 m-2 w-3/4 h-24 flex flex-col justify-center items-center"
      >
        <AppsCard key={index} {...app} />
      </Link>
    ))}
  </div>
</div> :
<div>
  <h1>LOADING...</h1>
</div> }
     
      


    </>
  );
};

export default UserDevices;
