import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function WalletLoyaltyChecker() {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function checkLoyalty() {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/check-loyalty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching loyalty info:", error);
      setResult({ error: "Failed to fetch loyalty data." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-semibold">🔍 ETH Loyalty Checker</h1>
          <Input
            placeholder="Enter wallet address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          />
          <Button onClick={checkLoyalty} disabled={loading || !wallet}>
            {loading ? "Checking..." : "Check Loyalty"}
          </Button>

          {result && (
            <div className="space-y-2 pt-4">
              {result.error ? (
                <p className="text-red-600 font-medium">{result.error}</p>
              ) : (
                <>
                  <p><strong>Wallet:</strong> {wallet}</p>
                  <p><strong>First Interaction:</strong> {result.firstInteraction}</p>
                  <p><strong>Base Points:</strong> {result.basePoints}</p>
                  <p><strong>Badge:</strong> {result.badge}</p>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
