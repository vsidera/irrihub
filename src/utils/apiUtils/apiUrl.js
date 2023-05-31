export const {REACT_APP_SUSS_URL } = process.env;
export const {REACT_APP_IRRIHUB_URL } = process.env;

export default {
    LOGIN_URL: `${REACT_APP_IRRIHUB_URL}/public/login`,
    LIST_DEVICES: `${REACT_APP_IRRIHUB_URL}/api/v1/device/list`,
    LIST_CUSTOMERS: `${REACT_APP_IRRIHUB_URL}/api/v1/customer/list`,
    LIST_USERS: `${REACT_APP_IRRIHUB_URL}/api/v1/user/list`,
    CREATE_USER: `${REACT_APP_IRRIHUB_URL}/api/v1/user/create`,
    SEND_COMMAND: `${REACT_APP_IRRIHUB_URL}/api/v1/device/sensor/command`,
    CLIENT_DEVICES: `${REACT_APP_IRRIHUB_URL}/api/v1/customer`,
    DATA_STATE: `${REACT_APP_IRRIHUB_URL}/api/v1/device/current/state`,
    DATA_LOGS: `${REACT_APP_IRRIHUB_URL}/api/v1/device/data/logs`,
    ATTACH_CUSTOMER: `${REACT_APP_IRRIHUB_URL}/api/v1/device`,
    CUSTOMER_SEARCH: `${REACT_APP_IRRIHUB_URL}/api/v1/customer/search`,
    DEVICE_SEARCH: `${REACT_APP_IRRIHUB_URL}/api/v1/imei/available/list`,
    CREATE_IMEI: `${REACT_APP_IRRIHUB_URL}/api/v1/imei/add`,

    DEVICE_CREATE: `${REACT_APP_IRRIHUB_URL}/api/v1/device/create`,

    LIST_CONTACTS: `${REACT_APP_SUSS_URL}/api/v1/contact`,
    CREATE_CONTACT: `${REACT_APP_SUSS_URL}/api/v1/contact`,
    
    BROADCAST_MESSAGE: `${REACT_APP_SUSS_URL}/api/v1/message/:sid/broadcast/send`,
    UPLOAD_CONTACTS: `${REACT_APP_SUSS_URL}api/v1/contact`,
    LIST_MESSAGES: `${REACT_APP_SUSS_URL}/api/v1/message`,
    LIST_APP_SERVICES: `${REACT_APP_SUSS_URL}/api/v1/application?page=1&limit=20`,
    USER_ATTACH: `${REACT_APP_SUSS_URL}api/v1/application`,
    SERVICE_ATTACH: `${REACT_APP_SUSS_URL}api/v1/application`,
    CREATE_SERVICE: `${REACT_APP_SUSS_URL}/api/v1/service/create`,
    CREATE_APP: `${REACT_APP_SUSS_URL}/api/v1/application/create`,
    SEND_SMS: `${REACT_APP_SUSS_URL}api/v1/message/2/user/send`,
    LIST_APPLICATIONS: `${REACT_APP_SUSS_URL}api/v1/application/3/list`,
    LIST_SERVICES: `${REACT_APP_SUSS_URL}/api/v1/service/3/list`,
    USER_APPS: `${REACT_APP_SUSS_URL}/api/v1/users/application/list`,
    USER_SEARCH: `${REACT_APP_SUSS_URL}api/v1/application`,
    SERVICE_SEARCH: `${REACT_APP_SUSS_URL}api/v1/service`
};