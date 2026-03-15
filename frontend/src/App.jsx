import { useState } from "react";
import { Box, Flex, VStack, Text, Button, useColorModeValue, Drawer, DrawerContent, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiTrello, FiSettings } from "react-icons/fi";

import Navbar from "./layouts/Navbar.jsx";
import UserGrid from "./features/users/components/UserGrid.jsx";
import BoardView from "./features/boards/components/BoardView.jsx";
import SettingsView from "./features/settings/components/SettingsView.jsx";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    style={{ height: "100%" }}
  >
    {children}
  </motion.div>
);

function AppContent() {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // Added navigation hook
  const { isOpen, onOpen, onClose } = useDisclosure(); 

  const bgApp = useColorModeValue("gray.50", "gray.900");
  const bgSurface = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("blue.600", "blue.300");
  const inactiveLinkColor = useColorModeValue("gray.600", "gray.300");

  // Centralized navigation handler
  const handleNavigation = (path) => {
    navigate(path);
    onClose(); // Automatically closes the mobile drawer when a link is clicked
  };

  const SidebarContent = () => (
    <>
      <Flex h="16" align="center" px="6" borderBottom="1px" borderColor={borderColor} transition="border-color 0.2s ease">
        <Text fontSize="xl" fontWeight="bold" color={textColor}>ProdSuite</Text>
      </Flex>

      <VStack align="stretch" spacing={2} p={4}>
        <Button 
          as={motion.button} whileHover={{ scale: 1.02, x: 2 }} whileTap={{ scale: 0.98 }}
          onClick={() => handleNavigation('/')} 
          variant={location.pathname === '/' ? 'solid' : 'ghost'} colorScheme="blue" 
          color={location.pathname !== '/' ? inactiveLinkColor : undefined} justifyContent="flex-start" leftIcon={<FiUsers />}
        >
          Team Directory
        </Button>
        <Button 
          as={motion.button} whileHover={{ scale: 1.02, x: 2 }} whileTap={{ scale: 0.98 }}
          onClick={() => handleNavigation('/boards')} 
          variant={location.pathname === '/boards' ? 'solid' : 'ghost'} colorScheme="blue" 
          color={location.pathname !== '/boards' ? inactiveLinkColor : undefined} justifyContent="flex-start" leftIcon={<FiTrello />}
        >
          Project Boards
        </Button>
        <Button 
          as={motion.button} whileHover={{ scale: 1.02, x: 2 }} whileTap={{ scale: 0.98 }}
          onClick={() => handleNavigation('/settings')} 
          variant={location.pathname === '/settings' ? 'solid' : 'ghost'} colorScheme="blue" 
          color={location.pathname !== '/settings' ? inactiveLinkColor : undefined} justifyContent="flex-start" leftIcon={<FiSettings />}
        >
          Settings
        </Button>
      </VStack>
    </>
  );

  return (
    <Flex h="100vh" w="100vw" overflow="hidden" bg={bgApp} transition="background-color 0.2s ease">
      <Box w="250px" bg={bgSurface} borderRight="1px" borderColor={borderColor} display={{ base: "none", md: "block" }} transition="background-color 0.2s ease, border-color 0.2s ease">
        <SidebarContent />
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bgSurface}>
          <SidebarContent />
        </DrawerContent>
      </Drawer>

      <Flex direction="column" flex="1" overflow="hidden">
        <Box borderBottom="1px" borderColor={borderColor} bg={bgSurface} transition="background-color 0.2s ease, border-color 0.2s ease">
          <Navbar setUsers={setUsers} onOpenSidebar={onOpen} />
        </Box>

        <Box flex="1" overflowY="auto" p={{ base: 4, md: 8 }}>
          <Box maxW="1200px" mx="auto" h="full">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><UserGrid users={users} setUsers={setUsers} /></PageTransition>} />
                <Route path="/boards" element={<PageTransition><BoardView /></PageTransition>} />
                <Route path="/settings" element={<PageTransition><SettingsView /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;