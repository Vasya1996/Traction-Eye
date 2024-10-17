// ReferralResponse interface
export interface ReferralResponse {
    referral_id: string;
    net_worth: number;
    wallet: string; // Wallets as a string
  }
  
  // UserResponse interface
  export interface UserResponse {
    user_id: string;
    net_worth: number;
    social_score: number;
    referral_link: string;
    referrals: ReferralResponse[];  // Array of ReferralResponse
    created_at: Date;  // Assuming created_at is always provided
    updated_at?: Date;  // Optional field, might be undefined
  }
  