import { GraphQLError } from 'graphql';
import { stravaService, StravaActivity, StravaAthlete } from '../../../../services/stravaService.js';
import { StravaCredentialsModel } from '../models/StravaModel.js';

export class StravaProvider {
  /**
   * Get the authorization URL for Strava OAuth
   */
  getAuthorizationUrl(state?: string): string {
    return stravaService.getAuthorizationUrl(state);
  }

  /**
   * Handle the OAuth callback from Strava
   */
  async handleOAuthCallback(code: string, userId: string): Promise<boolean> {
    try {
      // Exchange the authorization code for an access token
      const tokenResponse = await stravaService.getAccessToken(code);

      // Check if user already has Strava credentials
      const existingCredentials = await StravaCredentialsModel.findOne({ userId });

      if (existingCredentials) {
        // Update existing credentials
        existingCredentials.accessToken = tokenResponse.access_token;
        existingCredentials.refreshToken = tokenResponse.refresh_token;
        existingCredentials.expiresAt = tokenResponse.expires_at;
        existingCredentials.tokenType = tokenResponse.token_type;
        existingCredentials.stravaId = tokenResponse.athlete?.id;
        await existingCredentials.save();
      } else {
        // Create new credentials
        await StravaCredentialsModel.create({
          userId,
          stravaId: tokenResponse.athlete?.id,
          accessToken: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token,
          expiresAt: tokenResponse.expires_at,
          tokenType: tokenResponse.token_type,
          scope: 'read,activity:read_all,profile:read_all',
        });
      }

      return true;
    } catch (error: any) {
      console.error('Error handling Strava OAuth callback:', error);
      throw new GraphQLError(`Failed to connect Strava account: ${error.message}`);
    }
  }

  /**
   * Check if a user has connected their Strava account
   */
  async isStravaConnected(userId: string): Promise<boolean> {
    try {
      const credentials = await StravaCredentialsModel.findOne({ userId });
      return !!credentials;
    } catch (error: any) {
      console.error('Error checking Strava connection:', error);
      throw new GraphQLError(`Failed to check Strava connection: ${error.message}`);
    }
  }

  /**
   * Disconnect a user's Strava account
   */
  async disconnectStrava(userId: string): Promise<boolean> {
    try {
      const credentials = await StravaCredentialsModel.findOne({ userId });

      if (!credentials) {
        throw new GraphQLError('No Strava account connected');
      }

      // Deauthorize the application from Strava
      await stravaService.deauthorize(credentials.accessToken);

      // Remove the credentials from our database
      await StravaCredentialsModel.deleteOne({ userId });

      return true;
    } catch (error: any) {
      console.error('Error disconnecting Strava:', error);
      throw new GraphQLError(`Failed to disconnect Strava account: ${error.message}`);
    }
  }

  /**
   * Get a valid access token for a user
   * This will refresh the token if it's expired
   */
  private async getValidAccessToken(userId: string): Promise<string> {
    try {
      const credentials = await StravaCredentialsModel.findOne({ userId });

      if (!credentials) {
        throw new GraphQLError('No Strava account connected');
      }

      // Check if the token is expired or about to expire (within 5 minutes)
      const now = Math.floor(Date.now() / 1000);
      const isExpired = credentials.expiresAt <= now + 300; // 5 minutes buffer

      if (isExpired) {
        // Refresh the token
        const tokenResponse = await stravaService.refreshToken(credentials.refreshToken);

        // Update the credentials
        credentials.accessToken = tokenResponse.access_token;
        credentials.refreshToken = tokenResponse.refresh_token;
        credentials.expiresAt = tokenResponse.expires_at;
        await credentials.save();

        return tokenResponse.access_token;
      }

      return credentials.accessToken;
    } catch (error: any) {
      console.error('Error getting valid access token:', error);
      throw new GraphQLError(`Failed to get valid Strava access token: ${error.message}`);
    }
  }

  /**
   * Get the user's Strava athlete profile
   */
  async getAthleteProfile(userId: string): Promise<StravaAthlete> {
    try {
      const accessToken = await this.getValidAccessToken(userId);
      return stravaService.getAthlete(accessToken);
    } catch (error: any) {
      console.error('Error getting Strava athlete profile:', error);
      throw new GraphQLError(`Failed to get Strava athlete profile: ${error.message}`);
    }
  }

  /**
   * Get the user's Strava activities
   */
  async getActivities(
    userId: string,
    page: number = 1,
    perPage: number = 30,
    before?: number,
    after?: number
  ): Promise<StravaActivity[]> {
    try {
      const accessToken = await this.getValidAccessToken(userId);
      return stravaService.getActivities(accessToken, page, perPage, before, after);
    } catch (error: any) {
      console.error('Error getting Strava activities:', error);
      throw new GraphQLError(`Failed to get Strava activities: ${error.message}`);
    }
  }

  /**
   * Get a specific Strava activity
   */
  async getActivity(userId: string, activityId: number): Promise<StravaActivity> {
    try {
      const accessToken = await this.getValidAccessToken(userId);
      return stravaService.getActivity(accessToken, activityId);
    } catch (error: any) {
      console.error('Error getting Strava activity:', error);
      throw new GraphQLError(`Failed to get Strava activity: ${error.message}`);
    }
  }
}

export const stravaProvider = new StravaProvider();
