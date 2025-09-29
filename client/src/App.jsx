import { useState } from 'react';
import Web3 from 'web3';
import nftContract from './nftContract';
import './app.css'; 
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

import CreateNFT from './CreateNFT';
import LookUpNFT from './LookUpNFT';
import BuyNFT from './BuyNFT';

// Define Navbar component outside of App
function Navbar({ isConnected, accounts, connectWallet }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Umkhonto</div>
      <ul className="navbar-links">
        <li><Link to="/create">Create NFT</Link></li>
        <li><Link to="/look-up">Look Up NFT</Link></li>
        <li><Link to="/buy">Buy NFT</Link></li>
        <li>
          {!isConnected ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <span className="connection-status">Connected: {accounts[0]?.slice(0, 6)}...{accounts[0]?.slice(-4)}</span>
          )}
        </li>
      </ul>
    </nav>
  );
}

// Define MyButtonIslands component outside of App
function MyButtonIslands() {
  const navigate = useNavigate();

  return (
    <div className="button-container">
      <div className="button-island" onClick={() => navigate('/create')}>
        <h2>Create NFT</h2>
        <p>Start creating your own NFTs by uploading your digital art, music, or other collectibles!</p>
      </div>
      <div className="button-island" onClick={() => navigate('/buy')}>
        <h2>Buy NFT</h2>
        <p>Browse available NFTs and make purchases securely using cryptocurrency.</p>
      </div>
    </div>
  );
}

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [mintAmount, setMintAmount] = useState(1); 
  const [isConnected, setIsConnected] = useState(false); 
  const [mintedNFTs, setMintedNFTs] = useState([]);

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
      alert('Minting successful!');
      fetchNFTsFromOpenSea(accounts[0]);
    } catch (error) {
      console.error("Minting failed!", error);
    }
  };

  const fetchNFTsFromOpenSea = async (walletAddress) => {
    const contractAddress = '0x938fC3B6DA9801D01bA292eA1784Da79113ce4e6';
    const apiUrl = `https://testnets-api.opensea.io/api/v1/assets?owner=${walletAddress}&asset_contract_address=${contractAddress}&order_direction=desc`;

    try {
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
            <div className="home-page">
              <h1>Everyday Struggles</h1>
              <p>Stories preserved as digital artifacts</p>
              <MyButtonIslands />
              
              {mintedNFTs.length > 0 && (
                <div className="minted-nfts-section">
                  <h3>Your Minted Stories</h3>
                  <div className="nft-grid">
                    {mintedNFTs.map((nft) => (
                      <div key={nft.token_id} className="nft-card">
                        <img src={nft.image_url} alt={nft.name} />
                        <p>{nft.name || 'Untitled Struggle'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;