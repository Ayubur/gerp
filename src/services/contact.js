const CONTACT_URL = `${process.env.REACT_APP_CONTACT_SERVICE_URL}/api/v1`

// contact type
export const getAllContactType = async () => {
    try {
        let url = `${CONTACT_URL}/contacts/types`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);

    }
}

export const saveAllContactType = async (req_body) => {
    try {
        const header = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_body),
        };
        const response = await fetch(`${CONTACT_URL}/contacts/types`, header);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

// contact group
export const getAllContactGroup = async () => {
    try {
        let url = `${CONTACT_URL}/contacts/groups`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);

    }
}

export const saveContactGroupData = async (req_body) => {
    try {
        const header = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_body),
        };
        const response = await fetch(`${CONTACT_URL}/contacts/groups`, header);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const updateContactGroupData = async (contact_group_id, req_body) => {
    try {
        const header = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_body),
        };
        const response = await fetch(`${CONTACT_URL}/contacts/groups/${contact_group_id}`, header);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const deleteContactGroup = async (id) => {
    try {
        const header = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch(`${CONTACT_URL}/${id}`, header);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

//contact data
export const getContact = async (page) => {
    try {
        let url = `${CONTACT_URL}/contacts?page=${page}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);

    }
}

export const saveContactData = async (req_body) => {
    try {
        const header = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_body),
        };
        const response = await fetch(`${CONTACT_URL}/contacts`, header);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const updateContactData = async (contact_id, req_body) => {
    try {
        const header = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_body),
        };
        const response = await fetch(`${CONTACT_URL}/contacts/${contact_id}`, header);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const getContactDeatisById = async (contact_id) => {
    try {
        let url = `${CONTACT_URL}/contacts/${contact_id}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);

    }
}

// contact address
export const saveSingleAddressData = async (contact_id, req_body) => {
    try {
        const header = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_body),
        };
        const response = await fetch(`${CONTACT_URL}/contacts/${contact_id}/addresses`, header);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const updateSingleAddressData = async (contact_id, contacts_address_id, req_body) => {
    try {
        const header = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_body),
        };
        const response = await fetch(`${CONTACT_URL}/contacts/${contact_id}/addresses/${contacts_address_id}`, header);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const getAllContactAddress = async (contact_id) => {
    try {
        let url = `${CONTACT_URL}/contacts/${contact_id}/addresses`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);

    }
}