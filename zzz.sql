
--
-- TOC entry 3364 (class 0 OID 16401)
-- Dependencies: 214
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public._prisma_migrations VALUES ('55a5bc03-cee0-48dd-92ec-9e47e5ddcd64', '3a912ec047589983ebe972c5b5c8ff1bcd403e9af6e5970d55419323f78a15fb', '2024-04-18 15:07:38.556381+00', '20240418150736_init', NULL, NULL, '2024-04-18 15:07:37.633921+00', 1);
INSERT INTO public._prisma_migrations VALUES ('2d3bb2eb-604a-4e92-83dd-754374c5add6', '83f698a8d17c457aac8ce37181d50adfc5cbd186b02d9692487cf5f476dad779', '2024-04-18 15:35:38.059424+00', '20240418153535_refactor_student_form', NULL, NULL, '2024-04-18 15:35:36.847696+00', 1);
INSERT INTO public._prisma_migrations VALUES ('ab0f4a67-8043-4a0d-96e2-b6c1ed5b8465', 'f71f91e806141296bb91a2984cd42b1bd16bf9e54351ee16bdca479c187f47ad', '2024-04-19 01:11:01.407185+00', '20240419011058_unique_role_name', NULL, NULL, '2024-04-19 01:10:59.882763+00', 1);


--
-- TOC entry 3365 (class 0 OID 16412)
-- Dependencies: 215
-- Data for Name: auth; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.auth VALUES ('9e9e0b65-94a6-4592-a268-382e87044d4e', '$2b$10$Jc6hNtDVVoyCGjXaDCbQrORcaNfpWS/bdG9vOA6W20yGTBAOjiTmK', '2024-04-21 13:22:53.107', '2024-04-21 13:22:53.107', NULL, NULL);
INSERT INTO public.auth VALUES ('fdad7b15-56d2-4eac-ac73-b866ab61cc54', '$2b$10$6/nU21lKVzuHhjz8iS7fKuFXYIccUBLITsuHeMB.LOGzXfv7uRXL2', '2024-04-25 20:27:14.393', '2024-04-25 20:27:14.393', NULL, NULL);
INSERT INTO public.auth VALUES ('8eb92c8b-7fc7-4f2b-ae26-d6c9491910d8', '$2b$10$MIERc7Ju7Y6rFy8rsAVI5OG1Ji1uzREoepztoaFU1yNIHgvHgVUrm', '2024-06-30 00:03:40.04', '2024-06-30 00:03:40.04', NULL, NULL);
INSERT INTO public.auth VALUES ('f1644a0d-0999-4b3f-8dac-6583025cf927', '$2b$10$8vQgOJKN4YvlfYNf/uY4He3uYz8hHArLdDy3KAvPK53goIKLrghXy', '2024-06-30 00:07:01.436', '2024-06-30 00:07:01.436', NULL, NULL);
INSERT INTO public.auth VALUES ('a695981b-e725-4249-b628-18d228c66fa3', '$2b$10$DAugYx28Ljfv2c4JPSV8V.F/eI92psTZ0j3unpzyDt7WZwjfhtbNW', '2024-07-02 13:35:22.827', '2024-07-02 13:35:22.827', NULL, '37e709dc59b14432aa41d4daecdeb311');
INSERT INTO public.auth VALUES ('d0367dc7-6c1f-429c-ad51-6b34708c42eb', '$2b$10$McuyPmecQ4rWPtiQS9r0wOgbOIkIXPJ6pFc4x6AQ0mjFMyHgdvGjq', '2024-04-19 01:48:48.944', '2024-07-03 02:56:51.843', NULL, 'be1d3876e32844b38d002f310ceea7cb');
INSERT INTO public.auth VALUES ('4fc50244-d8f7-4f37-8114-c9abc6b01b9e', '$2b$10$9v.mQwddMzMzuVfg/AEVD.Ip.0x/ZWYXMzxUNsRYmHI8h3r6gRhhS', '2024-05-23 04:05:35.363', '2024-07-03 13:41:39.507', NULL, NULL);
INSERT INTO public.auth VALUES ('6d6adf59-669f-41b5-9495-702b1713d9bf', '$2b$10$Wb0nDKKzzRqobsyxMv5ml.36ULQ5ksaEyv60cjzIkiTT1Ub2X6Jiu', '2024-05-23 04:04:48.977', '2024-07-03 13:43:17.103', NULL, NULL);
INSERT INTO public.auth VALUES ('c9bab734-d1ab-4a28-8173-e5ad19e2f10d', '$2b$10$YeiF4gUAmgXTJZcW6CIAde54Y0q/ec2TKG1BB6sYbP2zaLC1XO2oO', '2024-06-30 00:01:37.432', '2024-07-09 15:42:52.639', NULL, 'bc321600656c4cd7a47dea3463dbd6d6');

--
-- TOC entry 3367 (class 0 OID 16428)
-- Dependencies: 217
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.roles VALUES ('b4f9a913-91c1-455c-914f-8183e7789b69', 'student', '2024-04-19 01:21:46.279', '2024-04-19 01:21:46.279');
INSERT INTO public.roles VALUES ('cad24339-c81f-4d58-9cff-947a619c9915', 'business', '2024-04-19 01:21:56.062', '2024-04-19 01:21:56.062');
INSERT INTO public.roles VALUES ('d9b23304-d3dd-4de3-b97b-8b36987c556f', 'admin', '2024-04-19 01:22:09.211', '2024-04-19 01:22:09.211');


--
-- TOC entry 3376 (class 0 OID 17833)
-- Dependencies: 226
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.skills VALUES ('ec24379b-a181-42df-b295-12c9745fc284', 'MySQL', 'Base de datos relacional', '2024-05-03 19:37:02.522', '2024-05-03 19:37:02.522');
INSERT INTO public.skills VALUES ('7c6c0916-0d71-439c-9614-b3abed1ac875', 'NestJS', 'A nodejs framework for backend apps', '2024-05-03 19:47:41.205', '2024-05-03 19:47:41.205');
INSERT INTO public.skills VALUES ('ef322f15-4f90-4a24-826a-09bc3b89ad5f', 'Typescript', 'Superset of javascript', '2024-05-03 19:47:41.205', '2024-05-03 19:47:41.205');
INSERT INTO public.skills VALUES ('9d9e52ad-37f9-4d2b-b4bf-9706f33e1399', 'Javascript', 'An interpreted programming language', '2024-05-03 19:47:41.205', '2024-05-03 19:47:41.205');
INSERT INTO public.skills VALUES ('d5e4cc3e-ec99-4ac3-b7fc-6e06056fc2cb', '.NET', NULL, '2024-06-30 02:34:40.908', '2024-06-30 02:34:40.908');
INSERT INTO public.skills VALUES ('b2109218-62d8-4c84-b551-9a9668d2dd54', 'Angular', NULL, '2024-06-30 03:02:29.694', '2024-06-30 03:02:29.694');


--
-- TOC entry 3370 (class 0 OID 16452)
-- Dependencies: 220
-- Data for Name: covenants; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.covenants VALUES ('3e2914a2-9dc7-4147-9511-c2b8bfa0baa7', 'Convenio Laboral', 'Convenio Laboral', 'laboral', '2024-04-25 23:06:00.687', '2024-04-25 23:06:00.687');

--
-- TOC entry 3366 (class 0 OID 16420)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.users VALUES ('a20d43fa-e546-49c5-838f-88daa8db253a', 'mario@email.com', 'mario Alarcon', 'b4f9a913-91c1-455c-914f-8183e7789b69', 'd0367dc7-6c1f-429c-ad51-6b34708c42eb', '2024-04-19 01:48:48.555', '2024-04-19 01:48:48.555', false);
INSERT INTO public.users VALUES ('29e5a942-fab3-437e-a95b-080746eeb8ab', 'comisionpasantias@epn.edu.ec', 'Comision Admin', 'd9b23304-d3dd-4de3-b97b-8b36987c556f', '9e9e0b65-94a6-4592-a268-382e87044d4e', '2024-04-21 13:22:52.749', '2024-04-21 13:22:52.749', false);
INSERT INTO public.users VALUES ('ca62d0db-6144-4382-a47f-b0c536d197a3', 'mariobusiness@correo.ec', 'FLAC S.A', 'cad24339-c81f-4d58-9cff-947a619c9915', 'fdad7b15-56d2-4eac-ac73-b866ab61cc54', '2024-04-25 20:27:14.161', '2024-04-25 20:27:14.161', false);
INSERT INTO public.users VALUES ('562f5c5f-9136-4957-86ed-aae773a0773f', 'mario.villamar@epn.edu.ec', 'Mario Villamar', 'b4f9a913-91c1-455c-914f-8183e7789b69', 'c9bab734-d1ab-4a28-8173-e5ad19e2f10d', '2024-06-30 00:01:37.095', '2024-06-30 00:01:37.095', false);
INSERT INTO public.users VALUES ('79c8f8d3-c70a-46f8-a551-4303b496f296', 'mjvc98@hotmail.es', 'Villamar S.A', 'cad24339-c81f-4d58-9cff-947a619c9915', '8eb92c8b-7fc7-4f2b-ae26-d6c9491910d8', '2024-06-30 00:03:39.79', '2024-06-30 00:03:39.79', false);
INSERT INTO public.users VALUES ('5ac004b6-1ebf-4259-b346-d5e7ad95212f', 'mario777@jose.com', 'Villamar S.A 2', 'cad24339-c81f-4d58-9cff-947a619c9915', 'f1644a0d-0999-4b3f-8dac-6583025cf927', '2024-06-30 00:07:01.119', '2024-06-30 00:07:01.119', false);
INSERT INTO public.users VALUES ('1af35930-7ba0-4cab-ab29-604ca8c3af8a', 'leninalarcon7@gmail.com', 'mario Alarcon Cando', 'b4f9a913-91c1-455c-914f-8183e7789b69', '6d6adf59-669f-41b5-9495-702b1713d9bf', '2024-05-23 04:04:48.609', '2024-07-03 02:33:04.568', true);
INSERT INTO public.users VALUES ('a18326c0-8872-436f-8d92-460c252e0863', 'marioalarcon7@gmail.com', 'mario Alarcon Cando', 'b4f9a913-91c1-455c-914f-8183e7789b69', '4fc50244-d8f7-4f37-8114-c9abc6b01b9e', '2024-05-23 04:05:35.016', '2024-07-03 13:30:04.384', true);

--
-- TOC entry 3369 (class 0 OID 16444)
-- Dependencies: 219
-- Data for Name: businesses; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.businesses VALUES ('8a2117b9-e477-44e1-8c32-bebaa3304fa9', 'Villamar S.A 2', '2ceac2ff-05af-4cbc-bfdf-4490a2e4d832', false, '5ac004b6-1ebf-4259-b346-d5e7ad95212f', '2024-06-30 00:07:01.119', '2024-07-16 16:37:16.553', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.businesses VALUES ('0dae8470-52ed-45d6-bfc1-a7048b7ebd6a', 'Villamar S.A', '6aa0cc75-b73a-4be3-89f0-5d73bf988d4e', true, '79c8f8d3-c70a-46f8-a551-4303b496f296', '2024-06-30 00:03:39.79', '2024-06-30 20:51:19.071', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.businesses VALUES ('f0f80de1-0aec-4f72-a1e4-4af1ccd01709', 'FLAC S.A', 'a8ac30d0-8cdd-4291-a01c-bb764f7ed72f', false, 'ca62d0db-6144-4382-a47f-b0c536d197a3', '2024-04-25 20:27:14.161', '2024-07-14 04:49:41.302', 'Quito', 'Kushki es la paytech de clase mundial, que conecta a Latam con los pagos digitales y ayuda a las empresas de Latinoamérica a reducir los costos y la complejidad de las transacciones digitales, al mismo tiempo que mejora las tasas de aceptación y reduce los fraudes. Con menos de una década de existencia, Kushki ha sido clasificada dentro de la categoría Unicornio al lograr una valoración de USD $1.5 miles de millones. Kushki opera en 5 países y aprovecha los equipos locales para ofrecer soluciones personalizadas a los clientes de cada país.', '', 'Pichincha', 'Nuestra misión es conectar a latinoamérica con pagos', '84607a93-6dbc-4e6d-a396-ba346ee9b7f3.png');

--
-- TOC entry 3368 (class 0 OID 16436)
-- Dependencies: 218
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.students VALUES ('eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', 'Ingeniería en Sistemas', '35.42', 'a20d43fa-e546-49c5-838f-88daa8db253a', '2024-04-19 01:48:48.555', '2024-07-16 04:08:42.401', 'Estudiante de Ingeniería en Software con una dedicación constante al aprendizaje y la mejora continua. Mi pasión por la resolución de problemas y la creación de soluciones tecnológicas eficientes se refleja en mis habilidades en programación y desarrollo de aplicaciones web. Estoy en busca de oportunidades para aplicar y expandir mis conocimientos en un entorno colaborativo e innovador, contribuyendo al éxito de proyectos tecnológicos y al crecimiento profesional.', 'Estudiante de Ingeniería en Software | Fullstack Developer', '6543bcdc-f29c-43d5-8b69-fc728048c9c7.jpeg');
INSERT INTO public.students VALUES ('5cb1e7fd-e735-4932-a336-673d61c8c4ce', NULL, NULL, '1af35930-7ba0-4cab-ab29-604ca8c3af8a', '2024-05-23 04:04:48.609', '2024-05-23 04:04:48.609', NULL, NULL, NULL);
INSERT INTO public.students VALUES ('4b809c24-6bf0-4e9b-ac89-b561173cbe0f', NULL, NULL, 'a18326c0-8872-436f-8d92-460c252e0863', '2024-05-23 04:05:35.016', '2024-05-23 04:05:35.016', NULL, NULL, NULL);
INSERT INTO public.students VALUES ('f7f25a6e-faa1-4c24-b4e7-38bd8c197d93', 'Ingenieria en Software', '115', '562f5c5f-9136-4957-86ed-aae773a0773f', '2024-06-30 00:01:37.095', '2024-07-09 15:48:42.928', 'Estudiante de Ingeniería en Software con una dedicación constante al aprendizaje y la mejora continua. Mi pasión por la resolución de problemas y la creación de soluciones tecnológicas eficientes se refleja en mis habilidades en programación y desarrollo de aplicaciones web. Estoy en busca de oportunidades para aplicar y expandir mis conocimientos en un entorno colaborativo e innovador, contribuyendo al éxito de proyectos tecnológicos y al crecimiento profesional.

Algo que puedo resaltar de mi, es mi habilidad para adaptarme rápidamente a nuevas tecnologías y mi enfoque en resultados.Mi enfoque es siempre entregar valor a la empresa y superar mis expectativas, entregando soluciones efectivas y ayudando a impulsar la eficiencia y la innovación en la organización.', 'Desarrollador de software | Estudiante de ingeniería de Software', '80ad16f7-a55b-477f-873d-f6301bfb7fd1.jpeg');

--
-- TOC entry 3371 (class 0 OID 16460)
-- Dependencies: 221
-- Data for Name: business_covenants; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.business_covenants VALUES ('7c372d5e-6af1-4842-bef7-e412613a37e2', '2024-07-30 20:51:17.476', '2024-07-30 20:51:17.476', '0dae8470-52ed-45d6-bfc1-a7048b7ebd6a', '3e2914a2-9dc7-4147-9511-c2b8bfa0baa7', '2024-06-30 20:51:19.071', '2024-06-30 20:51:19.071');


--
-- TOC entry 3387 (class 0 OID 18077)
-- Dependencies: 237
-- Data for Name: careers; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.careers VALUES ('5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 'RRA - Software', NULL, '2024-06-18 01:56:39.387', '2024-06-18 01:56:39.387');
INSERT INTO public.careers VALUES ('cdd7ad59-fa81-4fea-944b-44a7dedbe04b', 'RRA - Computación', NULL, '2024-06-18 01:57:40.096', '2024-06-18 01:57:40.096');


--
-- TOC entry 3378 (class 0 OID 17849)
-- Dependencies: 228
-- Data for Name: certifications; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.certifications VALUES ('9b21cd74-1c61-47fd-8559-4df83e202342', 'Desarrollo Backend con JavaScript', NULL, '2022-10-06 16:58:39.453', 'https://platzi.com/p/mario_alarcon/ruta/55-backend-javascript/diploma/detalle/', 'Platzi', 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '2024-05-13 02:40:12.546', '2024-05-13 02:40:12.546');
INSERT INTO public.certifications VALUES ('768e792d-9cbb-4394-aa30-c461c8308e16', 'Desarrollo frontend con React', NULL, '2024-02-04 05:00:00', 'https://mario-portfolio.netlify.app/', 'Udemy', 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '2024-05-21 17:50:51.077', '2024-05-21 17:50:51.077');
INSERT INTO public.certifications VALUES ('a120e6de-c689-4617-9e84-00cdca69a61b', 'Desarrollo Backend con Go', NULL, '2024-05-26 00:06:52.719', 'https://mario-portfolio.netlify.app/', 'Platzi', 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '2024-05-26 00:07:48.145', '2024-05-26 00:07:48.145');
INSERT INTO public.certifications VALUES ('84f110a3-8883-4022-a0b3-7dc52cf86008', 'Curso de Terraform', NULL, '2024-05-26 00:33:27.831', 'https://mario-portfolio.netlify.app/', 'Udemy', 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '2024-05-26 00:33:51.003', '2024-05-26 00:33:51.003');
INSERT INTO public.certifications VALUES ('1a216533-0b49-47f8-a0d0-f185a08e4602', 'CCNA 1', NULL, '2024-07-09 15:47:18.87', 'https://www.intermatico.com/ebanking/seguridad/login.htm', 'CNNA', 'f7f25a6e-faa1-4c24-b4e7-38bd8c197d93', '2024-07-09 15:52:14.835', '2024-07-09 15:52:14.835');



--
-- TOC entry 3381 (class 0 OID 17910)
-- Dependencies: 231
-- Data for Name: publications; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.publications VALUES ('2e375a89-3b53-4148-b557-1db40cf349ff', 'En Villamar S.A., estamos buscando un pasante entusiasta y con ganas de aprender para unirse a nuestro equipo de desarrollo web. Si eres estudiante o recién graduado en informática, ingeniería de software o campos relacionados, y estás buscando una oportunidad para aplicar tus conocimientos en el mundo real, ¡este puesto es para ti!', 'HIBRIDA', '08:30', '17:30', 'Subsidio de alimentación.
Seguro de salud.
Beneficios de ley.', 'Conocimientos básicos de HTML, CSS, y JavaScript.
Capacidad para trabajar en equipo.
Ganas de aprender y crecer profesionalmente.', '2024-05-26 15:00:22.361', '2024-05-26 15:00:22.361', 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709', 150.000000000000000000000000000000, 'Pasante - Desarrollador de software', NULL, true);
INSERT INTO public.publications VALUES ('7ded368a-f6a1-4789-95af-c7011f40fb25', 'En Villamar S.A., estamos buscando un pasante entusiasta y con ganas de aprender para unirse a nuestro equipo de desarrollo web. Si eres estudiante o recién graduado en informática, ingeniería de software o campos relacionados, y estás buscando una oportunidad para aplicar tus conocimientos en el mundo real, ¡este puesto es para ti!', 'HIBRIDA', '08:30', '17:30', 'Subsidio de alimentación.
Seguro de salud.
Beneficios de ley.', 'Conocimientos básicos de HTML, CSS, y JavaScript.
Capacidad para trabajar en equipo.
Ganas de aprender y crecer profesionalmente.', '2024-05-26 15:01:14.956', '2024-05-26 15:01:14.956', 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709', 250.000000000000000000000000000000, 'Pasantes - Nodejs', NULL, true);
INSERT INTO public.publications VALUES ('325a3c8d-d14b-4ca0-a086-6e70049bb7a9', 'En Villamar S.A., estamos buscando un pasante entusiasta y con ganas de aprender para unirse a nuestro equipo de desarrollo web. Si eres estudiante o recién graduado en informática, ingeniería de software o campos relacionados, y estás buscando una oportunidad para aplicar tus conocimientos en el mundo real, ¡este puesto es para ti!', 'HIBRIDA', '08:30', '17:30', 'Subsidio de alimentación.\nSeguro de salud.\nBeneficios de ley.', 'Conocimientos básicos de HTML, CSS, y JavaScript.\nCapacidad para trabajar en equipo.\nGanas de aprender y crecer profesionalmente.', '2024-06-27 03:05:12.504', '2024-06-27 03:05:12.504', 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709', 250.000000000000000000000000000000, 'Sin título', '7747188e-de2f-4af2-8c0b-0aae3e489ccc.jpeg', true);
INSERT INTO public.publications VALUES ('89273195-2eb0-4d81-b8e7-1cb718d09e33', 'En FLAC S.A., estamos buscando un pasante entusiasta y con ganas de aprender para unirse a nuestro equipo de desarrollo web. Si eres estudiante o recién graduado en informática, ingeniería de software o campos relacionados, y estás buscando una oportunidad para aplicar tus conocimientos en el mundo real, ¡este puesto es para ti!', 'HIBRIDA', '08:30', '17:30', 'Subsidio de alimentación.\nSeguro de salud.\nBeneficios de ley.', 'Conocimientos básicos de HTML, CSS, y JavaScript.\nCapacidad para trabajar en equipo.\nGanas de aprender y crecer profesionalmente.', '2024-06-30 02:12:09.902', '2024-06-30 02:12:09.902', 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709', 250.000000000000000000000000000000, 'Vacante  Data Scientist', NULL, true);
INSERT INTO public.publications VALUES ('3f2d7547-8b91-4787-a05b-abd04c6d200c', '<p>Se solicita pasante en .NET</p>', 'PRENSENCIAL', '09:00', '16:00', '<ul><li><p>Sueldo de 150$</p></li><li><p>Experiencia laboral</p></li></ul>', '<ul><li><p>Conocimiento en .NET</p></li><li><p>Conocimiento en SQL</p></li></ul>', '2024-06-30 02:34:40.908', '2024-06-30 02:34:40.908', 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709', 150.000000000000000000000000000000, 'Pasante de .NET', NULL, true);
INSERT INTO public.publications VALUES ('301380c0-d666-4581-baca-27e80349ab2b', '<p>Se neceita un pasante con conocimientos en Angular para el equipo de frontend</p>', 'HIBRIDA', '09:00', '16:00', '<ul><li><p>Sueldo de 200$</p></li><li><p>Experiencia laboral</p></li><li><p>Almuerzos</p></li></ul>', '<ul><li><p>Angular</p></li><li><p>Javascript y Typescript</p></li><li><p>HTML, CSS</p></li></ul>', '2024-06-30 03:02:29.694', '2024-06-30 03:02:29.694', 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709', 200.000000000000000000000000000000, 'Pasante de Angular', NULL, true);
INSERT INTO public.publications VALUES ('dcaf7bfb-0646-4b9c-bf43-1767e79dbffa', '<p>Se neceita un pasante con conocimientos en Angular para el equipo de frontend</p>', 'HIBRIDA', '09:00', '16:00', '<ul><li><p>Sueldo de 200$</p></li><li><p>Experiencia laboral</p></li><li><p>Almuerzos</p></li></ul>', '<ul><li><p>Angular</p></li><li><p>Javascript y Typescript</p></li><li><p>HTML, CSS</p></li></ul>', '2024-06-30 03:03:39.742', '2024-06-30 03:03:39.742', 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709', 200.000000000000000000000000000000, 'Pasante de Angular', 'ca2fa22a-4618-4afe-b750-064d92354e0b.png', true);
INSERT INTO public.publications VALUES ('3f3ed5f6-868f-4d7c-b0f9-e3230fca5801', '<p>Se necesita pasante con cocimientos sobre</p><ul><li><p>HTML, CSS y JS</p></li><li><p>BAse de datos</p></li></ul>', 'REMOTA', '09:00', '13:00', '<ul><li><p>Beneficios de ley</p></li></ul>', '<ul><li><p>Concomientos desarrollo web</p></li><li><p>Ultimos semetres</p></li></ul>', '2024-07-09 16:58:04.217', '2024-07-09 16:58:04.217', 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709', 200.000000000000000000000000000000, 'Desarrollador web', '0c7cd3d4-4aad-4053-b3b0-8d6254b44278.png', true);
INSERT INTO public.publications VALUES ('dd0e1749-4a05-4391-82f5-8596ae8096fc', '<p>pasante</p>', 'REMOTA', '09:00', '13:00', '<ul><li><p>Seguro medico</p></li></ul>', '<ul><li><p>Conocimientos de APIs</p></li><li><p>INtegraciones en la nube</p></li></ul>', '2024-07-16 16:28:16.795', '2024-07-16 16:28:16.795', 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709', 400.000000000000000000000000000000, 'Pasante backend', '3e469ea3-062a-477f-bb3b-a761d983b879.png', true);

--
-- TOC entry 3372 (class 0 OID 16468)
-- Dependencies: 222
-- Data for Name: contracts; Type: TABLE DATA; Schema: public; Owner: mario
--





--
-- TOC entry 3379 (class 0 OID 17857)
-- Dependencies: 229
-- Data for Name: curriculums; Type: TABLE DATA; Schema: public; Owner: mario
--



--
-- TOC entry 3373 (class 0 OID 16476)
-- Dependencies: 223
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.forms VALUES ('a1503cc3-b1f8-4497-8979-15ed075c6239', 'Registro de prácticas preprofesionales', 'Este formulario se utiliza para la aprobacion de horas de pasantías', 'F_AA_119', '2024-04-19 01:31:53.58', '2024-04-19 01:31:53.58');

--
-- TOC entry 3374 (class 0 OID 16484)
-- Dependencies: 224
-- Data for Name: student_forms; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.student_forms VALUES ('8ebac2ff-2358-4ded-b35a-1bc8a30a684c', '2024-07-12 14:36:47.677', NULL, '31814cf0-817a-456d-9666-d27e6ccf92f6.pdf', '5cb1e7fd-e735-4932-a336-673d61c8c4ce', 'a1503cc3-b1f8-4497-8979-15ed075c6239', '2024-07-12 14:36:47.648', '2024-07-12 14:36:47.648', 'EMITIDO', NULL, NULL);
INSERT INTO public.student_forms VALUES ('b2bb6d79-2b7f-455b-b1d5-ba3549e52103', '2024-07-14 20:25:40.276', NULL, 'a6f3feab-a4f9-4cda-89e8-2b86cce118f6.pdf', 'f7f25a6e-faa1-4c24-b4e7-38bd8c197d93', 'a1503cc3-b1f8-4497-8979-15ed075c6239', '2024-07-14 20:25:40.177', '2024-07-14 20:26:56.149', 'PENDIENTE', NULL, NULL);
INSERT INTO public.student_forms VALUES ('eb03fdef-d1b9-4106-b355-3a9b94035ca4', '2024-07-16 16:32:51.712', NULL, 'baa1f3f5-2295-496a-978f-8a29902916df.pdf', '5cb1e7fd-e735-4932-a336-673d61c8c4ce', 'a1503cc3-b1f8-4497-8979-15ed075c6239', '2024-07-16 16:32:51.683', '2024-07-16 16:35:38.525', 'PENDIENTE', NULL, NULL);

--
--
-- TOC entry 3385 (class 0 OID 18054)
-- Dependencies: 235
-- Data for Name: form_contents; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.form_contents VALUES ('a778494e-6b2e-4796-8975-9b81a46e1a1b', '8ebac2ff-2358-4ded-b35a-1bc8a30a684c', '2024-07-12 14:36:47.648', '2024-07-12 14:36:47.648', 'rra-software', '{"evaluacionCualitativa": {"desempeno": "excelente", "asistencia": "excelente", "motivacion": "excelente", "conocimientos": "excelente"}, "habilidadesAdquiridas": "SCRUM, trabajo en equipo", "observacionesGenerales": "", "actividadesDesarrolladas": "Desarrollo de backend, creacion de lambdas en aws, desarrollo frontend", "seguimientoTutorAcademico": "si"}', '{"ruc": "220022002200001", "email": "marianela@zeyo.io", "ciudad": "Ibarra", "celular": "0987654321", "telefono": "0987654213", "direccion": "Ibarra", "razonSocial": "Zeyo", "responsable": "Msc. Ricardo Ruano", "tipoInstitucion": "publica"}', '{"tutorEpn": "Dr. Marco Benalcazar", "campoAmplio": "tic", "tipoPractica": "laboral", "campoEspecifico": "tic", "relacionConConvenio": {"value": false, "codigo": "", "titulo": ""}, "relacionConVinculacion": {"value": false, "codigo": "", "titulo": ""}, "relacionConInvestigacion": {"value": false, "codigo": "", "titulo": ""}}', 'presencial', '{"areaAsignada": "TI", "horasTotales": "452", "horarioSemanal": {"fin": "2024-07-05T05:00:00.000Z", "lunes": {"fin": "16:00", "inicio": "09:00"}, "total": "26", "inicio": "2024-03-04T05:00:00.000Z", "jueves": {"fin": "13:00", "inicio": "09:00"}, "martes": {"fin": "16:00", "inicio": "09:00"}, "sabado": {"fin": "", "inicio": ""}, "domingo": {"fin": "", "inicio": ""}, "viernes": {"fin": "16:00", "inicio": "09:00"}, "miercoles": {"fin": "13:00", "inicio": "09:00"}, "horaAlmuerzo": {"fin": "14:00", "inicio": "13:00"}}, "pasantiasPagadas": {"value": true, "amount": "200"}, "incluirHorasAlmuerzo": true, "fechasDiasNoTrabajados": [{"id": "vmCZLPk6sceJ", "date": "2024-05-03T05:00:00.000Z"}, {"id": "vEyEAU8Bc3O9", "date": "2024-04-08T05:00:00.000Z"}, {"id": "srswSvxWW2g0", "date": "2024-05-08T05:00:00.000Z"}], "incluirDiasNoTrabajados": true, "observacionesAdicionales": ""}', '{"tutor": {"ci": "1234567890", "name": "Dr. Marco Benalcazar"}, "decano": {"ci": "1707211742", "name": "Dr. José Lucio"}, "entidadReceptora": {"ci": "0099887766", "name": "MSc. Ricardo Ruano"}, "comisionPracticas": {"ci": "1706496419", "name": "MSc. Luz Marina Vintimilla"}}', '{"cedula": "2200129381", "nombres": "mario Alarcon", "creditos": "105"}', '{"careerId": "5dd38dc1-7579-403b-a9a7-7de71dfa7aa5", "subjects": ["6f0e42fa-aec9-45d9-81a8-8f913da3a2de", "98b57912-42f6-4ed5-a1df-02265637c609", "9812cd45-c3fc-4e1c-816b-2d90d725d2d5", "a2800c8f-15a2-4059-8b7b-ec5b1b09b998", "263026ec-f9e1-4b95-aaaa-16b75b2c6dce", "71fa1a34-94dd-4196-b8f3-0cfec29c1fe2"], "additionalSubjects": "Cloud Computing, Terraform"}');
INSERT INTO public.form_contents VALUES ('5f254d71-ce73-4345-abba-539d5cdf240b', 'b2bb6d79-2b7f-455b-b1d5-ba3549e52103', '2024-07-14 20:25:40.177', '2024-07-14 20:25:40.177', 'rra-software', '{"evaluacionCualitativa": {"desempeno": "excelente", "asistencia": "excelente", "motivacion": "excelente", "conocimientos": "excelente"}, "habilidadesAdquiridas": "Trabajo en equipo", "observacionesGenerales": "", "actividadesDesarrolladas": "Backend", "seguimientoTutorAcademico": "si"}', '{"ruc": "22001293001", "email": "falarcon@zeyo.io", "ciudad": "Quito", "celular": "987654321", "telefono": "0987654321", "direccion": "Quito", "razonSocial": "Zeyo", "responsable": "Ing. mario Alarcon", "tipoInstitucion": "privada"}', '{"tutorEpn": "Ing. Marco", "campoAmplio": "tic", "tipoPractica": "laboral", "campoEspecifico": "tic", "relacionConConvenio": {"value": false, "codigo": "", "titulo": ""}, "relacionConVinculacion": {"value": false, "codigo": "", "titulo": ""}, "relacionConInvestigacion": {"value": false, "codigo": "", "titulo": ""}}', 'presencial', '{"areaAsignada": "TI", "horasTotales": "86", "horarioSemanal": {"fin": "2024-07-05T05:00:00.000Z", "lunes": {"fin": "16:00", "inicio": "09:00"}, "total": "18", "inicio": "2024-06-03T05:00:00.000Z", "jueves": {"fin": "", "inicio": ""}, "martes": {"fin": "18:00", "inicio": "09:00"}, "sabado": {"fin": "", "inicio": ""}, "domingo": {"fin": "", "inicio": ""}, "viernes": {"fin": "", "inicio": ""}, "miercoles": {"fin": "13:00", "inicio": "09:00"}, "horaAlmuerzo": {"fin": "14:00", "inicio": "13:00"}}, "pasantiasPagadas": {"value": true, "amount": "200"}, "incluirHorasAlmuerzo": true, "fechasDiasNoTrabajados": [{"id": "ta4eGaMuIAju", "date": "2024-06-05T05:00:00.000Z"}], "incluirDiasNoTrabajados": true, "observacionesAdicionales": ""}', '{"tutor": {"ci": "171717171771", "name": "Marco"}, "decano": {"ci": "17072117422", "name": "Dr. José Lucioo"}, "entidadReceptora": {"ci": "181828128182", "name": "mario"}, "comisionPracticas": {"ci": "1706496419", "name": "MSc. Luz Marina Vintimilla"}}', '{"cedula": "2200129381", "nombres": "mario Alarcon ", "creditos": "105"}', '{"careerId": "5dd38dc1-7579-403b-a9a7-7de71dfa7aa5", "subjects": ["6f0e42fa-aec9-45d9-81a8-8f913da3a2de", "f09bc5cb-538a-44c7-a515-bea1dc487f4a", "9812cd45-c3fc-4e1c-816b-2d90d725d2d5"], "additionalSubjects": "Cloud Computing, Programacion Funcional"}');
INSERT INTO public.form_contents VALUES ('449de1d7-4751-4889-af48-d7e6ccca10cd', 'eb03fdef-d1b9-4106-b355-3a9b94035ca4', '2024-07-16 16:32:51.683', '2024-07-16 16:32:51.683', 'rra-software', '{"evaluacionCualitativa": {"desempeno": "excelente", "asistencia": "excelente", "motivacion": "excelente", "conocimientos": "excelente"}, "habilidadesAdquiridas": "Desarrollo", "observacionesGenerales": "Desarrollo", "actividadesDesarrolladas": "Desarrollo", "seguimientoTutorAcademico": "no"}', '{"ruc": "220022002200001", "email": "marianela@zeyo.io", "ciudad": "Joya de los Sachas", "celular": "0987654321", "telefono": "0985352939", "direccion": "Orellana", "razonSocial": "Zeyo", "responsable": "Msc. Ricardo Ruano", "tipoInstitucion": "privada"}', '{"tutorEpn": "Dr. Marco Benalcazar", "campoAmplio": "tic", "tipoPractica": "laboral", "campoEspecifico": "tic", "relacionConConvenio": {"value": false, "codigo": "", "titulo": ""}, "relacionConVinculacion": {"value": false, "codigo": "", "titulo": ""}, "relacionConInvestigacion": {"value": false, "codigo": "", "titulo": ""}}', 'presencial', '{"areaAsignada": "TIC", "horasTotales": "18", "horarioSemanal": {"fin": "2024-07-12T05:00:00.000Z", "lunes": {"fin": "16:00", "inicio": "09:00"}, "total": "18", "inicio": "2024-07-07T05:00:00.000Z", "jueves": {"fin": "", "inicio": ""}, "martes": {"fin": "16:00", "inicio": "09:00"}, "sabado": {"fin": "", "inicio": ""}, "domingo": {"fin": "", "inicio": ""}, "viernes": {"fin": "", "inicio": ""}, "miercoles": {"fin": "16:00", "inicio": "09:00"}, "horaAlmuerzo": {"fin": "14:00", "inicio": "13:00"}}, "pasantiasPagadas": {"value": false, "amount": ""}, "incluirHorasAlmuerzo": true, "fechasDiasNoTrabajados": [{"id": "VyUYTuM3LzP8", "date": "2021-09-01T00:00:00.000Z"}], "incluirDiasNoTrabajados": false, "observacionesAdicionales": ""}', '{"tutor": {"ci": "1212121212", "name": "Marco Benalcazar"}, "decano": {"ci": "17072117422", "name": "Dr. José Lucioo"}, "entidadReceptora": {"ci": "325455654654645", "name": "Ricardo Ruano"}, "comisionPracticas": {"ci": "17064964199", "name": "MSc. Luz Marina Vintimillaa"}}', '{"cedula": "2200129381", "nombres": "mario Alarcon", "creditos": "105"}', '{"careerId": "5dd38dc1-7579-403b-a9a7-7de71dfa7aa5", "subjects": ["6f0e42fa-aec9-45d9-81a8-8f913da3a2de", "8449476c-6376-44a0-8b5e-954358f9e794", "4801bb94-994a-48c5-9f12-daaac6c3ba85", "98b57912-42f6-4ed5-a1df-02265637c609", "9812cd45-c3fc-4e1c-816b-2d90d725d2d5", "263026ec-f9e1-4b95-aaaa-16b75b2c6dce"], "additionalSubjects": ""}');




--
-- TOC entry 3383 (class 0 OID 17960)
-- Dependencies: 233
-- Data for Name: forums; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.forums VALUES ('2653061c-70db-4111-817a-06576c6e1b25', 'Pasante WEB - Node js', 'Mi experiencia como pasante web en esta empresa fue sumamente enriquecedora. Trabajar con Node.js me permitió adentrarme en un mundo fascinante de desarrollo web y expandir mis habilidades de programación. Desde el primer día, fui recibido con un ambiente acogedor y un equipo comprometido que me guió de manera excepcional.
La instrucción que recibí durante mis pasantías fue de la más alta calidad. Mis mentores no solo compartieron sus conocimientos expertos en Node.js, sino que también fomentaron un entorno de aprendizaje colaborativo. Cada proyecto presentó desafíos interesantes que me impulsaron a crecer profesionalmente y a aplicar mis habilidades de manera efectiva.', 4, 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '2024-05-31 15:15:55.285', '2024-05-31 15:15:55.285', 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709');
INSERT INTO public.forums VALUES ('e08cf9f6-7793-4c0f-a15b-b0f5591ca9e4', 'Desarrollador Web Backend', '<p>Me agradó trabajar en <strong>FLAC SA</strong>, destaco los siguientes aspectos:</p><ul><li><p>Buen ambiente laboral</p></li><li><p>Aprendizaje con grandes profesionales</p></li><li><p>Apoyo en todo momento</p></li></ul>', 5, 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '2024-06-02 16:27:07.022', '2024-06-02 16:27:07.022', 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709');
INSERT INTO public.forums VALUES ('332c3a3e-b0ab-47b9-8371-2ceb7fa3dd58', 'Opinion sobre FLAC SA', '<p>Hola, esta es otra opinion</p>', 5, 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '2024-06-20 02:41:09.873', '2024-06-20 02:41:09.873', 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709');
INSERT INTO public.forums VALUES ('c0ef74aa-2046-4a81-ba75-228e698f1998', 'Nueva opinion sobre FLAC SA', '<p>Segunda opinion</p>', 5, 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '2024-06-20 02:43:44.338', '2024-06-20 02:43:44.338', 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709');
INSERT INTO public.forums VALUES ('6d84c59c-7c4c-420d-afc0-a7c0937f2951', 'Nueva opinion sobre FLAC SA', '<p>Segunda opinion</p>', 5, 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '2024-06-20 02:46:19.361', '2024-06-20 02:46:19.361', 'f0f80de1-0aec-4f72-a1e4-4af1ccd01709');


--
-- TOC entry 3384 (class 0 OID 18005)
-- Dependencies: 234
-- Data for Name: postulations; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.postulations VALUES ('d596e31c-94c2-4d95-829d-1d1599678544', 'PENDIENTE', 'Hola me gustaria postular con ustedes.', '85fb6e36-328a-43b7-a95e-4a2cbb937043.pdf', 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '7ded368a-f6a1-4789-95af-c7011f40fb25', '2024-06-10 02:47:16.166', '2024-06-10 02:47:16.166');
INSERT INTO public.postulations VALUES ('a9bf2e3b-aab8-44b7-a1b8-87217a5f25c0', 'PENDIENTE', 'hola', 'ea5eadf8-c700-46e0-9337-ccc2b4f35911.pdf', 'f7f25a6e-faa1-4c24-b4e7-38bd8c197d93', '2e375a89-3b53-4148-b557-1db40cf349ff', '2024-07-09 15:54:03.039', '2024-07-09 15:54:03.039');
INSERT INTO public.postulations VALUES ('067b987b-b3a6-480e-9fca-0499260bc42f', 'PENDIENTE', 'dasdsa', '03e4a102-ada4-470f-b60c-9a5d9e7f7964.pdf', 'f7f25a6e-faa1-4c24-b4e7-38bd8c197d93', '301380c0-d666-4581-baca-27e80349ab2b', '2024-07-14 06:29:39.665', '2024-07-14 06:29:39.665');
INSERT INTO public.postulations VALUES ('ab3d09e5-1621-44c6-96fa-c76af7b6b143', 'PENDIENTE', 'Hola estoy interesado', 'c3b4e786-02f5-4720-8e21-133c39049ddc.pdf', '5cb1e7fd-e735-4932-a336-673d61c8c4ce', '3f3ed5f6-868f-4d7c-b0f9-e3230fca5801', '2024-07-16 16:24:33.238', '2024-07-16 16:24:33.238');


--
-- TOC entry 3375 (class 0 OID 17825)
-- Dependencies: 225
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.projects VALUES ('053050d3-8d7b-4d2d-9675-b189e79ff72e', 'Ecommerce', 'Una pagina web para realizar comprar en linea', 'https://mario-web-portfolio.vercel.app/', 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '2024-05-04 16:58:39.453', '2024-05-04 16:58:39.453');
INSERT INTO public.projects VALUES ('5f0c280f-8ce2-49a4-9c9a-95451ff818c4', 'API REST en Express', 'API REST para administrar tareas', 'https://mario-portfolio.netlify.app/', 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '2024-05-21 13:29:36.66', '2024-05-21 13:29:36.66');
INSERT INTO public.projects VALUES ('e86e0c71-59a4-4232-840f-5099a1813618', 'Trello Clone', 'Clon de Trello', 'https://mario-portfolio.netlify.app/', 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '2024-05-25 23:13:03.536', '2024-05-25 23:13:03.536');
INSERT INTO public.projects VALUES ('d77a8cb9-822b-40ff-8d31-5e9104aaa2c6', 'Twitch clone', 'Clon de twitch', 'https://el-telegrafo-accesible.vercel.app/', 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '2024-05-25 23:15:36.248', '2024-05-25 23:15:36.248');
INSERT INTO public.projects VALUES ('c3e070e2-4e85-4aa2-957b-6d66e1f1513f', 'Duolingo Clone', 'clone de duolingo', 'https://mario-portfolio.netlify.app/', 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '2024-05-25 23:17:31.77', '2024-05-25 23:17:31.77');
INSERT INTO public.projects VALUES ('818df88f-2056-4fba-941f-e156072efb45', 'Mi Chaucherita WEB', 'Aplicacion de registro de finanzas personales, hecha en ANGULAR y Firebase', 'https://www.baustroonline.com/AppInt/BaustroOnline/bancavirtual/personas/', 'f7f25a6e-faa1-4c24-b4e7-38bd8c197d93', '2024-07-09 15:51:35.778', '2024-07-09 15:51:35.778');
INSERT INTO public.projects VALUES ('c96b4638-52d5-4415-9190-9623a327728d', 'app-comision-pasantias', 'aplicaciino', 'https://mario-portfolio.netlify.app/', '5cb1e7fd-e735-4932-a336-673d61c8c4ce', '2024-07-16 16:23:29.066', '2024-07-16 16:23:29.066');

--
-- TOC entry 3377 (class 0 OID 17841)
-- Dependencies: 227
-- Data for Name: project_skills; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.project_skills VALUES ('df578193-1237-439f-9454-5a01072b4e9d', '053050d3-8d7b-4d2d-9675-b189e79ff72e', 'ef322f15-4f90-4a24-826a-09bc3b89ad5f', '2024-05-04 16:58:39.453', '2024-05-04 16:58:39.453');
INSERT INTO public.project_skills VALUES ('3a8bfaec-39b2-42d8-b516-6de3ae0ddfac', '053050d3-8d7b-4d2d-9675-b189e79ff72e', '7c6c0916-0d71-439c-9614-b3abed1ac875', '2024-05-04 16:58:39.453', '2024-05-04 16:58:39.453');
INSERT INTO public.project_skills VALUES ('2f59443a-a1f2-4e0c-9a41-1d3eb0ebb3db', '053050d3-8d7b-4d2d-9675-b189e79ff72e', 'ec24379b-a181-42df-b295-12c9745fc284', '2024-05-04 16:58:39.453', '2024-05-04 16:58:39.453');
INSERT INTO public.project_skills VALUES ('ea5db471-9391-4ed4-8e0e-2e1c2e1ad075', '5f0c280f-8ce2-49a4-9c9a-95451ff818c4', '7c6c0916-0d71-439c-9614-b3abed1ac875', '2024-05-21 13:29:36.66', '2024-05-21 13:29:36.66');
INSERT INTO public.project_skills VALUES ('59d1917d-e2a3-4854-9123-e557fa431a01', '5f0c280f-8ce2-49a4-9c9a-95451ff818c4', 'ec24379b-a181-42df-b295-12c9745fc284', '2024-05-21 13:29:36.66', '2024-05-21 13:29:36.66');
INSERT INTO public.project_skills VALUES ('ac854084-4cb0-421c-bcac-210a6fa0e18c', 'e86e0c71-59a4-4232-840f-5099a1813618', 'ec24379b-a181-42df-b295-12c9745fc284', '2024-05-25 23:13:03.536', '2024-05-25 23:13:03.536');
INSERT INTO public.project_skills VALUES ('a1ce5c62-2046-4f13-82b5-bfb4386e1d78', 'e86e0c71-59a4-4232-840f-5099a1813618', '7c6c0916-0d71-439c-9614-b3abed1ac875', '2024-05-25 23:13:03.536', '2024-05-25 23:13:03.536');
INSERT INTO public.project_skills VALUES ('291bff46-e016-4222-b6c5-7f513c6b299f', 'e86e0c71-59a4-4232-840f-5099a1813618', 'ef322f15-4f90-4a24-826a-09bc3b89ad5f', '2024-05-25 23:13:03.536', '2024-05-25 23:13:03.536');
INSERT INTO public.project_skills VALUES ('0622b723-7f4c-4432-b987-7a5ba664cda9', 'd77a8cb9-822b-40ff-8d31-5e9104aaa2c6', 'ec24379b-a181-42df-b295-12c9745fc284', '2024-05-25 23:15:36.248', '2024-05-25 23:15:36.248');
INSERT INTO public.project_skills VALUES ('da391061-569b-4556-bbbf-c91d73b3ed97', 'd77a8cb9-822b-40ff-8d31-5e9104aaa2c6', '7c6c0916-0d71-439c-9614-b3abed1ac875', '2024-05-25 23:15:36.248', '2024-05-25 23:15:36.248');
INSERT INTO public.project_skills VALUES ('dda67157-c243-4833-921f-809cf7253a24', 'c3e070e2-4e85-4aa2-957b-6d66e1f1513f', '7c6c0916-0d71-439c-9614-b3abed1ac875', '2024-05-25 23:17:31.77', '2024-05-25 23:17:31.77');
INSERT INTO public.project_skills VALUES ('13a37135-9280-4374-bcc6-dae82b8e0d5b', 'c3e070e2-4e85-4aa2-957b-6d66e1f1513f', 'ef322f15-4f90-4a24-826a-09bc3b89ad5f', '2024-05-25 23:17:31.77', '2024-05-25 23:17:31.77');
INSERT INTO public.project_skills VALUES ('b4b0d385-1752-43bf-9464-b47157aa34e3', '818df88f-2056-4fba-941f-e156072efb45', 'b2109218-62d8-4c84-b551-9a9668d2dd54', '2024-07-09 15:51:35.778', '2024-07-09 15:51:35.778');
INSERT INTO public.project_skills VALUES ('fbffa46b-531c-4efc-b534-9272bba5f2a7', '818df88f-2056-4fba-941f-e156072efb45', '9d9e52ad-37f9-4d2b-b4bf-9706f33e1399', '2024-07-09 15:51:35.778', '2024-07-09 15:51:35.778');
INSERT INTO public.project_skills VALUES ('1b0642d9-9bef-46c3-95ab-6bfa116e791d', '818df88f-2056-4fba-941f-e156072efb45', '7c6c0916-0d71-439c-9614-b3abed1ac875', '2024-07-09 15:51:35.778', '2024-07-09 15:51:35.778');
INSERT INTO public.project_skills VALUES ('6576b121-5d71-4057-9744-99b52a23765b', 'c96b4638-52d5-4415-9190-9623a327728d', '7c6c0916-0d71-439c-9614-b3abed1ac875', '2024-07-16 16:23:29.066', '2024-07-16 16:23:29.066');
INSERT INTO public.project_skills VALUES ('6cf68c79-8ab4-4518-8395-3fdb92cc68fb', 'c96b4638-52d5-4415-9190-9623a327728d', 'b2109218-62d8-4c84-b551-9a9668d2dd54', '2024-07-16 16:23:29.066', '2024-07-16 16:23:29.066');
INSERT INTO public.project_skills VALUES ('524a545d-2afe-40ce-a03c-c41ff0e19238', 'c96b4638-52d5-4415-9190-9623a327728d', 'ef322f15-4f90-4a24-826a-09bc3b89ad5f', '2024-07-16 16:23:29.066', '2024-07-16 16:23:29.066');
INSERT INTO public.project_skills VALUES ('13d7576e-f2ce-480e-8b1f-ea51f5762872', 'c96b4638-52d5-4415-9190-9623a327728d', 'ec24379b-a181-42df-b295-12c9745fc284', '2024-07-16 16:23:29.066', '2024-07-16 16:23:29.066');





--
-- TOC entry 3382 (class 0 OID 17918)
-- Dependencies: 232
-- Data for Name: publication_skills; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.publication_skills VALUES ('9d906f48-60bc-49d6-855e-e188d940630d', '2e375a89-3b53-4148-b557-1db40cf349ff', 'ec24379b-a181-42df-b295-12c9745fc284', '2024-05-26 15:00:22.361', '2024-05-26 15:00:22.361');
INSERT INTO public.publication_skills VALUES ('32f12d0e-35f3-44dd-9315-f7cbdc7bd490', '2e375a89-3b53-4148-b557-1db40cf349ff', '7c6c0916-0d71-439c-9614-b3abed1ac875', '2024-05-26 15:00:22.361', '2024-05-26 15:00:22.361');
INSERT INTO public.publication_skills VALUES ('817a6b76-f7ab-4af8-bd9a-d56e9a8aa31f', '7ded368a-f6a1-4789-95af-c7011f40fb25', 'ec24379b-a181-42df-b295-12c9745fc284', '2024-05-26 15:01:14.956', '2024-05-26 15:01:14.956');
INSERT INTO public.publication_skills VALUES ('0714fab1-ba28-43de-9b81-7366ec3f24af', '7ded368a-f6a1-4789-95af-c7011f40fb25', '7c6c0916-0d71-439c-9614-b3abed1ac875', '2024-05-26 15:01:14.956', '2024-05-26 15:01:14.956');
INSERT INTO public.publication_skills VALUES ('6d55423a-3b18-4f58-9886-5275958e0f44', '325a3c8d-d14b-4ca0-a086-6e70049bb7a9', 'ec24379b-a181-42df-b295-12c9745fc284', '2024-06-27 03:05:12.504', '2024-06-27 03:05:12.504');
INSERT INTO public.publication_skills VALUES ('254e5578-cd56-47e5-92d2-504db4ca1f3c', '325a3c8d-d14b-4ca0-a086-6e70049bb7a9', '7c6c0916-0d71-439c-9614-b3abed1ac875', '2024-06-27 03:05:12.504', '2024-06-27 03:05:12.504');
INSERT INTO public.publication_skills VALUES ('47d5dfb8-1495-44fb-87f2-a729e24cdc46', '89273195-2eb0-4d81-b8e7-1cb718d09e33', 'ec24379b-a181-42df-b295-12c9745fc284', '2024-06-30 02:12:09.902', '2024-06-30 02:12:09.902');
INSERT INTO public.publication_skills VALUES ('99878e29-daf2-4ead-9d16-d980dc4edfc3', '89273195-2eb0-4d81-b8e7-1cb718d09e33', '7c6c0916-0d71-439c-9614-b3abed1ac875', '2024-06-30 02:12:09.902', '2024-06-30 02:12:09.902');
INSERT INTO public.publication_skills VALUES ('79897c15-6a4d-4d3b-ab0a-8f5e890b901a', '3f2d7547-8b91-4787-a05b-abd04c6d200c', 'ec24379b-a181-42df-b295-12c9745fc284', '2024-06-30 02:34:40.908', '2024-06-30 02:34:40.908');
INSERT INTO public.publication_skills VALUES ('5f18e9a5-52b3-4e14-b531-13b6e7a25d05', '3f2d7547-8b91-4787-a05b-abd04c6d200c', 'd5e4cc3e-ec99-4ac3-b7fc-6e06056fc2cb', '2024-06-30 02:34:40.908', '2024-06-30 02:34:40.908');
INSERT INTO public.publication_skills VALUES ('8f1e15b0-e9d6-4fb4-b652-9a275b9d60aa', '301380c0-d666-4581-baca-27e80349ab2b', 'ef322f15-4f90-4a24-826a-09bc3b89ad5f', '2024-06-30 03:02:29.694', '2024-06-30 03:02:29.694');
INSERT INTO public.publication_skills VALUES ('a630e1d0-6d3c-46fa-9732-077f8f270a6d', '301380c0-d666-4581-baca-27e80349ab2b', '9d9e52ad-37f9-4d2b-b4bf-9706f33e1399', '2024-06-30 03:02:29.694', '2024-06-30 03:02:29.694');
INSERT INTO public.publication_skills VALUES ('3a2d5036-dfa4-46ba-9777-a31eef47d7d9', '301380c0-d666-4581-baca-27e80349ab2b', 'b2109218-62d8-4c84-b551-9a9668d2dd54', '2024-06-30 03:02:29.694', '2024-06-30 03:02:29.694');
INSERT INTO public.publication_skills VALUES ('f8073381-ab42-447b-bb94-19646ce58ccc', 'dcaf7bfb-0646-4b9c-bf43-1767e79dbffa', 'ef322f15-4f90-4a24-826a-09bc3b89ad5f', '2024-06-30 03:03:39.742', '2024-06-30 03:03:39.742');
INSERT INTO public.publication_skills VALUES ('a09d2f94-bf9e-47fe-a31c-5b1c466f994e', 'dcaf7bfb-0646-4b9c-bf43-1767e79dbffa', '9d9e52ad-37f9-4d2b-b4bf-9706f33e1399', '2024-06-30 03:03:39.742', '2024-06-30 03:03:39.742');
INSERT INTO public.publication_skills VALUES ('db0099cb-284f-490b-a482-e400d04ac93b', '3f3ed5f6-868f-4d7c-b0f9-e3230fca5801', '7c6c0916-0d71-439c-9614-b3abed1ac875', '2024-07-09 16:58:04.217', '2024-07-09 16:58:04.217');
INSERT INTO public.publication_skills VALUES ('54f8b294-d302-484a-b940-2c8b9532f23d', '3f3ed5f6-868f-4d7c-b0f9-e3230fca5801', 'ef322f15-4f90-4a24-826a-09bc3b89ad5f', '2024-07-09 16:58:04.217', '2024-07-09 16:58:04.217');
INSERT INTO public.publication_skills VALUES ('45a5d498-70a4-4161-a451-1f43768e60cf', '3f3ed5f6-868f-4d7c-b0f9-e3230fca5801', 'ec24379b-a181-42df-b295-12c9745fc284', '2024-07-09 16:58:04.217', '2024-07-09 16:58:04.217');
INSERT INTO public.publication_skills VALUES ('153038a3-56ce-4f45-a237-20e34cf2a49a', 'dd0e1749-4a05-4391-82f5-8596ae8096fc', 'ef322f15-4f90-4a24-826a-09bc3b89ad5f', '2024-07-16 16:28:16.795', '2024-07-16 16:28:16.795');







--
-- TOC entry 3380 (class 0 OID 17902)
-- Dependencies: 230
-- Data for Name: student_bookmarks; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.student_bookmarks VALUES ('a96969ae-58a3-47b1-bb62-4fb2f783668e', 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '7ded368a-f6a1-4789-95af-c7011f40fb25', '2024-06-18 16:37:10.938', '2024-06-18 16:37:10.938');
INSERT INTO public.student_bookmarks VALUES ('6d6d3cfb-850d-49ab-8231-cc74cc7a127e', 'eeb9cb0e-dc76-4957-aaa2-9bfcab0bc768', '2e375a89-3b53-4148-b557-1db40cf349ff', '2024-06-30 01:14:40.722', '2024-06-30 01:14:40.722');



-- TOC entry 3386 (class 0 OID 18069)
-- Dependencies: 236
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.subjects VALUES ('3536d330-7f54-4cd2-9c38-bfa1e38fa9cc', 'Álgebra Lineal', 'MATD113', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('192ef643-c573-4d95-9d69-a7eb383733a3', 'Cálculo En Una Variable', 'MATD123', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('67dcafb3-1dc5-435a-8c56-bf25e9821252', 'Mecánica Newtoniana', 'FISD134', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('8449476c-6376-44a0-8b5e-954358f9e794', 'Programación I', 'ICCD144', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('aaeb3f8d-51f2-4289-9c73-c4b2d1d08393', 'Comunicación Oral Y Escrita', 'CSHD111', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('8227cd58-907e-4b1a-bbf8-7b47d4bec509', 'Ecuaciones Diferenciales Ordinarias', 'MATD213', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('d2ee4ebd-6ba6-4cb2-b306-f4d2897f6eeb', 'Matemáticas Computacionales Y Teoría De La Computación', 'ICCD224', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('4fe8d9d6-3bbc-463e-a432-858049a875af', 'Fundamentos De Electrónica Para Computación', 'ICCD233', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('6f0e42fa-aec9-45d9-81a8-8f913da3a2de', 'Programación II', 'ICCD244', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('3c637889-dab5-4196-9838-95b29b43ef92', 'Probabilidad Y Estadísticas Básicas', 'MATD223', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('95d46cfd-25d7-4065-9f5a-20b03177bb5e', 'Sistemas Operativos', 'ICCD323', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('056610f9-fbf3-4262-bdd6-51eca3d81829', 'Arquitectura De Computadores', 'ICCD332', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('b9d9d5b4-ef56-4b07-b695-b083274ed5e0', 'Estructura De Datos Y Algoritmos I', 'ICCD343', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('d9974c9f-462c-4bc4-8a06-e5197b78c912', 'Fundamentos De Redes Y Conectividad', 'ICCD353', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('f09bc5cb-538a-44c7-a515-bea1dc487f4a', 'Ingeniería De Software Y De Requerimientos', 'ISWD414', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('8ef115f1-3d58-4638-b6f5-04fb7deee1b9', 'Compiladores Y Lenguajes', 'ICCD422', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('5166c85f-5a84-4c4c-98d8-b5d2c5610f34', 'Fundamentos De Sistemas De Información', 'ISWD433', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('8fb1bb56-729e-484b-aac3-b27df76489d3', 'Estructura De Datos Y Algoritmos II', 'ICCD442', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('98b57912-42f6-4ed5-a1df-02265637c609', 'Fundamentos De Bases De Datos', 'ISWD453', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('5bcec5de-195a-4e46-9dd4-e926161b47f2', 'Computación Gráfica', 'ICCD533', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('4801bb94-994a-48c5-9f12-daaac6c3ba85', 'Bases De Datos Distribuídas', 'ISWD553', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('4203855c-e29a-49ff-8bf7-4a5419800005', 'Diseño De Software', 'ISWD523', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('17101a00-6e74-4628-92dc-20be9a054547', 'Inteligencia Artificial y Aprendizaje Automático', 'ISWD543', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('9812cd45-c3fc-4e1c-816b-2d90d725d2d5', 'Aplicaciones Web', 'ISWD613', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('7f2dddf8-92a3-4bac-9d44-36602aa03d4e', 'Construcción Y Evolución De Software', 'ISWD633', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('11a231b3-5797-47ff-87f8-a5f665ab98df', 'Calidad De Software', 'ISWD652', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('a2800c8f-15a2-4059-8b7b-ec5b1b09b998', 'Metodologías Ágiles', 'ISWD622', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('1fb4db14-2a74-4cf1-98d8-975fb02f63d2', 'Tecnologías de Seguridad', 'ICCD643', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('2c6fe77d-9617-4357-be7a-f79ad0b8b7df', 'Aplicaciones Móviles', 'ISWD713', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('a6ec1eb7-5de2-4333-9336-9b73d758cd17', 'Usabilidad Y Accesibilidad', 'ISWD732', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('613b5386-cafc-4503-8b18-899199f2fca9', 'Business Intelligence', 'ISWD743', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('792e3ea8-a3b5-4441-8449-c722d7ec6750', 'Interacción Humano Computador', 'ISWD723', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('cdbb6deb-b4bb-40bd-a846-464ae6ef72fe', 'Verificación Y Validación De Software', 'ISWD752', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('39888777-c603-4ab8-98e5-a4ea1f8752d8', 'Automatización De Procesos', 'ISWD762', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('aeca48f8-fe71-4385-9540-902605cb5e42', 'Desarrollo De Juegos Interactivos', 'ISWD823', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('59e8505c-9c04-4f32-9ca5-bdb0c8e63081', 'Auditoría Informática', 'ISWD833', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('263026ec-f9e1-4b95-aaaa-16b75b2c6dce', 'Aplicaciones Web Avanzadas', 'ISWD813', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('ae9dee0e-a90f-4bd2-abdb-4803533031f5', 'Profesionalismo En Informática', 'ICCD842', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('71fa1a34-94dd-4196-b8f3-0cfec29c1fe2', 'Desarrollo De Software Seguro', 'ISWD853', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('f4ceb320-d7c3-4f57-8889-74e2d551efe5', 'Gestión De Proyectos De Software', 'ISWD922', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subjects VALUES ('7eb46943-6f55-43cc-a190-f450f964dd24', 'Sistemas Embebidos', 'ISWD913', NULL, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');






--
-- TOC entry 3388 (class 0 OID 18085)
-- Dependencies: 238
-- Data for Name: subject_careers; Type: TABLE DATA; Schema: public; Owner: mario
--

INSERT INTO public.subject_careers VALUES ('e3d08789-4ce4-4e7b-8e20-18d5002dcd5e', '3536d330-7f54-4cd2-9c38-bfa1e38fa9cc', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 1, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('964ac9ac-0c91-4fad-8da2-5eca4dc02a03', '192ef643-c573-4d95-9d69-a7eb383733a3', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 1, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('ce34df8d-b168-4a07-b3cd-2a8bca3d14c0', '67dcafb3-1dc5-435a-8c56-bf25e9821252', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 1, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('16c453e4-e5d7-4df4-9d86-35e512f91671', '8449476c-6376-44a0-8b5e-954358f9e794', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 1, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('f61f6374-8835-42ad-9e3a-fa1b34c42271', 'aaeb3f8d-51f2-4289-9c73-c4b2d1d08393', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 1, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('6454327c-c03a-45fc-ab63-6af5f4420336', '8227cd58-907e-4b1a-bbf8-7b47d4bec509', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 2, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('d169a18a-8c48-44eb-9ab8-76fd2e288f56', 'd2ee4ebd-6ba6-4cb2-b306-f4d2897f6eeb', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 2, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('4fe7d2e3-85bc-444d-920d-ce7a17939a7b', '4fe8d9d6-3bbc-463e-a432-858049a875af', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 2, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('7d1683a0-b8f3-4af9-bab5-82e0338e2709', '6f0e42fa-aec9-45d9-81a8-8f913da3a2de', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 2, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('25e0c6fb-a0f1-4b49-9a48-cd6c749bf0dd', '3c637889-dab5-4196-9838-95b29b43ef92', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 2, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('f15bcaed-b77c-4003-8817-a05338f4aef5', '95d46cfd-25d7-4065-9f5a-20b03177bb5e', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 3, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('31225cfb-67a1-46b7-96ef-0e759ae7db92', '056610f9-fbf3-4262-bdd6-51eca3d81829', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 3, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('887ddac5-ff89-4ea3-a962-6064f8d15d5d', 'b9d9d5b4-ef56-4b07-b695-b083274ed5e0', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 3, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('2381306c-a5be-40d8-9440-2a37bf7668be', 'd9974c9f-462c-4bc4-8a06-e5197b78c912', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 3, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('0736b9df-c6e5-4a3a-b5c5-3402d3f8cab9', 'f09bc5cb-538a-44c7-a515-bea1dc487f4a', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 4, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('127ef739-bb88-4993-98bf-2af159a0eb94', '8ef115f1-3d58-4638-b6f5-04fb7deee1b9', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 4, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('9860d1f3-03a1-4413-8276-5d28f711c980', '5166c85f-5a84-4c4c-98d8-b5d2c5610f34', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 4, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('6fdcaba6-0439-4267-b86a-55ddeb5a09b4', '8fb1bb56-729e-484b-aac3-b27df76489d3', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 4, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('6b0b9720-4200-4d2f-94c6-111917ccd2e5', '98b57912-42f6-4ed5-a1df-02265637c609', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 4, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('92281786-b4dd-4b37-94cc-26f3f39ce06a', '5bcec5de-195a-4e46-9dd4-e926161b47f2', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 5, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('f2d70998-0536-484f-8b06-773d00261d90', '4801bb94-994a-48c5-9f12-daaac6c3ba85', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 5, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('4e3ae78f-21a7-4792-ad3a-787763c36630', '4203855c-e29a-49ff-8bf7-4a5419800005', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 5, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('d1aae3c8-2a77-4db3-bae8-9958c622ca1a', '17101a00-6e74-4628-92dc-20be9a054547', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 5, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('dd15e78a-c73f-425c-a38c-419e9184d2c1', '9812cd45-c3fc-4e1c-816b-2d90d725d2d5', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 6, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('e4f0b1b6-782b-400a-bdc4-6ded3541452a', '7f2dddf8-92a3-4bac-9d44-36602aa03d4e', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 6, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('9151bae3-4379-425c-9835-62b2b1455f2e', '11a231b3-5797-47ff-87f8-a5f665ab98df', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 6, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('5d087e8d-af47-420e-8137-31b6b0476cf7', 'a2800c8f-15a2-4059-8b7b-ec5b1b09b998', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 6, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('21251091-ce8b-4fdc-b1b9-bfde68678629', '1fb4db14-2a74-4cf1-98d8-975fb02f63d2', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 6, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('317a1ad2-8f98-4b56-bf65-88600d5f3924', '2c6fe77d-9617-4357-be7a-f79ad0b8b7df', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 7, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('669f3269-b6b5-4f5b-a6c8-ae90b57d7ff2', 'a6ec1eb7-5de2-4333-9336-9b73d758cd17', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 7, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('3676198e-7aac-4a5e-bc59-f5d1500a71fe', '613b5386-cafc-4503-8b18-899199f2fca9', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 7, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('20b03b25-8332-43c6-ae19-1cf09b7d100a', '792e3ea8-a3b5-4441-8449-c722d7ec6750', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 7, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('6dd53ee8-8415-45cd-968a-c0f93a568bad', 'cdbb6deb-b4bb-40bd-a846-464ae6ef72fe', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 7, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('6ff9245e-dc15-4016-8df8-adfdb5237569', '39888777-c603-4ab8-98e5-a4ea1f8752d8', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 7, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('633ef146-f14c-4c88-a842-a88ad4971246', 'aeca48f8-fe71-4385-9540-902605cb5e42', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 8, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('094acdd0-6b73-494f-a0df-671f00b0cc96', '59e8505c-9c04-4f32-9ca5-bdb0c8e63081', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 8, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('c531e780-8e5e-4599-91af-fa27041555e1', '263026ec-f9e1-4b95-aaaa-16b75b2c6dce', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 8, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('bf1f2e47-b1df-4eac-9a8d-b3214ba03843', 'ae9dee0e-a90f-4bd2-abdb-4803533031f5', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 8, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('750f910b-b46d-476b-a5b9-f8dec49f78c6', '71fa1a34-94dd-4196-b8f3-0cfec29c1fe2', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 8, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('ae7b4f53-6cfe-47a5-9ab6-4d22b9568694', 'f4ceb320-d7c3-4f57-8889-74e2d551efe5', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 9, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');
INSERT INTO public.subject_careers VALUES ('2e446144-f0cf-43a0-9c07-74c3be2a5c02', '7eb46943-6f55-43cc-a190-f450f964dd24', '5dd38dc1-7579-403b-a9a7-7de71dfa7aa5', 9, '2024-06-18 02:53:14.927', '2024-06-18 02:53:14.927');


