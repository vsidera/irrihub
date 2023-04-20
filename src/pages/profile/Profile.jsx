import React, { useState, useEffect } from "react";
import Table from "../../components/table/table";
import { Tab, Tabs } from "@material-ui/core";
import { Card, CardActions, CardContent, Button } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "../../components/sidebar/sidebar";
import {
  deviceDataState,
  deviceDataLogs,
} from "../../actions/device/deviceAction";
import { useParams } from "react-router-dom";
import CardGrid from "../../components/cards/CardGrid";
// import Card from "../../components/cards/Card";
import { Icon } from "@material-ui/core";
import { Pool, Opacity, Waves } from "@material-ui/icons";
import GaugeChart from "react-gauge-chart";
import ValveSlider from "../../components/utils/slider";
import "./profile.css";
import { sendCommand } from "../../actions/device/deviceAction";
import SnackbarAlert from "../../components/utils/snackbar";

const getMuiTheme = () =>
  createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            backgroundColor: "#FFFFFF",
            fontFamily: "Ubuntu",
            fontWeight: "inherit",
          },
          footer: {
            border: 0,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            // fontFamily: 'Ubuntu',
            color: "black",
            justifyContent: "center",
            // fontWeight: 'bold',
          },
        },
      },

      MUIDataTableSelectCell: {
        styleOverrides: {
          headerCell: {
            backgroundColor: "#5f6062",
            color: "wh",
          },
        },
      },

      MUIDataTable: {
        styleOverrides: {
          responsiveBase: {
            position: "relative",
            height: "auto",
            borderRadius: "18px",
            border: "1px solid #f2f2f2",
            boxShadow: "0 0 6px 4px #efefef",
          },
        },
      },
      MUIDataTablePagination: {
        styleOverrides: {
          navContainer: {
            border: 0,
            boxShadow: "0 ",
          },
        },
      },
    },
  });

const Profile = () => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const [heartbeat, setHeartbeat] = useState("...");
  const [fw_version, setFw_version] = useState("...");
  const [bat_voltage, setBat_voltage] = useState("...");
  const [solar_voltage, setSolar_voltage] = useState("...");
  const [device_type, setDevice_type] = useState("...");
  const [signal_quality, setSignal_quality] = useState("...");
  const [temp, setTemp] = useState("...");
  const [waterLevel, setWaterLevel] = useState("...");
  const [ltsb, setLtsb] = useState("...");
  const [humidity, setHumidity] = useState("...");
  const [rssi, setRssi] = useState("...");


  const [isLoaded, setIsLoaded] = useState(false);

  const firstname = JSON.parse(localStorage.getItem("firstname"));
  const lastname = JSON.parse(localStorage.getItem("lastname"));
  const type = JSON.parse(localStorage.getItem("type"));
  const mobile_no = JSON.parse(localStorage.getItem("mobile_no"));
  const id = JSON.parse(localStorage.getItem("id"));

  const imei = params.id;

  const [dataLogs, setDataLogs] = useState([]);

  const [dataState, setDataState] = useState([]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const extractedData = {};

  const getDataState = () => {
    deviceDataState(imei)
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setDataState(res.data);
          const deviceData = res.data;

          deviceData.forEach((obj) => {
            switch (obj.subtopic) {
              case "d_t":
                extractedData.device_type = obj.value;
                setDevice_type(extractedData.device_type)
                break;
              case "f_w":
                extractedData.firmwareVersion = obj.value;
                setFw_version(extractedData.firmwareVersion)
                break;
              case "g_s_q":
                extractedData.gpsSignalQuality = obj.value;
                setSignal_quality(extractedData.signal_quality)
                break;
              case "h_b":
                extractedData.heartbeat = obj.value;
                setHeartbeat(extractedData.heartbeat)
              case "hum":
                extractedData.humidity = obj.value;
                setHumidity(extractedData.humidity)
                break;
              case "l_t_s_b":
                extractedData.ltsb = obj.value;
                setLtsb(extractedData.ltsb)
                break;
              case "temp":
                extractedData.temperature = obj.value;
                setTemp(extractedData.temperature)
                break;
              case "w_t_l":
                extractedData.water_level = obj.value;
                setWaterLevel(extractedData.water_level)
              case "s_p_v":
                extractedData.solar_voltage = obj.value;
                setSolar_voltage(extractedData.solar_voltage)
                break;
              case "rssi":
                extractedData.rssi = obj.value;
                setRssi(extractedData.rssi)
                break;
              case "s_b_v":
                extractedData.battery_voltage = obj.value;
                setBat_voltage(extractedData.battery_voltage)
                break;
              default:
                break;
            }
          });

          setIsLoaded(true)

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [tankDepth, setTankDepth] = useState('');

  const handleTankDepthChange = (event) => {
    setTankDepth(event.target.value);
  };

  const handleSetPumpTrigger = () => {

    const cmdBody = {
      imei: imei,
      command: "t_d",
      value: tankDepth.toString(),
    };
    sendCommand(cmdBody)
      .then((res) => {
        if (res.status === 200) {
          setEventType("success");
          setEventMessage("Command Successfully Sent");
          setEventTitle("SEND COMMAND");
          setIsSnackBarAlertOpen(true);
        } else {
          setEventType("fail");
          setEventMessage("COMMAND NOT SENT");
          setEventTitle("SEND COMMAND");
          setIsSnackBarAlertOpen(true);
        }
      })
      .catch((err) => console.error(err));

  };

  const solar_perc = solar_voltage / 100

  const bat_perc = bat_voltage / 50

  const hum_perc = humidity / 100

  const temp_perc = temp / 100

  const getDataLogs = () => {
    deviceDataLogs(imei)
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setDataLogs(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataState();
    getDataLogs();
    setIsLoaded(true);
  }, []);

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "device_imei",
      label: "IMEI",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "subtopic",
      label: "SUB TOPIC",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "description",
      label: "DESCRIPTION",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "value",
      label: "STATUS",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "createdat",
      label: "CREATED",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options = {
    filter: false,
    filterType: "textField",
    responsive: "standard",
    print: false,
    tableId: "03009226196169874",
    fixedHeader: true,
    fontFamily: "Ubuntu",
    viewColumns: false,
    selectableRows: "none",
    fixedSelectColumn: true,
    tableBodyHeight: "auto",
    enableNestedDataAccess: ".",
    elevation: 0,
    count: 30,
    rowsPerPageOptions: [10, 20, 50],
    downloadOptions: {
      separator: ",",
      filename: "Customers Summary.csv",
      filterOptions: {
        useDisplayedColumnsOnly: false, // it was true
        useDisplayedRowsOnly: false, // it was true
      },
    },
    downloadFile: true,
    onDownload: (buildHead, buildBody, columns, data) => {
      let val = `${buildHead(columns)}${buildBody(data)}`
        .replace(/[^\x00-\x7F]/g, "")
        .toString()
        .trim();
      return val;
    },

    textLabels: {
      body: {
        noMatch: isLoaded ? (
          "Sorry, no matching records exist in Irrihub"
        ) : (
          <div>......</div>
        ),
        toolTip: "Sort",
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "of",
      },
      toolbar: {
        search: "Search A/C Number,Name or Payplans",
        downloadCsv: "Download User Excel List",
        print: "Print customers",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      setFilterChipProps: () => {
        return {
          color: "primary",
          variant: "outlined",
          className: "testClass123",
        };
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "record(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Records",
      },
    },
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

      <Sidebar>
        <h1 className="text-2xl text-black mb-6 ml-4">Profile</h1>
        <h4 className="text-md text-blue-900 font-['Ubuntu'] ml-4">
          {" "}
          Details about the Device and Owner
        </h4>
        <div className="mt-4">
          <div className="container mx-auto mt-4">
            {/* <div className="flex flex-wrap -mx-4"> */}
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-2">
              <div className="w-full  px-4 mb-4 lg:col-span-1 sm:col-span-2">
                <div className="rounded-lg shadow-lg p-4">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h2 className=" font-normal mb-2 ml-2">PROFILE DETAILS</h2>
                    <div className="flex items-center mb-4">
                      <div className="w-1/2 pl-2 pr-1 border-r-2 border-red-500">
                        <p className="font-normal mb-2">
                          NAME:{" "}
                          <span className="text-gray-700 ml-2">
                            {firstname}
                            {` `}
                            {lastname}
                          </span>
                        </p>
                        <p className="font-normal mb-2">
                          PHONE:{" "}
                          <span className="text-gray-700 ml-2">{mobile_no}</span>
                        </p>

                      </div>
                      <div className="w-1/2 pl-4">
                        <p className="font-normal mb-2">
                          IMEI: <span className="text-gray-700 ml-4">{imei}</span>
                        </p>

                        <p className="font-normal mb-2">
                          DEVICE_TYPE:{" "}
                          <span className="text-gray-700 ml-4">{device_type}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-2 lg:col-span-1 px-4 mb-4">
                <div className="rounded-lg shadow-lg p-4">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h2 className=" font-normal mb-2 ml-4">DEVICE DETAILS</h2>
                    <div className="flex items-center mb-4">
                      <div className="w-1/3 pl-4 pr-2 border-r-2 border-red-500">
                        <p className="font-normal mb-2">
                          HEARTBEAT: <span className="text-gray-700 ml-2">{heartbeat}</span>
                        </p>
                        <p className="font-normal mb-2">
                          SIGNAL QUALITY:{" "}
                          <span className="text-gray-700 ml-2">{signal_quality}</span>
                        </p>

                      </div>
                      <div className="w-1/3 pl-4 pr-2 border-r-2 border-red-500">
                        <p className="font-normal mb-2">
                          Temperature:{" "}
                          <span className="text-gray-700 ml-4">{temp}</span>
                        </p>
                        <p className="font-normal mb-2">
                          Rssi:{" "}
                          <span className="text-gray-700 ml-2">{rssi}</span>
                        </p>
                      </div>
                      <div className="w-1/3 pl-2 pr-1">
                        <p className="font-normal mb-2">
                          Firmware Ver:{" "}
                          <span className="text-gray-700 ml-4">{fw_version}</span>
                        </p>
                        <p className="font-normal mb-2">
                          Link to Sensor Board:{" "}
                          <span className={`ml-2 ${ltsb ? 'text-green-500' : 'text-red-500'}`}>
                            {ltsb ? 'True' : 'False'}
                          </span>

                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="w-full px-4"> */}
            <div className='grid lg:grid-cols-2 sm:grid-cols-2 gap-4 mx-4'>
              <div className="sm:col-span-2 lg:col-span-1 grid grid-cols-2 gap-4  ">
                <div className="w-full h-full">
                  <div>
                  <Card>
                    <div className="grid grid-cols-7">
                      <div className="col-span-4 flex-col">
                        <div className="flex justify-center">
                          <div className="water-tank mt-12">
                            <div className="water-level" style={{ height: `${80}%` }}>
                              <Icon className="water-icon">
                                <Pool />
                              </Icon>
                              <Icon className="water-icon">
                                <Opacity />
                              </Icon>
                              <Icon className="water-icon">
                                <Waves />
                              </Icon>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-4">
                          <h2 className="text-lg font-medium">Water Level</h2>
                          <p className="text-gray-500">{80}cm</p>
                        </div>
                      </div>
                      <div className="w-1/3 flex items-center">
                        <div className="m-1">
                          <p className="m-1 whitespace-nowrap">Set tank depth</p>
                          <input
                            value={tankDepth} onChange={handleTankDepthChange}
                            className="w-2/3 border rounded px-2 py-1 m-1"
                            type="number"
                            placeholder="Enter tank value"
                          />
                          <button onClick={handleSetPumpTrigger} className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-1 m-1">
                            Set
                          </button>
                        </div>
                      </div>
                    </div>
                    </Card>
                    </div>
                </div>

                <div className="">
                  <Card>
                    <GaugeChart
                      id="solar"
                      nrOfLevels={420}
                      arcsLength={[0.3, 0.5, 0.2]}
                      colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                      textColor="#4145E8"
                      percent={solar_perc}
                      arcPadding={0.02}
                    />
                    <div className="text-center mt-4">
                      <h2 className="text-lg font-medium">Solar Voltage</h2>
                      <p className="text-gray-500">{solar_voltage} V</p>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="sm:col-span-2 lg:col-span-1 grid grid-cols-2 gap-4">
                <div className="">
                  <Card>
                    <GaugeChart
                      id="temperature"
                      nrOfLevels={50}
                      arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
                      colors={["#5BE12C", "#FF00FF", "#F5CD19", "#EA4228", "#0000FF"]}
                      textColor="#4145E8"
                      percent={bat_perc}
                      arcPadding={0.02}
                    />
                    <div className="text-center mt-4">
                      <h2 className="text-lg font-medium">Battery Voltage</h2>
                      <p className="text-gray-500">{temp}V</p>
                    </div>
                  </Card>
                </div>
                <div className="">
                  <Card>
                    <GaugeChart
                      id="humidity"
                      nrOfLevels={100}
                      arcsLength={[0.3, 0.5, 0.2]}
                      colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                      textColor="#4145E8"
                      percent={hum_perc}
                      arcPadding={0.02}
                    />
                    <div className="text-center mt-4">
                      <h2 className="text-lg font-medium">Humidity</h2>
                      <p className="text-gray-500">{humidity}</p>

                    </div>
                  </Card>
                </div>
              </div>
            </div>

          
            {/* </div> */}

            <div className="w-full px-4">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <Tabs value={activeTab} onChange={handleTabChange}>
                  <Tab label="Device Data Logs" />
                  <Tab label="Device Current State" />
                </Tabs>
                {activeTab === 0 && (
                  <div>
                    <ThemeProvider theme={getMuiTheme()}>
                      <Table
                        columns={columns}
                        options={options}
                        data={dataLogs}
                      />
                    </ThemeProvider>
                  </div>
                )}
                {activeTab === 1 && (
                  <div>
                    <ThemeProvider theme={getMuiTheme()}>
                      <Table
                        columns={columns}
                        options={options}
                        data={dataState}
                      />
                    </ThemeProvider>
                  </div>
                )}
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Profile;
