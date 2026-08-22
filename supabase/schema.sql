-- ============================================================
-- Tot Bloei — databaseschema
-- Uitvoeren in Supabase → SQL Editor. Daarna: npm run seed
-- ============================================================

-- ------------------------------------------------------- media
create table if not exists media (
  pad         text primary key,          -- pad binnen de storage-bucket 'media'
  alt         text not null,             -- verplicht: nodig voor toegankelijkheid en SEO
  breedte     int,
  hoogte      int,
  created_at  timestamptz not null default now()
);

-- --------------------------------------------- site_settings
create table if not exists site_settings (
  id            int primary key default 1 check (id = 1),
  naam          text not null default 'Tot Bloei',
  ondertitel    text,
  email         text not null,
  instagram     text,
  instagram_handle text,
  regio         text,
  kvk           text,
  footer_tekst  text,
  og_image      text,
  updated_at    timestamptz not null default now()
);

-- --------------------------------------------------------- pages
-- content is JSONB: elke pagina heeft eigen velden. Welke velden dat zijn,
-- staat in lib/fields.ts en bepaalt hoe het formulier in de admin eruitziet.
create table if not exists pages (
  slug             text primary key,     -- '/', '/over-mij', ...
  naam             text not null,        -- label in de admin
  seo_title        text not null,
  seo_description  text not null,
  canonical        text,                 -- alleen invullen als die afwijkt
  og_image         text references media(pad) on delete set null,
  content          jsonb not null default '{}'::jsonb,
  updated_at       timestamptz not null default now()
);

-- ------------------------------------------------------ services
create table if not exists services (
  slug                text primary key,  -- 'opvoedconsult', ...
  titel               text not null,
  tag                 text,
  korte_omschrijving  text,
  lange_omschrijving  text,              -- opmaak als markdown (vet, lijst, link)
  prijs               text,
  duur                text,
  voor_wie            text,
  cta_label           text,
  afbeelding          text,              -- media-pad óf placeholder: blobA/blobB/arch
  seo_title           text,
  seo_description     text,
  volgorde            int not null default 0,
  gepubliceerd        boolean not null default true,
  updated_at          timestamptz not null default now()
);

-- ---------------------------------------------------------- faqs
create table if not exists faqs (
  id            bigint generated always as identity primary key,
  vraag         text not null,
  antwoord      text not null,
  volgorde      int not null default 0,
  gepubliceerd  boolean not null default true,
  updated_at    timestamptz not null default now()
);

create index if not exists faqs_volgorde_idx on faqs (volgorde);
create index if not exists services_volgorde_idx on services (volgorde);

-- ============================================================
-- Row Level Security
-- Publiek: alleen lezen, en alleen wat gepubliceerd is.
-- Schrijven gebeurt uitsluitend server-side met de service role key,
-- die RLS overslaat en nooit in de browser terechtkomt.
-- ============================================================

alter table media          enable row level security;
alter table site_settings  enable row level security;
alter table pages          enable row level security;
alter table services       enable row level security;
alter table faqs           enable row level security;

drop policy if exists "publiek lezen" on media;
drop policy if exists "publiek lezen" on site_settings;
drop policy if exists "publiek lezen" on pages;
drop policy if exists "publiek lezen" on services;
drop policy if exists "publiek lezen" on faqs;

create policy "publiek lezen" on media          for select using (true);
create policy "publiek lezen" on site_settings  for select using (true);
create policy "publiek lezen" on pages          for select using (true);
create policy "publiek lezen" on services       for select using (gepubliceerd);
create policy "publiek lezen" on faqs           for select using (gepubliceerd);

-- Bewust geen insert/update/delete-policies: zonder policy mag de anon-key niets.

-- ============================================================
-- Storage-bucket voor foto's
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media publiek leesbaar" on storage.objects;
create policy "media publiek leesbaar" on storage.objects
  for select using (bucket_id = 'media');

-- ============================================================
-- updated_at automatisch bijwerken
-- ============================================================
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists pages_updated  on pages;
drop trigger if exists services_updated on services;
drop trigger if exists faqs_updated on faqs;
drop trigger if exists settings_updated on site_settings;

create trigger pages_updated    before update on pages          for each row execute function set_updated_at();
create trigger services_updated before update on services       for each row execute function set_updated_at();
create trigger faqs_updated     before update on faqs           for each row execute function set_updated_at();
create trigger settings_updated before update on site_settings  for each row execute function set_updated_at();

-- ============================================================
-- Contactformulier
-- Alleen wat nodig is om te kunnen antwoorden: naam, e-mail, bericht.
-- Geen IP-adres, geen browsergegevens, geen tracking.
-- ============================================================
create table if not exists contact_messages (
  id            bigint generated always as identity primary key,
  naam          text not null,
  email         text not null,
  bericht       text not null,
  afgehandeld   boolean not null default false,
  created_at    timestamptz not null default now()
);

create index if not exists contact_messages_datum_idx on contact_messages (created_at desc);

alter table contact_messages enable row level security;

-- Bewust géén policies: zonder policy mag de publieke sleutel niets — niet
-- lezen en niet schrijven. Het formulier schrijft via een server action met de
-- service role key, die RLS overslaat en alleen op de server bestaat.
