import React, { useState } from "react";
import { 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, 
  ModalBody, ModalCloseButton, Button, FormControl, FormLabel, 
  Input, Select, useDisclosure, useColorModeValue 
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

export default function CreateTaskModal({ onAddTask }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Don't submit empty tasks

    // Create a new task object (generating a mock ID for now)
    const newTask = {
      id: Date.now().toString(), // Use timestamp as a unique string ID
      title: title.trim(),
      priority: priority,
    };

    // Call the parent function to update state
    onAddTask(newTask);
    
    // Reset and close
    setTitle("");
    setPriority("Medium");
    onClose();
  };

  return (
    <>
      <Button 
        colorScheme="blue" 
        size="sm" 
        onClick={onOpen} 
        leftIcon={<FiPlus />}
      >
        New Task
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent bg={useColorModeValue("white", "gray.800")}>
            <ModalHeader color={textColor}>Create New Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              
              <FormControl isRequired>
                <FormLabel color={textColor}>Task Title</FormLabel>
                <Input 
                  placeholder="e.g., Implement backend API" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  borderColor={borderColor}
                  _hover={{ borderColor: "blue.400" }}
                  color={textColor}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel color={textColor}>Priority</FormLabel>
                <Select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  borderColor={borderColor}
                  _hover={{ borderColor: "blue.400" }}
                  color={textColor}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Select>
              </FormControl>

            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit">
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}