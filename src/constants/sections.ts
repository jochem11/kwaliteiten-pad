export type WorkbookInput =
  | "handoefening"
  | "duurzaamheid"
  | "persoonlijkheidstest"
  | "gastcollege"
  | "kernkwadrant"
  | "omgevingsinterview"
  | "studievaardigheden"
  | "bedrijfsbezoek"
  | "reflecteren"
  | "onderzoek";

export const WORKBOOK_LABELS: Record<WorkbookInput, string> = {
  handoefening: "Handoefening",
  duurzaamheid: "Opdracht Duurzaamheid",
  persoonlijkheidstest: "Persoonlijkheidstest",
  gastcollege: "Informatie uit gastcollege",
  kernkwadrant: "Kernkwadrant",
  omgevingsinterview: "Omgevingsinterview",
  studievaardigheden: "Studievaardigheden & breineducatie",
  bedrijfsbezoek: "Opbrengst bedrijfsbezoek",
  reflecteren: "Reflecteren",
  onderzoek: "Het onderzoek dat je doet",
};

export type Part = "intro" | "ict-er" | "jij" | "afsluiting";

export const PART_LABELS: Record<Part, string> = {
  intro: "Start",
  "ict-er": "De ICT-er in het algemeen",
  jij: "Jij als ICT-er",
  afsluiting: "Afsluiting",
};

/** Kleur per deel van het pad (ook gebruikt in de 3D-scene). */
export const PART_COLORS: Record<Part, string> = {
  intro: "#f5c451",
  "ict-er": "#5fb3ff",
  jij: "#ff7a6b",
  afsluiting: "#9be38a",
};

export type Source = { label: string; url?: string };

export type Section = {
  id: string;
  part: Part;
  title: string;
  /** De vraag uit de opdracht die dit station beantwoordt. */
  question: string;
  /** Losse alinea's tekst. */
  body: string[];
  /** Concrete voorbeelden (de opdracht vraagt hier expliciet om). */
  examples?: string[];
  /** Welke werkboek-onderdelen je hier gebruikt. */
  inputs: WorkbookInput[];
  sources: Source[];
};

export const SECTIONS: Section[] = [
  {
    id: "inleiding",
    part: "intro",
    title: "Inleiding",
    question: "Waar gaat dit over, en waarom deze vorm?",
    body: [
      "In deze opdracht onderzoek ik wie ik ben als ICT'er, waar mijn interesses liggen en wat ik later wil bereiken. Ik kijk naar de verschillende functies binnen de ICT, de invloed van software op bedrijven en de vaardigheden die nodig zijn om als software engineer te werken. Daarnaast reflecteer ik op mijn eigen kwaliteiten, valkuilen en ambities.",
      "Ik heb gekozen voor een 3D-pad omdat ik mijn ontwikkeling zie als een route waarbij ik steeds nieuwe dingen leer en nieuwe keuzes maak. Het pad bestaat uit verschillende stations die samen mijn beeld van de ICT en mijn toekomst als software engineer laten zien. De interactieve vorm past bij mijn interesse in softwareontwikkeling en geeft mij de mogelijkheid om mijn kennis van React, TypeScript en 3D-technologie zoals Three.js in de praktijk te gebruiken.",
      "Het project is niet alleen een verslag van wat ik heb geleerd, maar ook iets wat ik zelf bouw. Daardoor combineer ik de inhoud van de opdracht met mijn technische interesses. In de toekomst kan ik het pad uitbreiden met nieuwe ervaringen, projecten en leerdoelen.",
    ],
    inputs: [],
    sources: [],
  },

  // Deel 1: de ICT-er in het algemeen
  {
    id: "functies",
    part: "ict-er",
    title: "Functies",
    question:
      "Welke functies kan een informaticus hebben in verschillende organisaties?",
    body: [
      "Binnen de ICT bestaan veel verschillende functies. Een software developer bouwt en onderhoudt applicaties. Een softwarearchitect bepaalt hoe verschillende onderdelen van een systeem samenwerken. Een tester controleert of software goed werkt en aan de eisen voldoet. DevOps-engineers houden zich bezig met het bouwen, testen en uitrollen van software en met de infrastructuur waarop deze draait.",
      "Daarnaast zijn er functies zoals data-engineer, securityspecialist, IT-consultant en product owner. Een data-engineer zorgt ervoor dat gegevens betrouwbaar verwerkt kunnen worden. Een securityspecialist houdt systemen en gegevens veilig. Een consultant adviseert organisaties over technische oplossingen, terwijl een product owner bepaalt welke functionaliteit prioriteit krijgt.",
      "Welke functies belangrijk zijn, verschilt per organisatie. Bij een startup werken mensen vaak aan verschillende onderdelen tegelijk en zijn de verantwoordelijkheden breed. Bij een grote organisatie zijn functies meestal verder gespecialiseerd en werken grotere teams samen. Bij de overheid spelen betrouwbaarheid, privacy en toegankelijkheid vaak een belangrijke rol. Bij een detacheerder werk je mogelijk bij verschillende klanten en moet je je aanpassen aan verschillende projecten en werkwijzen.",
      "Ik ben vooral geïnteresseerd in softwareontwikkeling. Ik vind het interessant om zelf applicaties te bouwen en daarbij na te denken over de structuur van de code, de backend en de manier waarop verschillende systemen met elkaar communiceren.",
    ],
    examples: [
      "Bij het bouwen van mijn eigen applicaties werk ik aan onderdelen die bij meerdere functies horen. Ik ontwikkel bijvoorbeeld interfaces met React of SolidJS, bouw backendfunctionaliteit met onder andere Go en Java en onderzoek hoe databases en API's samenwerken. Daarbij kom ik zowel programmeerwerk als architectuurkeuzes en het oplossen van technische problemen tegen.",
    ],
    inputs: ["gastcollege", "bedrijfsbezoek"],
    sources: [
      {
        label: "HBO-i. (z.d.). Domeinbeschrijving Bachelor of ICT.",
        url: "https://www.hbo-i.nl/",
      },
      {
        label:
          "Europese Commissie. (z.d.). ESCO: European Skills, Competences, Qualifications and Occupations.",
        url: "https://esco.ec.europa.eu/",
      },
    ],
  },

  {
    id: "bedrijfsprocessen",
    part: "ict-er",
    title: "Software & bedrijfsprocessen",
    question: "Hoe kan software bedrijfsprocessen ondersteunen?",
    body: [
      "Software helpt bedrijven om processen sneller, overzichtelijker en betrouwbaarder uit te voeren. Veel werkzaamheden kunnen worden geautomatiseerd, waardoor medewerkers minder tijd kwijt zijn aan herhalende taken. Software kan daarnaast informatie verzamelen, gegevens controleren en verschillende systemen met elkaar verbinden.",
      "Bedrijven gebruiken bijvoorbeeld ERP-systemen om processen zoals inkoop, voorraadbeheer, verkoop en facturatie op elkaar aan te laten sluiten. CRM-systemen helpen bij het beheren van klantgegevens en klantcontact. Door gegevens te combineren, kunnen bedrijven beter zien waar problemen ontstaan en op basis van informatie beslissingen nemen.",
      "Een goede softwareoplossing moet aansluiten op de manier waarop een bedrijf werkt. Het is daarom belangrijk om eerst het bestaande proces te onderzoeken en te begrijpen welke problemen gebruikers ervaren. Pas daarna kun je bepalen welke functionaliteit nodig is. Daarbij moet je ook rekening houden met gebruiksvriendelijkheid, privacy, beveiliging en onderhoudbaarheid.",
      "Als software engineer wil ik niet alleen code schrijven, maar ook begrijpen welk probleem ik daarmee oplos. Een technisch goede oplossing heeft weinig waarde als deze niet aansluit op de behoeften van de mensen die ermee werken.",
    ],
    examples: [
      "Een voorbeeld is het Timaflu-project, waarin verschillende bedrijfsprocessen zoals verkoop, inkoop, picking, distributie en facturatie met elkaar samenhangen. Wanneer deze processen door software worden ondersteund, kunnen gegevens worden hergebruikt en hoeven medewerkers minder informatie dubbel in te voeren. Een wijziging in een bestelling kan bijvoorbeeld doorwerken in de voorraad en de verdere verwerking van die bestelling.",
      "Ook mijn eigen inventory- en uitleenprojecten laten zien hoe software processen kan ondersteunen. Door gebruikers, artikelen, categorieën en uitleningen in een database op te slaan, kun je bijvoorbeeld controleren of een artikel al uitgeleend is voordat iemand het opnieuw probeert te lenen.",
    ],
    inputs: ["onderzoek"],
    sources: [
      {
        label: "IBM. (z.d.). What is enterprise resource planning (ERP)?",
        url: "https://www.ibm.com/think/topics/enterprise-resource-planning",
      },
      {
        label: "IBM. (z.d.). What is customer relationship management (CRM)?",
        url: "https://www.ibm.com/think/topics/crm",
      },
    ],
  },

  {
    id: "culturen",
    part: "ict-er",
    title: "Bedrijfsculturen",
    question:
      "Binnen wat voor soort bedrijfsculturen kan een informaticus werken?",
    body: [
      "De bedrijfscultuur bepaalt onder andere hoe collega's samenwerken, beslissingen nemen en met veranderingen omgaan. Binnen de ICT is dat belangrijk, omdat software vaak door meerdere mensen wordt ontwikkeld en onderhouden. Een goede samenwerking helpt om problemen sneller op te lossen en betere software te bouwen.",
      "Het Competing Values Framework beschrijft vier belangrijke cultuurtypen. Bij een clancultuur staan samenwerking, betrokkenheid en ontwikkeling centraal. Bij een adhocratiecultuur ligt de nadruk op innovatie, experimenteren en nieuwe ideeën. Bij een marktcultuur zijn resultaten, concurrentie en doelen belangrijk. Bij een hiërarchische cultuur staan structuur, procedures en voorspelbaarheid centraal (OpenStax, 2019).",
      "In de praktijk combineren bedrijven vaak meerdere cultuurtypen. Een softwarebedrijf kan bijvoorbeeld veel vrijheid geven om nieuwe technologieën te onderzoeken, maar tegelijkertijd strenge afspraken hebben over beveiliging, testen en het uitrollen van nieuwe versies.",
      "Ik verwacht dat een cultuur waarin leren, samenwerken en experimenteren belangrijk zijn goed bij mij past. Ik vind het interessant om nieuwe technologieën uit te proberen en zelfstandig oplossingen te onderzoeken. Tegelijkertijd is het belangrijk dat er duidelijke afspraken zijn, zodat code begrijpelijk blijft en anderen ermee kunnen werken.",
    ],
    examples: [
      "Bij een innovatieteam kan een adhocratiecultuur zichtbaar zijn doordat ontwikkelaars nieuwe technieken onderzoeken en prototypes bouwen. Wanneer een toepassing daarna in productie wordt genomen, worden afspraken over codekwaliteit, testen en beveiliging belangrijker. Beide manieren van werken vullen elkaar aan.",
      "De precieze cultuur van een bezocht bedrijf of gastcollege kan ik pas beschrijven aan de hand van mijn eigen aantekeningen en waarnemingen. Ik wil die niet invullen op basis van aannames.",
    ],
    inputs: ["bedrijfsbezoek", "gastcollege"],
    sources: [
      {
        label:
          "OpenStax. (2019). Organizational Behavior: 15.5 Corporate Cultures.",
        url: "https://openstax.org/books/organizational-behavior/pages/15-5-corporate-cultures",
      },
    ],
  },

  {
    id: "sdg",
    part: "ict-er",
    title: "Sustainable Development Goals",
    question: "Hoe kan IT bijdragen aan de SDG's?",
    body: [
      "De Sustainable Development Goals (SDG's) zijn zeventien doelen van de Verenigde Naties die gericht zijn op een betere en duurzamere wereld. ICT kan bijdragen aan deze doelen door informatie toegankelijker te maken, processen efficiënter te laten verlopen en nieuwe oplossingen te ontwikkelen. Tegelijkertijd heeft technologie zelf ook invloed op het milieu en de maatschappij.",
      "SDG 4 gaat over kwaliteitsonderwijs. Digitale leeromgevingen, educatieve software en online lesmateriaal kunnen onderwijs toegankelijker maken. Software kan studenten daarnaast helpen om zelfstandig te oefenen en inzicht te krijgen in hun voortgang. Het is wel belangrijk dat iedereen toegang heeft tot geschikte apparaten, internet en toegankelijke software.",
      "SDG 9 gaat over industrie, innovatie en infrastructuur. Software maakt het mogelijk om bedrijfsprocessen te automatiseren, systemen met elkaar te verbinden en nieuwe diensten te ontwikkelen. Betrouwbare digitale infrastructuur helpt organisaties om efficiënter te werken en nieuwe ideeën in de praktijk te brengen.",
      "SDG 12 gaat over verantwoorde consumptie en productie. Software kan bedrijven helpen om voorraden beter te beheren, verspilling te verminderen en materiaalstromen inzichtelijk te maken. Ook kan een goed voorraadsysteem voorkomen dat onnodig producten worden besteld of dat bruikbare artikelen uit het oog worden verloren.",
      "ICT is niet automatisch duurzaam. Datacenters, netwerkapparatuur en computers gebruiken energie en de productie van elektronica vraagt om grondstoffen. Afgedankte apparaten veroorzaken bovendien elektronisch afval. Daarom moeten ontwikkelaars ook nadenken over efficiëntie, de levensduur van apparatuur, hergebruik en het voorkomen van onnodig zware software.",
    ],
    examples: [
      "Bij SDG 4 kan ik denken aan een webapplicatie waarmee studenten lesmateriaal en hun voortgang kunnen bekijken. Bij SDG 9 kan een API verschillende bedrijfssystemen met elkaar verbinden, zodat gegevens niet steeds opnieuw ingevoerd hoeven te worden. Bij SDG 12 kan een voorraad- of uitleensysteem inzicht geven in welke materialen beschikbaar zijn en opnieuw gebruikt kunnen worden.",
      "Bij mijn eigen softwareprojecten kan ik duurzaamheid meenemen door onnodige databasequeries te voorkomen, gegevens efficiënt te verwerken en software zo te ontwerpen dat deze onderhoudbaar blijft. Daardoor kan een applicatie langer worden gebruikt en is minder vaak een volledige vervanging nodig.",
    ],
    inputs: ["duurzaamheid"],
    sources: [
      {
        label: "United Nations. (z.d.). The 17 goals.",
        url: "https://sdgs.un.org/goals",
      },
      {
        label: "United Nations. (z.d.). Goal 4: Quality education.",
        url: "https://sdgs.un.org/goals/goal4",
      },
      {
        label:
          "United Nations. (z.d.). Goal 9: Industry, innovation and infrastructure.",
        url: "https://sdgs.un.org/goals/goal9",
      },
      {
        label:
          "United Nations. (z.d.). Goal 12: Responsible consumption and production.",
        url: "https://sdgs.un.org/goals/goal12",
      },
    ],
  },

  {
    id: "security",
    part: "ict-er",
    title: "Security & maatschappij",
    question:
      "Welke security-aspecten brengt IT met zich mee en wat is de impact op de maatschappij?",
    body: [
      "Security is een belangrijk onderdeel van softwareontwikkeling, omdat applicaties vaak persoonsgegevens, bedrijfsinformatie en andere belangrijke gegevens verwerken. Een kwetsbaarheid kan ervoor zorgen dat gegevens uitlekken, systemen niet meer beschikbaar zijn of onbevoegden toegang krijgen.",
      "De CIA-triade bestaat uit drie belangrijke beveiligingsdoelen. Confidentiality betekent dat gegevens alleen toegankelijk zijn voor bevoegde personen. Integrity betekent dat gegevens correct blijven en niet ongewenst worden gewijzigd. Availability betekent dat systemen en gegevens beschikbaar zijn wanneer ze nodig zijn.",
      "Er bestaan verschillende dreigingen. Bij ransomware proberen aanvallers systemen of bestanden ontoegankelijk te maken en eisen ze vaak losgeld. Bij social engineering manipuleren aanvallers mensen om informatie te delen of bepaalde handelingen uit te voeren. Andere risico's zijn zwakke wachtwoorden, verkeerd ingestelde toegangsrechten, kwetsbare afhankelijkheden en onvoldoende beveiligde API's.",
      "Ook privacy speelt een grote rol. De Algemene verordening gegevensbescherming (AVG) stelt regels voor het verwerken van persoonsgegevens. Als ontwikkelaar moet je daarom nadenken over welke gegevens noodzakelijk zijn, wie toegang krijgt en hoe gegevens worden beschermd. Het is beter om vanaf het begin rekening te houden met beveiliging en privacy dan deze achteraf toe te voegen.",
      "De maatschappelijke impact van slechte beveiliging kan groot zijn. Een aanval op een ziekenhuis, overheidsorganisatie of andere vitale dienst kan ervoor zorgen dat belangrijke werkzaamheden stilvallen. Ook kunnen mensen financieel worden benadeeld of het vertrouwen in digitale diensten verliezen. Goede security is daarom niet alleen een technisch probleem, maar ook een verantwoordelijkheid richting gebruikers en de maatschappij.",
    ],
    examples: [
      "In een uitleenapplicatie moet een gebruiker bijvoorbeeld niet zomaar gegevens van andere gebruikers kunnen bekijken of wijzigen. De backend moet controleren of iemand bevoegd is om een bepaalde actie uit te voeren. Alleen een knop verbergen in de frontend is daarvoor niet voldoende.",
      "Bij een API met JWT-authenticatie moeten tokens zorgvuldig worden verwerkt en moeten toegangsrechten aan de serverzijde worden gecontroleerd. Ook moeten gevoelige gegevens niet onnodig in logs terechtkomen en moeten databasequeries veilig worden uitgevoerd.",
    ],
    inputs: [],
    sources: [
      {
        label:
          "Nationaal Cyber Security Centrum. (z.d.). Nationaal Cyber Security Centrum.",
        url: "https://www.ncsc.nl/",
      },
      {
        label:
          "Autoriteit Persoonsgegevens. (z.d.). De AVG: Algemene informatie.",
        url: "https://autoriteitpersoonsgegevens.nl/themas/basis-avg",
      },
      {
        label: "OWASP Foundation. (z.d.). OWASP Top 10.",
        url: "https://owasp.org/www-project-top-ten/",
      },
    ],
  },

  {
    id: "vaardigheden",
    part: "ict-er",
    title: "Vaardigheden",
    question: "Welke vaardigheden moet een informaticus bezitten?",
    body: [
      "Een informaticus heeft zowel technische vaardigheden als sociale vaardigheden nodig. Technische vaardigheden, ook wel hard skills genoemd, zijn bijvoorbeeld programmeren, databases ontwerpen, API's bouwen, software testen, problemen analyseren en systemen beveiligen. Welke technieken nodig zijn, hangt af van de functie en de technologie waarmee een organisatie werkt.",
      "Bij softwareontwikkeling is het daarnaast belangrijk om code begrijpelijk en onderhoudbaar te houden. Een applicatie moet niet alleen vandaag werken, maar ook later uitgebreid en aangepast kunnen worden. Daarom zijn kennis van softwarearchitectuur, versiebeheer, testen en documentatie belangrijk.",
      "Soft skills zijn minstens zo belangrijk. Ontwikkelaars moeten kunnen samenwerken, duidelijk communiceren, vragen stellen en feedback verwerken. Ook probleemoplossend vermogen, nauwkeurigheid, zelfstandigheid en de bereidheid om nieuwe dingen te leren zijn belangrijk. Technologie verandert voortdurend, waardoor een ICT'er zich regelmatig moet blijven ontwikkelen.",
      "Ik leer zelf graag door dingen te bouwen en nieuwe technieken uit te proberen. Ik heb ervaring met frontendontwikkeling met React en werk met verschillende backendtechnologieën, waaronder Java en Go. Daarnaast onderzoek ik regelmatig andere frameworks en architecturen om beter te begrijpen hoe applicaties zijn opgebouwd.",
      "Bij het leren helpt het mij om een technisch probleem op te delen in kleinere onderdelen en oplossingen zelf uit te proberen. Door documentatie te lezen, voorbeelden te bekijken en fouten te onderzoeken, leer ik hoe iets werkt in plaats van alleen een oplossing over te nemen. Een verbeterpunt is om mijn keuzes ook goed te documenteren en regelmatig te controleren of ik niet te veel tijd besteed aan details die op dat moment minder belangrijk zijn.",
    ],
    examples: [
      "Bij mijn projecten combineer ik frontend, backend en databases. Ik kan bijvoorbeeld een gebruikersinterface bouwen, een API ontwerpen en nadenken over de manier waarop gegevens worden opgeslagen. Daarbij moet ik technische problemen analyseren en keuzes maken over de structuur van mijn code.",
      "Wanneer ik een nieuwe technologie leer, probeer ik deze toe te passen in een eigen project. Ik kan bijvoorbeeld eerst een kleine API bouwen en daarna onderzoeken hoe authenticatie, foutafhandeling en databasekoppelingen werken. Zo combineer ik zelfstandig leren met praktische ervaring.",
    ],
    inputs: ["studievaardigheden", "gastcollege"],
    sources: [
      {
        label: "HBO-i. (z.d.). Domeinbeschrijving Bachelor of ICT.",
        url: "https://www.hbo-i.nl/",
      },
      {
        label: "MDN Web Docs. (z.d.). Learn web development.",
        url: "https://developer.mozilla.org/en-US/docs/Learn",
      },
    ],
  },

  // Deel 2: jij als ICT-er
  {
    id: "profiel",
    part: "jij",
    title: "Mijn profiel",
    question: "Wat zijn mijn kwaliteiten en valkuilen?",
    body: [
      "Een belangrijke kwaliteit van mij is dat ik nieuwsgierig ben naar technologie en graag zelf uitzoek hoe iets werkt. Ik vind het interessant om nieuwe applicaties te bouwen, verschillende programmeertalen te proberen en na te denken over hoe software technisch in elkaar zit. Ik leer graag door zelf oplossingen te bedenken en deze in de praktijk te testen.",
      "Een andere kwaliteit is dat ik graag verder kijk dan alleen de zichtbare functionaliteit. Ik houd mij ook bezig met de structuur van een applicatie, de samenwerking tussen frontend en backend, databases en de communicatie tussen verschillende services. Daardoor probeer ik niet alleen iets werkend te krijgen, maar ook te begrijpen waarom een bepaalde aanpak goed werkt.",
      "Een mogelijke valkuil is dat ik mij te lang kan verdiepen in technische mogelijkheden. Omdat ik veel interessant vind, kan ik meerdere oplossingen onderzoeken terwijl een eenvoudigere oplossing misschien al voldoende is. Ook kan het verleidelijk zijn om een project technisch uitgebreider te maken dan oorspronkelijk nodig was.",
      "Mijn uitdaging is daarom om mijn nieuwsgierigheid te blijven gebruiken, maar tegelijkertijd duidelijke prioriteiten te stellen. Ik wil eerst bepalen wat het doel is, welke eisen belangrijk zijn en wat de eenvoudigste passende oplossing is. Daarna kan ik altijd onderzoeken of verdere uitbreiding zinvol is.",
      "Mijn persoonlijkheidstest, kernkwadrant en omgevingsinterview kunnen dit beeld verder aanvullen. De concrete uitslagen en reacties heb ik hier niet beschikbaar, dus ik beschrijf deze niet alsof ik ze al heb ontvangen. Ik wil mijn eigen beeld uiteindelijk vergelijken met de uitkomsten en feedback van anderen.",
    ],
    examples: [
      "Bij het bouwen van mijn softwareprojecten onderzoek ik regelmatig verschillende manieren om een probleem op te lossen. Dat helpt mij om meer te leren over architectuur en technologie. Tegelijkertijd is het belangrijk dat ik op tijd een keuze maak en een werkende versie oplever, in plaats van steeds nieuwe technieken aan het project toe te voegen.",
      "Een mogelijk kernkwadrant om verder te onderzoeken is: kwaliteit — leergierigheid; valkuil — te veel willen uitzoeken; uitdaging — prioriteiten stellen en keuzes afronden; allergie — onnodig oppervlakkig werken. Dit is een voorlopige zelfreflectie en geen vastgestelde uitkomst van mijn persoonlijkheidstest.",
    ],
    inputs: [
      "persoonlijkheidstest",
      "kernkwadrant",
      "omgevingsinterview",
      "handoefening",
    ],
    sources: [
      {
        label: "Carrieretijger. (z.d.). Kernkwaliteiten.",
        url: "https://www.carrieretijger.nl/functioneren/ontwikkelen/persoonlijkheidsmodellen/kernkwaliteiten",
      },
    ],
  },

  {
    id: "ambities",
    part: "jij",
    title: "Ambities & interesses",
    question: "Wat wil ik — kort/lang, klein/groot?",
    body: [
      "Mijn interesse ligt vooral bij softwareontwikkeling. Ik vind het leuk om zelf applicaties te bouwen en daarbij zowel met de frontend als de backend bezig te zijn. Ik wil niet alleen leren hoe ik functionaliteit programmeer, maar ook begrijpen hoe grotere systemen worden opgebouwd en hoe verschillende onderdelen betrouwbaar samenwerken.",
      "Op korte termijn wil ik mijn programmeervaardigheden verder ontwikkelen en meer ervaring opdoen met verschillende technologieën. Daarbij wil ik vooral leren om goede technische keuzes te maken, mijn code overzichtelijk te houden en projecten stap voor stap af te ronden.",
      "Op langere termijn wil ik doorgroeien tot een software engineer die zelfstandig complexe problemen kan analyseren en passende oplossingen kan ontwerpen. Ik wil mij verder verdiepen in backendontwikkeling, softwarearchitectuur en de samenwerking tussen verschillende services. Tegelijkertijd wil ik voldoende kennis van frontendontwikkeling behouden om applicaties als geheel te begrijpen.",
      "Ik vind het belangrijk om te blijven leren en niet afhankelijk te worden van één programmeertaal of framework. Mijn doel is om de onderliggende principes goed te begrijpen, zodat ik nieuwe technologieën zelfstandig kan leren en in verschillende projecten kan toepassen.",
    ],
    examples: [
      "Kort en klein: een bestaande applicatie verbeteren door de code op te schonen, tests toe te voegen en de structuur duidelijker te maken.",
      "Kort en groot: tijdens mijn opleiding projecten bouwen waarin ik frontend, backend, databases en API's met elkaar combineer, zodat ik ervaring opdoe met het ontwikkelen van complete applicaties.",
      "Lang en klein: regelmatig nieuwe technologieën onderzoeken en mijn kennis bijhouden door kleine experimenten en eigen projecten te maken.",
      "Lang en groot: doorgroeien tot een zelfstandige software engineer die grotere applicaties en systemen kan ontwerpen en bouwen, en daarbij technische kwaliteit, onderhoudbaarheid en de behoeften van gebruikers combineert.",
    ],
    inputs: ["reflecteren"],
    sources: [],
  },

  {
    id: "verbanden",
    part: "jij",
    title: "Verbanden",
    question: "Hoe hangen mijn kwaliteiten, ambities en interesses samen?",
    body: [
      "Mijn nieuwsgierigheid naar technologie sluit aan bij mijn ambitie om mij verder te ontwikkelen als software engineer. Doordat ik graag zelf dingen uitzoek en uitprobeer, kan ik nieuwe programmeertalen, frameworks en architectuurprincipes leren. Die interesse helpt mij om zelfstandig aan projecten te werken en technische problemen vanuit verschillende kanten te bekijken.",
      "Mijn interesse in zowel frontend als backend sluit aan bij mijn doel om complete applicaties te begrijpen. Wanneer ik zelf een frontend, API en database bouw, zie ik hoe verschillende onderdelen elkaar beïnvloeden. Daardoor kan ik beter nadenken over de opbouw van een systeem en de gevolgen van technische keuzes.",
      "Dezelfde nieuwsgierigheid kan ook een valkuil zijn. Als ik te veel mogelijkheden tegelijk onderzoek, bestaat het risico dat ik te weinig tijd overhoud om een project af te ronden. Daarom wil ik bewuster werken met prioriteiten, duidelijke doelen en kleine tussenstappen.",
      "Ik wil per project eerst bepalen wat het belangrijkste resultaat moet zijn. Daarna werk ik in kleine stappen naar een werkende versie toe. Wanneer de basis goed werkt, kan ik extra functionaliteit toevoegen als daar voldoende tijd voor is. Ook wil ik vaker terugkijken op mijn aanpak om te bepalen wat goed ging en wat ik de volgende keer anders kan doen.",
      "Op deze manier kan ik mijn technische interesse blijven ontwikkelen zonder het overzicht te verliezen. Mijn opleiding, eigen projecten en toekomstige werkervaring geven mij de mogelijkheid om mijn kennis uit te breiden en steeds zelfstandiger te worden in het ontwerpen en ontwikkelen van software.",
    ],
    inputs: ["reflecteren", "kernkwadrant"],
    sources: [],
  },

  // Afsluiting
  {
    id: "bronnen",
    part: "afsluiting",
    title: "Bronnen & deelopdrachten",
    question: "Welke deelopdrachten en bronnen zijn gebruikt?",
    body: [
      "Voor dit loopbaanonderzoek combineer ik mijn eigen ervaringen met informatie over softwareontwikkeling, bedrijfsprocessen, bedrijfsculturen, duurzaamheid en informatiebeveiliging. De externe bronnen geven achtergrondinformatie over de onderwerpen die ik onderzoek. Mijn eigen projecten en reflecties helpen mij om de informatie te verbinden aan mijn ontwikkeling als ICT'er.",
      "De werkboekonderdelen die aan de verschillende stations gekoppeld zijn, worden automatisch verzameld. Zo is zichtbaar welke deelopdrachten bij het onderzoek zijn betrokken. De daadwerkelijke resultaten van mijn persoonlijkheidstest, handoefening, omgevingsinterview, gastcollege en bedrijfsbezoek moeten overeenkomen met mijn eigen ingevulde opdrachten en ervaringen.",
    ],
    inputs: [],
    sources: [],
  },
];

/** Minimaal aantal werkboek-onderdelen volgens de opdracht. */
export const MIN_INPUTS = 7;

export const usedInputs = (): WorkbookInput[] => [
  ...new Set(SECTIONS.flatMap((s) => s.inputs)),
];

export const allSources = (): Source[] => {
  const seen = new Set<string>();

  return SECTIONS.flatMap((s) => s.sources).filter((s) => {
    if (seen.has(s.label)) return false;

    seen.add(s.label);
    return true;
  });
};
