export default function HomePage() {
  return (
    <main className="container">
      <img src="/vitalik-frog.png" alt="Vitalik Frog" className="frog-image" />
      <h1>Ethereum OG Score</h1>
      <p>Discover how long you've been using Ethereum.</p>
      <input type="text" placeholder="Enter your Ethereum wallet address..." />
      <div className="button-group">
        <button className="check-btn">Check Score</button>
        <button className="connect-btn">Connect Wallet to Mint NFT</button>
      </div>
    </main>
  );
}
