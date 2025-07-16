--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Debian 16.8-1.pgdg120+1)
-- Dumped by pg_dump version 16.9 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: DocumentStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."DocumentStatus" AS ENUM (
    'UPLOADED',
    'AWAITING_KIOSK_ACK',
    'KIOSK_CONFIRMED',
    'CLAIMED',
    'DISPATCHED',
    'ARCHIVED'
);


ALTER TYPE public."DocumentStatus" OWNER TO postgres;

--
-- Name: DocumentType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."DocumentType" AS ENUM (
    'NATIONAL_ID',
    'PASSPORT',
    'BIRTH_CERTIFICATE',
    'DRIVING_LICENSE',
    'OTHER'
);


ALTER TYPE public."DocumentType" OWNER TO postgres;

--
-- Name: PaymentMethod; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PaymentMethod" AS ENUM (
    'MPESA',
    'CARD',
    'BANK_TRANSFER'
);


ALTER TYPE public."PaymentMethod" OWNER TO postgres;

--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'PROCESSING',
    'COMPLETED',
    'FAILED',
    'CANCELLED',
    'EXPIRED'
);


ALTER TYPE public."PaymentStatus" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'KIOSK_MANAGER',
    'ADMIN',
    'POSTER'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: TransactionStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TransactionStatus" AS ENUM (
    'PENDING',
    'SUCCESS',
    'FAILED',
    'TIMEOUT',
    'CANCELLED'
);


ALTER TYPE public."TransactionStatus" OWNER TO postgres;

--
-- Name: TransactionType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TransactionType" AS ENUM (
    'STK_PUSH',
    'C2B',
    'B2C',
    'B2B'
);


ALTER TYPE public."TransactionType" OWNER TO postgres;

--
-- Name: UserStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserStatus" AS ENUM (
    'PENDING',
    'ACTIVE',
    'SUSPENDED',
    'DELETED'
);


ALTER TYPE public."UserStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ContactRequest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContactRequest" (
    id text NOT NULL,
    email text,
    phone text,
    "documentNumber" text,
    "firstName" text,
    "lastName" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "documentType" public."DocumentType",
    message text,
    "userId" text
);


ALTER TABLE public."ContactRequest" OWNER TO postgres;

--
-- Name: Dispute; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Dispute" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "documentId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    reason text NOT NULL,
    status text DEFAULT 'PENDING'::text NOT NULL
);


ALTER TABLE public."Dispute" OWNER TO postgres;

--
-- Name: Document; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Document" (
    id text NOT NULL,
    "firstName" text,
    "lastName" text,
    "dateOfBirth" timestamp(3) without time zone NOT NULL,
    "documentNumber" text NOT NULL,
    "kioskId" text,
    "posterId" text,
    "claimedById" text,
    status public."DocumentStatus" DEFAULT 'UPLOADED'::public."DocumentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "documentType" public."DocumentType" NOT NULL
);


ALTER TABLE public."Document" OWNER TO postgres;

--
-- Name: DocumentStatusHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DocumentStatusHistory" (
    id text NOT NULL,
    "documentId" text NOT NULL,
    status public."DocumentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."DocumentStatusHistory" OWNER TO postgres;

--
-- Name: Kiosk; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Kiosk" (
    id text NOT NULL,
    name text NOT NULL,
    location text NOT NULL,
    phone text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Kiosk" OWNER TO postgres;

--
-- Name: Notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notification" (
    id text NOT NULL,
    "userId" text,
    "documentId" text,
    message text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    read boolean DEFAULT false NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Notification" OWNER TO postgres;

--
-- Name: OTP; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OTP" (
    id text NOT NULL,
    phone text NOT NULL,
    code text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    used boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text
);


ALTER TABLE public."OTP" OWNER TO postgres;

--
-- Name: Payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Payment" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "documentId" text,
    amount double precision NOT NULL,
    currency text DEFAULT 'KES'::text NOT NULL,
    "paymentMethod" public."PaymentMethod" DEFAULT 'MPESA'::public."PaymentMethod" NOT NULL,
    status public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    "mpesaRequestId" text,
    "mpesaCheckoutId" text,
    "phoneNumber" text NOT NULL,
    description text NOT NULL,
    metadata jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Payment" OWNER TO postgres;

--
-- Name: SMSLog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SMSLog" (
    id text NOT NULL,
    phone text NOT NULL,
    "messageType" text NOT NULL,
    success boolean NOT NULL,
    "messageId" text,
    error text,
    cost text,
    environment text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."SMSLog" OWNER TO postgres;

--
-- Name: Transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Transaction" (
    id text NOT NULL,
    "paymentId" text NOT NULL,
    "mpesaRequestId" text,
    "mpesaCheckoutId" text,
    "transactionType" public."TransactionType" NOT NULL,
    status public."TransactionStatus" DEFAULT 'PENDING'::public."TransactionStatus" NOT NULL,
    amount double precision NOT NULL,
    "phoneNumber" text NOT NULL,
    description text NOT NULL,
    metadata jsonb,
    "errorCode" text,
    "errorMessage" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Transaction" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp(3) without time zone,
    image text,
    phone text,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    password text,
    status public."UserStatus" DEFAULT 'PENDING'::public."UserStatus" NOT NULL,
    provider text,
    "providerId" text
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _KioskManagers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_KioskManagers" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_KioskManagers" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: ContactRequest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ContactRequest" (id, email, phone, "documentNumber", "firstName", "lastName", "createdAt", "updatedAt", "documentType", message, "userId") FROM stdin;
cmc3mv8jq000eyi5p716891vu	jane@example.com	+254700000003	98765432	Jane	Smith	2025-06-19 17:06:45.638	2025-06-19 17:06:45.638	NATIONAL_ID	WRONG CLAIM REPORT\n\nReason: identity_theft\n\nAdditional Details: This is my document and I never lost it. Someone must have stolen my identity to claim it.\n\nDocument Details:\n- Name: JANE SMITH\n- ID: 98765432\n- Type: NATIONAL_ID\n- Claimed By: John Doe\n- Claimed At: Thu Jun 19 2025 20:06:37 GMT+0300 (East Africa Time)\n- Kiosk: Test Kiosk - Westlands	\N
cmc3mvshb000gyi5p19vg4nhm	jane@example.com	+254700000003	98765432	Jane	Smith	2025-06-19 17:07:11.472	2025-06-19 17:07:11.472	NATIONAL_ID	WRONG CLAIM REPORT\n\nReason: identity_theft\n\nAdditional Details: This is my document and I never lost it.\n\nDocument Details:\n- Name: JANE SMITH\n- ID: 98765432\n- Type: NATIONAL_ID\n- Claimed By: John Doe\n- Claimed At: Thu Jun 19 2025 20:06:37 GMT+0300 (East Africa Time)\n- Kiosk: Test Kiosk - Westlands	\N
cmc3n31wg000jyi5p34uksgdu	nyotatimothy@gmail.com	0733323506	98765432	Timothy	Nyota	2025-06-19 17:12:50.272	2025-06-19 17:12:50.272	NATIONAL_ID	WRONG CLAIM REPORT\n\nReason: wrong_person\n\nAdditional Details: I am appaled\n\nDocument Details:\n- Name: JANE SMITH\n- ID: 98765432\n- Type: NATIONAL_ID\n- Claimed By: John Doe\n- Claimed At: Thu Jun 19 2025 20:06:37 GMT+0300 (East Africa Time)\n- Kiosk: Test Kiosk - Westlands	\N
\.


--
-- Data for Name: Dispute; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Dispute" (id, "userId", "documentId", "createdAt", "updatedAt", reason, status) FROM stdin;
\.


--
-- Data for Name: Document; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Document" (id, "firstName", "lastName", "dateOfBirth", "documentNumber", "kioskId", "posterId", "claimedById", status, "createdAt", "updatedAt", "documentType") FROM stdin;
cmc0hl7kx000qyigoxl3af1nk	Brian	Martinez	2001-11-13 17:05:43.115	OT885782	kiosk-id-2	cmc0h680u0005yi03btxuxebi	\N	DISPATCHED	2025-06-17 12:15:41.217	2025-06-17 12:15:41.217	OTHER
cmc0hl7vm000syigo3dgxkmqf	John	Jones	1981-09-02 19:03:04.658	BI231153	kiosk-id-3	cmc0h69ec0007yi03jnoemce0	\N	CLAIMED	2025-06-17 12:15:41.602	2025-06-17 12:15:41.602	BIRTH_CERTIFICATE
cmc0hl81m000uyigon2kvznln	Peter	Martin	1998-11-05 22:52:18.365	DR674212	kiosk-id-10	cmc0h69ec0007yi03jnoemce0	\N	KIOSK_CONFIRMED	2025-06-17 12:15:41.818	2025-06-17 12:15:41.818	DRIVING_LICENSE
cmc0hl8c9000yyigo5a0aeait	David	Thompson	1977-02-08 10:27:45.294	OT798645	kiosk-id-2	cmc0h68q00006yi036bb6cymk	\N	CLAIMED	2025-06-17 12:15:42.201	2025-06-17 12:15:42.201	OTHER
cmc0hl8i50010yigo8c62j8p1	Kevin	Anderson	1972-10-21 09:25:33.947	OT497529	kiosk-id-6	cmc0h680u0005yi03btxuxebi	\N	DISPATCHED	2025-06-17 12:15:42.413	2025-06-17 12:15:42.413	OTHER
cmc0hl8nq0012yigoiwtqmke0	Emily	Thomas	1993-05-09 05:04:02.25	OT523258	kiosk-id-2	cmc0h69ec0007yi03jnoemce0	\N	DISPATCHED	2025-06-17 12:15:42.614	2025-06-17 12:15:42.614	OTHER
cmc0hl8t40014yigofes66bk3	Ruth	Davis	1992-07-19 00:38:35.482	BI681633	kiosk-id-9	cmc0h6a2i0008yi0374gswlsn	\N	KIOSK_CONFIRMED	2025-06-17 12:15:42.808	2025-06-17 12:15:42.808	BIRTH_CERTIFICATE
cmc0hl9490018yigo5r91lff3	Diana	Anderson	1996-12-09 20:42:59.363	DR984209	kiosk-id-2	cmc0h69ec0007yi03jnoemce0	\N	UPLOADED	2025-06-17 12:15:43.209	2025-06-17 12:15:43.209	DRIVING_LICENSE
cmc0hl99u001ayigoi5bcp5gm	Alice	Thomas	1985-09-01 13:22:22.989	OT409186	kiosk-id-3	cmc0h6a2i0008yi0374gswlsn	\N	AWAITING_KIOSK_ACK	2025-06-17 12:15:43.411	2025-06-17 12:15:43.411	OTHER
cmc0hl9fk001cyigoy2yggjb1	Diana	Martin	1998-10-03 14:00:49.444	NA721377	kiosk-id-7	cmc0h69ec0007yi03jnoemce0	\N	DISPATCHED	2025-06-17 12:15:43.616	2025-06-17 12:15:43.616	NATIONAL_ID
cmc0hl9ky001eyigo8ijpvbvk	Michael	Miller	1975-09-02 22:49:06.118	BI860761	kiosk-id-10	cmc0h680u0005yi03btxuxebi	\N	CLAIMED	2025-06-17 12:15:43.81	2025-06-17 12:15:43.81	BIRTH_CERTIFICATE
cmc0hl9qk001gyigo14n3f9la	David	Garcia	1999-06-22 12:37:35.809	OT398893	kiosk-id-5	cmc0h6a2i0008yi0374gswlsn	\N	ARCHIVED	2025-06-17 12:15:44.012	2025-06-17 12:15:44.012	OTHER
cmc0hla24001kyigobhmsz3ts	Sarah	Wilson	2004-10-26 03:25:00.613	PA614920	kiosk-id-3	cmc0h680u0005yi03btxuxebi	\N	ARCHIVED	2025-06-17 12:15:44.428	2025-06-17 12:15:44.428	PASSPORT
cmc0hla7e001myigo7upvga0h	Brian	Martinez	2000-01-24 14:23:25.508	PA915547	kiosk-id-1	cmc0h69ec0007yi03jnoemce0	\N	ARCHIVED	2025-06-17 12:15:44.619	2025-06-17 12:15:44.619	PASSPORT
cmc0hlad3001oyigooyo15jz7	Grace	Doe	1972-05-12 21:06:33.714	NA231118	kiosk-id-8	cmc0h6a2i0008yi0374gswlsn	\N	UPLOADED	2025-06-17 12:15:44.823	2025-06-17 12:15:44.823	NATIONAL_ID
cmc0hlai9001qyigohe8ot3x7	Alice	Brown	1997-04-22 15:55:27.157	NA748836	kiosk-id-3	cmc0h6a2i0008yi0374gswlsn	\N	KIOSK_CONFIRMED	2025-06-17 12:15:45.01	2025-06-17 12:15:45.01	NATIONAL_ID
cmc0hlaoe001syigofvtxgt3y	Emily	Doe	1988-02-22 17:16:39.767	DR111504	kiosk-id-5	cmc0h680u0005yi03btxuxebi	\N	AWAITING_KIOSK_ACK	2025-06-17 12:15:45.23	2025-06-17 12:15:45.23	DRIVING_LICENSE
cmc0hlaze001wyigosv343aya	Kevin	Jones	1996-09-22 03:31:18.458	DR283174	kiosk-id-10	cmc0h6a2i0008yi0374gswlsn	\N	UPLOADED	2025-06-17 12:15:45.626	2025-06-17 12:15:45.626	DRIVING_LICENSE
cmc0hlb4s001yyigotlhfj487	Emily	Harris	1995-04-09 05:45:34.12	NA713683	kiosk-id-3	cmc0h6aq20009yi03s2p7tewm	\N	UPLOADED	2025-06-17 12:15:45.82	2025-06-17 12:15:45.82	NATIONAL_ID
cmc0hlbaf0020yigowd9tkw3m	Diana	Johnson	1986-03-28 21:07:12.053	DR941044	kiosk-id-7	cmc0h6a2i0008yi0374gswlsn	\N	UPLOADED	2025-06-17 12:15:46.023	2025-06-17 12:15:46.023	DRIVING_LICENSE
cmc0hlbly0024yigo590cbo4j	Jane	Brown	1987-12-22 22:17:52.101	OT800143	kiosk-id-6	cmc0h6aq20009yi03s2p7tewm	\N	UPLOADED	2025-06-17 12:15:46.439	2025-06-17 12:15:46.439	OTHER
cmc0hlbza0028yigoqqwy4jey	Paul	Davis	1996-04-25 15:31:35.561	OT510645	kiosk-id-9	cmc0h680u0005yi03btxuxebi	\N	UPLOADED	2025-06-17 12:15:46.918	2025-06-17 12:15:46.918	OTHER
cmc0hlc4s002ayigoi47dregt	Paul	Thomas	1985-07-26 10:36:18.401	OT217479	kiosk-id-10	cmc0h6aq20009yi03s2p7tewm	\N	UPLOADED	2025-06-17 12:15:47.117	2025-06-17 12:15:47.117	OTHER
cmc0hlcad002cyigof9eie5yy	Emily	Thomas	2003-10-21 15:44:22.65	PA752952	kiosk-id-9	cmc0h680u0005yi03btxuxebi	\N	UPLOADED	2025-06-17 12:15:47.317	2025-06-17 12:15:47.317	PASSPORT
cmc0hlcfu002eyigoiofwyjn9	Jane	Williams	1983-06-24 03:06:10.437	DR594470	kiosk-id-4	cmc0h6aq20009yi03s2p7tewm	\N	CLAIMED	2025-06-17 12:15:47.514	2025-06-17 12:15:47.514	DRIVING_LICENSE
cmc0i138d000qyidys5l6h68g	Alice	Thomas	1973-12-29 20:15:53.196	DR786144	kiosk-id-8	cmc0h680u0005yi03btxuxebi	\N	UPLOADED	2025-06-17 12:28:02.077	2025-06-17 12:28:02.077	DRIVING_LICENSE
cmc0i13jq000syidyjeawq9to	Jane	Moore	1972-01-21 23:29:04.486	BI669442	kiosk-id-2	cmc0h6aq20009yi03s2p7tewm	\N	KIOSK_CONFIRMED	2025-06-17 12:28:02.486	2025-06-17 12:28:02.486	BIRTH_CERTIFICATE
cmc0i13pj000uyidyb29fzg2t	Linda	Harris	1973-12-04 10:37:22.144	DR918195	kiosk-id-2	cmc0h68q00006yi036bb6cymk	\N	AWAITING_KIOSK_ACK	2025-06-17 12:28:02.696	2025-06-17 12:28:02.696	DRIVING_LICENSE
cmc0i13vb000wyidyslt9vo1b	Chris	White	1986-08-09 16:08:09.211	NA158213	kiosk-id-9	cmc0h69ec0007yi03jnoemce0	\N	DISPATCHED	2025-06-17 12:28:02.903	2025-06-17 12:28:02.903	NATIONAL_ID
cmc0i14zf000yyidylq8w0dy6	Alice	Jones	1971-08-12 00:47:06.342	NA254841	kiosk-id-10	cmc0h68q00006yi036bb6cymk	\N	AWAITING_KIOSK_ACK	2025-06-17 12:28:04.347	2025-06-17 12:28:04.347	NATIONAL_ID
cmc0i15if0010yidy7t1i73dt	Grace	Thomas	2001-05-12 06:08:52.102	OT599504	kiosk-id-6	cmc0h680u0005yi03btxuxebi	\N	UPLOADED	2025-06-17 12:28:05.031	2025-06-17 12:28:05.031	OTHER
cmc0i15nv0012yidydz001ck2	George	Miller	1999-05-09 14:54:51.992	BI536906	kiosk-id-8	cmc0h68q00006yi036bb6cymk	\N	CLAIMED	2025-06-17 12:28:05.227	2025-06-17 12:28:05.227	BIRTH_CERTIFICATE
cmc0i15tm0014yidy7vyg91nu	John	Thomas	1977-08-25 01:19:47.629	OT247335	kiosk-id-2	cmc0h6aq20009yi03s2p7tewm	\N	AWAITING_KIOSK_ACK	2025-06-17 12:28:05.435	2025-06-17 12:28:05.435	OTHER
cmc0i15z40016yidyeeody8sw	George	Garcia	1975-03-29 08:23:46.338	NA407750	kiosk-id-8	cmc0h680u0005yi03btxuxebi	\N	UPLOADED	2025-06-17 12:28:05.633	2025-06-17 12:28:05.633	NATIONAL_ID
cmc0i169q001ayidyg4t3gav0	Michael	Taylor	1997-01-26 11:00:32.468	NA328551	kiosk-id-10	cmc0h68q00006yi036bb6cymk	\N	DISPATCHED	2025-06-17 12:28:06.014	2025-06-17 12:28:06.014	NATIONAL_ID
cmc0i16fk001cyidy2rp3ho8p	Jane	Moore	1993-02-15 14:18:44.297	NA630797	kiosk-id-6	cmc0h6a2i0008yi0374gswlsn	\N	DISPATCHED	2025-06-17 12:28:06.224	2025-06-17 12:28:06.224	NATIONAL_ID
cmc0i16l5001eyidy0a1eutm1	Emily	Jones	1984-01-30 21:46:08.908	NA194022	kiosk-id-3	cmc0h69ec0007yi03jnoemce0	\N	DISPATCHED	2025-06-17 12:28:06.425	2025-06-17 12:28:06.425	NATIONAL_ID
cmc0i16qx001gyidyjcoy84cp	Sarah	Anderson	1998-11-17 20:36:23.102	PA763805	kiosk-id-9	cmc0h680u0005yi03btxuxebi	\N	DISPATCHED	2025-06-17 12:28:06.634	2025-06-17 12:28:06.634	PASSPORT
cmc0i16w7001iyidyngqgfnpv	Sarah	Taylor	1982-11-29 16:06:52.976	PA894601	kiosk-id-2	cmc0h6aq20009yi03s2p7tewm	\N	KIOSK_CONFIRMED	2025-06-17 12:28:06.824	2025-06-17 12:28:06.824	PASSPORT
cmc0i171s001kyidy7nl5ym8h	Chris	Moore	1986-07-14 09:13:15.042	OT116876	kiosk-id-7	cmc0h680u0005yi03btxuxebi	\N	UPLOADED	2025-06-17 12:28:07.024	2025-06-17 12:28:07.024	OTHER
cmc0i177b001myidyked3d7lo	Sarah	Johnson	1970-05-29 14:13:26.176	OT674660	kiosk-id-4	cmc0h68q00006yi036bb6cymk	\N	CLAIMED	2025-06-17 12:28:07.223	2025-06-17 12:28:07.223	OTHER
cmc0hl9w9001iyigob5iw9fre	Peter	Garcia	1986-03-11 20:30:52.006	NA714630	kiosk-id-8	cmc0h68q00006yi036bb6cymk	cmc3ow4gb0014yi5plxxm51m2	CLAIMED	2025-06-17 12:15:44.217	2025-06-19 18:03:27.439	NATIONAL_ID
cmc0hlbgp0022yigo1zhjriik	Brian	Doe	1990-01-15 13:41:20.926	PA817574	kiosk-id-9	cmc0h680u0005yi03btxuxebi	cmc3p2a95001eyi5p6jycdj8p	CLAIMED	2025-06-17 12:15:46.249	2025-06-20 18:16:25.687	PASSPORT
cmc0hl8yx0016yigo03ql4ar0	Ruth	Taylor	1987-07-09 11:42:22.003	BI992480	kiosk-id-8	cmc0h68q00006yi036bb6cymk	cmc53x0tf000oyihy7juu4ux5	CLAIMED	2025-06-17 12:15:43.017	2025-06-21 17:12:15.601	BIRTH_CERTIFICATE
cmc0i164f0018yidywlot0krf	Grace	Miller	1970-01-28 17:29:05.585	NA174398	kiosk-id-10	cmc0h6aq20009yi03s2p7tewm	cmc6igzo50002yirf6tqewon0	CLAIMED	2025-06-17 12:28:05.823	2025-06-21 17:27:37.744	NATIONAL_ID
cmc0hlatu001uyigo3ejw7295	Mary	White	1990-11-04 10:45:40.591	DR208369	kiosk-id-1	cmc0h69ec0007yi03jnoemce0	cmc7rs10o000cyirf8iopism7	CLAIMED	2025-06-17 12:15:45.426	2025-06-22 14:35:56.091	DRIVING_LICENSE
cmc0hl86x000wyigospqc1ugk	Peter	Smith	2001-11-12 15:15:35.985	OT389153	kiosk-id-10	cmc0h680u0005yi03btxuxebi	cmc53x0tf000oyihy7juu4ux5	CLAIMED	2025-06-17 12:15:42.009	2025-06-22 16:24:36.891	OTHER
cmc0i17i5001qyidygd1ry2b9	Grace	Davis	1994-07-23 01:52:48.66	OT580778	kiosk-id-6	cmc0h6aq20009yi03s2p7tewm	\N	ARCHIVED	2025-06-17 12:28:07.613	2025-06-17 12:28:07.613	OTHER
cmc0i17nt001syidykmt8drq0	Victor	Brown	1975-09-12 10:27:31.364	OT687454	kiosk-id-10	cmc0h68q00006yi036bb6cymk	\N	ARCHIVED	2025-06-17 12:28:07.817	2025-06-17 12:28:07.817	OTHER
cmc0i1824001uyidye95zzst2	Alice	Martinez	1986-11-02 06:13:25.054	OT859007	kiosk-id-10	cmc0h6a2i0008yi0374gswlsn	\N	UPLOADED	2025-06-17 12:28:08.332	2025-06-17 12:28:08.332	OTHER
cmc0i1a06001yyidy6steump0	George	Smith	1995-04-02 20:31:15.258	PA951951	kiosk-id-5	cmc0h68q00006yi036bb6cymk	\N	UPLOADED	2025-06-17 12:28:10.638	2025-06-17 12:28:10.638	PASSPORT
cmc0i1a5j0020yidyct9quuft	Kevin	Garcia	2003-09-15 13:04:54.553	OT444966	kiosk-id-7	cmc0h6aq20009yi03s2p7tewm	\N	UPLOADED	2025-06-17 12:28:11.047	2025-06-17 12:28:11.047	OTHER
cmc0i1ach0022yidy1j5xury5	Diana	Thompson	2001-06-14 06:10:58.226	NA761537	kiosk-id-1	cmc0h680u0005yi03btxuxebi	\N	UPLOADED	2025-06-17 12:28:11.297	2025-06-17 12:28:11.297	NATIONAL_ID
cmc0i1ani0026yidyjuaotiwk	John	Wilson	2001-02-05 20:19:16.691	NA857116	kiosk-id-7	cmc0h6a2i0008yi0374gswlsn	\N	UPLOADED	2025-06-17 12:28:11.694	2025-06-17 12:28:11.694	NATIONAL_ID
cmc0i1asi0028yidyhcmp3wsv	Diana	Thompson	1991-06-14 16:49:43.87	PA665517	kiosk-id-2	cmc0h680u0005yi03btxuxebi	\N	UPLOADED	2025-06-17 12:28:11.874	2025-06-17 12:28:11.874	PASSPORT
cmc0i1axk002ayidymhfg66v7	Grace	Martinez	1975-06-09 23:12:33.652	OT773809	kiosk-id-3	cmc0h6a2i0008yi0374gswlsn	\N	UPLOADED	2025-06-17 12:28:12.057	2025-06-17 12:28:12.057	OTHER
cmc0i1b3g002cyidyvegtdfi7	Emily	Harris	1986-11-12 09:16:36.661	PA427131	kiosk-id-10	cmc0h69ec0007yi03jnoemce0	\N	UPLOADED	2025-06-17 12:28:12.268	2025-06-17 12:28:12.268	PASSPORT
cmc0i1b91002eyidyc3iwtto7	Linda	Taylor	1973-10-07 15:12:49.766	OT500011	kiosk-id-7	cmc0h69ec0007yi03jnoemce0	\N	CLAIMED	2025-06-17 12:28:12.469	2025-06-17 12:28:12.469	OTHER
cmc0i1cy0002hyidyanvhf031	Peter	Garcia	2000-02-24 20:20:17.795	NA636069	kiosk-id-4	cmc0h680u0005yi03btxuxebi	\N	CLAIMED	2025-06-17 12:28:14.664	2025-06-17 12:28:14.664	NATIONAL_ID
cmc0i1e5m002myidyc7qty8hk	Chris	Davis	1978-02-01 13:57:28.153	NA867950	kiosk-id-2	cmc0h6fjx000gyi03cove0rf3	\N	UPLOADED	2025-06-17 12:28:16.234	2025-06-17 12:28:16.234	NATIONAL_ID
cmc3jz5720002yi6dj2dtc6v2	TIMOTHY	NYOTA	1990-01-01 00:00:00	24112039	cmc3jz4wg0000yi6d7venmnpa	\N	cmc3mgme10004yi5py4owpcoq	CLAIMED	2025-06-19 15:45:49.07	2025-06-19 16:55:24.876	NATIONAL_ID
cmc3mv23c0002yidopqk1sfwp	JANE	SMITH	1985-05-15 00:00:00	98765432	cmc3jz4wg0000yi6d7venmnpa	\N	cmc3mv1so0000yido2ni907z6	CLAIMED	2025-06-19 17:06:37.272	2025-06-19 17:06:37.272	NATIONAL_ID
cmc0i17cm001oyidyvclgsdw2	Peter	Harris	1989-06-23 06:17:00.329	NA255560	kiosk-id-5	cmc0h68q00006yi036bb6cymk	cmc3n7mg2000myi5pwwmpfbto	CLAIMED	2025-06-17 12:28:07.414	2025-06-19 17:16:25.018	NATIONAL_ID
cmc3nklqw0001yiz9jak22pvi	ALICE	JOHNSON	1992-08-20 00:00:00	12345678	cmc3jz4wg0000yi6d7venmnpa	\N	cmc3mv1so0000yido2ni907z6	CLAIMED	2025-06-19 17:26:29.144	2025-06-19 17:27:11.974	NATIONAL_ID
cmc0i1ai60024yidy17dvihi6	Anna	Anderson	1989-08-16 10:50:15.589	DR900148	kiosk-id-10	cmc0h69ec0007yi03jnoemce0	cmc3p2a95001eyi5p6jycdj8p	CLAIMED	2025-06-17 12:28:11.502	2025-06-19 18:08:14.873	DRIVING_LICENSE
cmc3qge0e0002yi5rjuoq9pq8	BOB	SMITH	1985-03-15 00:00:00	VERIFY123	cmc3qgdpp0000yi5rdkyrponl	\N	cmc3mgme10004yi5py4owpcoq	CLAIMED	2025-06-19 18:47:11.342	2025-06-19 18:47:33.105	NATIONAL_ID
cmc0i1941001wyidynnkfafe6	David	Smith	1992-05-24 07:13:24.432	PA487262	kiosk-id-4	cmc0h69ec0007yi03jnoemce0	cmc3p2a95001eyi5p6jycdj8p	CLAIMED	2025-06-17 12:28:09.697	2025-06-19 18:52:01.78	PASSPORT
cmc4z823e0002yizg01bikde0	John	Doe	1990-01-01 00:00:00	TEST123456	cmc4z7ciq0000yiyebn5pgxgf	cmc4z81if0000yizgl5j4x9zd	\N	UPLOADED	2025-06-20 15:40:25.37	2025-06-20 15:40:25.37	NATIONAL_ID
cmc0i1dzz002kyidymlvzfdek	Brian	Brown	2004-12-31 01:09:13.411	OT966595	kiosk-id-5	cmc0h6fjx000gyi03cove0rf3	cmc3p2a95001eyi5p6jycdj8p	CLAIMED	2025-06-17 12:28:16.031	2025-06-20 17:14:18.971	OTHER
cmc0hlbrc0026yigo4ewp1j0m	David	Harris	1983-05-24 11:36:34.696	OT400267	kiosk-id-8	cmc0h6a2i0008yi0374gswlsn	cmc53x0tf000oyihy7juu4ux5	CLAIMED	2025-06-17 12:15:46.632	2025-06-21 17:02:03.905	OTHER
\.


--
-- Data for Name: DocumentStatusHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DocumentStatusHistory" (id, "documentId", status, "createdAt", "userId") FROM stdin;
cmc0i1beb002fyidyhj73ajws	cmc0i1b91002eyidyc3iwtto7	CLAIMED	2025-06-17 12:28:12.659	cmc0h6eve000fyi03akrxr66w
cmc0i1d3b002iyidybvyeg220	cmc0i1cy0002hyidyanvhf031	CLAIMED	2025-06-17 12:28:14.856	cmc0h6eve000fyi03akrxr66w
cmc3mgnk2000ayi5phtp4szto	cmc3jz5720002yi6dj2dtc6v2	CLAIMED	2025-06-19 16:55:25.251	cmc3mgme10004yi5py4owpcoq
cmc3mv3080008yido4qx249fe	cmc3mv23c0002yidopqk1sfwp	CLAIMED	2025-06-19 17:06:38.456	cmc3mv1so0000yido2ni907z6
cmc3n7nwt000syi5pza1agqcs	cmc0i17cm001oyidyvclgsdw2	CLAIMED	2025-06-19 17:16:25.421	cmc3n7mg2000myi5pwwmpfbto
cmc3nlj370010yi5pul45fsiu	cmc3nklqw0001yiz9jak22pvi	CLAIMED	2025-06-19 17:27:12.356	cmc3mv1so0000yido2ni907z6
cmc3ow5p7001ayi5p3fxt3g1p	cmc0hl9w9001iyigob5iw9fre	CLAIMED	2025-06-19 18:03:27.835	cmc3ow4gb0014yi5plxxm51m2
cmc3p2bin001kyi5pyhids1rf	cmc0i1ai60024yidy17dvihi6	CLAIMED	2025-06-19 18:08:15.311	cmc3p2a95001eyi5p6jycdj8p
cmc3qgv3h001uyi5pyjm92mbo	cmc3qge0e0002yi5rjuoq9pq8	CLAIMED	2025-06-19 18:47:33.485	cmc3mgme10004yi5py4owpcoq
cmc3qmmex0024yi5p7kol7md9	cmc0i1941001wyidynnkfafe6	CLAIMED	2025-06-19 18:52:02.17	cmc3p2a95001eyi5p6jycdj8p
cmc52ktap0007yihy23z0851w	cmc0i1dzz002kyidymlvzfdek	CLAIMED	2025-06-20 17:14:19.344	cmc3p2a95001eyi5p6jycdj8p
cmc54sows0006yi6sxpqq4tyc	cmc0hlbgp0022yigo1zhjriik	CLAIMED	2025-06-20 18:16:26.14	cmc3p2a95001eyi5p6jycdj8p
cmc6hkwsc0006yiwsefi0zt5p	cmc0hlbrc0026yigo4ewp1j0m	CLAIMED	2025-06-21 17:02:04.284	cmc53x0tf000oyihy7juu4ux5
cmc6hy0rp000fyiws52531cit	cmc0hl8yx0016yigo03ql4ar0	CLAIMED	2025-06-21 17:12:15.973	cmc53x0tf000oyihy7juu4ux5
cmc6ihsb30008yirf12yxfcdn	cmc0i164f0018yidywlot0krf	CLAIMED	2025-06-21 17:27:38.127	cmc6igzo50002yirf6tqewon0
cmc7rstqx000iyirfyp8gjerd	cmc0hlatu001uyigo3ejw7295	CLAIMED	2025-06-22 14:35:55.929	cmc7rs10o000cyirf8iopism7
cmc7rsu4e000myirfl6mkzqgd	cmc0hlatu001uyigo3ejw7295	CLAIMED	2025-06-22 14:35:56.414	cmc7rs10o000cyirf8iopism7
cmc7volk90007yiod1ml5zv6m	cmc0hl86x000wyigospqc1ugk	CLAIMED	2025-06-22 16:24:37.162	cmc53x0tf000oyihy7juu4ux5
cmc7volr40009yiodsgrjhwac	cmc0hl86x000wyigospqc1ugk	CLAIMED	2025-06-22 16:24:37.409	cmc53x0tf000oyihy7juu4ux5
\.


--
-- Data for Name: Kiosk; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Kiosk" (id, name, location, phone, "createdAt", "updatedAt") FROM stdin;
kiosk-id-1	Kiosk 1	Nairobi CBD	0700100000	2025-06-17 12:04:21.766	2025-06-17 12:04:21.766
kiosk-id-2	Kiosk 2	Westlands	0700100001	2025-06-17 12:04:26.594	2025-06-17 12:04:26.594
kiosk-id-3	Kiosk 3	Kasarani	0700100002	2025-06-17 12:04:29.757	2025-06-17 12:04:29.757
kiosk-id-4	Kiosk 4	Karen	0700100003	2025-06-17 12:04:34.898	2025-06-17 12:04:34.898
kiosk-id-5	Kiosk 5	Eastleigh	0700100004	2025-06-17 12:04:35.888	2025-06-17 12:04:35.888
kiosk-id-6	Kiosk 6	Mombasa Island	0700100005	2025-06-17 12:04:36.697	2025-06-17 12:04:36.697
kiosk-id-7	Kiosk 7	Kisumu Center	0700100006	2025-06-17 12:04:37.545	2025-06-17 12:04:37.545
kiosk-id-8	Kiosk 8	Eldoret Town	0700100007	2025-06-17 12:04:38.359	2025-06-17 12:04:38.359
kiosk-id-9	Kiosk 9	Thika Road	0700100008	2025-06-17 12:04:39.135	2025-06-17 12:04:39.135
kiosk-id-10	Kiosk 10	Machakos Bus Park	0700100009	2025-06-17 12:04:39.902	2025-06-17 12:04:39.902
cmc3jz4wg0000yi6d7venmnpa	Test Kiosk - Westlands	Westlands Mall, 2nd Floor, Nairobi	+254700000001	2025-06-19 15:45:48.688	2025-06-19 15:45:48.688
cmc3qgdpp0000yi5rdkyrponl	Test Kiosk - Verification	Test Location for Verification	+254700000002	2025-06-19 18:47:10.958	2025-06-19 18:47:10.958
cmc4z7ciq0000yiyebn5pgxgf	Test Kiosk	Test Location	+254700000000	2025-06-20 15:39:52.227	2025-06-20 15:39:52.227
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notification" (id, "userId", "documentId", message, "createdAt", read, "updatedAt") FROM stdin;
cmc3mgnuf000cyi5p7t79eggv	cmc3mgme10004yi5py4owpcoq	cmc3jz5720002yi6dj2dtc6v2	Your document 24112039 has been successfully claimed. Payment of KES 500 received.	2025-06-19 16:55:25.623	f	2025-06-19 16:55:25.623
cmc3mv8uc000fyi5p3n91hbgx	\N	\N	Wrong claim report submitted for document 98765432. Contact request ID: cmc3mv8jq000eyi5p716891vu	2025-06-19 17:06:46.021	f	2025-06-19 17:06:46.021
cmc3mvsmq000hyi5pm3yqmh9a	\N	\N	Wrong claim report submitted for document 98765432. Contact request ID: cmc3mvshb000gyi5p19vg4nhm	2025-06-19 17:07:11.666	f	2025-06-19 17:07:11.666
cmc3n32ro000kyi5p7ntujxoj	\N	\N	Wrong claim report submitted for document 98765432. Contact request ID: cmc3n31wg000jyi5p34uksgdu	2025-06-19 17:12:51.397	f	2025-06-19 17:12:51.397
cmc3n7o7f000uyi5pn2vrufex	cmc3n7mg2000myi5pwwmpfbto	cmc0i17cm001oyidyvclgsdw2	Your document NA255560 has been successfully claimed. Payment of KES 500 received.	2025-06-19 17:16:25.804	f	2025-06-19 17:16:25.804
cmc3nlje10012yi5prfvqdk6y	cmc3mv1so0000yido2ni907z6	cmc3nklqw0001yiz9jak22pvi	Your document 12345678 has been successfully claimed. Payment of KES 500 received.	2025-06-19 17:27:12.745	f	2025-06-19 17:27:12.745
cmc3ow5zy001cyi5pg5tpz2ob	cmc3ow4gb0014yi5plxxm51m2	cmc0hl9w9001iyigob5iw9fre	Your document NA714630 has been successfully claimed. Payment of KES 500 received.	2025-06-19 18:03:28.222	f	2025-06-19 18:03:28.222
cmc3p2btg001myi5pwhnwnplt	cmc3p2a95001eyi5p6jycdj8p	cmc0i1ai60024yidy17dvihi6	Your document DR900148 has been successfully claimed. Payment of KES 500 received.	2025-06-19 18:08:15.7	f	2025-06-19 18:08:15.7
cmc3qgvdz001wyi5pb98kk7k4	cmc3mgme10004yi5py4owpcoq	cmc3qge0e0002yi5rjuoq9pq8	Your document VERIFY123 has been successfully claimed. Payment of KES 500 received.	2025-06-19 18:47:33.864	f	2025-06-19 18:47:33.864
cmc3qmmq50026yi5pdii2b8kt	cmc3p2a95001eyi5p6jycdj8p	cmc0i1941001wyidynnkfafe6	Your document PA487262 has been successfully claimed. Payment of KES 500 received.	2025-06-19 18:52:02.573	f	2025-06-19 18:52:02.573
cmc52ktle0009yihywuzl8oo0	cmc3p2a95001eyi5p6jycdj8p	cmc0i1dzz002kyidymlvzfdek	Your document OT966595 has been successfully claimed. Payment of KES 500 received.	2025-06-20 17:14:19.73	f	2025-06-20 17:14:19.73
cmc54spim0008yi6sznten00h	cmc3p2a95001eyi5p6jycdj8p	cmc0hlbgp0022yigo1zhjriik	Your document PA817574 has been successfully claimed. Payment of KES 500 received.	2025-06-20 18:16:26.927	f	2025-06-20 18:16:26.927
cmc6hkx2x0008yiwssamvnlnr	cmc53x0tf000oyihy7juu4ux5	cmc0hlbrc0026yigo4ewp1j0m	Your document OT400267 has been successfully claimed. Payment of KES 500 received.	2025-06-21 17:02:04.665	f	2025-06-21 17:02:04.665
cmc6hy121000hyiwsox2xew9g	cmc53x0tf000oyihy7juu4ux5	cmc0hl8yx0016yigo03ql4ar0	Your document BI992480 has been successfully claimed. Payment of KES 500 received.	2025-06-21 17:12:16.345	f	2025-06-21 17:12:16.345
cmc6ihsmy000ayirfp7oyjbbf	cmc6igzo50002yirf6tqewon0	cmc0i164f0018yidywlot0krf	Your document NA174398 has been successfully claimed. Payment of KES 500 received.	2025-06-21 17:27:38.555	f	2025-06-21 17:27:38.555
cmc7rsu00000kyirf0dsxep1r	cmc7rs10o000cyirf8iopism7	cmc0hlatu001uyigo3ejw7295	Your document DR208369 has been successfully claimed. Payment of KES 500 received.	2025-06-22 14:35:56.257	f	2025-06-22 14:35:56.257
cmc7rsudp000oyirf60eqoit0	cmc7rs10o000cyirf8iopism7	cmc0hlatu001uyigo3ejw7295	Your document DR208369 has been successfully claimed. Payment of KES 500 received.	2025-06-22 14:35:56.749	f	2025-06-22 14:35:56.749
cmc7vom60000byiodhfz9be48	cmc53x0tf000oyihy7juu4ux5	cmc0hl86x000wyigospqc1ugk	Your document OT389153 has been successfully claimed. Payment of KES 500 received.	2025-06-22 16:24:37.944	f	2025-06-22 16:24:37.944
cmc7vombb000dyiod55ajp97w	cmc53x0tf000oyihy7juu4ux5	cmc0hl86x000wyigospqc1ugk	Your document OT389153 has been successfully claimed. Payment of KES 500 received.	2025-06-22 16:24:38.136	f	2025-06-22 16:24:38.136
\.


--
-- Data for Name: OTP; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OTP" (id, phone, code, "expiresAt", used, "createdAt", "userId") FROM stdin;
cmc7vmqi70001yiodcp06vjo3	+254721917234	768611	2025-06-22 16:33:10.254	t	2025-06-22 16:23:10.256	\N
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Payment" (id, "userId", "documentId", amount, currency, "paymentMethod", status, "mpesaRequestId", "mpesaCheckoutId", "phoneNumber", description, metadata, "createdAt", "updatedAt") FROM stdin;
cmc3mgmoq0006yi5p1r54vl18	cmc3mgme10004yi5py4owpcoq	cmc3jz5720002yi6dj2dtc6v2	500	KES	MPESA	COMPLETED	\N	\N	+254700000000	Document claim payment for 24112039	{"claimType": "document_claim", "documentType": "NATIONAL_ID", "documentNumber": "24112039"}	2025-06-19 16:55:24.121	2025-06-19 16:55:24.121
cmc3mv2e10004yido4vkxydsb	cmc3mv1so0000yido2ni907z6	cmc3mv23c0002yidopqk1sfwp	500	KES	MPESA	COMPLETED	\N	\N	+254700000002	Document claim payment for 98765432	{"claimType": "document_claim", "documentType": "NATIONAL_ID", "documentNumber": "98765432"}	2025-06-19 17:06:37.657	2025-06-19 17:06:37.657
cmc3n7mua000oyi5puyaouyhl	cmc3n7mg2000myi5pwwmpfbto	cmc0i17cm001oyidyvclgsdw2	500	KES	MPESA	COMPLETED	\N	\N	+254733345671	Document claim payment for NA255560	{"claimType": "document_claim", "documentType": "NATIONAL_ID", "documentNumber": "NA255560"}	2025-06-19 17:16:24.035	2025-06-19 17:16:24.035
cmc3nli7g000wyi5pvh4zbbus	cmc3mv1so0000yido2ni907z6	cmc3nklqw0001yiz9jak22pvi	500	KES	MPESA	COMPLETED	\N	\N	+254700000002	Document claim payment for 12345678	{"claimType": "document_claim", "documentType": "NATIONAL_ID", "documentNumber": "12345678"}	2025-06-19 17:27:11.212	2025-06-19 17:27:11.212
cmc3ow4rq0016yi5p3r3z8de3	cmc3ow4gb0014yi5plxxm51m2	cmc0hl9w9001iyigob5iw9fre	500	KES	MPESA	COMPLETED	\N	\N	+254788828222	Document claim payment for NA714630	{"claimType": "document_claim", "documentType": "NATIONAL_ID", "documentNumber": "NA714630"}	2025-06-19 18:03:26.63	2025-06-19 18:03:26.63
cmc3p2akk001gyi5pw12xory9	cmc3p2a95001eyi5p6jycdj8p	cmc0i1ai60024yidy17dvihi6	500	KES	MPESA	COMPLETED	\N	\N	+254718281828	Document claim payment for DR900148	{"claimType": "document_claim", "documentType": "DRIVING_LICENSE", "documentNumber": "DR900148"}	2025-06-19 18:08:14.084	2025-06-19 18:08:14.084
cmc3qgu7r001qyi5pjgz9ax0r	cmc3mgme10004yi5py4owpcoq	cmc3qge0e0002yi5rjuoq9pq8	500	KES	MPESA	COMPLETED	\N	\N	254632789092	Document claim payment for VERIFY123	{"claimType": "document_claim", "documentType": "NATIONAL_ID", "documentNumber": "VERIFY123"}	2025-06-19 18:47:32.343	2025-06-19 18:47:32.343
cmc3qmlii0020yi5p233egvc5	cmc3p2a95001eyi5p6jycdj8p	cmc0i1941001wyidynnkfafe6	500	KES	MPESA	COMPLETED	\N	\N	+254721912888	Document claim payment for PA487262	{"claimType": "document_claim", "documentType": "PASSPORT", "documentNumber": "PA487262"}	2025-06-19 18:52:01.003	2025-06-19 18:52:01.003
cmc52ksel0003yihywxc68o6d	cmc3p2a95001eyi5p6jycdj8p	cmc0i1dzz002kyidymlvzfdek	500	KES	MPESA	COMPLETED	\N	\N	+254918221222	Document claim payment for OT966595	{"claimType": "document_claim", "documentType": "OTHER", "documentNumber": "OT966595"}	2025-06-20 17:14:18.188	2025-06-20 17:14:18.188
cmc54snyi0002yi6szjnxww8p	cmc3p2a95001eyi5p6jycdj8p	cmc0hlbgp0022yigo1zhjriik	500	KES	MPESA	COMPLETED	\N	\N	+254721917234	Document claim payment for PA817574	{"claimType": "document_claim", "documentType": "PASSPORT", "documentNumber": "PA817574"}	2025-06-20 18:16:24.906	2025-06-20 18:16:24.906
cmc6hk4nu0002yiws6jqo162f	cmc53x0tf000oyihy7juu4ux5	cmc0hlbrc0026yigo4ewp1j0m	500	KES	MPESA	COMPLETED	\N	\N	+254721917234	Document claim payment for OT400267	{"claimType": "document_claim", "documentType": "OTHER", "documentNumber": "OT400267"}	2025-06-21 17:01:27.834	2025-06-21 17:02:03.534
cmc6hx9gc000byiwsttcxoudj	cmc53x0tf000oyihy7juu4ux5	cmc0hl8yx0016yigo03ql4ar0	500	KES	MPESA	COMPLETED	\N	\N	+254721917234	Document claim payment for BI992480	{"claimType": "document_claim", "documentType": "BIRTH_CERTIFICATE", "documentNumber": "BI992480"}	2025-06-21 17:11:40.573	2025-06-21 17:12:15.229
cmc6igzyn0004yirfxm6xf9ln	cmc6igzo50002yirf6tqewon0	cmc0i164f0018yidywlot0krf	500	KES	MPESA	COMPLETED	\N	\N	+254721987288	Document claim payment for NA174398	{"claimType": "document_claim", "documentType": "NATIONAL_ID", "documentNumber": "NA174398"}	2025-06-21 17:27:01.391	2025-06-21 17:27:37.336
cmc7rs261000eyirfxjdmlgpx	cmc7rs10o000cyirf8iopism7	cmc0hlatu001uyigo3ejw7295	500	KES	MPESA	COMPLETED	\N	\N	+254767982901	Document claim payment for DR208369	{"claimType": "document_claim", "documentType": "DRIVING_LICENSE", "documentNumber": "DR208369"}	2025-06-22 14:35:20.185	2025-06-22 14:35:55.767
cmc7vnset0003yiodu22m7dzb	cmc53x0tf000oyihy7juu4ux5	cmc0hl86x000wyigospqc1ugk	500	KES	MPESA	COMPLETED	\N	\N	+254721917234	Document claim payment for OT389153	{"claimType": "document_claim", "documentType": "OTHER", "documentNumber": "OT389153"}	2025-06-22 16:23:59.38	2025-06-22 16:24:36.502
\.


--
-- Data for Name: SMSLog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SMSLog" (id, phone, "messageType", success, "messageId", error, cost, environment, "createdAt") FROM stdin;
cmd31r2bo0000yieaqkbhprlx	254721917234	phone_verification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	production	2025-07-14 11:55:21.348
cmd31r6tw0001yiean20j5g5v	254721917234	id_found_notification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	production	2025-07-14 11:55:27.188
cmd31r9fn0002yieanpxa65zi	254733323506	phone_verification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	production	2025-07-14 11:55:30.563
cmd31reb30003yieau6gt5kvw	254733323506	id_found_notification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	production	2025-07-14 11:55:36.688
cmd33pohb0004yiealff5h84q	254721917234	phone_verification	f	\N	Invalid response format	\N	production	2025-07-14 12:50:14.258
cmd33pvkr0005yiea5z78br3v	254721917234	id_found_notification	f	\N	Invalid response format	\N	production	2025-07-14 12:50:25.18
cmd33q67e0006yieat7htywqc	254733323506	phone_verification	f	\N	Invalid response format	\N	production	2025-07-14 12:50:38.764
cmd33q8tt0007yieavpxest7z	254733323506	id_found_notification	f	\N	Invalid response format	\N	production	2025-07-14 12:50:42.353
cmd33rmv80008yieagl5mo7zj	254721917234	phone_verification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 12:51:47.016
cmd33rqfg0009yiearxn8vi75	254721917234	id_found_notification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 12:51:51.82
cmd33rt28000ayieawvglgvm9	254733323506	phone_verification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 12:51:55.233
cmd33rxty000byieayqnz3v7i	254733323506	id_found_notification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 12:52:01.414
cmd354i38000cyiearnjjqs06	254721917234	phone_verification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	production	2025-07-14 13:29:45.074
cmd354loo000dyieaxmajm89f	254721917234	id_found_notification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	production	2025-07-14 13:29:51.816
cmd354ocu000eyiea73htjlk4	254733323506	phone_verification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	production	2025-07-14 13:29:55.278
cmd354qzw000fyieaehze5m4g	254733323506	id_found_notification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	production	2025-07-14 13:29:58.7
cmd35728c000gyieajf2aof3x	254721917234	phone_verification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	production	2025-07-14 13:31:46.354
cmd35750p000hyieam032el8y	254721917234	id_found_notification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	production	2025-07-14 13:31:50.185
cmd3577m2000iyieahe9kfvlk	254733323506	phone_verification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	production	2025-07-14 13:31:53.547
cmd357a84000jyieas3rb746a	254733323506	id_found_notification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	production	2025-07-14 13:31:56.932
cmd35r9pv000kyieaeal9wavb	254721917234	phone_verification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	sandbox	2025-07-14 13:47:27.856
cmd35rgse000lyieaxb2ikaci	254721917234	id_found_notification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	sandbox	2025-07-14 13:47:38.558
cmd35rjeb000myieavm0nfdjv	254733323506	phone_verification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	sandbox	2025-07-14 13:47:41.939
cmd35rr6j000nyiean0p155ht	254733323506	id_found_notification	f	\N	Invalid API credentials - please check your Africa's Talking API key and username	\N	sandbox	2025-07-14 13:47:51.832
cmd36u7b7000oyieaxlmy9yny	254721917234	phone_verification	f	\N	SMS service returned XML error	\N	sandbox	2025-07-14 14:17:44.277
cmd36ua4z000pyiea92o87p1n	254721917234	id_found_notification	f	\N	SMS service returned XML error	\N	sandbox	2025-07-14 14:17:49.524
cmd36ucwy000qyieafy7omusd	254733323506	phone_verification	f	\N	SMS service returned XML error	\N	sandbox	2025-07-14 14:17:53.122
cmd36ufkk000ryieayac3lu9h	254733323506	id_found_notification	f	\N	SMS service returned XML error	\N	sandbox	2025-07-14 14:17:56.565
cmd36z70k000syieahpq5if09	254721917234	phone_verification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 14:21:38.573
cmd36za5t000tyiea3f0g4jiz	254721917234	id_found_notification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 14:21:42.834
cmd36zcra000uyiea4iz3y1ya	254733323506	phone_verification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 14:21:46.198
cmd36zj7e000vyiear3txua1a	254733323506	id_found_notification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 14:21:54.371
cmd370g8w000wyieam9z3msr4	254721917234	phone_verification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 14:22:37.158
cmd370j2h000xyieavof8gui9	254721917234	id_found_notification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 14:22:41.034
cmd370pqw000yyiea6v3u3cy3	254733323506	phone_verification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 14:22:49.688
cmd370sho000zyieapcun0q1e	254733323506	id_found_notification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 14:22:53.058
cmd37b9mi0010yieah38oruyf	254721917234	phone_verification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 14:31:00.389
cmd37bcml0011yieae2s2yycs	254721917234	id_found_notification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 14:31:05.902
cmd37biuu0012yiea92fin8mp	254733323506	phone_verification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 14:31:13.975
cmd37blnp0013yiea7bn5in0t	254733323506	id_found_notification	f	\N	Invalid Sender ID - please verify your sender ID is approved	\N	production	2025-07-14 14:31:17.396
cmd37fkje0014yieapf2gyefr	254721917234	phone_verification	f	\N	Invalid Sender ID	\N	production	2025-07-14 14:34:22.59
cmd37fnxc0015yieaifiqtd91	254721917234	id_found_notification	f	\N	Invalid Sender ID	\N	production	2025-07-14 14:34:27.168
cmd37fql10016yieagi2ksxxm	254733323506	phone_verification	f	\N	Invalid Sender ID	\N	production	2025-07-14 14:34:30.614
cmd37fwmf0017yieaz8zaepqz	254733323506	id_found_notification	f	\N	Invalid Sender ID	\N	production	2025-07-14 14:34:38.247
\.


--
-- Data for Name: Transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Transaction" (id, "paymentId", "mpesaRequestId", "mpesaCheckoutId", "transactionType", status, amount, "phoneNumber", description, metadata, "errorCode", "errorMessage", "createdAt", "updatedAt") FROM stdin;
cmc3mgmz90008yi5pyppeajyr	cmc3mgmoq0006yi5p1r54vl18	\N	\N	STK_PUSH	SUCCESS	500	+254700000000	MPESA payment for document claim - 24112039	{"mpesaRequestId": "TEST_1750352124500", "mpesaCheckoutId": "TEST_CHECKOUT_1750352124500"}	\N	\N	2025-06-19 16:55:24.501	2025-06-19 16:55:24.501
cmc3mv2os0006yidogltv7w4i	cmc3mv2e10004yido4vkxydsb	\N	\N	STK_PUSH	SUCCESS	500	+254700000002	MPESA payment for document claim - 98765432	{"mpesaRequestId": "TEST_1750352798044", "mpesaCheckoutId": "TEST_CHECKOUT_1750352798044"}	\N	\N	2025-06-19 17:06:38.045	2025-06-19 17:06:38.045
cmc3n7nae000qyi5ph15u6y64	cmc3n7mua000oyi5puyaouyhl	\N	\N	STK_PUSH	SUCCESS	500	+254733345671	MPESA payment for document claim - NA255560	{"mpesaRequestId": "TEST_1750353384425", "mpesaCheckoutId": "TEST_CHECKOUT_1750353384425"}	\N	\N	2025-06-19 17:16:24.427	2025-06-19 17:16:24.427
cmc3nlii2000yyi5p5gndnvcr	cmc3nli7g000wyi5pvh4zbbus	\N	\N	STK_PUSH	SUCCESS	500	+254700000002	MPESA payment for document claim - 12345678	{"mpesaRequestId": "TEST_1750354031593", "mpesaCheckoutId": "TEST_CHECKOUT_1750354031593"}	\N	\N	2025-06-19 17:27:11.594	2025-06-19 17:27:11.594
cmc3ow52n0018yi5ppxk3ro0r	cmc3ow4rq0016yi5p3r3z8de3	\N	\N	STK_PUSH	SUCCESS	500	+254788828222	MPESA payment for document claim - NA714630	{"mpesaRequestId": "TEST_1750356207021", "mpesaCheckoutId": "TEST_CHECKOUT_1750356207021"}	\N	\N	2025-06-19 18:03:27.023	2025-06-19 18:03:27.023
cmc3p2avs001iyi5ptzk7yvxr	cmc3p2akk001gyi5pw12xory9	\N	\N	STK_PUSH	SUCCESS	500	+254718281828	MPESA payment for document claim - DR900148	{"mpesaRequestId": "TEST_1750356494487", "mpesaCheckoutId": "TEST_CHECKOUT_1750356494487"}	\N	\N	2025-06-19 18:08:14.488	2025-06-19 18:08:14.488
cmc3qguic001syi5picd4j3bj	cmc3qgu7r001qyi5pjgz9ax0r	\N	\N	STK_PUSH	SUCCESS	500	254632789092	MPESA payment for document claim - VERIFY123	{"mpesaRequestId": "TEST_1750358852722", "mpesaCheckoutId": "TEST_CHECKOUT_1750358852722"}	\N	\N	2025-06-19 18:47:32.724	2025-06-19 18:47:32.724
cmc3qmltb0022yi5ptfz1fi7g	cmc3qmlii0020yi5p233egvc5	\N	\N	STK_PUSH	SUCCESS	500	+254721912888	MPESA payment for document claim - PA487262	{"mpesaRequestId": "TEST_1750359121390", "mpesaCheckoutId": "TEST_CHECKOUT_1750359121390"}	\N	\N	2025-06-19 18:52:01.391	2025-06-19 18:52:01.391
cmc52ksp40005yihy2ma8wgqa	cmc52ksel0003yihywxc68o6d	\N	\N	STK_PUSH	SUCCESS	500	+254918221222	MPESA payment for document claim - OT966595	{"mpesaRequestId": "TEST_1750439658567", "mpesaCheckoutId": "TEST_CHECKOUT_1750439658567"}	\N	\N	2025-06-20 17:14:18.568	2025-06-20 17:14:18.568
cmc54so9a0004yi6sfrvi4805	cmc54snyi0002yi6szjnxww8p	\N	\N	STK_PUSH	SUCCESS	500	+254721917234	MPESA payment for document claim - PA817574	{"mpesaRequestId": "TEST_1750443385292", "mpesaCheckoutId": "TEST_CHECKOUT_1750443385292"}	\N	\N	2025-06-20 18:16:25.294	2025-06-20 18:16:25.294
cmc6hk4ye0004yiwsvw9v3yd3	cmc6hk4nu0002yiws6jqo162f	\N	\N	STK_PUSH	SUCCESS	500	+254721917234	Document claim payment for OT400267	{"completedAt": "2025-06-21T17:02:03.158Z", "mpesaRequestId": "MPESA_1750525288212_o1638n3bz", "mpesaCheckoutId": "CHECKOUT_1750525323158"}	\N	\N	2025-06-21 17:01:28.214	2025-06-21 17:02:03.16
cmc6hx9r2000dyiws2fxjcacd	cmc6hx9gc000byiwsttcxoudj	\N	\N	STK_PUSH	SUCCESS	500	+254721917234	Document claim payment for BI992480	{"completedAt": "2025-06-21T17:12:14.854Z", "mpesaRequestId": "MPESA_1750525900957_clmvp6uqj", "mpesaCheckoutId": "CHECKOUT_1750525934854"}	\N	\N	2025-06-21 17:11:40.958	2025-06-21 17:12:14.855
cmc6ih0990006yirfprppd3df	cmc6igzyn0004yirfxm6xf9ln	\N	\N	STK_PUSH	SUCCESS	500	+254721987288	Document claim payment for NA174398	{"completedAt": "2025-06-21T17:27:36.953Z", "mpesaRequestId": "MPESA_1750526821772_9lkc5gefc", "mpesaCheckoutId": "CHECKOUT_1750526856953"}	\N	\N	2025-06-21 17:27:01.774	2025-06-21 17:27:36.954
cmc7rs2ku000gyirfoasuz062	cmc7rs261000eyirfxjdmlgpx	\N	\N	STK_PUSH	SUCCESS	500	+254767982901	Document claim payment for DR208369	{"completedAt": "2025-06-22T14:35:55.441Z", "mpesaRequestId": "MPESA_1750602920717_9jccsgrft", "mpesaCheckoutId": "CHECKOUT_1750602955441"}	\N	\N	2025-06-22 14:35:20.718	2025-06-22 14:35:55.442
cmc7vnspb0005yiodyk9jfeeo	cmc7vnset0003yiodu22m7dzb	\N	\N	STK_PUSH	SUCCESS	500	+254721917234	Document claim payment for OT389153	{"completedAt": "2025-06-22T16:24:35.989Z", "mpesaRequestId": "MPESA_1750609439758_dy45z4cbk", "mpesaCheckoutId": "CHECKOUT_1750609475989"}	\N	\N	2025-06-22 16:23:59.759	2025-06-22 16:24:35.99
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, "emailVerified", image, phone, role, "createdAt", "updatedAt", password, status, provider, "providerId") FROM stdin;
cmc0h649e0000yi03cj2j7q0c	Admin User 1	admin1@nipeid.com	\N	\N	\N	ADMIN	2025-06-17 12:03:57.074	2025-06-17 12:03:57.074	$2b$10$o1Ocwl7Qambdji8Bve9GRuIImbpp0WU/5Kzqs.3/oMqVrmhsTp2i.	ACTIVE	\N	\N
cmc0h65ad0001yi03tvr6geh7	Admin User 2	admin2@nipeid.com	\N	\N	\N	ADMIN	2025-06-17 12:03:58.405	2025-06-17 12:03:58.405	$2b$10$WHVZB9X9mp.C5qDDFD5uVuUznRgMQmLQF01gnfAhqYbJ0HalZ0q9K	ACTIVE	\N	\N
cmc0h65xx0002yi03riv4e6xy	Admin User 3	admin3@nipeid.com	\N	\N	\N	ADMIN	2025-06-17 12:03:59.253	2025-06-17 12:03:59.253	$2b$10$lE9AkM/ixpjCfUym27mUsu.njkrEMkib0Gm1lYwQpku1JTD7fYrFS	ACTIVE	\N	\N
cmc0h66mq0003yi03csxrdx6l	Admin User 4	admin4@nipeid.com	\N	\N	\N	ADMIN	2025-06-17 12:04:00.147	2025-06-17 12:04:00.147	$2b$10$mtgPI29r7aXKkILlYRVocuVKVpZvAzDIiS4J4edmmNt41hPTgGiRy	ACTIVE	\N	\N
cmc0h67bn0004yi03xiri79y0	Admin User 5	admin5@nipeid.com	\N	\N	\N	ADMIN	2025-06-17 12:04:01.044	2025-06-17 12:04:01.044	$2b$10$pDZpi9F7rIvsZJaaVwdUB.u45qCNG3/19d/pYy8Zl/vWRiwBPY3sC	ACTIVE	\N	\N
cmc0h680u0005yi03btxuxebi	Poster User 1	poster1@nipeid.com	\N	\N	\N	POSTER	2025-06-17 12:04:01.951	2025-06-17 12:04:01.951	$2b$10$GYY69ypYa0ZEKYpQXPVCSuJ6tc.KN18CfyHvj6bb2ksmTdM/QtNHe	ACTIVE	\N	\N
cmc0h68q00006yi036bb6cymk	Poster User 2	poster2@nipeid.com	\N	\N	\N	POSTER	2025-06-17 12:04:02.857	2025-06-17 12:04:02.857	$2b$10$SadHoVQQGT9wWvtsEh5Izube4GIaej/PEL9KXc6INoco2wmv49QdS	ACTIVE	\N	\N
cmc0h69ec0007yi03jnoemce0	Poster User 3	poster3@nipeid.com	\N	\N	\N	POSTER	2025-06-17 12:04:03.733	2025-06-17 12:04:03.733	$2b$10$3.S5cbpCXEfkeQ48Z2E7zuTdb/vlpgeABTTUDquTVdvy8MGqnbA1y	ACTIVE	\N	\N
cmc0h6a2i0008yi0374gswlsn	Poster User 4	poster4@nipeid.com	\N	\N	\N	POSTER	2025-06-17 12:04:04.602	2025-06-17 12:04:04.602	$2b$10$D0EuyABfQck9jEaalKow9eByzBBCMrY9NKVac7ryfC14C3fdi/HYi	ACTIVE	\N	\N
cmc0h6aq20009yi03s2p7tewm	Poster User 5	poster5@nipeid.com	\N	\N	\N	POSTER	2025-06-17 12:04:05.451	2025-06-17 12:04:05.451	$2b$10$PPKk3PZUK4Vw5X4VeV6rJe1E8k6z8.IN/sXD7C56rfTmQx5crqLdG	ACTIVE	\N	\N
cmc0h6be6000ayi030887xetd	Kiosk Manager 1	kioskmanager1@nipeid.com	\N	\N	\N	KIOSK_MANAGER	2025-06-17 12:04:06.318	2025-06-17 12:04:06.318	$2b$10$X5Ah5dNFFS7i41h6IeodWuCdpEd2Pvf1M6iIk6rlDvHw.73rKLF72	ACTIVE	\N	\N
cmc0h6c2n000byi03doxtety8	Kiosk Manager 2	kioskmanager2@nipeid.com	\N	\N	\N	KIOSK_MANAGER	2025-06-17 12:04:07.2	2025-06-17 12:04:07.2	$2b$10$dVi0B0WCHd2lROGHrT6baOyyzHPtXfEKqG4YQRv/JiaJoQ/6Fc0.q	ACTIVE	\N	\N
cmc0h6cry000cyi032n91i3fq	Kiosk Manager 3	kioskmanager3@nipeid.com	\N	\N	\N	KIOSK_MANAGER	2025-06-17 12:04:08.11	2025-06-17 12:04:08.11	$2b$10$GN8pt2HUf4/2zeK5USTpl.V13YQ0zzWvNEIT8ThCl4PIjRX0S7yGi	ACTIVE	\N	\N
cmc0h6dgw000dyi03sgnrypoo	Kiosk Manager 4	kioskmanager4@nipeid.com	\N	\N	\N	KIOSK_MANAGER	2025-06-17 12:04:09.009	2025-06-17 12:04:09.009	$2b$10$ZwSo0wHaEAgmerZp6Liu0O5zt8Cnd3joU.3Q60lCE3diQqwPLGQMu	ACTIVE	\N	\N
cmc0h6e6k000eyi03as0ijk8x	Kiosk Manager 5	kioskmanager5@nipeid.com	\N	\N	\N	KIOSK_MANAGER	2025-06-17 12:04:09.933	2025-06-17 12:04:09.933	$2b$10$rFkWoa4JVOY81TM1aY093.x3PGVAFY2PUbwB4U9jMhaXCr.ia0kj.	ACTIVE	\N	\N
cmc0h6eve000fyi03akrxr66w	User 1	user1@nipeid.com	\N	\N	\N	USER	2025-06-17 12:04:10.827	2025-06-17 12:04:10.827	$2b$10$rdb3Xg5HjO3ib/g9.gaG2ec/Ob9uEYXk1Gk3c1ayac19V5sQTL0x6	ACTIVE	\N	\N
cmc0h6fjx000gyi03cove0rf3	User 2	user2@nipeid.com	\N	\N	\N	USER	2025-06-17 12:04:11.709	2025-06-17 12:04:11.709	$2b$10$2CogeePzcdSHYH1ZTy2BEuOrxV/HcgOl8CbwHs3w2VrGVxCOPhYc6	ACTIVE	\N	\N
cmc0h6ge2000hyi033xyz5ayv	User 3	user3@nipeid.com	\N	\N	\N	USER	2025-06-17 12:04:12.566	2025-06-17 12:04:12.566	$2b$10$ckST2q0qQejm2ngoIsKtxeOpsdybBK8NUvsZxkPvJoZi2CsuoxAk6	ACTIVE	\N	\N
cmc0h6h2z000iyi032u7e568d	User 4	user4@nipeid.com	\N	\N	\N	USER	2025-06-17 12:04:13.692	2025-06-17 12:04:13.692	$2b$10$23B9aTcwNqCIBkrCnhex5enRuNMo0etXfBSHJfI39TWwOq84uIfrW	ACTIVE	\N	\N
cmc0h6hs6000jyi032iyxaug2	User 5	user5@nipeid.com	\N	\N	\N	USER	2025-06-17 12:04:14.598	2025-06-17 12:04:14.598	$2b$10$AEYJ2VbTpCXh7DZZ/jYHt.1vMF7.gaO7r0H4lUeWkI0B3ytMJsYRa	ACTIVE	\N	\N
cmc0h6ihh000kyi03v3c56zl9	User 6	user6@nipeid.com	\N	\N	\N	USER	2025-06-17 12:04:15.51	2025-06-17 12:04:15.51	$2b$10$HbJKil/YGdwhODAfUunxnOzcVsxhk0sXvW6SOhBdVt2/X3ld9rPvy	ACTIVE	\N	\N
cmc0h6j6h000lyi03a9toyvk5	User 7	user7@nipeid.com	\N	\N	\N	USER	2025-06-17 12:04:16.409	2025-06-17 12:04:16.409	$2b$10$tw1zrvE7K4KW4onYvumVa.49JVOOzVPv6a49bqmrnAJGtSX9mQSUm	ACTIVE	\N	\N
cmc0h6jv0000myi03an16iako	User 8	user8@nipeid.com	\N	\N	\N	USER	2025-06-17 12:04:17.293	2025-06-17 12:04:17.293	$2b$10$nL23jd4YikTtJsv2PMB1l.2s65tmgmDkdGaD7ModKt4ZTghsP7m5u	ACTIVE	\N	\N
cmc0h6kkf000nyi03dm2ltgyy	User 9	user9@nipeid.com	\N	\N	\N	USER	2025-06-17 12:04:18.207	2025-06-17 12:04:18.207	$2b$10$s.PG4x83KwA82FaX3GSscuER723gvpCJnxGZdQf2TJE8C2w8p6RcG	ACTIVE	\N	\N
cmc0h6l9a000oyi03g582sx4z	User 10	user10@nipeid.com	\N	\N	\N	USER	2025-06-17 12:04:19.102	2025-06-17 12:04:19.102	$2b$10$WhMpvPJN.JOWIpStbzYQXe/MHqZbJBizMGG2UHSCQ2flIF.Iaq1NW	ACTIVE	\N	\N
cmc0sdw3o0000yihpwysfzuur	\N	\N	\N	\N	0721917234	USER	2025-06-17 17:17:55.525	2025-06-17 17:17:55.525	\N	ACTIVE	\N	\N
cmc3n7mg2000myi5pwwmpfbto	Peter Harris	harris@gmail.com	\N	\N	+254733345671	USER	2025-06-19 17:16:23.522	2025-06-19 17:16:23.522	\N	ACTIVE	\N	\N
cmc3mv1so0000yido2ni907z6	John Doe	alice@example.com	\N	\N	+254700000002	USER	2025-06-19 17:06:36.888	2025-06-19 17:27:10.833	\N	ACTIVE	\N	\N
cmc3ow4gb0014yi5plxxm51m2	Peter Garcia	garcia@gmail.com	\N	\N	+254788828222	USER	2025-06-19 18:03:26.219	2025-06-19 18:03:26.219	\N	ACTIVE	\N	\N
cmc3mgme10004yi5py4owpcoq	TIMOTHY NYOTA	test@example.com	\N	\N	254632789092	USER	2025-06-19 16:55:23.737	2025-06-19 18:47:31.943	\N	ACTIVE	\N	\N
cmc4z81if0000yizgl5j4x9zd	Test Poster	test-poster@nipeid.com	\N	\N	+254700000000	POSTER	2025-06-20 15:40:24.616	2025-06-20 15:40:24.616	\N	ACTIVE	\N	\N
cmc4ziwqz0002yiqk82g9b4dl	\N	\N	\N	\N	254708374149	USER	2025-06-20 15:48:51.659	2025-06-20 15:48:51.659	\N	ACTIVE	\N	\N
cmc52pb2b000dyihyjsagysvt	\N	\N	\N	\N	254700000001	USER	2025-06-20 17:17:48.996	2025-06-20 17:17:48.996	\N	ACTIVE	\N	\N
cmc536h4a000gyihykovmgu28	\N	\N	\N	\N	254700000002	USER	2025-06-20 17:31:09.994	2025-06-20 17:31:09.994	\N	ACTIVE	\N	\N
cmc53e3iw000jyihy1b2f7kse	\N	\N	\N	\N	254700000003	USER	2025-06-20 17:37:05.624	2025-06-20 17:37:05.624	\N	ACTIVE	\N	\N
cmc53ryy5000myihyiq3ezsfj	\N	\N	\N	\N	254700000004	USER	2025-06-20 17:47:52.877	2025-06-20 17:47:52.877	\N	ACTIVE	\N	\N
cmc53x0tf000oyihy7juu4ux5	\N	\N	\N	\N	+254721917234	USER	2025-06-20 17:51:48.58	2025-06-20 17:51:48.58	\N	ACTIVE	\N	\N
cmc3p2a95001eyi5p6jycdj8p	Anna Anderson	nyotatimothy@gmail.com	\N	\N	+254721917234	USER	2025-06-19 18:08:13.673	2025-06-20 18:16:24.5	\N	ACTIVE	\N	\N
cmc6igrn10001yirfk5x5hzqc	\N	\N	\N	\N	+254782762788	USER	2025-06-21 17:26:50.605	2025-06-21 17:26:50.605	\N	ACTIVE	\N	\N
cmc6igzo50002yirf6tqewon0	Grace Miller	\N	\N	\N	+254721987288	USER	2025-06-21 17:27:01.014	2025-06-21 17:27:01.014	\N	ACTIVE	\N	\N
cmc7rs10o000cyirf8iopism7	Mary White	\N	\N	\N	+254767982901	USER	2025-06-22 14:35:18.696	2025-06-22 14:35:18.696	\N	ACTIVE	\N	\N
\.


--
-- Data for Name: _KioskManagers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_KioskManagers" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
9c53af8a-3397-4b62-978f-0867d1427d37	77667ba36fa55e28d546cea60f7755fd8efce626dadc514e758da3ffeaf14b33	2025-06-17 12:03:45.324728+00	20250523160959_add_kiosk_name_unique	\N	\N	2025-06-17 12:03:44.32806+00	1
a3a38067-0e45-4ab3-92b0-24c72a3b77b9	ca9e0a3b11c1acebd427b028744a63ea379d89628a73dac805b49c0dfeb09048	2025-06-17 12:03:46.557691+00	20250526122549_add_auth_and_status	\N	\N	2025-06-17 12:03:45.696547+00	1
b14350de-bfd5-4929-adb6-1d77ec533d2d	f8c8b09296981c48ed15f50f2184b2a2ee1813f783afd3c0dea79aeb2f282a1e	2025-06-17 12:03:47.74529+00	20250527085916_add_detailed_kiosk_info	\N	\N	2025-06-17 12:03:46.898403+00	1
4caaa091-202a-4ec3-acc6-0a82bbcc5bde	9e10c6dd31e1f0be20ce39bcb73e046347d406538159e71620afe38baa9f7531	2025-06-17 12:03:48.959688+00	20250527115423_add_document_found_notifications	\N	\N	2025-06-17 12:03:48.103903+00	1
f6f56eb4-87ae-4b0b-8aa5-15003ebe9490	8382b9aea1eec6a8731881fa12058ca99243e6ec5abf6d4f1e680bf5743170c6	2025-06-17 12:03:50.189748+00	20250527125448_add_document_type_to_contact_request	\N	\N	2025-06-17 12:03:49.301693+00	1
24255447-823d-4632-98c1-0878e7a584b5	d3e9f384d6b5191b0f8b5c4c24ef4573f80e58ca224acc87104e10dfaa0fc12e	2025-06-17 12:03:51.36924+00	20250527144315_add_document_type	\N	\N	2025-06-17 12:03:50.524693+00	1
9ab8d461-588f-44e6-916f-b1b908b65aea	d048c1249fe9ca1a582c043a2e54c85ec469436098b9db0a0a9dc3924433eb95	2025-06-17 12:03:53.001785+00	20250605132309_add_social_login_fields	\N	\N	2025-06-17 12:03:51.972765+00	1
9d9d2ccf-f09c-43c9-9058-7eb430745be1	fcb6a6302aebb6a0651199712f172e3dc8cc3066a45bb483737ada50da3a485e	2025-06-17 12:03:54.240328+00	20250613192834_add_support_ticket	\N	\N	2025-06-17 12:03:53.351655+00	1
0a3df6d1-07be-4c62-93eb-8ef8bf018b79	1fca96a4cadd8cccc255ef713646cfb2dad357fd0e83ff3cdba11fe8cb9475c6	2025-06-17 12:13:33.566094+00	20250617121323_add_date_of_birth_to_document	\N	\N	2025-06-17 12:13:32.545608+00	1
da28ae93-9bf2-455a-9945-ecd6c808b828	50b50a6575343097a513fa43af6e27f0363ff6d4210f0c725ee2ceee368cd0a4	2025-06-17 16:28:28.833966+00	20250617162812_add_otp_model	\N	\N	2025-06-17 16:28:26.581571+00	1
\.


--
-- Name: ContactRequest ContactRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactRequest"
    ADD CONSTRAINT "ContactRequest_pkey" PRIMARY KEY (id);


--
-- Name: Dispute Dispute_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dispute"
    ADD CONSTRAINT "Dispute_pkey" PRIMARY KEY (id);


--
-- Name: DocumentStatusHistory DocumentStatusHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DocumentStatusHistory"
    ADD CONSTRAINT "DocumentStatusHistory_pkey" PRIMARY KEY (id);


--
-- Name: Document Document_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_pkey" PRIMARY KEY (id);


--
-- Name: Kiosk Kiosk_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Kiosk"
    ADD CONSTRAINT "Kiosk_pkey" PRIMARY KEY (id);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- Name: OTP OTP_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OTP"
    ADD CONSTRAINT "OTP_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: SMSLog SMSLog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SMSLog"
    ADD CONSTRAINT "SMSLog_pkey" PRIMARY KEY (id);


--
-- Name: Transaction Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _KioskManagers _KioskManagers_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_KioskManagers"
    ADD CONSTRAINT "_KioskManagers_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Document_documentNumber_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Document_documentNumber_key" ON public."Document" USING btree ("documentNumber");


--
-- Name: Payment_mpesaCheckoutId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Payment_mpesaCheckoutId_key" ON public."Payment" USING btree ("mpesaCheckoutId");


--
-- Name: Payment_mpesaRequestId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Payment_mpesaRequestId_key" ON public."Payment" USING btree ("mpesaRequestId");


--
-- Name: Transaction_mpesaCheckoutId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Transaction_mpesaCheckoutId_key" ON public."Transaction" USING btree ("mpesaCheckoutId");


--
-- Name: Transaction_mpesaRequestId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Transaction_mpesaRequestId_key" ON public."Transaction" USING btree ("mpesaRequestId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _KioskManagers_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_KioskManagers_B_index" ON public."_KioskManagers" USING btree ("B");


--
-- Name: ContactRequest ContactRequest_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactRequest"
    ADD CONSTRAINT "ContactRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Dispute Dispute_documentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dispute"
    ADD CONSTRAINT "Dispute_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES public."Document"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Dispute Dispute_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dispute"
    ADD CONSTRAINT "Dispute_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DocumentStatusHistory DocumentStatusHistory_documentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DocumentStatusHistory"
    ADD CONSTRAINT "DocumentStatusHistory_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES public."Document"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DocumentStatusHistory DocumentStatusHistory_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DocumentStatusHistory"
    ADD CONSTRAINT "DocumentStatusHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Document Document_claimedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_claimedById_fkey" FOREIGN KEY ("claimedById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Document Document_kioskId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_kioskId_fkey" FOREIGN KEY ("kioskId") REFERENCES public."Kiosk"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Document Document_posterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Notification Notification_documentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES public."Document"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Notification Notification_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: OTP OTP_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OTP"
    ADD CONSTRAINT "OTP_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Payment Payment_documentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES public."Document"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Payment Payment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Transaction Transaction_paymentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES public."Payment"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _KioskManagers _KioskManagers_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_KioskManagers"
    ADD CONSTRAINT "_KioskManagers_A_fkey" FOREIGN KEY ("A") REFERENCES public."Kiosk"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _KioskManagers _KioskManagers_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_KioskManagers"
    ADD CONSTRAINT "_KioskManagers_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

