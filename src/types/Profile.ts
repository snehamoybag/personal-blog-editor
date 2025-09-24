export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  bio: string | null;
  joinedAt: Date;
  userId: number;
  avatarUrl: string | null;
}
