import { useState } from 'react';
import Web3 from 'web3';
import nftContract from './nftContract';
import './app.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateNFT from './CreateNFT';
import LookUpNFT from './LookUpNFT';
import BuyNFT from './BuyNFT';
import Navbar from './Navbar';
import MyButtonIslands from './MyButtonIslands';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [mintAmount, setMintAmount] = useState(1); 
  const [isConnected, setIsConnected] = useState(false); 
  const [mintedNFTs, setMintedNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.requestAccounts();
        setAccounts(accounts);
        const instance = nftContract(web3Instance);
        setContract(instance);
        setIsConnected(true);
        fetchNFTsFromOpenSea(accounts[0]);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Failed to connect to wallet. Please try again.");
      }
    } else {
      console.error('Web3 not found');
      alert("Web3 not found. Please install MetaMask or another Web3 provider.");
    }
  };

  const promptForMintAmount = () => {
    const userAmount = prompt("Enter the number of NFTs you want to mint:", mintAmount);
    const parsedAmount = parseInt(userAmount, 10);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Invalid number of NFTs. Please enter a positive integer.");
    } else {
      setMintAmount(parsedAmount);
    }
  }; 

  const mint = async () => {
    promptForMintAmount();
    try {
      const costPerNFT = Web3.utils.toWei('0.05', 'ether');
      const totalCost = (costPerNFT * mintAmount).toString();
      await contract.methods.mint(accounts[0], mintAmount).send({ from: accounts[0], value: totalCost });
      alert('Your story has been preserved. Never forget.');
      fetchNFTsFromOpenSea(accounts[0]);
    } catch (error) {
      console.error("Minting failed!", error);
    }
  };

  const fetchNFTsFromOpenSea = async (walletAddress) => {
    const contractAddress = '0x938fC3B6DA9801D01bA292eA1784Da79113ce4e6';
    const apiUrl = `https://testnets-api.opensea.io/api/v1/assets?owner=${walletAddress}&asset_contract_address=${contractAddress}&order_direction=desc`;

    try {
      setIsLoading(true);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.assets) {
        setMintedNFTs(data.assets);
        console.log("Fetched NFTs:", data.assets);
      } else {
        console.error("Error fetching NFTs:", data);
      }
    } catch (error) {
      console.error("Failed to fetch NFTs from OpenSea", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar 
          isConnected={isConnected} 
          accounts={accounts} 
          connectWallet={connectWallet} 
        />
        <Routes>
          <Route path="/create" element={<CreateNFT />} />
          <Route path="/look-up" element={<LookUpNFT />} />
          <Route path="/buy" element={<BuyNFT />} />
          <Route path="/" element={
            <div className="home-page fade-in">
              <div className="hero-section fade-in">
                <h1>Everyday Struggles</h1>
                <p className="hero-tagline">Preserved forever on the blockchain</p>
                <div className="main-tagline">Never Forget</div>
              </div>

              <MyButtonIslands />

              <div className="mint-action fade-in">
                {isConnected ? (
                  <button className="mint-btn" onClick={mint}>Mint Your Story</button>
                ) : (
                  <button className="connect-btn" onClick={connectWallet}>Connect Wallet</button>
                )}
              </div>
              
              {isLoading ? (
                <div className="loading-placeholder fade-in">
                  Fetching your NFTs...
                </div>
              ) : (
                mintedNFTs.length > 0 && (
                  <div className="minted-nfts-section fade-in">
                    <h3>Your Preserved Stories</h3>
                    <p className="section-tagline">Moments captured forever. Never forget.</p>
                    <div className="nft-grid">
                      {mintedNFTs.map((nft) => (
                        <div key={nft.token_id} className="nft-card">
                          <img src={nft.image_url} alt={nft.name} />
                          <p>{nft.name || 'Untitled Struggle'}</p>
                          <div className="nft-tagline">Never Forget</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          } />
        </Routes>
        
        <footer className="app-footer fade-in">
          <div className="footer-tagline">Never Forget</div>
          <p>Preserving everyday struggles on the blockchain</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
