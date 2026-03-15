import { Flex, Grid, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
// import { USERS } from "../../../dummy/dummy";
import UserCard from "./UserCard.jsx";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../App.jsx";

const UserGrid = ({ users, setUsers }) => {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(BASE_URL + "/friends")
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }
        setUsers(data);

      } catch (error) {
        console.error(error)
      } finally {
        setisLoading(false);
      }
    }
    getUsers();
  }, [setUsers]);


  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >

        {users.map((user) => (
          <UserCard key={user.id} user={user} setUsers={setUsers} />
        ))}
      </Grid>

      {isLoading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {!isLoading && users.length === 0 && (
        <Flex justifyContent={"center"}>
          <Text fontSize="xl" color={useColorModeValue("gray.600", "gray.400")}>
            No team members found.
          </Text>
        </Flex>
      )}
    </>
  )
}

export default UserGrid