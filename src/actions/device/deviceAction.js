import axios from 'axios';
import apiUrl from "../../utils/apiUtils/apiUrl";
import { authHeaders } from '../../utils/headers/headers';

export function deviceList(formValues) {
    const devicesUrl = `${apiUrl.LIST_DEVICES}?page=${formValues.page}&limit=${formValues.limit}`;
    const config = authHeaders();
  
    return axios
      .get(devicesUrl, config)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The contacts could not be returned.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }

  export function imeiSearch(formValues) {
    const searchUrl = `${apiUrl.DEVICE_SEARCH}?search=${formValues.search}`;
    const config = authHeaders();
  
    return axios
      .get(searchUrl, config)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The user could not be created.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }  

  export function imeiCreate(imei) {
    const imeiCreateUrl = `${apiUrl.CREATE_IMEI}/${imei}`;
    const config = authHeaders();
  
    return axios
      .put(imeiCreateUrl, config)
      .then((res) => {
      
        if (res.data && res.status === 201) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The contacts could not be returned.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }

  export function deviceCreate(newDevice) {
    const deviceCreateUrl = apiUrl.DEVICE_CREATE;
    const config = authHeaders();
  
    return axios
      .post(deviceCreateUrl, newDevice, config)
      .then((res) => {
      
        if (res.data && res.status === 201) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The contacts could not be returned.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }

  export function deviceDataLogs(imei) {
    const logsUrl = `${apiUrl.DATA_LOGS}/${imei}?limit=30&page=1`;
    const config = authHeaders();
  
    return axios
      .get(logsUrl, config)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The contacts could not be returned.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }

  export function deviceDataState(imei) {
    const logsUrl = `${apiUrl.DATA_STATE}/${imei}`;
    const config = authHeaders();
  
    return axios
      .get(logsUrl, config)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The contacts could not be returned.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }

  export function userDevices(formValues) {
    const clientDevicesUrl = `${apiUrl.CLIENT_DEVICES}/${formValues.userId}/device/list`;
    const config = authHeaders();
  
    return axios
      .get(clientDevicesUrl, config)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The contacts could not be returned.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }

  export function sendCommand(formValues) {
    const sendCommandUrl = apiUrl.SEND_COMMAND;
    const config = authHeaders();
  
    return axios
      .post(sendCommandUrl, formValues, config)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The contacts could not be returned.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }

  export function serviceCreate(formValues) {
    const appCreateUrl = apiUrl.CREATE_SERVICE;
    const config = authHeaders();
  
    return axios
      .post(appCreateUrl, formValues, config)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The contacts could not be returned.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }

  export function appServicesAction(formValues) {
    const appServicesUrl = apiUrl.APP_SERVICES;
    const config = authHeaders();
  
    return axios
      .get(appServicesUrl, config, formValues)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The contacts could not be returned.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }  

  export function serviceAttach(formValues) {
    const attachUrl = `${apiUrl.SERVICE_ATTACH}/${formValues.app_id}/service/${formValues.service_id}`;
    const config = authHeaders();
  
    return axios
      .post(attachUrl, formValues, config)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The user could not be created.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }  

  export function serviceSearch(formValues) {
    const searchUrl = `${apiUrl.SERVICE_SEARCH}/${formValues.app_id}/search?name=${formValues.search}`;
    const config = authHeaders();
  
    return axios
      .get(searchUrl, config)
      .then((res) => {
      
        if (res.data && res.status === 200) {

            console.log("THE RESPONSE IS !!!!!!!",res)
          
        }
        return res;
      })
      .catch((error) => {
        if (error.response) {
        
          return {
            errors: {
              _error: 'The user could not be created.',
            },
          };
        }   
        return {
          errors: {
            _error: 'Network error. Please try again.',
          },
        };
      });
  }  

