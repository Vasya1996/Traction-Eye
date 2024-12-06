import ReactGA from "react-ga4";

const CATEGORY = "User";
const LABEL = "Unique User";

class GoogleAnalytics {

    init({ user_id, username }: { user_id: number, username: string }) {
        ReactGA.set({ 
            user_id: `user_id: ${user_id} | username: ${username}`, 
            username,
        });
        ReactGA.gtag('set', 'user_properties', { username }); 
    }

    inviteFriend() {
        ReactGA.event({
            action: "Invite friend",
            category: CATEGORY,
            label: LABEL
        });
    }

    sharePortfolio() {
        ReactGA.event({
            action: "Share portfolio",
            category: CATEGORY,
            label: LABEL
        });
    }

    openProfile() {
        ReactGA.event({
            action: "Open Profile page",
            category: CATEGORY,
            label: LABEL
        });
    }

    swipeOrContinueButton() {
        ReactGA.event({
            action: "Swipe or Continue button",
            category: CATEGORY,
            label: LABEL
        });
    }

    openConnectWallet() {
        ReactGA.event({
            action: "Open Connect wallet UI",
            category: CATEGORY,
            label: LABEL
        });
    }

    openedMiniAppWithRefCode() {
        ReactGA.event({
            action: "Opened Mini App with Ref code",
            category: CATEGORY,
            label: LABEL
        });
    }

    disconnectWallet() {
        ReactGA.event({
            action: "Disconnect wallet",
            category: CATEGORY,
            label: LABEL
        });
    }

    openNFTsListPage() {
        ReactGA.event({
            action: "Open NFTs List page",
            category: CATEGORY,
            label: LABEL
        });
    }

    openNFTPage() {
        ReactGA.event({
            action: "Open NFT page",
            category: CATEGORY,
            label: LABEL
        });
    }

    openAssetPage() {
        ReactGA.event({
            action: "Open asset page",
            category: CATEGORY,
            label: LABEL
        });
    }

    socialCapClick() {
        ReactGA.event({
            action: "Social cap click",
            category: CATEGORY,
            label: LABEL
        });
    }

    openMiniApp() {
        ReactGA.event({
			category: CATEGORY,
			action: "Opened Mini App",
			label: LABEL
		});
    }

    chartUsage() {
        ReactGA.event({
			category: CATEGORY,
			action: "Chart usage",
			label: LABEL
		});
    }

}

export default new GoogleAnalytics();
