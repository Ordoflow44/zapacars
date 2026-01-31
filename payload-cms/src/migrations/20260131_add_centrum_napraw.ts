import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // @ts-ignore - using raw pool query
  await payload.db.pool.query(`
    ALTER TABLE site_settings
    ADD COLUMN IF NOT EXISTS centrum_napraw_section_title varchar,
    ADD COLUMN IF NOT EXISTS centrum_napraw_section_description text,
    ADD COLUMN IF NOT EXISTS centrum_napraw_serwis_title varchar,
    ADD COLUMN IF NOT EXISTS centrum_napraw_serwis_description text,
    ADD COLUMN IF NOT EXISTS centrum_napraw_serwis_image_id integer REFERENCES media(id),
    ADD COLUMN IF NOT EXISTS centrum_napraw_lakiernictwo_title varchar,
    ADD COLUMN IF NOT EXISTS centrum_napraw_lakiernictwo_description text,
    ADD COLUMN IF NOT EXISTS centrum_napraw_lakiernictwo_image_id integer REFERENCES media(id),
    ADD COLUMN IF NOT EXISTS centrum_napraw_renowacja_title varchar,
    ADD COLUMN IF NOT EXISTS centrum_napraw_renowacja_description text,
    ADD COLUMN IF NOT EXISTS centrum_napraw_renowacja_image_id integer REFERENCES media(id)
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // @ts-ignore - using raw pool query
  await payload.db.pool.query(`
    ALTER TABLE site_settings
    DROP COLUMN IF EXISTS centrum_napraw_section_title,
    DROP COLUMN IF EXISTS centrum_napraw_section_description,
    DROP COLUMN IF EXISTS centrum_napraw_serwis_title,
    DROP COLUMN IF EXISTS centrum_napraw_serwis_description,
    DROP COLUMN IF EXISTS centrum_napraw_serwis_image_id,
    DROP COLUMN IF EXISTS centrum_napraw_lakiernictwo_title,
    DROP COLUMN IF EXISTS centrum_napraw_lakiernictwo_description,
    DROP COLUMN IF EXISTS centrum_napraw_lakiernictwo_image_id,
    DROP COLUMN IF EXISTS centrum_napraw_renowacja_title,
    DROP COLUMN IF EXISTS centrum_napraw_renowacja_description,
    DROP COLUMN IF EXISTS centrum_napraw_renowacja_image_id
  `)
}
