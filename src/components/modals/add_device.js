import React from "react";
import { useState , useEffect} from "react";
import Modal from "@mui/material/Modal";
import { Backdrop } from "@mui/material";
import { Box, CardContent, TextField } from "@mui/material";
import { serviceCreate } from "../../actions/device/deviceAction";
import SnackbarAlert from "../utils/snackbar";
import AsyncSelect from "react-select/async";
import { imeiSearch, deviceCreate } from "../../actions/device/deviceAction";

const CreateDeviceModal = ({
  deviceModal,
  closeDeviceModal,
}) => {
  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [search, setSearch] = useState(null);

  const [selectedValue, setSelectedValue] = useState(null);

  const loadOptions = (inputValue, callback) => {
    imeiSearch({ search: inputValue })
      .then((res) => {
        console.log("DATA IS!!!!!", res.data)
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
          callback([], new Error("An error occurred"));
        } else {
          const options = res.data.map((customer) => ({
            value: customer.code,
            label: customer.code,
          }));

          if (options.length === 0) {
            callback([], new Error("No results found"));
          } else if (options.length === 1) {
            callback(options, null);
            setSelectedValue(options[0]);
          } else {
            // Multiple results found, return the first one as default value
            callback(options, null);
            setSelectedValue(options[0]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        callback([], new Error("An error occurred"));
      });
  };

  const handleInputChange = (newValue) => {
    setSearch(newValue);
  };

  const handleSelectedChange = (newValue) => {
    setSelectedValue(newValue);
  };

  useEffect(() => {
    if (search) {
      loadOptions();
    }
  }, [search]);

  const [state, setState] = React.useState({
    imei_code: "",
    type: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleCreateDevice = (e) => {
    e.preventDefault();

    const newDevice = {
      "device": {
          "imei_code": selectedValue.value,
          "device_type_id": parseInt(state.type)
      },
      "commands": {
          "s_r_i": "1",
          "v_m": "0",
          "v1_s": "0",
          "v2_s": "0",
          "v3_s": "0",
          "v4_s": "0",
          "v5_s": "0",
          "v6_s": "0",
          "v7_s": "0",
          "v8_s": "0",
          "v9_s": "0",
          "v10_s": "0",
          "v1_l": "0",
          "v2_l": "0",
          "v3_l": "0",
          "v4_l": "0",
          "v5_l": "0",
          "v6_l": "0",
          "v7_l": "0",
          "v8_l": "0",
          "v9_l": "0",
          "v10_l": "0",
          "p_m": "0",
          "t_l": "0",
          "p_s": "0",
          "t_d": "0"
      }
  }
    const res = deviceCreate(newDevice).then((res) => {
      if (res.status === 201) {
        setEventType("success");
        setEventMessage("Device Successfully Created");
        setEventTitle("DEVICE CREATE");
        setIsSnackBarAlertOpen(true);
      } else {
        setEventType("fail");
        setEventMessage("Device NOT Created");
        setEventTitle("DEVICE CREATE");
        setIsSnackBarAlertOpen(true);
      }
    });

    return res;
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
    }),
  };

  const greenButton = {
    backgroundColor: "green",
    color: "white",
  };

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-40%, -20%)",
    width: 500,
    height: 450,
    bgcolor: "#ffff",
    outline: "none",
    border: "none",
    // boxShadow: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  };

  return (
    <>
      <SnackbarAlert
        open={isSnackBarAlertOpen}
        type={eventType}
        message={eventMessage}
        handleClose={() => setIsSnackBarAlertOpen(false)}
        title={eventTitle}
      />
      <Modal
        open={deviceModal}
        sx={{ border: "none", boxShadow: "none" }}
        onClose={closeDeviceModal}
      >
        <div>
          <Box sx={style}>
            <CardContent style={{ width: "60%" }}>
              <div className="text-center content-center">
                <p className="text-xl">CREATE DEVICE</p>

                <br />

                <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="my-2">
                <select id="outlined-basic" name="type" onChange={handleChange} className="w-full py-2 px-3 rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="1">SMART HOME</option>
                  <option value="2">SMART FARM</option>
                  <option value="3">WATER PAN</option>
                </select>
                </div>
                <div className="m-2">
                  <AsyncSelect
                    value={selectedValue}
                    inputValue={search}
                    onInputChange={handleInputChange}
                    onChange={handleSelectedChange}
                    loadOptions={loadOptions}
                    isClearable={true}
                    styles={customStyles}
                    className="w-full"
                  />
                </div>
        

                  <button
                    className="bg-blue-900 text-white font-normal py-1.5 px-5 rounded text-[14px] w-full"
                    style={{
                      marginTop: "2rem",
                      alignSelf: "center",
                      ...(isButtonClicked ? greenButton : {}),
                    }}
                    onClick={(e) => {
                      handleCreateDevice(e);
                      // setIsButtonClicked(true);
                    }}
                  >
                     CREATE
                    {/* {isButtonClicked ? "DONE!" : "CREATE"} */}
                  </button>
                </div>
              </div>
            </CardContent>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default CreateDeviceModal;
