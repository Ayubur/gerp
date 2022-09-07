const CONTACT_URL = `${process.env.REACT_APP_CONTACT_SERVICE_URL}/api/v1`
const LOCATION_URL = `${process.env.REACT_APP_LOCATION_SERVICE_URL}/api/v1`

export const getContactType = async () => {
    try {
        let url = `${CONTACT_URL}/contacts/types`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);

    }
}

export const getContactGroup = async () => {
    try {
        let url = `${CONTACT_URL}/contacts/groups`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);

    }
}

export const getLocationGroup = async () => {
    try {
        let url = `${LOCATION_URL}/locations/groups`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);

    }
}

export const getLocationType = async () => {
    try {
        let url = `${LOCATION_URL}/locations/types`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);

    }
}

export const getLocation = async () => {
    try {
        let url = `${LOCATION_URL}/locations`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);

    }
}

export const getLocationByLocGroup = async (location_group_id) => {
    try {
        let url = `${LOCATION_URL}/locations/group/${location_group_id}/locations`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);

    }
}