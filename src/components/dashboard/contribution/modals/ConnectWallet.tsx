import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Wallet from "../../../../Assets/svg/dashboard/contribution/wallet.svg";
import BinanceWallet from "../../../../Assets/svg/dashboard/contribution/binance.svg";
import MetaMaskWallet from "../../../../Assets/svg/dashboard/contribution/metamask.svg";
import CoinbaseWallet from "../../../../Assets/svg/dashboard/contribution/coinbase.svg";
import TrustWallet from "../../../../Assets/svg/dashboard/contribution/trust.svg";
import TrezorWallet from "../../../../Assets/svg/dashboard/contribution/trezor.svg";
import EdgeWallet from "../../../../Assets/svg/dashboard/contribution/edge.svg";
import KrakenWallet from "../../../../Assets/svg/dashboard/contribution/kraken.svg";

interface ConnectWalletModalProps {
  isOpen: boolean;
  onConnect?: () => void;
  onClose: () => void;
}

const ConnectWallet: React.FC<ConnectWalletModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showSecondModal, setShowSecondModal] = useState(false);

  const handleConnectClick = () => {
    setShowSecondModal(true);
  };

  const handleSecondModalClose = () => {
    setShowSecondModal(false);
    onClose();
  };

  if (!isOpen && !showSecondModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* First Modal */}
      {!showSecondModal && (
        <div className="relative flex h-[373px] w-[90%] max-w-[497px] flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg">
          <button
            onClick={onClose}
            className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#72889D1A] text-[#430280] transition-transform duration-300 hover:scale-110"
          >
            <IoMdClose size={30} />
          </button>

          <div className="flex flex-col items-center">
            <div className="mb-4 flex h-[129px] w-[129px] items-center justify-center rounded-full bg-[#72889D1A]">
              <img src={Wallet} alt="Wallet Logo" className="h-12 w-12" />
            </div>

            <h2 className="mb-2 text-xl font-bold text-text1">
              Connect your wallet to fund your savings
            </h2>

            <button
              onClick={handleConnectClick}
              className="mt-4 w-[50%] rounded-lg bg-[#440080] py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Connect
            </button>
          </div>
        </div>
      )}

      {/* Second Modal */}
      {showSecondModal && (
        <div className="relative flex w-[90%] max-w-[600px] flex-col rounded-lg bg-white p-6 shadow-lg">
          {/* Back Button */}
          <button
            onClick={handleSecondModalClose}
            className="absolute left-5 top-5 flex items-center gap-2 text-[#430280] transition-transform duration-300 hover:scale-110"
          >
            <IoIosArrowBack size={20} />
          </button>

          {/* Header */}
          <h2 className="text-center text-xl font-bold text-[#440080]">
            Fund from External Wallet
          </h2>
          <p className="mt-2 text-center text-sm font-medium text-gray-500">
            Connect a Wallet
          </p>

          {/* Wallet Options */}
          <div className="flex flex-col">
            <div className="mt-6 grid grid-cols-2 gap-4">
              {/* Installed Wallets */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                  Installed Wallet
                </h3>
                <div className="flex flex-col gap-3">
                  <button className="flex items-center justify-between rounded-lg border border-gray-300 px-4 py-2 shadow-sm hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <img
                        src={BinanceWallet}
                        alt="Binance Wallet"
                        className="h-6"
                      />
                      <span className="text-sm font-medium">
                        Binance Wallet
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-[#440080]">
                      Connect
                    </span>
                  </button>
                  <button className="flex items-center justify-between rounded-lg border border-gray-300 px-4 py-2 shadow-sm hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <img
                        src={MetaMaskWallet}
                        alt="MetaMask Wallet"
                        className="h-6"
                      />
                      <span className="text-sm font-medium">
                        MetaMask Wallet
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-[#440080]">
                      Connect
                    </span>
                  </button>
                  <button className="flex items-center justify-between rounded-lg border border-gray-300 px-4 py-2 shadow-sm hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <img
                        src={CoinbaseWallet}
                        alt="Coinbase Wallet"
                        className="h-6"
                      />
                      <span className="text-sm font-medium">
                        Coinbase Wallet
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-[#440080]">
                      Connect
                    </span>
                  </button>
                  <button className="flex items-center justify-between rounded-lg border border-gray-300 px-4 py-2 shadow-sm hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <img
                        src={TrustWallet}
                        alt="Trust Wallet"
                        className="h-6"
                      />
                      <span className="text-sm font-medium">Trust Wallet</span>
                    </div>
                    <span className="text-sm font-semibold text-[#440080]">
                      Connect
                    </span>
                  </button>
                </div>
              </div>
              {/* Recommended Wallets */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                  Recommended Wallet
                </h3>
                <div className="flex flex-col gap-3">
                  <button className="flex items-center justify-between rounded-lg border border-gray-300 px-4 py-2 shadow-sm hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <img
                        src={TrezorWallet}
                        alt="Trezor Wallet"
                        className="h-6"
                      />
                      <span className="text-sm font-medium">Trezor Wallet</span>
                    </div>
                    <span className="text-sm font-semibold text-[#440080]">
                      Connect
                    </span>
                  </button>
                  <button className="flex items-center justify-between rounded-lg border border-gray-300 px-4 py-2 shadow-sm hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <img src={EdgeWallet} alt="Edge Wallet" className="h-6" />
                      <span className="text-sm font-medium">Edge Wallet</span>
                    </div>
                    <span className="text-sm font-semibold text-[#440080]">
                      Connect
                    </span>
                  </button>
                  <button className="flex items-center justify-between rounded-lg border border-gray-300 px-4 py-2 shadow-sm hover:bg-gray-100">
                    <div className="flex items-center gap-2">
                      <img
                        src={KrakenWallet}
                        alt="Kraken Wallet"
                        className="h-6"
                      />
                      <span className="text-sm font-medium">Kraken Wallet</span>
                    </div>
                    <span className="text-sm font-semibold text-[#440080]">
                      Connect
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* Info Section */}
            <div className="mt-6 hidden rounded-lg bg-[#440080] p-4 text-white">
              <h3 className="mb-2 text-sm font-semibold">
                How does a cryptocurrency wallet work?
              </h3>
              <ul className="text-xs">
                <li className="mb-1">
                  <strong>It’s not a bank account:</strong> A cryptocurrency
                  wallet is a digital tool that allows you to store, send, and
                  receive cryptocurrencies.
                </li>
                <li>
                  <strong>It holds your keys:</strong> The wallet holds your
                  private keys, which are unique codes that give you access to
                  your cryptocurrency.
                </li>
              </ul>
              <button className="mt-4 w-full rounded-lg bg-white py-2 text-sm font-semibold text-[#440080]">
                Get wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
