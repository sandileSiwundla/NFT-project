import os
import json

def generate_nft_metadata(directory, number_of_nfts):
    os.makedirs(directory, exist_ok=True)
    
    for i in range(number_of_nfts):
        nft_metadata = {
            "id": i,
            "name": f"Urban Snap {i}",
            "description": f"This is a captivating piece of street photography, n.o {i} of street photography, capturing the essence of urban life and the stories hidden in every corner.",
            "image": f"https://coffee-famous-reindeer-467.mypinata.cloud/ipfs/QmZ8antBrQPFjCW3nY7aSpLWZCSeam7cmXBjXkXNqnQCnx//{i}.jpg" 
        }
        
        filename = os.path.join(directory, f"{i}.json")
        
        with open(filename, 'w') as json_file:
            json.dump(nft_metadata, json_file, indent=4)
        print(f"Generated metadata for NFT ID: {i} at {filename}")

if __name__ == "__main__":
    output_directory = "nft_metadata"
    
    number_of_nfts = 10
    
    generate_nft_metadata(output_directory, number_of_nfts)
