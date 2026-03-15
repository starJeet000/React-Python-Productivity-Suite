import React, { useState } from 'react';
import { 
  Box, Flex, Heading, Text, Card, CardBody, Badge, Spacer, useColorModeValue, IconButton,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, 
  Button, FormControl, FormLabel, Input, Select, Textarea // <-- Added Textarea import
} from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import CreateTaskModal from './CreateTaskModal.jsx'; 

const initialColumns = {
  'To Do': [
    // Added a sample description to the first task so you can see how it looks!
    { id: '1', title: 'Set up PostgreSQL', priority: 'High', description: 'Install Postgres and create the initial database schema.' },
    { id: '2', title: 'Create JWT Auth', priority: 'Medium' },
  ],
  'In Progress': [
    { id: '3', title: 'Design Dashboard', priority: 'Low' },
  ],
  'Done': [],
};

export default function BoardView() {
  const [columns, setColumns] = useState(initialColumns);

  // --- Modal States ---
  const [editingTask, setEditingTask] = useState(null); 
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editDescription, setEditDescription] = useState(""); // <-- New state for description
  
  const [deletingTask, setDeletingTask] = useState(null); 

  // Dynamic Theme Variables
  const headingColor = useColorModeValue("gray.800", "white");
  const columnBg = useColorModeValue("gray.100", "gray.700");
  const columnHeaderColor = useColorModeValue("gray.700", "gray.200");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardTextColor = useColorModeValue("gray.800", "gray.100");
  const cardDescColor = useColorModeValue("gray.600", "gray.400"); // <-- Color for description text
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const modalBg = useColorModeValue("white", "gray.800");

  // --- Handlers ---
  const handleAddTask = (newTask) => {
    setColumns({ ...columns, 'To Do': [newTask, ...columns['To Do']] });
  };

  // Open Edit Modal & populate current values
  const openEditModal = (columnId, task) => {
    setEditingTask({ columnId, task });
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditDescription(task.description || ""); // <-- Load existing description or empty string
  };

  // Save the edited task
  const saveEditTask = () => {
    if (!editTitle.trim()) return;
    setColumns(prev => ({
      ...prev,
      [editingTask.columnId]: prev[editingTask.columnId].map(t => 
        t.id === editingTask.task.id 
          ? { ...t, title: editTitle.trim(), priority: editPriority, description: editDescription.trim() } // <-- Save description
          : t
      )
    }));
    setEditingTask(null); 
  };

  // Open Delete Modal
  const openDeleteModal = (columnId, taskId) => {
    setDeletingTask({ columnId, taskId });
  };

  // Confirm Deletion
  const confirmDeleteTask = () => {
    setColumns(prev => ({
      ...prev,
      [deletingTask.columnId]: prev[deletingTask.columnId].filter(t => t.id !== deletingTask.taskId)
    }));
    setDeletingTask(null); 
  };

  // The Drag Logic
  const onDragEnd = (result) => {
    if (!result.destination) return; 

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = [...columns[source.droppableId]];
      const destColumn = [...columns[destination.droppableId]];
      const [removedItem] = sourceColumn.splice(source.index, 1);
      destColumn.splice(destination.index, 0, removedItem);

      setColumns({
        ...columns,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn
      });
    } else {
      const column = [...columns[source.droppableId]];
      const [removedItem] = column.splice(source.index, 1);
      column.splice(destination.index, 0, removedItem);

      setColumns({
        ...columns,
        [source.droppableId]: column
      });
    }
  };

  return (
    <Flex direction="column" h="full" w="full">
      <Flex align="center" mb={6}>
        <Heading size="lg" color={headingColor}>Sprint Board</Heading>
        <Spacer />
        <CreateTaskModal onAddTask={handleAddTask} />
      </Flex>

      <DragDropContext onDragEnd={onDragEnd}>
        <Flex gap={6} flex="1" overflowX="auto" pb={4}>
          {Object.entries(columns).map(([columnId, columnTasks]) => (

            <Droppable droppableId={columnId} key={columnId}>
              {(provided, snapshot) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  minW="300px"
                  bg={snapshot.isDraggingOver ? useColorModeValue("blue.50", "gray.600") : columnBg}
                  borderRadius="md"
                  p={4}
                  display="flex"
                  flexDirection="column"
                  transition="background-color 0.2s ease"
                >
                  <Flex justify="space-between" align="center" mb={4}>
                    <Heading size="sm" color={columnHeaderColor} textTransform="uppercase">{columnId}</Heading>
                    <Badge colorScheme="blue" borderRadius="full" px={2}>
                      {columnTasks.length}
                    </Badge>
                  </Flex>

                  <Flex direction="column" gap={3} flex="1" minH="150px">
                    {columnTasks.map((task, index) => (

                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            userSelect="none" 
                            size="sm"
                            bg={cardBg}
                            boxShadow={snapshot.isDragging ? "2xl" : "sm"}
                            _hover={{ boxShadow: 'md' }}
                          >
                            <CardBody>
                              <Flex justify="space-between" align="flex-start" mb={2}>
                                <Text fontWeight="medium" color={cardTextColor} pr={2}>
                                  {task.title}
                                </Text>
                                
                                <Flex gap={1}>
                                  <IconButton 
                                    icon={<FiEdit />} 
                                    size="xs" 
                                    variant="ghost" 
                                    colorScheme="blue" 
                                    aria-label="Edit task"
                                    onClick={() => openEditModal(columnId, task)}
                                  />
                                  <IconButton 
                                    icon={<FiTrash />} 
                                    size="xs" 
                                    variant="ghost" 
                                    colorScheme="red" 
                                    aria-label="Delete task"
                                    onClick={() => openDeleteModal(columnId, task.id)}
                                  />
                                </Flex>
                              </Flex>
                              
                              {/* --- Render Description on Card if it exists --- */}
                              {task.description && (
                                <Text fontSize="xs" color={cardDescColor} mb={3} noOfLines={3}>
                                  {task.description}
                                </Text>
                              )}
                              
                              <Badge colorScheme={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'yellow' : 'green'}>
                                {task.priority}
                              </Badge>
                            </CardBody>
                          </Card>
                        )}
                      </Draggable>

                    ))}
                    {provided.placeholder}
                  </Flex>
                </Box>
              )}
            </Droppable>

          ))}
        </Flex>
      </DragDropContext>

      {/* --- Edit Task Modal --- */}
      <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)} isCentered>
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalHeader color={headingColor}>Edit Task</ModalHeader>
          <ModalCloseButton color={headingColor} />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel color={headingColor}>Task Title</FormLabel>
              <Input 
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                borderColor={borderColor}
                _hover={{ borderColor: "blue.400" }}
                color={headingColor}
              />
            </FormControl>

            {/* --- New Description Textarea Input --- */}
            <FormControl mt={4}>
              <FormLabel color={headingColor}>Description</FormLabel>
              <Textarea 
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Add a detailed description..."
                borderColor={borderColor}
                _hover={{ borderColor: "blue.400" }}
                color={headingColor}
                rows={3}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel color={headingColor}>Priority</FormLabel>
              <Select 
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                borderColor={borderColor}
                _hover={{ borderColor: "blue.400" }}
                color={headingColor}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setEditingTask(null)}>Cancel</Button>
            <Button colorScheme="blue" onClick={saveEditTask}>Save Changes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* --- Delete Confirmation Modal --- */}
      <Modal isOpen={!!deletingTask} onClose={() => setDeletingTask(null)} isCentered>
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalHeader color={headingColor}>Delete Task</ModalHeader>
          <ModalCloseButton color={headingColor} />
          <ModalBody>
            <Text color={cardTextColor}>Are you sure you want to delete this task? This action cannot be undone.</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setDeletingTask(null)}>Cancel</Button>
            <Button colorScheme="red" onClick={confirmDeleteTask}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Flex>
  );
}