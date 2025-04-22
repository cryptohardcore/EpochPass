export default function HomePage() {
  return (
    <main className="container">
      <img src="/vitalik-frog.png" alt="Vitalik Frog" className="frog-image" />
      <h1>Ethereum OG Score</h1>
      <p>Discover how long you've been using Ethereum.</p>
      <div className="input-group">
        <input type="text" placeholder="Enter your Ethereum wallet address..." />
        <button className="connect-btn">Connect Wallet</button>
      </div>
    </main>
  );
}
