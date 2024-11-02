import React, { useState } from 'react';
import Web3 from 'web3';

function BuyNFT() {
  const umkhontoContract = {
    abi: [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "ApprovalForAll",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "baseExtension",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "baseURI",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "cost",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "getApproved",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          }
        ],
        "name": "isApprovedForAll",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "maxMintAmount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "maxSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_mintAmount",
            "type": "uint256"
          }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "ownerOf",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bool",
            "name": "_state",
            "type": "bool"
          }
        ],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "paused",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_newBaseExtension",
            "type": "string"
          }
        ],
        "name": "setBaseExtension",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_newBaseURI",
            "type": "string"
          }
        ],
        "name": "setBaseURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_newmaxMintAmount",
            "type": "uint256"
          }
        ],
        "name": "setmaxMintAmount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
          }
        ],
        "name": "supportsInterface",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "tokenByIndex",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "tokenURI",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_owner",
            "type": "address"
          }
        ],
        "name": "walletOfOwner",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }
    ]
  };
  
  const totalImages = 10; // Change this to the total number of images you have
  const baseURL = 'https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/QmZ8antBrQPFjCW3nY7aSpLWZCSeam7cmXBjXkXNqnQCnx/';

  // Generate an array of image URLs based on the total number of images
  const imageUrls = Array.from({ length: totalImages }, (_, index) => `${baseURL}${index}.jpg`);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleBuyClick = async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            const scrollSepoliaChainId = '0x8274f';

            if (chainId !== scrollSepoliaChainId) {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: scrollSepoliaChainId }],
                });
            }

            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            const nftContract = new web3.eth.Contract(umkhontoContract.abi, "0xa03bc309f1ad41bb8b6250f00f44cef08bbb18ef"); 

            console.log('Contract ABI:', umkhontoContract.abi);

            const mintAmount = 1; 
            const value = web3.utils.toWei((0.001 * mintAmount).toString(), 'ether');

            const existingTokenId = 1; 
            let tokenURI;

            try {
                tokenURI = await nftContract.methods.tokenURI(existingTokenId).call();
                console.log(`Token URI for ID ${existingTokenId}:`, tokenURI);

                const response = await fetch(tokenURI);
                const metadata = await response.json();
                console.log('Existing NFT Metadata:', metadata);
                alert(`NFT already exists! Token ID: ${existingTokenId}, Metadata: ${JSON.stringify(metadata)}`);
                return;
            } catch (err) {
                console.log(`Token ID ${existingTokenId} does not exist. Proceeding to mint...`);
            }

            const result = await nftContract.methods.mint(accounts[0], mintAmount).send({ from: accounts[0], value });
            console.log('Minted NFT:', result);

            if (result.events && result.events.Transfer) {
                const tokenId = result.events.Transfer.returnValues.tokenId;

                const newTokenURI = await nftContract.methods.tokenURI(tokenId).call();
                console.log('New Token URI:', newTokenURI);

                // Fetch metadata for the new NFT
                const response = await fetch(newTokenURI);
                const metadata = await response.json();
                console.log('New NFT Metadata:', metadata);

                // Display the token ID and metadata in an alert or update UI
                alert(`Successfully minted NFT! Token ID: ${tokenId}, Metadata: ${JSON.stringify(metadata)}`);
            } else {
                console.error('Transfer event not found in the transaction result.');
                alert('Minting succeeded, but no Transfer event was emitted.');
            }

        } catch (error) {
            console.error('Error connecting to MetaMask or minting:', error);
            alert('An error occurred. Please check the console for details.');
        }
    } else {
        alert('MetaMask is not installed. Please install it to use this feature.');
    }
};




  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Buy NFT</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {imageUrls.map((url, index) => (
          <div 
            key={index} 
            style={{ 
              margin: '10px', 
              position: 'relative', 
              width: '220px', 
              height: '220px', 
              overflow: 'hidden' 
            }}
          >
            <button 
              onClick={() => handleImageClick(index)} 
              style={{ 
                all: 'unset', // Resets all button styles
                cursor: 'pointer', 
                width: '100%', 
                height: '100%', 
                position: 'relative', 
                borderRadius: '15px', 
                overflow: 'hidden' 
              }}
            >
              <img 
                src={url} 
                alt={`NFT ${index}`} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  borderRadius: '15px' 
                }} 
              />
              <p style={{ 
                position: 'absolute', 
                bottom: '5px', 
                left: '5px', 
                color: 'white', 
                backgroundColor: 'rgb(10, 3, 79)', 
                padding: '5px',
                borderRadius: '5px' 
              }}>
                NFT {index}
              </p>
            </button>
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <div 
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgb(10, 3, 79)', // Semi-transparent background
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
          }}
          onClick={closeModal} // Close modal when clicking outside
        >
          <div style={{
            backgroundColor: 'gray',
            padding: '20px',
            borderRadius: '10px',
            width: '70%', // Adjust width to give space for text
            height: '60%', // Fixed height for the modal
            display: 'flex',
            alignItems: 'center',
          }}>
            <img 
              src={imageUrls[selectedImage]} 
              alt={`NFT ${selectedImage}`} 
              style={{ 
                width: '50%', // Take half of the modal width
                height: 'auto', 
                borderRadius: '10px',
              }} 
            />
            <div style={{ padding: '20px', width: '50%' }}>
              <h2>NFT {selectedImage}</h2>
              <p style={{ textAlign: 'left' }}>
                This NFT represents a unique moment in street photography, capturing the vibrancy of urban life and the stories within.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <button 
                  onClick={closeModal} 
                  style={{ 
                    padding: '10px 20px', 
                    borderRadius: '25px', 
                    backgroundColor: '#f44336', // Red for close
                    color: 'white', 
                    border: 'none', 
                    cursor: 'pointer' 
                  }}
                >
                  Close
                </button>
                <button 
                  onClick={handleBuyClick} 
                  style={{ 
                    padding: '10px 20px', 
                    borderRadius: '25px', 
                    backgroundColor: '#4CAF50', // Green for buy
                    color: 'white', 
                    border: 'none', 
                    cursor: 'pointer' 
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyNFT;
