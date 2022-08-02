import React from "react";
import { Modal, Button } from "antd";

const AddContact = ({ isModalOpen, setIsModalOpen, title }: any) => {
    return (
        <Modal
            title={title}
            visible={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={[
                <Button>
                    Save Contact
                </Button>
            ]}
        >
            <p>Some contents.............</p>
        </Modal>
    )
}

export default AddContact;