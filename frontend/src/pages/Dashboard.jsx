import React from 'react';
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Button,
  Avatar,
  Spacer
} from '@chakra-ui/react';

export default function Dashboard() {
  return (
    <Flex h="100vh" w="100vw" overflow="hidden" bg="gray.50">
      
      {/* Sidebar Placeholder */}
      <Box
        w={{ base: "full", md: "250px" }}
        bg="white"
        borderRight="1px"
        borderColor="gray.200"
        display={{ base: "none", md: "block" }}
      >
        {/* Sidebar Header */}
        <Flex h="16" align="center" px="6" borderBottom="1px" borderColor="gray.200">
          <Heading size="md" color="blue.600">
            ProdSuite
          </Heading>
        </Flex>

        {/* Sidebar Navigation */}
        <VStack align="stretch" spacing={2} p={4}>
          <Button variant="ghost" justifyContent="flex-start" colorScheme="blue" bg="blue.50">
            Boards
          </Button>
          <Button variant="ghost" justifyContent="flex-start" color="gray.600">
            User Management
          </Button>
          <Button variant="ghost" justifyContent="flex-start" color="gray.600">
            Settings
          </Button>
        </VStack>
      </Box>

      {/* Main Content Wrapper */}
      <Flex direction="column" flex="1">
        
        {/* Top Header Placeholder */}
        <Flex
          h="16"
          align="center"
          px={6}
          bg="white"
          borderBottom="1px"
          borderColor="gray.200"
        >
          <Heading size="sm" color="gray.800">
            Active Board
          </Heading>
          <Spacer />
          <Flex align="center" gap={4}>
            <Button colorScheme="blue" size="sm">
              + Create Task
            </Button>
            <Avatar size="sm" name="User Avatar" bg="gray.300" />
          </Flex>
        </Flex>

        {/* Dynamic Page Content */}
        <Box flex="1" overflowY="auto" p={6}>
          {/* This is where your UserGrid or Kanban Board will render */}
          <Flex
            direction="column"
            align="center"
            justify="center"
            h="full"
            border="2px dashed"
            borderColor="gray.300"
            borderRadius="lg"
            bg="white"
            p={12}
          >
            <Heading size="sm" color="gray.700" mb={2}>
              No content loaded
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Your feature components will be dynamically rendered here.
            </Text>
          </Flex>
        </Box>
        
      </Flex>
    </Flex>
  );
}