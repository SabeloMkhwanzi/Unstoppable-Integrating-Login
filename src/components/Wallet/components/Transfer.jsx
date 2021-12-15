import { CreditCardOutlined } from "@ant-design/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import { Input, notification } from "antd";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import AddressInput from "../../AddressInput";
import AssetSelector from "./AssetSelector";

// const styles = {
//   card: {
//     alignItems: "center",
//     width: "100%",
//   },
//   header: {
//     textAlign: "center",
//     fontWeight: "10px",
//   },
//   input: {
//     width: "100%",
//     outline: "none",
//     fontSize: "16px",
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//     textverflow: "ellipsis",
//     appearance: "textfield",
//     color: "#041836",
//     fontWeight: "700",
//     border: "none",
//     backgroundColor: "transparent",
//   },
//   select: {
//     marginTop: "20px",
//     display: "flex",
//     alignItems: "center",
//   },
//   textWrapper: { maxWidth: "80px", width: "100%" },
//   row: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     flexDirection: "row",
//   },
// };

function Transfer() {
  const { Moralis } = useMoralis();
  const [receiver, setReceiver] = useState();
  const [asset, setAsset] = useState();
  const [tx, setTx] = useState();
  const [amount, setAmount] = useState();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    asset && amount && receiver ? setTx({ amount, receiver, asset }) : setTx();
  }, [asset, amount, receiver]);

  const openNotification = ({ message, description }) => {
    notification.open({
      placement: "bottomRight",
      message,
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  async function transfer() {
    const { amount, receiver, asset } = tx;

    let options = {};

    switch (asset.token_address) {
      case "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee":
        options = {
          native: "native",
          amount: Moralis.Units.ETH(amount),
          receiver,
          awaitReceipt: false,
        };
        break;
      default:
        options = {
          type: "erc20",
          amount: Moralis.Units.Token(amount, asset.decimals),
          receiver,
          contractAddress: asset.token_address,
          awaitReceipt: false,
        };
    }

    setIsPending(true);
    const txStatus = await Moralis.transfer(options);

    txStatus
      .on("transactionHash", (hash) => {
        openNotification({
          message: "New Transaction",
          description: `${hash}`,
        });
        console.log("New Transaction", hash);
      })
      .on("receipt", (receipt) => {
        openNotification({
          message: "New Receipt",
          description: `${receipt.transactionHash}`,
        });
        console.log("New Receipt: ", receipt);
        setIsPending(false);
      })
      .on("error", (error) => {
        openNotification({
          message: "Error",
          description: `${error.message}`,
        });
        console.error(error);
        setIsPending(false);
      });
  }

  return (
    <Box>
      <Box>
        <Text textAlign="center">Transfer Assets</Text>
      </Box>

      <Box>
        <Box>
          <Text strong>Address:</Text>
        </Box>
        <AddressInput autoFocus onChange={setReceiver} />
      </Box>

      <Box>
        <Box>
          <Text strong>Amount:</Text>
        </Box>
        <Input
          size="large"
          prefix={<CreditCardOutlined />}
          onChange={(e) => {
            setAmount(`${e.target.value}`);
          }}
        />
      </Box>

      <Box>
        <Box>
          <Text strong>Asset:</Text>
        </Box>
        <AssetSelector setAsset={setAsset} style={{ width: "100%" }} />
      </Box>

      <Button
        mx={14}
        justifyContent="center"
        borderColor="#161853"
        borderRadius={2}
        type="primary"
        size="large"
        loading={isPending}
        marginTop="25px"
        onClick={() => transfer()}
        bgColor="#292C6D"
        color="#FAEDF0"
        // disabled={!tx}
        h={12}
        w={300}
      >
        Transfer
      </Button>
    </Box>
  );
}

export default Transfer;
