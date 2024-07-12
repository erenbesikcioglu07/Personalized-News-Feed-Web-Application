import {
    Box,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalOverlay, Text,
    useDisclosure
} from "@chakra-ui/react";
import React, { useEffect } from "react";

interface ModalComponentProps {
    isOpen: boolean;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen }) => {
    const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (isOpen) {
            onOpen();
        } else {
            onClose();
        }
    }, [isOpen, onOpen, onClose]);

    const userInfo = JSON.parse(localStorage.getItem('USER_INFO')!);

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={onClose} isCentered={isModalOpen} >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                        <Box
                            p="1"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <ModalBody>
                                {userInfo && userInfo.username! && <Text fontSize='30px' as='b' >Welcome {userInfo.username!}</Text>}
                            </ModalBody>
                        </Box>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalComponent;