export default function HomePage() {
  return (
    <main className="container">
      <h1>Ethereum OG Score</h1>
      <p>Discover how long you've been loyal to Ethereum. Paste your wallet address below:</p>
      <input type="text" placeholder="Enter your Ethereum wallet address..." />
      <button>Check My Score</button>
    </main>
  );
}
