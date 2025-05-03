import axios from 'axios';
import querystring from 'querystring';

export interface StravaTokenResponse {
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_at: number;
  expires_in: number;
  athlete?: any;
}

export interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  start_date: string;
  start_date_local: string;
  timezone: string;
  start_latlng: [number, number];
  end_latlng: [number, number];
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: {
    id: string;
    summary_polyline: string;
    polyline?: string;
  };
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  gear_id: string;
  average_speed: number;
  max_speed: number;
  average_watts: number;
  kilojoules: number;
  device_watts: boolean;
  has_heartrate: boolean;
  average_heartrate?: number;
  max_heartrate?: number;
}

export interface StravaAthlete {
  id: number;
  username: string;
  resource_state: number;
  firstname: string;
  lastname: string;
  bio: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: boolean;
  summit: boolean;
  created_at: string;
  updated_at: string;
  badge_type_id: number;
  weight: number;
  profile_medium: string;
  profile: string;
  friend: null;
  follower: null;
}

export class StravaService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private baseUrl: string = 'https://www.strava.com/api/v3';

  constructor() {
    this.clientId = process.env.STRAVA_CLIENT_ID || '';
    this.clientSecret = process.env.STRAVA_CLIENT_SECRET || '';
    this.redirectUri = process.env.STRAVA_REDIRECT_URI || '';

    if (!this.clientId || !this.clientSecret) {
      console.warn('Strava API credentials not found in environment variables');
    }
  }

  /**
   * Get the authorization URL for Strava OAuth
   */
  getAuthorizationUrl(state?: string): string {
    const params = {
      client_id: this.clientId,
      redirect_uri: `${process.env.BASE_URL}/strava/callback`,
      response_type: 'code',
      approval_prompt: 'force',
      scope: 'read,activity:read_all,profile:read_all',
      state: state || '',
    };

    return `https://www.strava.com/oauth/authorize?${querystring.stringify(params)}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async getAccessToken(code: string): Promise<StravaTokenResponse> {
    try {
      const response = await axios.post('https://www.strava.com/oauth/token', {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code: code,
        grant_type: 'authorization_code',
      });

      return response.data;
    } catch (error: any) {
      console.error('Error getting Strava access token:', error.response?.data || error.message);
      throw new Error(`Failed to get Strava access token: ${error.message}`);
    }
  }

  /**
   * Refresh an expired access token
   */
  async refreshToken(refreshToken: string): Promise<StravaTokenResponse> {
    try {
      const response = await axios.post('https://www.strava.com/oauth/token', {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      });

      return response.data;
    } catch (error: any) {
      console.error('Error refreshing Strava token:', error.response?.data || error.message);
      throw new Error(`Failed to refresh Strava token: ${error.message}`);
    }
  }

  /**
   * Get athlete profile
   */
  async getAthlete(accessToken: string): Promise<StravaAthlete> {
    try {
      const response = await axios.get(`${this.baseUrl}/athlete`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return response.data;
    } catch (error: any) {
      console.error('Error getting Strava athlete:', error.response?.data || error.message);
      throw new Error(`Failed to get Strava athlete: ${error.message}`);
    }
  }

  /**
   * Get athlete activities
   */
  async getActivities(
    accessToken: string,
    page: number = 1,
    perPage: number = 30,
    before?: number,
    after?: number
  ): Promise<StravaActivity[]> {
    try {
      const params: any = {
        page,
        per_page: perPage,
      };

      if (before) params.before = before;
      if (after) params.after = after;

      const response = await axios.get(`${this.baseUrl}/athlete/activities`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params,
      });

      return response.data;
    } catch (error: any) {
      console.error('Error getting Strava activities:', error.response?.data || error.message);
      throw new Error(`Failed to get Strava activities: ${error.message}`);
    }
  }

  /**
   * Get a specific activity
   */
  async getActivity(accessToken: string, activityId: number): Promise<StravaActivity> {
    try {
      const response = await axios.get(`${this.baseUrl}/activities/${activityId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return response.data;
    } catch (error: any) {
      console.error('Error getting Strava activity:', error.response?.data || error.message);
      throw new Error(`Failed to get Strava activity: ${error.message}`);
    }
  }

  /**
   * Deauthorize the application
   */
  async deauthorize(accessToken: string): Promise<boolean> {
    try {
      await axios.post(
        'https://www.strava.com/oauth/deauthorize',
        { access_token: accessToken },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      return true;
    } catch (error: any) {
      console.error('Error deauthorizing Strava:', error.response?.data || error.message);
      throw new Error(`Failed to deauthorize Strava: ${error.message}`);
    }
  }
}

export const stravaService = new StravaService();
