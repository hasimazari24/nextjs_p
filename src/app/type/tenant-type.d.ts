export interface TLinks {
  id: string;
  title: string;
  url: string;
}

export interface user_tenant {
  id: string;
  fullname: string;
  position: string;
  image_id: string | null;
  image_url: string | null;
  user_link: TLinks[];
}

export interface tenant_catalog {
  id: string;
  image_id: string | null;
  image_url: string | null;
  title: string;
  description: string;
  url: string | null;
}

export interface tenant_award {
  id: string;
  image_id: string | null;
  image_url: string;
  name: string;
  rank: string;
}

export interface tenant_program {
  id: string;
  program: string;
}

export interface tenant_gallery {
  id: string;
  image_id: string | null;
  image_url: string | null;
  title: string;
  description: string;
  event_date: string;
  event_date_format: string;
}

export interface Tenant {
  id: string;
  name: string;
  motto: string;
  slug: string;
  description: string;
  address: string;
  contact: string;
  email: string;
  founder: string;
  level_tenant: string;
  image_url: string | null;
  image_banner_url: string | null;
  tenant_link: TLinks;
  user_tenant: user_tenant;
  tenant_catalog: tenant_catalog;
  tenant_award: tenant_award;
  tenant_program: tenant_program;
  tenant_gallery: tenant_gallery;
}
