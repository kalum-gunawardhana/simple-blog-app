-- Enable the pg_trgm extension for fuzzy text matching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add a tsvector column for full-text search
ALTER TABLE posts ADD COLUMN IF NOT EXISTS fts tsvector
    GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(excerpt, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(content, '')), 'C')
    ) STORED;

-- Create a GIN index for full-text search
CREATE INDEX IF NOT EXISTS posts_fts_idx ON posts USING GIN (fts);

-- Create a function to search posts
CREATE OR REPLACE FUNCTION search_posts(
    search_query text,
    tag_filter text DEFAULT NULL,
    premium_only boolean DEFAULT false,
    author_id uuid DEFAULT NULL,
    page_number integer DEFAULT 1,
    page_size integer DEFAULT 10
) RETURNS TABLE (
    id uuid,
    title text,
    excerpt text,
    content text,
    author_id uuid,
    is_premium boolean,
    published_at timestamptz,
    created_at timestamptz,
    updated_at timestamptz,
    rank real
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.title,
        p.excerpt,
        p.content,
        p.author_id,
        p.is_premium,
        p.published_at,
        p.created_at,
        p.updated_at,
        ts_rank(p.fts, websearch_to_tsquery('english', search_query)) as rank
    FROM posts p
    LEFT JOIN posts_tags pt ON p.id = pt.post_id
    LEFT JOIN tags t ON pt.tag_id = t.id
    WHERE
        CASE
            WHEN search_query IS NOT NULL AND search_query <> '' THEN
                p.fts @@ websearch_to_tsquery('english', search_query)
            ELSE true
        END
        AND CASE
            WHEN tag_filter IS NOT NULL THEN
                t.name = tag_filter
            ELSE true
        END
        AND CASE
            WHEN premium_only THEN
                p.is_premium = true
            ELSE true
        END
        AND CASE
            WHEN author_id IS NOT NULL THEN
                p.author_id = author_id
            ELSE true
        END
    GROUP BY p.id
    ORDER BY
        CASE
            WHEN search_query IS NOT NULL AND search_query <> '' THEN
                ts_rank(p.fts, websearch_to_tsquery('english', search_query))
            ELSE extract(epoch from p.published_at)
        END DESC
    LIMIT page_size
    OFFSET (page_number - 1) * page_size;
END;
$$ LANGUAGE plpgsql; 