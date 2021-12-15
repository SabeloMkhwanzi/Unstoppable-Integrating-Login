import { Text } from "@chakra-ui/react";
import { useNativeBalance } from "react-moralis";

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props);

  return (
    <div style={{ textAlign: "center", whiteSpace: "nowrap" }}>
      <Text color="#EC255A">{balance.formatted}</Text>
    </div>
  );
}

export default NativeBalance;
