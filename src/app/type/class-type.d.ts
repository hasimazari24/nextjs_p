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

interface classHeading {
  id: string;
  course_ends: boolean;
  name: string;
  description: string;
  created_at: string;
  mentor: Mentor;
}

interface Item_Sesi {
  id: string;
  title: string;
  description: string;
  created_at: string;
  assigment_count: number;
  file_count: number;
  link_count: number;
}

interface Sesi {
  id: string;
  course_ends: boolean;
  name: string;
  description: string;
  created_at: string;
  item_count: number;
  item: Item_Sesi;
}

interface Item_partisipan {
  id: string;
  name: string;
  image_id: string | null;
  image_url: string | null;
}

interface Partisipan {
  id: string;
  course_ends: boolean;
  name: string;
  description: string;
  created_at: string;
  item_count: number;
  mentor: Mentor;
  partisipan: Item_partisipan;
}
