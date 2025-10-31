import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { useDeleteUser, useInsertUser, useUsers } from "@/lib/db-context";

export default function Temp() {
  const users = useUsers();
  const insertUser = useInsertUser();
  const deleteUser = useDeleteUser();

  return (
    <Center className="flex-1 gap-4 p-6">
      <Button
        onPress={async () => {
          await insertUser({
            name: "random" + Math.floor(Math.random() * 100),
            age: Math.floor(Math.random() * 100),
            email: `random${Math.floor(Math.random() * 100)}@example.com`,
          });
        }}
      >
        <ButtonText>Add random user</ButtonText>
      </Button>

      {!users || users.length === 0 ? (
        <Text>No users yet</Text>
      ) : (
        users.map((item) => (
          <HStack key={item.id}>
            <Text>{item.email}</Text>
            <Button onPress={() => deleteUser(item.id)}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </HStack>
        ))
      )}
    </Center>
  );
}
