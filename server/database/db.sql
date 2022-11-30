-- Products Table
CREATE TABLE products (
    product_id character(40) NOT NULL,
    product_supplier_id integer,
    product_name text,
    product_price double precision,
    taxe_id integer,
    product_quantity integer,
    product_barcode bigint,
    product_alert integer DEFAULT 5
);



COPY public.products (product_id, product_supplier_id, product_name, product_price, taxe_id, product_quantity, product_barcode, product_alert) FROM stdin;
9                                       	511073	Antikljus 25cm ø22mm 10-pack beige	\N	3	5	7310380241256	5
30                                      	123767	BBQ-sås Black Garlic & Chili	11	1	5	7392031501100	5
72                                      	158331	Center rulle	2.2	1	5	7310040021341	5
74                                      	124013	Chai Grönt FT EKO	15.5	1	5	7350054815109	5
76                                      	120269	Champis PET	2.5	1	5	7310401000367	5
87                                      	124592	Chips Tryffel	2.7	1	5	7350045591500	5
7                                       	111910	Aladdin	28	1	3	7310510002504	5
15                                      	150405	Apelsinskal kanderat	4.5	1	3	5701073062708	5
99                                      	117946	Citronsyra påse	3.6	1	5	7311311004285	5
36                                      	117943	Bikarbonat påse	1.95	1	5	7311311004537	5
64                                      	192622	Bruna bönor Sverige	4.95	1	5	7312787703887	5
80                                      	192563	Chili Con Carne	7.95	1	5	7310240064346	5
120                                     	122797	Din Harmoni Vallmofrö & Havssalt	6.5	1	5	7300400482233	5
124                                     	102069	Dipmix Dill	1.5	1	5	7310531037103	5
145                                     	133794	Emser	1.9	1	5	6411401035562	5
149                                     	124292	Extra White bubblemint	3.2	1	5	4009900519762	5
157                                     	107778	Fast vardagsblomsterhonung	10.8	1	5	7350071870082	5
174                                     	117457	Fiskbuljong 6-pack	4.6	1	5	8714100284261	5
175                                     	109392	Fiskbullar i buljong	5.4	1	5	7311170041018	5
179                                     	423887	Fiskgratäng Dill MSC	9.5	1	5	7310500038803	5
188                                     	108258	Fruktgröt Päron Banan 8 mån osockrad	10.7	1	5	7312170029174	5
191                                     	141787	Fruxo tablettask	0.9	1	5	7310780002365	5
196                                     	124739	Fäbodknäcke Frön & Havssalt	11.6	1	5	7312080003646	5
155                                     	122786	Fanta Exotic PET	2.5	1	4	90490705	5
130                                     	116975	Dippmix Dill & Gräslök	1.95	1	5	7340005404223	5
121                                     	121798	Din Stund Chia & Havssalt	6.5	1	5	7300400482691	5
122                                     	191813	Dinkelmjöl fullkorn	6.95	1	5	7310130011412	5
230                                     	180119	Grönsaksfond 0.8% salt	9.8	1	5	7322550052708	5
49                                      	184868	Blåbärssoppa original	4.5	1	0	7310470063195	5
109                                     	112023	Daim singel	1	1	-13	7310511250706	5
102                                     	122470	Coca-Cola zero BRK	2	1	24	5000112637939	5
125                                     	102073	Dipmix Holiday	1.95	1	10	7310531037905	5
75                                      	103567	Champis BRK	2	1	-14	7310401007144	5
108                                     	141978	Daim dubbel	1.3	1	21	7310511257507	5
161                                     	124791	Festis Apelsin EKO BRIK	2	1	27	73165637	5
20                                      	212453	Baconost 17% tub	7.95	1	8	7311441061608	5
128                                     	102072	Dipmix Sourcream onion	1.95	1	8	7310532130513	5
50                                      	184873	Blåbärssoppa osockrad	4.5	1	-1	7310470070193	5
131                                     	116982	Dippmix Fresh Island	1.95	1	12	7340005404278	5
17                                      	719573	Arbogapastej minilimpa	4.5	1	8	7310941803220	5
79                                      	112780	Cheez Doodles	4.1	1	-14	7340005403370	5
5                                       	759751	Ahlgrens bilar lakrits däck	2.95	1	-3	7310350132881	5
113                                     	112296	Dextro Energy Lemon Sticks	2.6	1	2	87111781	5
98                                      	121288	Citronpeppar plastburk	17.95	1	1	7311311016424	5
231                                     	192623	Gula ärtor kapsel	3.95	1	4	7312787703627	5
173                                     	184356	Finn Crisp Original	4.5	1	7	6410500090014	5
134                                     	729595	Diskborste classic mix	1.8	3	13	7330671012600	5
92                                      	209297	Chokladpudding	3.95	1	1	7310470018263	5
343                                     	409055	Klassiska Köttbullar	7.95	1	-18	7310240039535	5
26                                      	110051	Bakpulver ögon	3.95	1	-1	6416453068810	5
34                                      	109192	Bearnaisesås 3-p pulver	3.95	1	-1	7322550092001	5
176                                     	109394	Fiskbullar i dillsås	5.4	1	1	7311170041346	5
44                                      	209426	Blodpudding	4.5	1	0	7310943092523	5
1211                                    	\N	Skärgårdssill	4.1	1	-10	7350126081678	4
101                                     	122462	Coca-Cola Original BRK	2	1	20	5000112637922	5
234                                     	162698	Guld Marie	2.5	1	6	7310521050204	5
143                                     	606122	Duschcreme Sport 250ml	3.95	3	3	4005900553522	5
78                                      	122121	Cheez doodles	1.5	1	7	7300400382205	5
13                                      	111448	Apelsinkrokant Chokladkaka	5	1	-3	7310510001231	5
1366                                    	\N	Tyrkisk Peber Soft & Salty	2.95	1	-3	6416453039711	5
1150                                    	\N	Grythyttan 50cL	2	1	-37	7310401003825	5
241                                     	726271	Halloumi	7.4	1	5	7331494128035	5
249                                     	116430	Havrefras	11.2	1	5	7311171008423	5
252                                     	185873	Havreknäcke 280 gr	6.9	1	5	7300400121859	5
254                                     	123733	Hellmann’s American Style Yellow mustard senap	6.8	1	5	8714100695876	5
266                                     	204525	Hushållsost 26 % NB	14.95	1	5	2340374705339	5
302                                     	109837	Kaffe mellanrost Fair brygg EKO	14.3	1	5	7310050001777	5
245                                     	123738	Hamburgerdressing Original	7.95	1	5	7392005801502	5
268                                     	109473	Idealmakaroner gammeldags	4.2	1	5	7310130003547	5
203                                     	120105	Geléhallon	4.8	1	5	6411401036699	5
309                                     	180120	Kalvfond 0.8% salt	9.5	1	5	7322550052715	5
315                                     	180077	Kantarellsoppa	4.7	1	5	7322550031833	5
316                                     	109203	Kantarellsås 3-pack	5.8	1	5	7322550092216	5
332                                     	124654	Kexchoklad Vegan 40g	2.1	1	5	7310350132669	5
338                                     	120342	Kina gul snacks	2.8	1	5	6416453039131	5
342                                     	410957	Kladdkaka vegansk tina och servera	8.9	1	5	7310890203652	5
366                                     	201408	Kronljus 28cm ø22mm 8-p rosa	\N	3	5	7350023011099	5
367                                     	201404	Kronljus 28cm ø22mm 8-p grå	\N	3	5	7350023011051	5
368                                     	\N	Kronljus 24cm ø22mm 8-p grön	\N	3	5	7350023011754	5
369                                     	\N	Kronljus 24cm ø22mm 8-p svart	\N	3	5	7350023011853	5
370                                     	605548	Kronljus stearin 20cm ø22mm 10-pack röd	8.9	3	5	7350023011570	5
373                                     	117972	Kryddpeppar hel påse	5.6	1	5	7311311004797	5
377                                     	180121	Kycklingfond 0.8% salt	9.5	1	5	7322550052722	5
389                                     	121205	Lakritsi Mint	0.6	1	5	6416453061446	5
391                                     	118482	Lakritsi Raspberry	0.7	1	5	6416453061385	5
397                                     	745125	Lantchips Gräddfil	1.4	1	5	7392659005721	5
401                                     	121236	Lapin Kulta 3.5% BRK	9.8	1	5	6413605091221	5
211                                     	107592	Gott & Blandat Supersur	2.95	1	17	7310350116256	5
223                                     	121299	Grillkrydda	18.9	1	4	7311311014024	1
65                                      	109193	Brunsås 3-pack	3.95	1	2	7322550092032	5
119                                     	115753	Dillchips	4.1	1	7	7310532106488	6
84                                      	115752	Chips Gräddfil & lök	4.1	1	4	7310532106464	5
270                                     	117949	Ingefära malen påse	1.95	1	4	7311311004551	5
194                                     	407748	Frökusar fryst Tina och servera	6.5	1	3	7314879190018	5
53                                      	188265	Bostongurka original	4.5	1	5	7310240050844	5
269                                     	207322	iKaffe	3.95	1	0	7394376616037	5
153                                     	240563	Falukorv Sverige	4.95	1	-41	7300206338000	5
220                                     	115754	Grillchips	4.1	1	19	7310532106501	5
297                                     	120208	Kaffe mellanrost brygg	12.95	1	2	8711000530085	5
172                                     	187636	Finn Crisp caraway	4.5	1	5	6410500900108	5
6                                       	124265	Ahlgrens bilar Sursockrade	2.95	1	94	7310350132898	5
264                                     	606268	Hudsalva Idomin 50g	3.95	3	15	7310610011345	5
52                                      	112632	Bostongurka original	8.95	1	0	7310240150834	5
199                                     	190754	F-müsli Guld nöt	8.95	1	1	5701029160823	5
126                                     	112792	Dipmix Ranch	1.95	1	12	7310532131428	5
110                                     	742357	Delicatoboll singel	1.5	1	63	7315360010754	5
106                                     	119889	Daim Chokladkaka	3.1	1	5	7622201056629	5
177                                     	109393	Fiskbullar i hummersås MSC	5.4	1	-3	7311170041049	5
132                                     	116981	Dippmix Ranch	1.95	1	-5	7340005404261	5
337                                     	120814	Kick Sea Salt Caramel	0.8	1	-5	7310350129140	5
250                                     	147415	Havregryn påse	5.95	1	14	7310130321122	5
232                                     	184519	Gulaschsoppa Österrikisk	7.95	1	4	7310240064377	5
281                                     	124188	Jordnötsringar	3.5	1	10	7310532114001	5
222                                     	121295	Grillkrydda	3.95	1	5	7311311014192	5
162                                     	124811	Festis Hallon EKO BRIK	2	1	62	73165651	5
96                                      	121287	Citronpeppar glasburk	3.95	1	0	7311311016073	5
27                                      	101507	Ballerina kladdkaka	4.5	1	24	7310521397712	5
186                                     	158076	Frukt & Mandel Chokladkaka	3.1	1	-6	7310511217303	5
163                                     	124790	Festis Päron EKO BRIK	2	1	56	73165644	5
164                                     	205442	Filmjölk 3%	3.5	1	-6	7310865087935	5
399                                     	126339	Lantchips lättsaltade	4.5	1	5	7392659002003	5
404                                     	212360	Laxfilé kallrökt skivad. 150 g	11.3	1	5	7393423001154	5
423                                     	115526	Loka Crush Hallon BRK	1.5	1	4	7310401021010	5
442                                     	112809	Läkerol Cactus	1.8	1	5	7310350118496	5
448                                     	124247	Läkerol Raspberry Licortice Big	4.7	1	5	7310350132805	5
472                                     	115300	Mandelägg	5	1	5	5774540959146	5
357                                     	742973	Korvbröd 10-pack Tina och servera	4	1	4	7311379537015	5
205                                     	213021	Gifflar kanel	6.95	1	2	7311070006209	5
272                                     	106670	Inlagd sill MSC	7.95	1	4	7311171007938	5
476                                     	123633	Marabou Havssalt	5.9	1	5	7622201099374	5
459                                     	186006	Löksill fransk bit MSC	4.1	1	5	7311171004128	5
460                                     	106671	Löksill MSC	8.3	1	5	7311171006511	5
470                                     	116776	Mandelmassa	4.95	1	5	5709521036226	5
505                                     	607025	Såpa citron 750ml	4.4	3	5	7310610021450	5
511                                     	116939	Tacosås Hot	4.7	1	5	7311312002143	5
515                                     	124012	Te hallon grädde EKO FT	0.777	1	5	7350054815833	5
516                                     	124038	Te rabarber vanilj EKO FT	0.777	1	5	7350054815741	5
559                                     	180118	Viltfond kantarell 0.8% salt	9.5	1	5	7322550052692	5
573                                     	183308	Wafers Jätten vanilj	7.4	1	5	7310525501412	5
579                                     	141785	Zoo Tablettask	0.6	1	5	7310780002303	5
323                                     	123239	Karl Fazer Mjölkchoklad	2.7	1	-8	6416453015746	5
81                                      	116945	Chilisås glasflaska	5.95	1	8	5900783007867	5
352                                     	147235	Knäckebröd Frukost	3.95	1	-5	7300400248204	5
347                                     	108671	Knäcke rund normalgräddat	7.95	1	5	7312082001015	5
365                                     	600676	Kronljus 24cm ø22mm 10-p vit	11.95	3	2	4002911152591	5
400                                     	121236	Lapin Kulta 3.5% BRK	3.5	1	28	6413600091226	5
578                                     	119710	Zoo	1.5	1	13	7310350103959	5
273                                     	183614	Inlagd sill MSC	7.95	1	3	7311171007938	5
364                                     	212369	Kronjäst matbröd färsk	1.9	1	-3	73500391	5
348                                     	108784	Knäcke surdeg flerkorn	4.65	1	20	7300400128926	5
344                                     	111064	Knäcke Fäbod original	8.95	1	2	7312080003615	5
371                                     	900900	Kronljus stearin 20cm ø22mm vit	19.95	3	-1	7301002408676	5
253                                     	113329	Havreknäcke GF LF	5.95	1	4	7310100600462	1
469                                     	116774	Mandelkubb	6.95	1	4	7317065004014	5
443                                     	112811	Läkerol Cassis	2.1	1	-34	7310350118465	5
336                                     	110409	Kick Sea salt	0.8	1	-43	7310350117116	5
1361                                    	\N	Mariestads Öl 3.5% 50cL	3.5	1	11	7310401006710	5
435                                     	123549	Loka citron PET	1.9	1	15	7310400020731	5
346                                     	108672	Knäcke rund brungräddat	7.95	1	-3	7312082001039	5
331                                     	141794	Kexchoklad stycksak	0.5	1	1	7310040027565	5
271                                     	186050	Inlagd sill bit MSC	4.1	1	-2	7311171004050	5
392                                     	118459	Lakritsi Salmiak	1	1	-1	6416453061392	5
498                                     	207014	Messmör Original 5%	3.5	1	2	7313160002443	5
314                                     	117971	Kanel malen påse	2.95	1	3	7311311004803	5
433                                     	123509	Loka naturell PET	2.5	1	11	7310400020182	5
411                                     	107258	Lingonsylt	8.95	1	-8	7313590199508	5
449                                     	112808	Läkerol Salmiak	2.1	1	-19	7310350118519	5
228                                     	109199	Gräddsås 3-pack	3.95	1	14	7322550092025	5
334                                     	119452	Kick Original	0.8	1	-8	5700417006804	10
304                                     	114722	Kaffe skånerost brygg RA	12.95	1	15	7310731101734	5
388                                     	118456	Lakritsi Lemon	1	1	-1	6416453061354	5
378                                     	114885	Kärnvetemjöl	3.95	1	14	7310130006043	5
350                                     	108673	Knäcke trekant brungräddat	2.95	1	-7	7312080004025	5
381                                     	192320	Köttsoppa m grönsaker	5.95	1	3	7310500025285	5
267                                     	183957	Husman	3.95	1	-5	7300400118415	5
218                                     	209115	Grebbestads® Ansjovisfilé Original	5.95	1	18	7311170022116	5
396                                     	126350	Lantchips Gräddfil	4.5	1	3	7392659002102	5
1133                                    	\N	Bullar X4	10	1	-535	\N	5
305                                     	111477	Kakao ögon	5.95	1	2	6416453062320	5
582                                     	206202	Ädelost Grädd 36%	6.8	1	4	7311878172335	5
590                                     	\N	Mer Päron	2	1	4	54490475	5
595                                     	\N	Loka Crush Päron 33cL	2	1	4	7310401020952	5
596                                     	\N	Julmust Apotekarnes Sockerfri 0.5L	2.5	1	15	7310070733856	5
597                                     	\N	Julmust Apotekarnes 33cL	2	1	22	7310070765802	5
599                                     	\N	Julmust Apotekarnes 0.5L	2.5	1	4	7310070059208	5
600                                     	\N	Herrljunga Julmust 33cL	2	1	15	7312720042271	5
601                                     	\N	Lagrad Julmust Nygårda 33cL	2	1	14	7310401004778	5
603                                     	\N	Julmust Apotekarnes Sockerfri 1.4L	3.95	1	5	7310070151308	5
604                                     	\N	Jokk Lingon 1L	5.25	1	6	7310861008804	5
598                                     	\N	Julmust Apotekarnes 1.4L	3.95	1	-8	7310070151209	5
564                                     	759976	Vitvinsvinäger	8.95	1	5	7310155506450	5
605                                     	\N	Blossa Glögg Lätt 75cL	9.95	1	5	5710778002148	5
609                                     	\N	Mandel biskvier	3.5	1	17	7310040094727	5
610                                     	\N	Iskonfekt Glutenfri	6.5	1	6	4008601261802	5
613                                     	\N	Kvibille Cheddar	19.95	1	6	2340302104289	5
617                                     	\N	Mangoraja	6.95	1	8	7313161404987	5
618                                     	\N	Kallrökt Lax 350g Korshags	24.95	1	10	2357553003612	5
619                                     	\N	Gravad Lax 350g Korshags	24.95	1	6	2357552803565	5
621                                     	\N	Varmrökt Lax Citron 125g Korshags	9.95	1	8	5755332	5
658                                     	104809	Norrlands Guld 3.5 % BRK	17.2	1	5	7310402006795	5
673                                     	211852	Ostkaka	6.5	1	3	7310890100333	5
674                                     	111932	Paradis	24.8	1	2	7310510002566	5
678                                     	124294	Pepparkaka Jul plåtburk	11	1	5	7312220125689	5
684                                     	201966	Pepparkaksdeg kyld	7.3	1	5	7317062055002	5
695                                     	732695	Plopp dubbel stycksak	1.7	1	5	7310040020726	5
560                                     	102010	Viol Tablettask	1.3	1	4	6411401037184	5
491                                     	117835	Mazarin singel	1.5	1	2	7315361112372	5
1355                                    	\N	Vetekaka 	7.95	1	4	7311800009531	2
594                                     	\N	Trocadero 33cL	2	1	4	7310401007151	5
606                                     	\N	Flaggpunsch 26% 0.5L	25	3	1	7312041588021	5
545                                     	602711	Tvålull 100g Bra miljöval	4.95	3	3	7310034230100	5
602                                     	\N	Blandsaft Hallon BOB	7.95	1	2	7310090345138	5
552                                     	110097	Vaniljsocker ögon	3.95	1	23	6416453068865	5
513                                     	117113	Tacosås Mild	4.5	1	2	7311312002075	5
568                                     	752382	Värmeljus 59mm Maxi 10h	12.95	3	7	7321010006107	3
507                                     	607026	Såpa gul 750ml	4.5	3	3	7310610021467	5
509                                     	169545	Taco Tubs	7.95	1	4	7311310038205	5
580                                     	208770	Åseda Gräddost 38%	14.95	1	6	5711953018275	5
622                                     	\N	Kallrökt Lax 150g Korshags	12.95	1	37	2357552901506	5
431                                     	103252	Loka naturell BRK	2	1	17	7310401007120	5
583                                     	192859	Äppelcidervinäger	5.5	1	3	7310155507495	5
556                                     	114884	Vetemjöl special	7.95	1	11	7310130006050	5
593                                     	\N	Loka Citron 33cL	2	1	-4	7310401007113	5
591                                     	\N	Aqua dor	2	1	5	5703828003288	5
624                                     	\N	Tunnbröd Hård	6.95	1	17	7313830006795	5
508                                     	114523	Taco Spice Mix påse	3.45	1	-17	7311310031015	5
481                                     	107411	Mariestad alkoholfri ENGL	2.5	1	13	7310401009551	5
517                                     	111342	Tomatketchup Original	4.2	1	3	7310240060638	5
506                                     	607024	Såpa grön 750ml	4.5	3	9	7310610021474	5
512                                     	117114	Tacosås Medium	4.5	1	2	7311312002112	5
563                                     	192858	Vitvinsvinäger	5.5	1	5	7310155506405	5
637                                     	158079	Mjölkchoklad Kaka	3.1	1	5	7310511210304	5
528                                     	120271	Trocadero PET	3.95	1	2	7310401000374	4
623                                     	\N	Gravad Lax 150g Korshags	12.95	1	39	2357552701502	5
586                                     	133357	Äpplemos	4.95	1	5	7310090301882	5
587                                     	109572	Ättika 24%	3.95	1	1	7320081190302	5
699                                     	409604	Polarklämma renkött	3	1	-10	7311800008602	5
521                                     	121740	Kronjäst för söta degar färsk	1.9	1	-4	73500360	5
510                                     	101060	Tacoskal	6.95	1	7	7311310038038	5
588                                     	101901	Ättikssprit 12%	4.5	1	0	7310300011020	5
474                                     	123899	Mannagryn	5.95	1	4	7310130010590	5
703                                     	103274	Polly blå	3.8	1	5	7310040034556	5
704                                     	103275	Polly röd	4.4	1	5	7310040034563	5
607                                     	\N	Purity Vodka 40% 0.7L	39	3	-4	7350043200015	5
608                                     	\N	Helsingborg Lager 5% 33cL	5	1	-6	7350060230019	5
664                                     	725566	Nyponsoppa klassisk	11.95	1	5	7310470013558	5
698                                     	163080	Pofiber	4.95	1	5	7310100857200	5
656                                     	107518	Never stop påse	3.95	1	5	7310510001729	5
708                                     	110144	Premium Dark 70%	5.3	1	5	7622400624520	5
710                                     	208948	Prickig korv skiv	3.5	1	27	7300200264008	5
720                                     	212343	Proviva Mango	8.1	1	5	7350000550535	5
728                                     	124817	Ramlösa Granatäpple BRK	1.2	1	5	7310070004772	5
756                                     	900091	Rågkaka Tina och servera	9.8	1	5	7330671019043	5
764                                     	107230	Rårörda lingon EKO	17.1	1	5	7317661714706	5
779                                     	184867	Saftsoppa	5	1	5	7310470063294	5
788                                     	123162	Salty Toffee	2.8	1	5	6416453015753	5
802                                     	123192	Senap stark plastflaska	6.9	1	5	8717163867914	5
808                                     	106672	Senapssill	8.3	1	5	7311171006528	5
711                                     	774015	Prickig korv skivad	6.95	1	5	7300200266002	5
801                                     	117757	Senap skånsk glasburk	5.95	1	5	7310430000581	5
761                                     	117408	Rågsikt	6.95	1	5	7310130007194	5
737                                     	404128	Renskav	12.5	1	5	7319993289761	5
813                                     	121974	Singoalla hallon och lakrits	4.7	1	5	7310520007650	5
820                                     	158362	Skotte dubbel	1.3	1	5	7310511253608	5
827                                     	200908	Smoothie Ananas Banan Kokos ENGL	3.5	1	5	7350020720093	5
829                                     	206225	Smoothie Jordgubb Banan Guava ENGL	3.5	1	5	7350020720734	5
845                                     	109435	Snabbmakaroner	4.4	1	5	7310130003530	5
859                                     	776642	Stenbitsrom svart MSC	89.7	1	5	7392497082298	5
880                                     	607025	Såpa citron 750ml	4.4	3	5	7310610021450	5
886                                     	116939	Tacosås Hot	4.7	1	5	7311312002143	5
890                                     	124012	Te hallon grädde EKO FT	0.777	1	5	7350054815833	5
891                                     	124038	Te rabarber vanilj EKO FT	0.777	1	5	7350054815741	5
692                                     	133738	PIM PIM tablettask	0.95	1	-16	7310780002327	5
744                                     	163785	Riskakor Gräddfil Lök glutenfria	4.5	1	12	7320496055821	5
611                                     	\N	Extra White	3	1	7	4009900527897	5
755                                     	191719	Rågflingor	5.95	1	14	7310130331084	5
713                                     	105749	Pripps Blå 3.5% 6-p BRK	13.1	1	4	7310072766050	5
771                                     	113508	Rödbetor. skivade	7.3	1	5	7310240151169	5
592                                     	\N	Ramlösa 0.5L	2.5	1	3	7310070001719	5
806                                     	109190	Senap sötstark plastflaska	6.95	1	5	7392031000016	5
614                                     	\N	Leverpastej Lönneberga	3.5	1	17	7310941801301	5
691                                     	119487	Pim Pim	1.5	1	11	7310350109142	5
570                                     	784673	Västerbottensost 35% normalbit	17.95	1	-9	7310861081005	5
752                                     	185594	Rotmos pulver	6.95	1	3	7310240066098	5
549                                     	118905	Tändstickor	3.95	3	13	7310680023118	10
757                                     	192045	Rågkross	3.85	1	38	7310130769030	5
558                                     	200674	Wienerkorv Sverige	15.5	1	9	7330671013171	5
793                                     	102840	Sandwich franska örter	2	1	-7	7300400127394	5
705                                     	150951	Potatismjöl	3.3	1	4	7310160000158	5
792                                     	105152	Sandwich cheese paprika	2	1	-3	7300400128315	5
676                                     	121600	Penne glutenfri	5.95	1	4	8028833005735	5
746                                     	192293	Riskakor Ost glutenfria	4.1	1	16	7310186055804	5
625                                     	\N	Le Suédois Pour Les Nuls	7.95	1	-11	9782412042694	5
828                                     	206599	Smoothie blåbär hallon ENGL	3.5	1	33	7350020720024	5
660                                     	115189	Norrlandspölsa	5.95	1	4	7310862084272	5
819                                     	117356	Skorpor Kardemumma	5.9	1	-13	7311070362572	5
615                                     	\N	Gammeldags Enrisrökt Korv 300g	5.95	1	8	7300202175005	5
796                                     	102839	Sandwich tomat basilika	2	1	-10	7300400127363	5
589                                     	192335	Örtsalt Herbamare EKO	7.7	1	10	7610313412143	5
768                                     	212215	Räksallad	5.95	1	8	7313160004997	5
822                                     	186016	Skärgårdssill bit MSC	4.1	1	5	7311171004098	5
892                                     	111342	Tomatketchup Original	4.2	1	5	7310240060638	5
882                                     	607026	Såpa gul 750ml	4.5	3	5	7310610021467	5
760                                     	117409	Rågmjöl Grovt	6.95	1	5	7310130007170	5
616                                     	\N	Lohmanders Bearnaise	5.95	1	1	7313160004744	5
1299                                    	\N	Peluche Ours	16	3	6	5420077317354	0
688                                     	117962	Pepparkakskrydda påse	2.95	1	3	7311311004391	5
855                                     	182639	Sparrissoppa	4.95	1	4	7322550031796	5
1300                                    	\N	Kor Book	9.95	3	2	9789174430974	0
821                                     	106673	Skärgårdssill	8.3	1	4	7311171006535	5
895                                     	121743	Kronjäst matbröd färsk	1.9	1	5	73500391	5
896                                     	121740	Kronjäst för söta degar färsk	1.9	1	5	73500360	5
877                                     	167846	Syltsocker	4.95	1	5	7310340112473	5
887                                     	117114	Tacosås Medium	4.5	1	5	7311312002112	5
888                                     	117113	Tacosås Mild	4.5	1	5	7311312002075	5
884                                     	169545	Taco Tubs	7.95	1	5	7311310038205	5
934                                     	180118	Viltfond kantarell 0.8% salt	9.5	1	5	7322550052692	5
948                                     	183308	Wafers Jätten vanilj	7.4	1	5	7310525501412	5
954                                     	141785	Zoo Tablettask	0.6	1	5	7310780002303	5
957                                     	206202	Ädelost Grädd 36%	6.8	1	4	7311878172335	5
965                                     	\N	Mer Päron	2	1	4	54490475	5
966                                     	\N	Aqua dor	2	1	6	5703828003288	5
970                                     	\N	Loka Crush Päron 33cL	2	1	4	7310401020952	5
971                                     	\N	Julmust Apotekarnes Sockerfri 0.5L	2.5	1	15	7310070733856	5
972                                     	\N	Julmust Apotekarnes 33cL	2	1	22	7310070765802	5
973                                     	\N	Julmust Apotekarnes 1.4L	3.95	1	8	7310070151209	5
974                                     	\N	Julmust Apotekarnes 0.5L	2.5	1	4	7310070059208	5
975                                     	\N	Herrljunga Julmust 33cL	2	1	15	7312720042271	5
976                                     	\N	Lagrad Julmust Nygårda 33cL	2	1	14	7310401004778	5
978                                     	\N	Julmust Apotekarnes Sockerfri 1.4L	3.95	1	5	7310070151308	5
979                                     	\N	Jokk Lingon 1L	5.25	1	6	7310861008804	5
980                                     	\N	Blossa Glögg Lätt 75cL	9.95	1	5	5710778002148	5
982                                     	\N	Purity Vodka 40% 0.7L	39	3	1	7350043200015	5
983                                     	\N	Helsingborg Lager 5% 33cL	5	1	2	7350060230019	5
984                                     	\N	Mandel biskvier	3.5	1	17	7310040094727	5
985                                     	\N	Iskonfekt Glutenfri	6.5	1	6	4008601261802	5
846                                     	145247	Snabbmarsan vaniljsås 7p	3.5	1	-3	7310470016283	5
627                                     	116749	Micropopcorn Smör 3 pack	4.85	1	0	7310532160787	5
659                                     	104809	Norrlands Guld 3.5 % BRK	3.5	1	23	7310401006765	5
763                                     	139660	Rårörda lingon	8.95	1	20	7310240055184	5
707                                     	236756	Potatissallad	6.5	1	1	7313161310561	5
786                                     	102008	Salta Katten	1.3	1	0	6411401037177	5
693                                     	424067	Pizza Original	3	1	3	7310960713654	5
933                                     	200674	Wienerkorv Sverige	15.5	1	9	7330671013171	5
885                                     	101060	Tacoskal	6.95	1	18	7311310038038	5
857                                     	182918	Sport knäckebröd	3.95	1	13	7300400114752	5
814                                     	111176	Singoalla original	4.5	1	7	7310520003089	5
706                                     	235707	Potatissallad	3.95	1	5	7313161311377	5
726                                     	154651	Pärlsocker	3.5	1	0	7310340114026	5
809                                     	186036	Senapssill bit MSC	4.1	1	-16	7311171004135	5
799                                     	121203	Senap original tub	4.5	1	12	8714100751527	5
667                                     	123848	Oboy original påse	6.95	1	2	7622210664181	5
772                                     	235702	Rödbetssallad	3.95	1	11	7313161311360	5
633                                     	106844	Mini krustader	5.9	1	21	40029180505	5
839                                     	700644	Smörgåsfett 75% extrasaltat	5.95	1	11	7310860005859	5
881                                     	607024	Såpa grön 750ml	4.5	3	13	7310610021474	5
753                                     	182928	Runda Kanel	4.95	1	3	7300400115636	5
679                                     	146296	Pepparkakor Annas	5.95	1	-29	7312220000054	5
841                                     	112631	Smörgåsgurka. skivad	5.95	1	0	7310240150131	5
758                                     	712324	Rågkusar osötad Tina och servera	8.95	1	-2	7314879170003	5
986                                     	\N	Extra White	3	1	14	4009900527897	5
987                                     	\N	Risgröt Felix 500g	2.95	1	6	7310090755692	5
988                                     	\N	Kvibille Cheddar	19.95	1	6	2340302104289	5
992                                     	\N	Mangoraja	6.95	1	8	7313161404987	5
993                                     	\N	Kallrökt Lax 350g Korshags	24.95	1	10	2357553003612	5
994                                     	\N	Gravad Lax 350g Korshags	24.95	1	6	2357552803565	5
996                                     	\N	Varmrökt Lax Citron 125g Korshags	9.95	1	8	5755332	5
1000                                    	\N	Le Suédois Pour Les Nuls	7.95	1	12	9782412042694	5
612                                     	\N	Risgröt Felix 500g	2.95	1	4	7310090755692	5
502                                     	167846	Syltsocker	4.95	1	5	7310340112473	5
939                                     	759976	Vitvinsvinäger	8.95	1	5	7310155506450	5
938                                     	192858	Vitvinsvinäger	5.5	1	5	7310155506405	5
958                                     	192859	Äppelcidervinäger	5.5	1	5	7310155507495	5
963                                     	101901	Ättikssprit 12%	4.5	1	5	7310300011020	5
962                                     	109572	Ättika 24%	3.95	1	5	7320081190302	5
961                                     	133357	Äpplemos	4.95	1	5	7310090301882	5
920                                     	602711	Tvålull 100g Bra miljöval	4.95	3	5	7310034230100	5
22                                      	169009	Bakform Fettbeständigt papper 50x25mm vit	3.6	3	3	7310275586158	5
1008                                    	\N	Lapponia 50cL 21%	15.95	3	2	6420614681657	5
977                                     	\N	Blandsaft Hallon BOB	7.95	1	3	7310090345138	5
1007                                    	\N	Grängesberg Jul Lättöl 33cL	3.5	1	16	7310401032641	5
981                                     	\N	Flaggpunsch 26% 0.5L	25	3	5	7312041588021	5
935                                     	102010	Viol Tablettask	1.3	1	10	6411401037184	5
952                                     	103642	Zingo orange BRK	2	1	2	7310070766113	5
969                                     	\N	Trocadero 33cL	2	1	17	7310401007151	5
968                                     	\N	Loka Citron 33cL	2	1	4	7310401007113	5
883                                     	114523	Taco Spice Mix påse	3.45	1	5	7311310031015	5
955                                     	208770	Åseda Gräddost 38%	14.95	1	7	5711953018275	5
991                                     	\N	Lohmanders Bearnaise	5.95	1	3	7313160004744	5
943                                     	752382	Värmeljus 59mm Maxi 10h	12.95	3	10	7321010006107	3
924                                     	118905	Tändstickor	3.95	3	40	7310680023118	10
1220                                    	\N	Cheese Slicer	9.95	3	0	7332462084223	1
1012                                    	\N	Loka Citron	2.5	1	5	7310401046808	5
1013                                    	\N	Coca-Cola 33cL	2	1	15	5449000214911	5
1014                                    	\N	Froosh Clean Green	3.5	1	2	7350020727726	5
903                                     	120271	Trocadero PET	3.95	1	9	7310401000374	4
1297                                    	\N	Peluche Cheval	16	3	11	5420077312212	0
1009                                    	\N	Stockholms Bränneri Pink Gin	40	3	0	7350015330030	5
825                                     	119265	Smash	3.5	1	3	7310520006851	5
183                                     	117562	Flädersaft	5.95	1	10	7310770548583	5
953                                     	119710	Zoo	1.5	1	40	7310350103959	5
1005                                    	\N	Trocadero 50cL	2.7	1	5	7310401024844	5
964                                     	192335	Örtsalt Herbamare EKO	7.7	1	15	7610313412143	5
714                                     	105749	Pripps Blå 3.5% 6-p BRK	3.5	1	56	7310070766052	5
861                                     	147245	Ströbröd	3.9	1	0	7300400312400	5
997                                     	\N	Kallrökt Lax 150g Korshags	12.95	1	51	2357552901506	5
1003                                    	\N	Herrljunga Cider Alkoholfri 1L	4.65	1	6	7312720022235	5
999                                     	\N	Tunnbröd Hård	6.95	1	21	7313830006795	5
931                                     	114884	Vetemjöl special	7.95	1	11	7310130006050	5
990                                     	\N	Gammeldags Enrisrökt Korv 300g	5.95	1	8	7300202175005	5
998                                     	\N	Gravad Lax 150g Korshags	12.95	1	55	2357552701502	5
995                                     	\N	Varmrökt Lax Naturell 125g Korshags	9.95	1	41	5755325	5
925                                     	118906	Tändstickor 8-Pack	3.95	3	20	7310680022517	10
1006                                    	\N	Ramlösa 80cL	3.95	1	3	73120001	5
927                                     	110097	Vaniljsocker ögon	3.95	1	28	6416453068865	5
914                                     	119493	Tutti Frutti Original	3.5	1	0	6416453038271	5
1002                                    	\N	Pommac 1.4L	3.95	1	4	7310070701916	5
989                                     	\N	Leverpastej Lönneberga	3.5	1	24	7310941801301	5
1                                       	122889	100 Frön & Havssalt	4.5	1	18	7300400482165	5
834                                     	409123	Små delikatess köttbullar	6.5	1	-5	7310240039504	5
842                                     	145844	Smörgåsrån Vete	3.95	1	-13	7310521080300	5
1016                                    	\N	Inlagd Sill 500g	8.3	1	5	7311171006504	5
1020                                    	\N	Fil Citron	4.5	1	3	7310867000710	5
1024                                    	\N	Hushållsost	14.95	1	6	2340374706428	5
1025                                    	\N	Arla Ko Präst 31%	17.95	1	5	2340415206948	5
1032                                    	\N	Kardemumma Glasburk	6.95	1	6	7311311015205	5
1034                                    	\N	Ekologiska Rödbettor	8.95	1	8	7310240151107	5
262                                     	109201	Hollandaisesås 3-pack	3.95	1	5	7322550092018	5
1056                                    	\N	Anna Försvaringsask	11.95	3	4	7315340382000	5
1060                                    	\N	Marabou Dröm Krisp	3.1	1	5	7622210059956	5
1064                                    	\N	Fazer Chocolate Dumle	2.95	1	5	6416453015739	5
1065                                    	\N	Tutti Frutti Sour	3.5	1	5	6416453035966	5
1068                                    	\N	Marabou Co-co	1.95	1	5	7310511251406	5
1070                                    	\N	Ahlgrens Bilar Fruktkombi	2.95	1	4	7310350132904	5
1073                                    	\N	Gröna Kulor Chokladpraliner	9.95	1	5	6416453071339	5
520                                     	121743	Kronjäst matbröd färsk	1.9	1	5	73500391	5
1079                                    	\N	Agave Sirap	9.95	1	5	3088542506508	5
1083                                    	\N	Brun Farin Strö	3.95	1	5	7310340114033	5
1084                                    	\N	Mandelmassa 500g	14.95	1	2	7393082110761	5
1087                                    	\N	Fruktmusli GF	10.95	1	4	7311143200107	5
967                                     	\N	Ramlösa 0.5L	2.5	1	7	7310070001719	5
1053                                    	\N	Ris Kakor Cheddar	4.5	1	2	7350028544066	5
626                                     	116748	Micropopcorn Salt 3 pack	4.85	1	20	7310532160794	5
1010                                    	\N	Rekorderlig Päron Cider	3.5	1	11	7311100400908	5
1038                                    	\N	Oboy 1.1kg	13.95	1	1	7622300248987	5
1054                                    	\N	Ris Kakor Pizza	4.5	1	-1	7310106055815	5
1075                                    	\N	Knäckformar 240st	3.3	3	4	7312270002749	5
1037                                    	\N	Klassiskt Potatismos	6.95	1	3	7310240066128	5
1023                                    	\N	Beer Cheese Ilchester	14.95	1	3	5014442405045	5
1040                                    	\N	Dippmix Vitlök	1.95	1	-7	7340005404254	5
1088                                    	\N	Psyllium 85% GF	7.95	1	3	7311149104003	5
1086                                    	\N	Odense Nougat	5.95	1	4	5709521027644	5
1080                                    	\N	Mörk Sirap	4.5	1	13	7310340464428	5
1041                                    	\N	Dippmix Sweet Chili	1.95	1	1	7340005404209	5
376                                     	145580	Kung Oscar Välkryddade Pepparkakor original	5.95	1	3	7310521058507	5
1033                                    	\N	Ekologiska Blandade Bönor	3.75	1	1	7350002403440	5
1047                                    	\N	Start Naturell	7.95	1	1	7310130801709	5
1050                                    	\N	Bliw Blåbär	4.5	3	1	7310618427032	5
945                                     	784673	Västerbottensost 35% normalbit	17.95	1	16	7310861081005	5
1015                                    	\N	Hela Filéer Sill	7.95	1	0	7311170014111	5
1031                                    	\N	Svartpeppar	4.5	1	6	7311311014185	5
1082                                    	\N	Florsocker	3.5	1	4	5701259100781	5
1036                                    	\N	Kung Gustaf Sardiner	4.5	1	6	7311170061092	5
1026                                    	\N	Amerikansk Dressing Original	3.5	1	4	7311440052157	5
1049                                    	\N	Fullkornsvälling 1 år	13.95	1	1	7310100684370	5
1029                                    	\N	Piffi Allkrydda	5.25	1	9	7310700817703	5
1089                                    	\N	Frödinge Kladdkaka	9.95	1	4	7310890203508	5
1028                                    	\N	Kryddpeppar	1.9	1	4	7311311004360	5
1077                                    	\N	Brödkryddor	1.7	1	4	7311311005046	5
1019                                    	\N	Ädelost 175g	6.95	1	3	7311440016364	5
1058                                    	\N	Marabou Darkmilk Chocolate Roasted Almonds	3.1	1	3	7622210655745	5
1043                                    	\N	Frasvåfflor	3.5	1	-2	7310470030203	5
1062                                    	\N	Marabou Premium Fin 70%	4.95	1	3	7622300544010	5
1092                                    	\N	Polarklämma Skinka	3	1	5	7311800008626	5
1035                                    	\N	Fiskbullar Räksås	5.4	1	2	7311170041353	5
1022                                    	\N	Rödbetssallad 400g	6.5	1	4	7313161310677	5
484                                     	117668	Marsan vaniljsås färdig	4.5	1	3	7310470061108	5
1030                                    	\N	Salladskrydda	3.95	1	9	7311311018145	5
869                                     	724727	Svampduk Classic mix 4st	4.5	3	-1	7391704800144	5
1021                                    	\N	Filmjölk Hallon/Blåbär	4.5	1	4	7310865088215	5
1072                                    	\N	Sun Maid Rusin 250g	4.95	1	-2	41143024324	5
1045                                    	\N	Fullkornsvälling 8 mån	13.95	1	3	7310100683953	5
1076                                    	\N	Nejlika	1.95	1	-3	7311311004599	5
1046                                    	\N	Havre Fras	7.95	1	2	7311171008386	5
1093                                    	\N	polarklämma Kalkon	3	1	5	7311800888006	5
1094                                    	\N	Brakes Värmkorv	15.5	1	2	7330671013164	5
1097                                    	\N	Skogaholm Originalrost	7.5	1	3	7314875270011	5
1098                                    	\N	Släta Bullar GF	\N	1	5	7330242200665	5
1099                                    	\N	Lypsyl	2.7	3	6	5023721950039	5
1104                                    	\N	Skogaholm Bistro	\N	1	2	7314873552003	5
1105                                    	\N	Fazer Havrefralla	\N	1	1	7314879198007	5
1139                                    	\N	Hushållsost	14.95	1	15	2340374705629	5
1140                                    	\N	Munkens Svarta	14.95	1	10	2340343605400	3
732                                     	206398	Ramslök & Citronsill MSC	4.1	1	4	7311171006979	5
1116                                    	\N	Filmjölk Jordgubb	4.95	1	10	7310865088222	4
840                                     	120331	Smörgåsgurka skivad	4.5	1	5	7310240050189	5
1121                                    	\N	Kockens Saffran 0.5g	3.95	1	20	7310700814207	5
1122                                    	\N	Santa Maria Saffran	4.5	1	12	7311312002044	5
1123                                    	\N	Sopset	19.95	1	4	7312280010451	3
1125                                    	\N	Sheepskin Long Wool Ivory	120	3	1	9325021010656	1
1126                                    	\N	Sheepskin Long Wool Single Rug Teal	120	3	1	9325021034522	1
1124                                    	\N	Sheepskin Long Wool Single Rug Lime	120	3	1	9325021034515	1
1127                                    	\N	Sheepskin Long Wool Single Rug Rose	120	3	1	9325021010793	1
35                                      	206500	Bearnaisesås chili	4.4	1	8	7350042720132	5
577                                     	103642	Zingo orange BRK	2	1	2	7310070766113	5
1138                                    	\N	Prinskorv	5.95	1	6	7300207088003	5
1137                                    	\N	Räkost Ask 330g	12.95	1	7	7311441343100	4
1055                                    	\N	Knäcke trekant normalgräddat	2.95	1	2	7312080004018	5
1027                                    	\N	Hela Rödbetot	5.95	1	16	7310240051339	5
212                                     	114889	Grahamsmjöl	6.5	1	1	7310130006067	5
1044                                    	\N	Havre Välling 6 mån	13.95	1	0	7310100683533	5
1134                                    	\N	Sandwich	6	1	-76	\N	5
1136                                    	\N	Räkost Tub 275g	9.95	1	3	7311440020897	5
24                                      	605133	Bakplåtspapper 33x42cm Guldhöken	2.5	3	2	7332636000011	5
1106                                    	\N	Sandwich Chives	2	1	-13	7300400122689	5
1112                                    	\N	Cheez Cruncherz	4.1	1	16	7340005403448	4
1114                                    	\N	Senapssill  Stor	8.3	1	-8	7350126081821	5
546                                     	111979	Tyrkisk Peber Original	2.95	1	-4	6416453028210	5
1052                                    	\N	Krögarens	4.95	1	1	7300400121187	5
1048                                    	\N	Gröt Äpple & Blåbär	3.95	1	-18	7310100690708	5
1066                                    	\N	Bridge	3.95	1	-4	7310040052284	5
1100                                    	\N	Marabou Japp	0.9	1	-4	7040110663408	5
1042                                    	\N	Dippmix Taco	1.95	1	-1	7340005404247	5
1118                                    	\N	Fiskbuljong	3.75	1	6	8714100786710	3
1152                                    	\N	Loka Jordgubb Granatäpple PET	2.5	1	43	7310401042978	3
1091                                    	\N	Felix Krögarpytt Klassisk	7.95	1	-20	7310240075472	5
1164                                    	\N	Jordgubb Kräm	4.5	1	3	7310470065021	4
1095                                    	\N	Renstek Varmrökt Skivad 500g	37.5	1	2	7319993222300	5
1078                                    	\N	Kanel	1.5	1	-3	7311311004179	5
1071                                    	\N	Lakritsi Original	1	1	-2	6416453061361	5
1146                                    	\N	Salt Skalle	2.95	1	18	7393077181660	5
1069                                    	\N	Snöre Jordgubb	2.7	1	-5	5700417990219	5
1103                                    	\N	Marabou Mjölkchocklad Single	0.9	1	0	73550013	5
170                                     	208415	Filmjölk LF KRAV	5.8	1	2	7310865094117	5
1067                                    	\N	Polka Grisar	3.5	1	3	7310350117888	5
1017                                    	\N	Skinkost 175g	7.95	1	3	7311440026752	5
306                                     	201383	Kalles Original MSC	4.5	1	-141	7311170031118	5
1143                                    	\N	Sandwich Pizza	2	1	17	7300400482752	5
1061                                    	\N	Marabou Black Saltlakrits	3.1	1	-8	7622201464011	5
1063                                    	\N	Plopp	3.5	1	9	7310040020504	5
1102                                    	\N	Marabou 30 praliner med nougatfyllning	9.95	1	0	7622210929525	5
1085                                    	\N	Rågmjöl Finmalt	6.95	1	14	7310130007187	5
1051                                    	\N	Yes Original	9.95	3	1	4015600444419	5
1081                                    	\N	Ljus Sirap	4.5	1	10	7310340464435	5
1059                                    	\N	Salmiakki	3.5	1	-10	6411401015830	5
1011                                    	\N	Loka Päron 33cL BRK	2	1	20	7310401007137	5
112                                     	183959	Delikatess Sesam knäcke	4.65	1	5	7300400121644	5
1174                                    	\N	Hushållsost	14.95	1	4	2340374706206	3
1176                                    	\N	Pärsons Rökt Skinka	6.5	1	8	7330797088794	2
1215                                    	\N	Dough Scraper	6.95	3	6	7316830060750	2
1216                                    	\N	Butter Spreader	5.95	3	4	7316830652917	2
1223                                    	\N	Bowl Set	6.95	3	2	7332462092013	0
1232                                    	\N	Serviette	4.5	3	10	7340119803387	0
1233                                    	\N	Serviette	4.5	3	10	5906360110579	0
1234                                    	\N	Serviette	4.5	3	10	5906360577976	0
1235                                    	\N	Serviette	4.5	3	10	7340119809495	0
1236                                    	\N	Serviette	4.5	3	10	7340119800133	0
1237                                    	\N	Serviette	3.5	3	10	7340119808924	0
1238                                    	\N	Serviette	4.5	3	10	7340119808801	0
1239                                    	\N	Serviette	4.5	3	10	7340119807132	0
1149                                    	\N	Ideal Makaroner	4.2	1	8	7310130416170	3
1117                                    	\N	Remouladsås	3.95	1	6	7310500002477	5
57                                      	700638	Bregott 75 % normalsaltat	5.95	1	11	7310860005774	5
1225                                    	\N	Lantchips Gräddfil Lök	4.5	1	8	7392659002300	3
1167                                    	\N	Bamse Påsk Ägg	4.95	3	13	7393885235227	5
1147                                    	\N	Mandelägg Anthon Berg	2.95	1	15	5774540959245	5
1159                                    	\N	Lakrisal	1	1	7	8711400800016	5
1142                                    	\N	Påskeskum påse	2.2	1	14	7310350131433	5
1173                                    	\N	Brunost	14.95	1	2	7038010028830	3
1172                                    	\N	Proviva Svartvinbär	5.5	1	5	7350000550559	2
1107                                    	\N	Marabou Pigall Dubbel	1.7	1	10	7310511251604	5
1151                                    	\N	Påskmust	2.5	1	13	7310070001146	5
1217                                    	\N	Pastry Wheel 	4.5	3	2	7316830071152	2
1120                                    	\N	OWL Hot Ranch	4.1	1	11	7340005405374	4
1161                                    	\N	Hallon/Lakrits Skalle	2.95	1	3	7393077181653	5
1171                                    	\N	Yoggi Original	4.95	1	4	7310865018465	2
1156                                    	\N	Hjortonssalt	1.2	1	19	7311311004339	5
1132                                    	\N	Bulle	3	1	-833	\N	5
1111                                    	\N	Noblesse Apelsin Crisp	6.95	1	2	7622400706035	5
1219                                    	\N	Egg Slicer	4.85	1	2	7332462094017	2
1148                                    	\N	Cool Cola Skalle	2.95	1	12	7393077181738	5
1224                                    	\N	Cheez Cruncherz Hot	4.1	1	4	7340005403226	3
1145                                    	\N	Lakritsi Soft Original	4.5	1	12	6416453061200	5
1135                                    	\N	Formule sandwich	10	1	-163	\N	5
944                                     	900907	Värmeljus vegetabiliskt fett ø39mm 6h	9.95	3	-2	5024333237181	5
1210                                    	\N	Ansjovis Kryddad Sill	4.1	1	4	7311171004111	2
1158                                    	\N	Marabou Ming Choco	2.95	1	4	7310510001804	5
1155                                    	\N	O.P. Anderson	35	3	-8	5710778001356	4
1166                                    	\N	Snowball Medium	29.95	3	-3	7391533673506	4
1163                                    	\N	Läkerol Eucalyptus	2.1	1	-6	7310350118502	5
1165                                    	\N	Nyponsoppa Utan Tillsatt Socker	4.5	1	5	7310470070209	4
1144                                    	\N	Delikatess Knäckebröd	4.65	1	11	7300400117968	5
1218                                    	\N	Butter Spreader	5.65	3	0	7316830071008	2
1141                                    	\N	Mjölk Choklad Cookies	5.95	1	3	7622300589882	5
1360                                    	\N	Froosh Peach & Passion Fruit	3.5	1	7	7350020724114	2
1157                                    	\N	Dinkel Mjöl	6.95	1	3	7310130011405	3
1168                                    	\N	Risi Frutti	2.95	1	4	7310090772620	4
1160                                    	\N	Sur Skalle	2.95	1	6	7393077181684	4
1154                                    	\N	Skåne Akvavit	35	3	6	5710778002568	4
1110                                    	\N	Noblesse Original Crisp	6.95	1	11	7622400705960	5
1170                                    	\N	Onos Hallonsylt	5.95	1	5	7310770221424	3
875                                     	117566	Svartvinbärssaft	5.95	1	8	7310770571581	5
1228                                    	\N	Froosh Mango Orange	3.5	1	21	7350020720017	3
1113                                    	\N	Kron Jäst Färsk	1	1	15	73500346	5
1039                                    	\N	Löfbergs Mellanrost	12.95	1	11	7310050001142	5
1153                                    	\N	Linie Aquavit	35	3	10	7048351691112	4
263                                     	181103	Hovmästarsås glasburk	4.5	1	6	7310155800251	5
1230                                    	\N	Serviette	3.5	3	0	7340119803707	0
1169                                    	\N	Onos Apelsinmarmelad	5.95	1	5	73104711	3
1240                                    	\N	Serviette	4.5	3	10	7340119808795	0
1242                                    	\N	Serviette	4.5	3	10	7340119808788	0
1244                                    	\N	Serviette	4.5	3	10	7340119805183	0
1250                                    	\N	Serviette	4.5	3	1	7340119803394	0
1251                                    	\N	CN Mini Tray	6.5	3	1	7340137875595	0
1252                                    	\N	CN Tray	29.95	3	1	7340137871887	0
1253                                    	\N	CN Tray	55	3	1	7340137866999	0
1254                                    	\N	Babybabbel	12	3	4	9789146212096	0
1257                                    	\N	Vikingar Bok 	16	3	8	9789163798887	0
1258                                    	\N	Vid Foten Av Montmartre	20	3	7	9789113073613	0
1259                                    	\N	Vandra i Provence	39	3	5	9789188779113	0
1262                                    	\N	Magnet 	5.95	3	3	7340041911563	0
1264                                    	\N	Magnet	3.5	3	6	7340041913031	0
1266                                    	\N	Magnet	3.95	3	1	7340041911358	0
1268                                    	\N	Magnet	4.95	3	1	7340041913987	0
1269                                    	\N	Påskmust	3.95	1	2	7331157001088	0
1231                                    	\N	Serviette	4.5	3	9	7350022011397	0
1246                                    	\N	Serviette	3.5	3	9	7340119808917	0
1275                                    	\N	Candle Holder	4.7	3	9	5737666555340	0
1276                                    	\N	Candle Holder	4.95	3	1	5737666555449	0
1277                                    	\N	Blockljus	13.8	3	8	7321011812301	3
486                                     	606447	Marschaller med lock ø103mm brinntid 8tim	3.95	3	5	6410405203724	5
550                                     	118906	Tändstickor 8-Pack	3.95	3	30	7310680022517	10
1290                                    	\N	Peluche	19	3	1	5420077315077	0
1229                                    	\N	Serviette Elg	4.5	3	9	7340119804612	0
1271                                    	\N	Serviette	4.5	3	10	7340119805190	0
1279                                    	\N	Sverigealmanackan Familj	13.95	3	5	7350053960015	0
1280                                    	\N	Flask Sverige 	18.95	3	2	7340041914045	0
1281                                    	\N	Angel Chimes Silver	18.95	3	10	5688154478033	3
1285                                    	\N	Mug Viking	9.95	3	3	7340041916384	0
1288                                    	\N	Serviette	4.5	3	10	5906360777703	0
1292                                    	\N	Peluche	19	3	1	5420077311970	0
1296                                    	\N	Peluche Grenouille	37	3	3	5420077317293	0
86                                      	102100	Chips Sourcream & onion	1.2	1	4	7310531027906	5
1298                                    	\N	Peluche Ours	29.95	3	1	7331133422296	0
1291                                    	\N	Peluche	19	3	0	5420077317323	0
1270                                    	\N	Serviette	3.5	3	8	7340119805695	0
1255                                    	\N	Hej Kung	10.95	3	1	9789151910284	0
1243                                    	\N	Serviette	3.5	3	5	7340119812143	0
1221                                    	\N	Tunnbröd Litet	5.95	1	-18	7313830011423	3
1260                                    	\N	Påskägg	3.95	3	2	4015594312442	0
1249                                    	\N	Serviette	3.5	3	5	7340119803561	0
1256                                    	\N	Vikings Book Fr	16	3	1	9789163798894	0
1241                                    	\N	Serviette	4.5	3	5	7340119803530	0
1274                                    	\N	Antikljus x8	7.95	3	7	7350023010641	3
1213                                    	\N	Löksill Stor	8.3	1	-26	7350126081791	3
1293                                    	\N	Bougeoir	8	3	9	5420077305030	0
1273                                    	\N	Julgrans Ljus Vit 20sr	7.95	3	-2	7392709001109	0
1265                                    	\N	Magnet	6.5	3	12	7340041917763	0
1294                                    	\N	Cartes Dalarhäst	5	3	0	7340041916674	0
1272                                    	\N	Kronljus 25cm 30st	26.95	3	5	7301002408683	2
1282                                    	\N	Angel Chimes Brass	18.95	3	13	5688154478019	4
1212                                    	\N	Skärgårdssill Stor	8.3	1	1	7350126081852	3
1287                                    	\N	Snowball Small	24.95	3	3	7391533678006	3
1245                                    	\N	Serviette	4.5	3	8	7340119809501	0
1278                                    	\N	Sverigealmanackan 2022	14.95	3	3	7350053960077	0
1295                                    	\N	Cartes Viking	5	3	5	7340041916650	0
1248                                    	\N	Serviette	4.5	3	4	7340119803547	0
818                                     	404325	Skogaholmslimpa skiv Tina och servera	6.5	1	-2	7314875011010	5
1289                                    	\N	Serviette	3.5	3	-1	7340119808900	0
1267                                    	\N	Décapsuleur	6.5	3	6	7340041918272	0
1209                                    	\N	Fransk Lök Sill	4.1	1	-5	7350126081708	4
1261                                    	\N	Plopp 	1	1	-1	7310040020320	2
1096                                    	\N	Frödinge Blåbärspaj	8.95	1	8	7310890201191	5
1286                                    	\N	Snowball Big	34.95	3	1	7391533673537	2
1222                                    	\N	Polarbröd Rågkaka	8.95	1	3	7311800009357	3
1301                                    	\N	Denna Stora Pannkaksfesten	15	3	3	9789175770031	0
1302                                    	\N	Sticker	1.85	3	9	7331133150014	0
1309                                    	\N	Sticker	3	3	10	7331133191161	0
1312                                    	\N	Iron Swedish Wavy Flag	4.8	3	5	7350007921239	1
1313                                    	\N	Iron Swedish Logo	3.7	3	5	7340041913598	1
1314                                    	\N	Tattoos	2.95	3	2	4400344400348	1
1317                                    	\N	Sticker	3	3	10	7331133071111	1
1318                                    	\N	Stickers	0.95	3	10	5737666591218	1
1321                                    	\N	Chicken Nest	7	3	8	5420077309069	0
1323                                    	\N	Chicken in Egg	3.5	3	10	5420077309052	0
1325                                    	\N	Munkens Svarta	14.95	1	2	2340343605035	2
1308                                    	\N	Chicken Egg Cup	5.9	3	6	5420077315756	0
1322                                    	\N	Chicken Nest	9	3	0	5420077309076	0
852                                     	125013	Soldatens ärtsoppa extra fläsk	6.95	1	4	7310390001383	5
1310                                    	\N	Stickers 	3.95	3	4	7331133195039	0
1306                                    	\N	Feather	1.2	3	14	7393885235289	0
28                                      	123712	Ballerina Original	4.5	1	42	7310520009326	5
1326                                    	\N	Kvibille Cheddar	14.95	1	6	2340302104968	3
539                                     	119493	Tutti Frutti Original	3.5	1	0	6416453038271	5
1320                                    	\N	Swedish Flag 150*90cm	15.95	3	4	7350007925008	2
657                                     	122667	Noblesse Havssalt crisp	6.95	1	1	7622210976895	5
1330                                    	\N	Exemple	3.5	3	5	4022949119717	0
154                                     	240593	Falukorv ring Sverige	9.95	1	-1	7300206787006	5
1384                                    	\N	Matjessill Hela Filéer	5.95	1	-1	7350126082866	1
1283                                    	\N	Mug Sweden Elg	9.95	3	1	7340041916377	0
1247                                    	\N	Serviette	4.5	3	2	7340119803783	0
724                                     	290199	Punschrulle singel	1.5	1	16	7315360010914	5
921                                     	111979	Tyrkisk Peber Original	2.95	1	2	6416453028210	5
308                                     	192242	Kalles Randiga MSC	4.5	1	-24	7311171001943	5
209                                     	750683	Gott & Blandat Original	2.95	1	29	7310350504305	5
1307                                    	\N	Gravad Lax 350g	24.95	1	11	2357552803473	2
1090                                    	\N	Frödinge Princesstårta	15	1	-6	7310890601601	5
1263                                    	\N	Iron Dalarhäst	3.95	3	0	7350007925435	0
1208                                    	\N	Gravad Lax Skivad 350g	24.95	1	7	2357552803527	3
1177                                    	\N	Scan Köttbullar	5.95	1	0	7300208283001	2
1162                                    	\N	Läkerol Licorice Seasalt	2.1	1	-13	7310350118526	5
1316                                    	\N	Sticker	2	3	4	7340041915295	1
1331                                    	\N	Bonbon pièce	0.2	1	12	\N	5
1057                                    	\N	Marabou Schweizer nöt	3.1	1	6	7310511216306	5
152                                     	182922	Falu Råg-rut Knäckebröd	4.95	1	12	7300400114783	5
651                                     	192597	Mästarmatjes i bit MSC	5.95	1	-6	7311170012094	5
1004                                    	\N	Loka Citron 1.5L	3.95	1	24	7310401000053	5
1303                                    	\N	Guirlande Drapeau Suede	2.5	3	7	5737666552646	0
1319                                    	\N	Stickers	3.95	3	17	7340041915271	2
458                                     	186047	Löksill bit MSC	4.1	1	-5	7311171004067	5
770                                     	121065	Rödbetor aptit skivad	3.95	1	4	7310240051261	5
1018                                    	\N	Räkost	7.95	1	-9	7311440026677	5
1227                                    	\N	Drage Egg Mini	3.5	1	13	7310350132591	3
1214                                    	\N	Finkornig Rom Caviar	6.5	1	2	7311171007907	4
1284                                    	\N	Mug Dalarhäst	9.95	3	-1	7340041916360	0
1304                                    	\N	Porte-clefs Élan	3.95	3	6	7350007927224	0
1074                                    	\N	Noblesse Mörk Choklad Krisp	6.95	1	12	7622400706059	5
700                                     	124482	Polarknäcke Original	6.95	1	2	7313350007203	5
1311                                    	\N	Iron Swedish Flag	3.95	3	3	7350007928191	1
1329                                    	\N	Frozen Bun X4	5	1	-61	\N	0
1305                                    	\N	Ramslök & Citron Sill	4.1	1	-34	7350126082286	4
848                                     	115406	Snören cola	2.7	1	-4	5700417990202	5
136                                     	119408	Djungelvrål	1.5	1	10	7310350109029	5
70                                      	213232	Bullens Pilsnerkorv	6.95	1	10	7300203296006	5
1324                                    	\N	Inlagd Sill	8.3	1	-11	7350126081760	3
1226                                    	\N	Svenska Nubbar x10	30	3	-5	6412700066509	2
1315                                    	\N	Stickers Dalarhäst	4	3	7	7340041915370	1
1380                                    	\N	Präst ost mellangräddad 31%	14.95	1	10	2340415207051	0
1343                                    	\N	Västerbotten ost 1kg	34.95	1	-1	2352401609800	0
1342                                    	\N	Västerbotten ost 1kg	34.95	1	0	2352401609664	0
1175                                    	\N	Kvibille Ädelost	5.95	1	7	7311878172458	3
1336                                    	\N	Senapssill	4.1	1	-25	7350126081739	5
1344                                    	\N	Västerbotten ost 1kg	34.95	1	1	2352401610059	0
1347                                    	\N	Munkens Svarta	14.95	1	6	2340343605011	2
4                                       	124266	Ahlgrens bilar	2.95	1	6	7310350132874	5
1372                                    	\N	Rostad lok	8.5	5	7	8717278750798	\N
1368                                    	\N	Marabou Mjölk Choklad 200g	4.5	1	4	7310511210403	3
1339                                    	\N	Prästost	17.95	1	9	2340415207778	3
363                                     	212370	Kronjäst för söta degar färsk	1.9	1	1	73500360	5
620                                     	\N	Varmrökt Lax Naturell 125g Korshags	9.95	1	44	5755325	5
1385                                    	\N	Ansjovis 860g	14.95	1	5	7311170022758	0
441                                     	112816	Läkerol Bon Bons	2.1	1	-15	7310350118540	5
1371                                    	\N	Salladskrydda 325g	16.95	1	5	7311311016455	1
1101                                    	\N	Marabou Schweizer Nöt Single	1	1	-6	73550020	5
451                                     	112807	Läkerol Salvi	2.1	1	-35	7310350118595	5
1379                                    	\N	Kallrökt laxfilé 350g	24.95	1	12	2357553003377	2
569                                     	900907	Värmeljus vegetabiliskt fett ø39mm 6h	9.95	3	3	5024333237181	5
1365                                    	\N	Laktosfri Filmjölk Skånemejerier	4.95	1	6	7310867512466	2
1377                                    	\N	HavreGryn Fiber	5.95	1	13	7310130321184	2
1375                                    	\N	Fizzypop 	1.5	1	22	7310350110131	2
1363                                    	\N	Loka Päron	2	1	25	7310401046709	5
1337                                    	\N	Senap Original Johnny’s	6.95	1	13	7392031000122	3
1357                                    	\N	Tyrkisk Peter 20g	0.8	1	15	6411401061066	5
1328                                    	\N	Frozen Bun	1.5	1	54	\N	0
1382                                    	\N	Kvibille Cheddar 6 månader	17.95	1	8	2340302105057	1
1388                                    	\N	Loka Naturell Brk	2	1	9	7310401046693	3
1374                                    	\N	Loka Päron	2.5	1	6	7310401015965	2
1390                                    	\N	Linschips Dill & Gräslök 110g	3.95	1	6	7310532112601	0
1378                                    	\N	Tupla KingSize 	1.95	1	12	6420256015568	2
1373                                    	\N	Mer Jordgubbe	2	1	20	90375897	5
1367                                    	\N	Marabou Frukt Mandel 200g	4.5	1	11	7310511217402	3
1387                                    	\N	Lättsaltade Lantchips 40g	1.95	1	16	7392659005714	0
1364                                    	\N	Kallrökt Lax 350g	24.95	1	11	2357553003421	2
1386                                    	\N	Dipmix Hot Holiday	1.95	1	14	7310532130612	1
127                                     	124177	Dipmix Rostad Paprika och Vitlök	1.95	1	-15	7310532131947	5
1341                                    	\N	Brännvinnssill	4.1	1	9	7350126082224	\N
1345                                    	\N	Läkerol Original	2.1	1	-11	7310350118458	\N
1333                                    	\N	Snaps	3.5	3	85	\N	5
1358                                    	\N	Läkerol Raspberry Licorice	2.1	1	-11	7310350131600	2
1369                                    	\N	Tranbär o Lingon Lättdryck	2.1	1	19	7310090167532	2
1332                                    	\N	Sucette	0.5	1	53	\N	5
1356                                    	\N	Owl Dill & Gräslök	4.1	1	-16	7340005403523	2
1340                                    	\N	Mer sockerfri lingon 	2.5	1	51	5000112647754	5
1381                                    	\N	Hushållsost 500g	14.95	1	9	2340374705643	1
1362                                    	\N	Loka Citron	2	1	25	7310401046686	5
1370                                    	\N	Kardemumma Malen 18g	3.95	1	17	7311311004353	2
428                                     	124803	Loka Fläder Päron PET	1.9	1	38	7310401043050	5
1119                                    	\N	Kex Chocklad	2.5	1	2	7310350118342	10
1334                                    	\N	Löksill	4.1	1	-3	7350126081647	3
1359                                    	\N	Ärtsoppa 250mL	4.5	1	7	7310390001390	1
1346                                    	\N	Läkerol Original	2.1	1	31	7310350118458	10
1383                                    	\N	5-minuters Sill	7.95	1	0	7350126082712	1
226                                     	201321	Gräddfil 12%	2.95	1	27	7310865004703	5
1389                                    	\N	Loka Solig Citrus Pet	2.5	1	2	7310401036892	0
1327                                    	\N	Inlagd Sill	4.1	1	6	7350126081616	5
1376                                    	\N	Wasa Glutenfri Naturell 	6.95	1	4	7300400481861	2
1338                                    	\N	Gott & blandat Salt	2.95	1	40	7310350504909	5
815                                     	212195	Skagenröra	5.95	1	6	7313160005017	5
665                                     	184869	Nyponsoppa original	4.5	1	-2	7310470063096	5
\.