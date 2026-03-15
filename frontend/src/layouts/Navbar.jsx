import { Flex, Box, Button, useColorMode, useColorModeValue, Text, Spacer, IconButton } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import CreateUserModal from "../features/users/components/CreateUserModal.jsx";

// We added onOpenSidebar as a prop to trigger the mobile drawer
export default function Navbar({ setUsers, onOpenSidebar }) {
  const { colorMode, toggleColorMode } = useColorMode();
  
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Flex 
      as="nav" 
      align="center" 
      w="100%" 
      px={6} 
      py={3} 
      bg={bg}
      transition="background-color 0.2s ease" // Smooth theme transition
    >
      {/* Hamburger Menu (Mobile Only) */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpenSidebar}
        variant="ghost"
        aria-label="open menu"
        icon={<FiMenu />}
        mr={4}
      />

      <Box>
        <Text fontSize="lg" fontWeight="semibold" color={textColor}>
          Global Workspace
        </Text>
      </Box>

      <Spacer />

      <Flex align="center" gap={4}>
        <Button
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleColorMode}
          size="sm"
          variant="outline"
          borderRadius="full"
          borderColor={borderColor}
          overflow="hidden"
          w="85px"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={colorMode}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {colorMode === "light" ? "🌙 Dark" : "☀️ Light"}
            </motion.div>
          </AnimatePresence>
        </Button>
        <CreateUserModal setUsers={setUsers} />
      </Flex>
    </Flex>
  );
}