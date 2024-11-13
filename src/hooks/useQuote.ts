import { QuoteRequest, useOmniston } from "@ston-fi/omniston-sdk-react";
import { useEffect, useState } from "react";
import { SwapAsset } from "./useSwapAssets";
import { Subscription } from "rxjs";

export interface Quote {
  askUnits: number;
  offerUnits: number;
  gasFee: number;
  askSymbol: string;
  offerSymbol: string;
  conversionRate: number;
  quoteId: number;
}

interface QuoteProps {
    quoteRequest: QuoteRequest;
    sendToken: SwapAsset | null;
    receiveToken: SwapAsset | null;
}

type OmnistonQuote = Quote & Record<string, string>;

export interface QuoteResponse {
  quote: Quote | null;
  omnistonQuote: OmnistonQuote | null;
}

export const useQuote = ({
    quoteRequest,
    sendToken,
    receiveToken,
}: QuoteProps): QuoteResponse => {
  const omniston = useOmniston();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [omnistonQuote, setOmnistonQuote] = useState<OmnistonQuote | null>(null);

  useEffect(() => {
    let unsubscribe: Subscription;
    if(omniston && quoteRequest && sendToken && receiveToken) {

      console.log('--quoteRequest',quoteRequest);
      const quoteObserver = omniston.requestForQuote(quoteRequest);

      unsubscribe = quoteObserver.subscribe(omnistonQuote => {
        const askUnits = omnistonQuote.askUnits / Math.pow(10, receiveToken.decimals);
        const offerUnits = omnistonQuote.offerUnits / Math.pow(10, sendToken.decimals);

        // Conversion rate of 1 offerUnit to askUnits
        const conversionRate = askUnits / offerUnits;

        setQuote({
            askUnits: omnistonQuote.askUnits,
            askSymbol: receiveToken.symbol,
            offerUnits: omnistonQuote.offerUnits,
            offerSymbol: sendToken.symbol,
            gasFee: omnistonQuote.params.swap.routes?.[0].gasBudget,
            conversionRate,
            quoteId: omnistonQuote.quoteId
        })
        setOmnistonQuote(omnistonQuote);
      })

      
    }  else {
        setQuote(null);
    }

    return () => {
      unsubscribe && unsubscribe.unsubscribe();
    }

  },[omniston, quoteRequest, sendToken, receiveToken])

  return {
    quote,
    omnistonQuote
  };
};
