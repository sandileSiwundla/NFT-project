
const walletConnect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Get the provider
      const provider = new window.ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Specify the transaction details (e.g., sending a small amount of Ether as a placeholder)
      const transactionDetails = {
        to: 'YOUR_CONTRACT_ADDRESS', // Replace with your contract address
        value: window.ethers.utils.parseEther('0.01'), // Adjust the amount as needed
      };

      try {
        const transaction = await signer.sendTransaction(transactionDetails);
        console.log('Transaction:', transaction);
        alert(`Transaction sent! Hash: ${transaction.hash}`);
      } catch (error) {
        console.error('Transaction error:', error);
        alert('Transaction failed!');
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  export default walletConnect;