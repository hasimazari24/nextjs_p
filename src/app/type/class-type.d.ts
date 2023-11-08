export interface Mentor {
  id: string;
  fullname: string;
  image_id: string;
  image_url: string;
  role: string;
}

export interface Kelas {
  id: string;
  name: string;
  participant_count: number;
  activity_count: number;
  mentor : Mentor;
}
