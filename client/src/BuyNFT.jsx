import React, { useState } from 'react';
import Web3 from 'web3';
import './BuyNFT.css';
import umkhontoABI from './contracts/umkhonto.json';
function BuyNFT() {
  
  
  const totalImages = 10;
  const baseURL = 'https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/QmZ8antBrQPFjCW3nY7aSpLWZCSeam7cmXBjXkXNqnQCnx/';
  const imageUrls = Array.from({ length: totalImages }, (_, index) => `${baseURL}${index}.jpg`);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleBuyClick = async () => {
    if (typeof window.ethereum !== 'undefined') {
        setIsLoading(true);
        try {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await web3.eth.getAccounts();

            const chainId = await web3.eth.getChainId();
            const sepoliaChainId = 0xaa36a7;

            if (chainId !== sepoliaChainId) {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: `0x${sepoliaChainId.toString(16)}` }],
                });
            }

            const nftContract = new web3.eth.Contract(
                umkhontoABI,
                "0xfcdb2ca535d8004eb00dc39f5b62c9df4d053916"
            );

            const mintAmount = 1;
            const value = web3.utils.toWei((0.01 * mintAmount).toString(), 'ether');
            const recipient = accounts[0];

            const result = await nftContract.methods.mint(recipient, mintAmount).send({
                from: recipient,
                value: value,
            });

            console.log('Minted NFT:', result);

            if (result.events && result.events.Transfer) {
                const tokenId = result.events.Transfer.returnValues.tokenId;
                alert(`Successfully minted NFT! Token ID: ${tokenId}\nNever forget this moment.`);
            } else {
                alert('Minting succeeded, but no Transfer event was emitted.');
            }

            closeModal();

        } catch (error) {
            console.error('Error while connecting to MetaMask or minting:', error);
            alert('An error occurred. Please check the console for details.');
        } finally {
            setIsLoading(false);
        }
    } else {
        alert('MetaMask is not installed. Please install it to mint NFTs.');
    }
  };

  return (
    <div className="buy-nft-container">
      <div className="buy-nft-header">
        <h1>Discover Stories</h1>
        <p className="tagline">Own a piece of real human experience. Never forget.</p>
      </div>

      <div className="nft-gallery">
        {imageUrls.map((url, index) => (
          <div key={index} className="nft-gallery-item">
            <button 
              onClick={() => handleImageClick(index)} 
              className="nft-image-button"
            >
              <img 
                src={url} 
                alt={`Everyday Struggle ${index}`} 
                className="nft-gallery-image" 
              />
              <div className="nft-overlay">
                <span className="nft-number">Story #{index}</span>
                <span className="view-details">View Details</span>
              </div>
            </button>
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image-section">
              <img 
                src={imageUrls[selectedImage]} 
                alt={`Everyday Struggle ${selectedImage}`} 
                className="modal-image" 
              />
            </div>
            
            <div className="modal-info-section">
              <div className="modal-header">
                <h2>Everyday Struggle #{selectedImage}</h2>
                <p className="modal-tagline">Never Forget</p>
              </div>
              
              <div className="modal-description">
                <h3>The Story</h3>
                <p>
                  This NFT captures a raw, authentic moment from daily life—a story of resilience, 
                  struggle, or quiet triumph. Each piece represents real human experience preserved 
                  forever on the blockchain.
                </p>
                <div className="nft-details">
                  <div className="detail-item">
                    <span className="detail-label">Collection:</span>
                    <span className="detail-value">Everyday Struggles</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value">0.01 ETH</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Blockchain:</span>
                    <span className="detail-value">Ethereum Sepolia</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  onClick={closeModal} 
                  className="btn btn-secondary"
                  disabled={isLoading}
                >
                  Close
                </button>
                <button 
                  onClick={handleBuyClick} 
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Minting...' : 'Preserve This Story'}
                </button>
              </div>

              <div className="modal-footer">
                <p>By purchasing this NFT, you help preserve real human stories forever.</p>
              </div>
            </div>

            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyNFT;
