export interface Session {
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export enum SessionProvider {
  EMAIL = "email",
  GOOGLE = "google",
  APPLE = "apple",
}

export interface SupabaseUser {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    avatar_url?: string;
    email?: string;
    email_verified?: boolean;
    full_name?: string;
    iss?: string;
    name?: string;
    phone_verified?: boolean;
    picture?: string;
    provider_id?: string;
    sub?: string;
  };
  identities: {
    id: string;
    user_id: string;
    identity_data: {
      email?: string;
      sub?: string;
      email_verified?: boolean;
      phone_verified?: boolean;
    };
    provider: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  email: string;
  phoneNumber: string | null;
  name: string | null;
  timezone: string;
  isGlobalAdmin: boolean;
  isSupportAgent: boolean;
  profilePhotoUrl: string | null;
  profilePhotoThumbnailUrl: string | null;
  emailVerified: string | null;
  verificationCodeExpires: string | null;
  didFinishOnboarding: boolean;
  isSubscribed: boolean;
  trialEndsAt: string | null;
  gracePeriodStartDate: string | null;
  gracePeriodEndDate: string | null;
  canAccessDevFeatures: boolean;
  hasPassword: boolean;
  metadata: {
    onboarding: {
      hasStruggledWithHabits: boolean;
      categories: string[];
      isMotivatedByStakes: boolean;
      preferredWager: string;
      accountabilityFriendName: string;
    };
  };

  // Auth data
  session?: Session;
  token?: string;
  sessionProvider?: SessionProvider;
  authProviders?: SessionProvider[];
  supabaseUser?: SupabaseUser;
  verificationCode: string | null;
  resetCode: string | null;
  requiresVerification?: boolean | null;
  verificationData?: VerificationData | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  timezone: string;
}

export interface RegisterResponse {
  message: string;
  userId: string;
  data: {
    verificationCodeExpires: string;
  };
}

export interface VerificationData {
  message: string;
  userId: string;
  email?: string;
  verificationCodeExpires?: string;
}

export interface VerifyCodeCredentials {
  email: string;
  code: string;
}

export interface AuthErrorResponse {
  success?: boolean;
  error: string;
  status: number;
  verificationData?: VerificationData;
}
