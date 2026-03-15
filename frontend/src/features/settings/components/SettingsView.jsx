import React, { useState, useEffect } from 'react';
import { 
  Box, Heading, VStack, FormControl, FormLabel, Input, Switch, 
  Button, Divider, useColorModeValue, Flex, Text, Tabs, TabList, TabPanels, Tab, TabPanel 
} from '@chakra-ui/react';
import { FiGithub, FiSlack, FiCalendar, FiShield, FiAlertTriangle } from 'react-icons/fi';

export default function SettingsView() {
  // --- Local Storage State Hooks ---
  // These initialize by checking localStorage first. If nothing is found, they default to true/false.
  const [emailNotifs, setEmailNotifs] = useState(() => {
    const saved = localStorage.getItem('prodsuite_email_notifs');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [aiPrioritization, setAiPrioritization] = useState(() => {
    const saved = localStorage.getItem('prodsuite_ai_prioritization');
    return saved !== null ? JSON.parse(saved) : false;
  });

  // These Effects run every time the state changes, saving the new value back to localStorage
  useEffect(() => {
    localStorage.setItem('prodsuite_email_notifs', JSON.stringify(emailNotifs));
  }, [emailNotifs]);

  useEffect(() => {
    localStorage.setItem('prodsuite_ai_prioritization', JSON.stringify(aiPrioritization));
  }, [aiPrioritization]);

  // Dynamic theme variables
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const dangerBorder = useColorModeValue("red.200", "red.800");
  const dangerBg = useColorModeValue("red.50", "rgba(229, 62, 62, 0.1)");

  return (
    <Box maxW="800px" mx="auto" w="full" pb={8}>
      <Heading mb={6} color={textColor}>Settings</Heading>

      <Box bg={cardBg} borderRadius="lg" border="1px" borderColor={borderColor} boxShadow="sm" overflow="hidden">
        <Tabs colorScheme="blue" variant="enclosed" pt={4} px={4}>
          <TabList borderColor={borderColor}>
            <Tab color={textColor} _selected={{ color: 'blue.500', borderColor: borderColor, borderBottomColor: cardBg }}>General</Tab>
            <Tab color={textColor} _selected={{ color: 'blue.500', borderColor: borderColor, borderBottomColor: cardBg }}>Integrations</Tab>
            <Tab color={textColor} _selected={{ color: 'blue.500', borderColor: borderColor, borderBottomColor: cardBg }}>Security</Tab>
          </TabList>

          <TabPanels>
            {/* TAB 1: General Settings */}
            <TabPanel px={2} py={6}>
              <VStack spacing={8} align="stretch">
                <Box>
                  <Heading size="md" mb={4} color={textColor}>Profile Information</Heading>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel color={textColor}>Full Name</FormLabel>
                      <Input placeholder="John Doe" borderColor={borderColor} _hover={{ borderColor: "blue.400" }} color={textColor} />
                    </FormControl>
                    <FormControl>
                      <FormLabel color={textColor}>Email Address</FormLabel>
                      <Input type="email" placeholder="john@workspace.com" borderColor={borderColor} _hover={{ borderColor: "blue.400" }} color={textColor} />
                    </FormControl>
                    <Flex w="full" justify="flex-end" pt={2}>
                      <Button colorScheme="blue">Save Changes</Button>
                    </Flex>
                  </VStack>
                </Box>

                <Divider borderColor={borderColor} />

                <Box>
                  <Heading size="md" mb={4} color={textColor}>Preferences</Heading>
                  <VStack spacing={4} align="stretch">
                    
                    <Flex justify="space-between" align="center">
                      <Box>
                        <Text fontWeight="medium" color={textColor}>Email Notifications</Text>
                        <Text fontSize="sm" color={subTextColor}>Receive daily digest of tasks</Text>
                      </Box>
                      {/* Wired up Switch */}
                      <Switch 
                        colorScheme="blue" 
                        isChecked={emailNotifs} 
                        onChange={(e) => setEmailNotifs(e.target.checked)} 
                      />
                    </Flex>

                    <Flex justify="space-between" align="center">
                      <Box>
                        <Text fontWeight="medium" color={textColor}>AI Task Prioritization</Text>
                        <Text fontSize="sm" color={subTextColor}>Automatically analyze and sort tasks</Text>
                      </Box>
                      {/* Wired up Switch */}
                      <Switch 
                        colorScheme="blue" 
                        isChecked={aiPrioritization} 
                        onChange={(e) => setAiPrioritization(e.target.checked)} 
                      />
                    </Flex>

                  </VStack>
                </Box>
              </VStack>
            </TabPanel>

            {/* TAB 2: Integrations */}
            <TabPanel px={2} py={6}>
              <Heading size="md" mb={4} color={textColor}>Connected Apps</Heading>
              <Text fontSize="sm" color={subTextColor} mb={6}>Connect external tools to supercharge your workspace.</Text>
              
              <VStack spacing={4} align="stretch">
                <Flex justify="space-between" align="center" p={4} border="1px" borderColor={borderColor} borderRadius="md">
                  <Flex align="center" gap={3}>
                    <FiGithub size={24} color={useColorModeValue("#24292e", "#ffffff")} />
                    <Box>
                      <Text fontWeight="medium" color={textColor}>GitHub</Text>
                      <Text fontSize="sm" color={subTextColor}>Link pull requests to task cards</Text>
                    </Box>
                  </Flex>
                  <Switch colorScheme="green" defaultChecked />
                </Flex>

                <Flex justify="space-between" align="center" p={4} border="1px" borderColor={borderColor} borderRadius="md">
                  <Flex align="center" gap={3}>
                    <FiSlack size={24} color="#E01E5A" />
                    <Box>
                      <Text fontWeight="medium" color={textColor}>Slack</Text>
                      <Text fontSize="sm" color={subTextColor}>Send board updates to channels</Text>
                    </Box>
                  </Flex>
                  <Switch colorScheme="green" />
                </Flex>

                <Flex justify="space-between" align="center" p={4} border="1px" borderColor={borderColor} borderRadius="md">
                  <Flex align="center" gap={3}>
                    <FiCalendar size={24} color="#4285F4" />
                    <Box>
                      <Text fontWeight="medium" color={textColor}>Google Calendar</Text>
                      <Text fontSize="sm" color={subTextColor}>Sync deadlines automatically</Text>
                    </Box>
                  </Flex>
                  <Switch colorScheme="green" />
                </Flex>
              </VStack>
            </TabPanel>

            {/* TAB 3: Security & Danger Zone */}
            <TabPanel px={2} py={6}>
              <VStack spacing={8} align="stretch">
                <Box>
                  <Flex align="center" gap={2} mb={4}>
                    <FiShield color="#3182CE" />
                    <Heading size="md" color={textColor}>Security</Heading>
                  </Flex>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel color={textColor}>Current Password</FormLabel>
                      <Input type="password" borderColor={borderColor} />
                    </FormControl>
                    <FormControl>
                      <FormLabel color={textColor}>New Password</FormLabel>
                      <Input type="password" borderColor={borderColor} />
                    </FormControl>
                    <Flex w="full" justify="space-between" align="center" pt={2}>
                      <Text fontSize="sm" color={subTextColor}>Last changed: 3 months ago</Text>
                      <Button colorScheme="blue" variant="outline">Update Password</Button>
                    </Flex>
                  </VStack>
                </Box>

                <Divider borderColor={borderColor} />

                {/* Danger Zone */}
                <Box border="1px" borderColor={dangerBorder} bg={dangerBg} p={4} borderRadius="md">
                  <Flex align="center" gap={2} mb={2}>
                    <FiAlertTriangle color="#E53E3E" />
                    <Heading size="md" color="red.500">Danger Zone</Heading>
                  </Flex>
                  <Text fontSize="sm" color={subTextColor} mb={4}>
                    Once you delete your account, there is no going back. Please be certain.
                  </Text>
                  <Flex gap={4}>
                    <Button colorScheme="red" variant="outline" size="sm">Export All Data</Button>
                    <Button colorScheme="red" size="sm">Delete Account</Button>
                  </Flex>
                </Box>
              </VStack>
            </TabPanel>

          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}