export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  bio: string | null;
  joinedAt: string;
  userId: number;
  avatarUrl: string | null;
}
