import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const AppBar = () => {
  return (
    <div className="flex justify-between border-b pb-2 pt-2">
      <div className="text-2xl pl-4 flex justify-center pt-4">Tesior</div>
      <div className="text-xl pr-4 pb-2 pt-2">
        <WalletMultiButton />
      </div>
    </div>
  );
};