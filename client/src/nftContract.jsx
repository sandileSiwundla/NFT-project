import Web3 from 'web3';
import umkhontoContract from './contracts/umkhonto.json'; 

const nftContract = web3 => {
    return new web3.eth.Contract(
        umkhontoContract,  
        // "0x9b291177d53adebebd56786a6cb1b24bbcc4847e"
        // "0xa03bc309f1ad41bb8b6250f00f44cef08bbb18ef"
        "0x15ca852f43c4e7651b166b5a019aab1b8e800fb2"
    );
}

export default nftContract;
