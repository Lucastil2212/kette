**SQL TABLE DEFINITIONS**

********************************

CREATE TABLE IF NOT EXISTS public.basewords
(
    base_word_id integer NOT NULL DEFAULT nextval('basewords_base_word_id_seq'::regclass),
    word_id integer,
    base_word character varying(255) COLLATE pg_catalog."default" NOT NULL,
    literal_meaning character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT basewords_pkey PRIMARY KEY (base_word_id),
    CONSTRAINT basewords_word_id_fkey FOREIGN KEY (word_id)
        REFERENCES public.words (word_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.basewords
    OWNER to postgres;

****************************************************************

CREATE TABLE IF NOT EXISTS public.categories
(
    category_id integer NOT NULL DEFAULT nextval('categories_category_id_seq'::regclass),
    category_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (category_id),
    CONSTRAINT categories_category_name_key UNIQUE (category_name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.categories
    OWNER to postgres;

******************************************************************

CREATE TABLE IF NOT EXISTS public.words
(
    word_id integer NOT NULL DEFAULT nextval('words_word_id_seq'::regclass),
    word character varying(255) COLLATE pg_catalog."default" NOT NULL,
    category_id integer,
    definition text COLLATE pg_catalog."default" NOT NULL,
    literal_definition text COLLATE pg_catalog."default" NOT NULL,
    usage_notes text COLLATE pg_catalog."default",
    example_sentence text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT words_pkey PRIMARY KEY (word_id),
    CONSTRAINT words_word_key UNIQUE (word),
    CONSTRAINT words_category_id_fkey FOREIGN KEY (category_id)
        REFERENCES public.categories (category_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.words
    OWNER to postgres;