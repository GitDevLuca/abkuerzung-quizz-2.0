// Initial variables
const startQuizButton = document.getElementById("btn_start_quiz");
const editTermsButton = document.getElementById("btn_edit_terms");
const addQuizTermButton = document.getElementById("btn_add_term");
const continueButton = document.getElementById("btn_continue");
const startPageButton = document.getElementById("btn_start_page");
const editTermsPageReturnToStartButton = document.getElementById("btn_edit_terms_return_to_start");

const answerInput = document.getElementById("inp_answer");

const startPageSection = document.getElementById("sec_start_page");
const editTermsSection = document.getElementById("sec_edit_terms");
const addTermSection = document.getElementById("sec_add_term");
const quizSection = document.getElementById("sec_question");
const answerCorrectnessSection = document.getElementById("sec_answer_correctness");
const endPageSection = document.getElementById("sec_end_page");

const questionTitle = document.getElementById("tit_question");
const questionLabel = document.getElementById("lbl_question");
const questionForm = document.getElementById("form_question");
const answerCorrectnessTitle = document.getElementById("tit_answer_correctness");
const yourAnswerParagraph = document.getElementById("par_your_answer");
const answerCorrectnessParagraph = document.getElementById("par_answer_correctness");
const abbreviationTitle = document.getElementById("tit_abbreviation");
const meaningParagraph = document.getElementById("par_meaning");
const explanationParagraph = document.getElementById("par_explanation");

const introductionParagraph = document.getElementById("par_introduction");
const feedbackParagraph = document.getElementById("par_out_feedback");
const pyroDiv = document.getElementById("div_pyro");

const abbreviationsTable = document.getElementById("tab_abbreviations");

const lettersToAllow = ["é", "ô", "è", "î", "à", "ï", "ë", "û", "ù", "ò", "ê", "â"];

let socket;

// Abbreviation array
let abbreviations = JSON.parse(localStorage.getItem("abbreviations")) || [
    {
        abbreviation: "AD",
        meaning: "Active Directory",
        explanation: "Microsoft Active Directory (AD) ist eine Windows-Software für zentrale Verwaltung von Benutzern, Gruppen und Ressourcen. Es bietet Single Sign-On, hierarchische Struktur, Gruppenverwaltung, Richtlinien, Replikation und ist entscheidend für effiziente Netzwerkressourcen-Verwaltung."
    },
    {
        abbreviation: "AAD",
        meaning: "Azure Active Directory",
        explanation: "Microsoft Azure Active Directory (AAD) ist ein cloudbasierter Dienst zur Identitäts- und Zugriffsverwaltung. Er ermöglicht sichere Verwaltung von Benutzeridentitäten, Zugriffskontrolle und Integration mit Microsoft-Diensten in der Cloud und vor Ort."
    },
    {
        abbreviation: "APIPA",
        meaning: "Automatic Private IP Adressing",
        explanation: "APIPA (Automatic Private IP Addressing) ist eine Funktion in Windows, die Geräten automatisch private IP-Adressen im Bereich 169.254.0.0/16 zuweist, wenn kein DHCP-Server verfügbar ist. Dies ermöglicht lokale Netzwerkkommunikation ohne manuelle IP-Konfiguration."
    },
    {
        abbreviation: "ARP",
        meaning: "Address Resolution Protocol",
        explanation: "ARP (Address Resolution Protocol) verknüpft IP-Adressen mit MAC-Adressen in Netzwerken, um eine reibungslose Kommunikation zu ermöglichen."
    },
    {
        abbreviation: "AI",
        meaning: "Artificial intelligence ",
        explanation: "Künstliche Intelligenz (AI) umfasst Computer, die wie Menschen lernen, Muster erkennen und entscheiden können. Algorithmen nutzen Daten, um Aufgaben zu automatisieren. Machine Learning und Deep Learning sind verwandte Technologien."
    },
    {
        abbreviation: "DNS",
        meaning: "Domain Name System",
        explanation: "Das Domain Name System (DNS) übersetzt menschenfreundliche Domainnamen in numerische IP-Adressen für Computer. Es erleichtert die Kommunikation im Internet, indem es die Namensauflösung für Websites und Ressourcen übernimmt."
    },
    {
        abbreviation: "DHCP",
        meaning: "Dynamic Host Configuration Protocol",
        explanation: "DHCP verteilt automatisch IP-Adressen und Konfigurationen in Netzwerken. Geräte fragen beim DHCP-Server nach, um IP-Adressen und Einstellungen zu erhalten, was die Netzwerkverwaltung erleichtert."
    },
    {
        abbreviation: "ECC (RAM)",
        meaning: "Error Correction Code ",
        explanation: "ECC-RAM (Error Correction Code RAM) ist eine Speichertechnologie mit zusätzlichen Bits, um Datenfehler zu erkennen und zu korrigieren. Dies erhöht die Systemzuverlässigkeit, besonders in rechenintensiven oder kritischen Anwendungen wie Servern."
    },
    {
        abbreviation: "HTTP",
        meaning: "Hypertext Transfer Protocol",
        explanation: "HTTP (Hypertext Transfer Protocol) ist ein Internetprotokoll zur Übertragung von Webseiten und Ressourcen zwischen Webservern und Browsern. Es ermöglicht die Anforderung und Bereitstellung von Text, Bildern und anderen Medien auf Websites."
    },
    {
        abbreviation: "HTTPS",
        meaning: "Hypertext Transfer Protocol Secure",
        explanation: "HTTPS (Hypertext Transfer Protocol Secure) ist die sichere Variante von HTTP. Es verschlüsselt die Datenübertragung zwischen Browser und Server mittels SSL oder TLS, um die Sicherheit von sensiblen Informationen wie Passwörtern und Kreditkartennummern zu gewährleisten."
    },
    {
        abbreviation: "IaaS",
        meaning: "Infrastructure as a Service ",
        explanation: "IaaS (Infrastructure as a Service) bietet virtuelle IT-Infrastruktur über das Internet. Cloud-Anbieter verwalten Server, Speicher und Netzwerke, die Nutzer nach Bedarf mieten können. Dies ermöglicht Flexibilität, Skalierbarkeit und Kosteneinsparungen."
    },
    {
        abbreviation: "IKE",
        meaning: "Internal Key Exchange ",
        explanation: "IKE (Internet Key Exchange) ist ein Protokoll für sichere Verbindungen in Virtual Private Networks (VPNs). Es ermöglicht den sicheren Austausch von Schlüsseln und die Authentifizierung von Parteien, die über unsichere Netzwerke kommunizieren. IKE wird oft zusammen mit IPsec verwendet, um verschlüsselte und authentifizierte Kommunikation zu gewährleisten."
    },
    {
        abbreviation: "IMAP",
        meaning: "Internet Message Access Protocol ",
        explanation: "IMAP (Internet Message Access Protocol) ist ein E-Mail-Zugriffsprotokoll, das ermöglicht, E-Mails auf einem Server zu verwalten, anstatt sie auf das lokale Gerät herunterzuladen. Dies erlaubt synchronisierten Zugriff von verschiedenen Geräten aus und unterstützt Funktionen wie Ordnerstrukturen und Synchronisierung von Nachrichtenstatus."
    },
    {
        abbreviation: "IP",
        meaning: "Internet Protocol ",
        explanation: "Das Internet Protocol (IP) ist ein Kernnetzwerkprotokoll, das Geräten eindeutige Adressen zuweist und die Übertragung von Datenpaketen in Netzwerken ermöglicht. IP-Pakete enthalten Absender- und Zieladressen sowie Daten für die Kommunikation zwischen Geräten."
    },
    {
        abbreviation: "JPEG",
        meaning: "Joint Photographic Experts Group",
        explanation: "JPEG (Joint Photographic Experts Group) ist ein gängiges Bildkompressionsformat. Es verringert Dateigrößen bei akzeptabler Qualität durch verlustbehaftete Kompression, besonders für Internet-Fotos und Bilder."
    },
    {
        abbreviation: "KI",
        meaning: "Künstliche Intelligenz ",
        explanation: "Künstliche Intelligenz (AI) umfasst Computer, die wie Menschen lernen, Muster erkennen und entscheiden können. Algorithmen nutzen Daten, um Aufgaben zu automatisieren. Machine Learning und Deep Learning sind verwandte Technologien."
    },
    {
        abbreviation: "LAN",
        meaning: "Local Area Network",
        explanation: "Ein LAN (Local Area Network) ist ein kleines Netzwerk in begrenzter geografischer Nähe, z. B. in einem Gebäude. Es ermöglicht Ressourcenaustausch wie Dateifreigaben und Drucker zwischen verbundenen Geräten."
    },
    {
        abbreviation: "LDAP",
        meaning: "Lightweight Directory Access Protocol",
        explanation: "LDAP (Lightweight Directory Access Protocol) ist ein Protokoll für Netzwerkverzeichnisdienste, um Informationen wie Benutzer und Gruppen zu speichern und abzurufen. Es erleichtert die hierarchische Suche in großen Datensätzen und wird in Unternehmensumgebungen zur Benutzerverwaltung eingesetzt."
    },
    {
        abbreviation: "NTFS",
        meaning: "New Technology File System ",
        explanation: "NTFS (New Technology File System) ist ein Windows-Dateisystem mit erweiterten Funktionen, einschließlich Sicherheit, größeren Dateigrößen und Berechtigungsverwaltung. Es wird für geschäftliche und sichere Anwendungen genutzt."
    },
    {
        abbreviation: "ReFs",
        meaning: "Resilient File system",
        explanation: "ReFS (Resilient File System) ist ein Microsoft-Dateisystem für Windows Server und Windows 10/11 Pro for Workstations. Es bietet hohe Datensicherheit und Fehlerkorrektur, besonders für große Datenmengen in Unternehmensumgebungen. Oft genutzt für Dateiserver, Datenbanken und Virtualisierung."
    },
    {
        abbreviation: "PaaS",
        meaning: "Plattform as a Service ",
        explanation: "PaaS (Platform as a Service) ist ein Cloud-Modell, das eine Entwicklungsplattform bereitstellt, um Anwendungen ohne Infrastrukturmanagement zu entwickeln, zu bereitstellen und zu verwalten. Es fördert schnelle Entwicklung und Skalierbarkeit."
    },
    {
        abbreviation: "PAN",
        meaning: "Personal Area Network",
        explanation: "PAN (Personal Area Network) ist ein kleines, drahtloses Netzwerk, das Geräte wie Smartphones und Laptops in unmittelbarer Nähe verbindet. Es ermöglicht einfache Datenübertragung zwischen persönlichen Geräten."
    },
    {
        abbreviation: "RAID",
        meaning: "Redundant Array of Independent Disks",
        explanation: "RAID (Redundant Array of Independent Disks) ist eine Technologie zur Kombination mehrerer Festplatten für bessere Leistung oder Datensicherheit. Unterschiedliche RAID-Level bieten verschiedene Vorteile, hauptsächlich in Servern und NAS-Geräten genutzt."
    },
    {
        abbreviation: "RAM",
        meaning: "Random Access Memory",
        explanation: "RAM (Random Access Memory) ist ein flüchtiger Speichertyp, der laufende Programme und Daten temporär im Computer speichert, um schnellen Zugriff zu ermöglichen. Es geht verloren, wenn der Computer ausgeschaltet wird."
    },
    {
        abbreviation: "SaaS",
        meaning: "Software as a Service ",
        explanation: "SaaS = Software über das Internet, kein Kauf, nur Abo. Anbieter manage Wartung, Sicherheit & Updates. Vorteile: kosteneffizient, Zugriff von überall, einfache Updates, Anbieter-Wartung, skalierbar. Einfacher, kollaborativer Zugriff auf leistungsstarke Anwendungen."
    },
    {
        abbreviation: "WAN ",
        meaning: "Wide Area Network",
        explanation: "WAN = Großes Netzwerk über weite Entfernungen. Verbindet LANs oder andere WANs. Nutzt öffentliche/ private Leitungen für Daten-Austausch über Distanzen. Wichtig für standortübergreifende Kommunikation in Unternehmen."
    },
    {
        abbreviation: "IDE",
        meaning: "Integrated Development Environment",
        explanation: "IDE = Softwareumgebung für Entwickler. Bietet Tools zum Schreiben, Testen und Debuggen von Software. Enthält oft Texteditor, Compiler und Debugger in einem."
    },
    {
        abbreviation: "AP",
        meaning: "Access Point",
        explanation: "Access Point = Drahtloses Gerät für WLAN-Verbindungen. Verbindet drahtlose Geräte mit kabelgebundenen Netzwerken. Zentrale Rolle in WLAN-Netzwerken für den Zugriff auf Ressourcen und das Internet."
    },
    {
        abbreviation: "AV",
        meaning: "Anti-Virus",
        explanation: "Ein Antivirus-Programm ist eine Software, die entwickelt wurde, um Computersysteme vor schädlicher Software wie Viren, Malware und Spyware zu schützen. Es erkennt, blockiert und entfernt schädliche Programme, um die Integrität und Sicherheit des Computers zu gewährleisten."
    },
    {
        abbreviation: "BOOTP",
        meaning: "Bootstrap Protocol",
        explanation: "Das Bootstrap Protocol (BOOTP) ist ein Netzwerkprotokoll, das in Computer-Netzwerken verwendet wird, um IP-Adressen und andere Konfigurationsinformationen an Computer oder Geräte zu verteilen, wenn sie gestartet werden. Es erleichtert den automatischen Start von Computern in einem Netzwerk, indem es ihnen notwendige Netzwerkeinstellungen zuweist."
    },
    {
        abbreviation: "CPU",
        meaning: "Central Processing Unit",
        explanation: "Die Central Processing Unit (CPU) ist das Hauptrechenzentrum eines Computers. Sie führt Befehle aus, verarbeitet Daten und steuert andere Komponenten des Systems. Die CPU ist das Gehirn des Computers und spielt eine entscheidende Rolle in der Ausführung von Programmen und der Berechnung von Aufgaben."
    },
    {
        abbreviation: "CSS",
        meaning: "Cascading Style Sheets",
        explanation: "Cascading Style Sheets (CSS) sind eine Sprache zur Gestaltung von Webseiten. Sie definieren das Aussehen von HTML-Elementen, wie Farben, Schriftarten, Abstände und Layouts. CSS ermöglicht eine klare Trennung von Inhalt und Design, was die Webseitengestaltung flexibler und effizienter macht."
    },
    {
        abbreviation: "DB",
        meaning: "Datenbank",
        explanation: "Eine Datenbank ist eine organisierte Sammlung von strukturierten Informationen oder Daten. Sie ermöglicht die effiziente Speicherung, Verwaltung und Abfrage von Daten. Datenbanken werden in Unternehmen, Organisationen und Anwendungen eingesetzt, um Informationen zu organisieren und darauf zuzugreifen."
    },
    {
        abbreviation: "DDV",
        meaning: "Datendirektverbindung",
        explanation: "Eine Datendirektverbindung bezieht sich auf eine direkte, unmittelbare Verbindung zwischen zwei Datenpunkten oder Geräten, ohne Zwischenschritte oder Umleitungen. Diese Verbindung ermöglicht einen schnellen und effizienten Datenaustausch zwischen den beteiligten Punkten, wodurch Verzögerungen und Engpässe minimiert werden."
    },
    {
        abbreviation: "DHTML",
        meaning: "Dynamic Hypertext Markup Language",
        explanation: "Dynamic HTML (DHTML) = Interaktive Webseiten durch Kombination von HTML, CSS & JavaScript. Ermöglicht Echtzeit-Änderungen ohne Seitenneuladung. Animationen, Dynamik und reaktionsschnelle Benutzeroberflächen."
    },
    {
        abbreviation: "EAI",
        meaning: "Enterprise Application Integration",
        explanation: "Enterprise Application Integration (EAI) = Verknüpfung von Softwareanwendungen im Unternehmen. Vereinfacht Datenaustausch und Zusammenarbeit. Integriert Daten und Prozesse für effizientere Geschäftsabläufe."
    },
    {
        abbreviation: "ES",
        meaning: "Enterprise Service",
        explanation: "Enterprise Service = Intern angebotene Dienstleistung für Geschäftsprozesse. Verbessert Effizienz und Integration im Unternehmen."
    },
    {
        abbreviation: "FTP",
        meaning: "File Transfer Protocol",
        explanation: "FTP = Protokoll für Dateitransfer zwischen Computern. Ermöglicht Hochladen und Herunterladen von Dateien über Netzwerke. Verbreitet für Teilen und Sichern von Daten."
    },
    {
        abbreviation: "GUI",
        meaning: "Graphical User Interface",
        explanation: "GUI = Visuelle Schnittstelle für Benutzer. Nutzt Grafikelemente wie Fenster, Symbole und Menüs zur Interaktion mit Computern und Software. Erhöht Benutzerfreundlichkeit und reduziert textbasierte Befehle."
    },
    {
        abbreviation: "HD",
        meaning: "Hard Disk",
        explanation: "Die Hard Disk (Festplatte) ist ein Speichergerät in Computern, das Daten dauerhaft speichert. Es verwendet magnetische Technologie, um große Datenmengen wie Betriebssysteme, Anwendungen und Dateien zu speichern. Festplatten bieten langfristige Speicherung, schnellen Datenzugriff und sind in vielen Computern als Haupt- oder Sekundärspeicher vorhanden."
    },
    {
        abbreviation: "HDL",
        meaning: "Hardware Description Language",
        explanation: "Eine Hardware Description Language (HDL) ist eine spezielle Programmiersprache, um digitale Schaltkreise und Hardwareverhalten zu beschreiben. Ermöglicht Modellierung, Simulation und Synthese von Hardware-Designs vor der physischen Implementierung. Beschleunigt den Entwicklungsprozess von Hardwarekomponenten."
    },
    {
        abbreviation: "IT",
        meaning: "Informationstechnik",
        explanation: "Informationstechnik (IT) bezieht sich auf die Nutzung von Technologie, um Informationen zu sammeln, zu speichern, zu verarbeiten und zu übertragen. Dies umfasst Hardware, Software und Netzwerke, die gemeinsam genutzt werden, um Daten effizient zu verwalten und zu nutzen. Die IT ist in verschiedenen Bereichen wie Computerwissenschaft, Kommunikation und Geschäftswesen von großer Bedeutung."
    },
    {
        abbreviation: "MAC",
        meaning: "Media Access Control",
        explanation: "Die Media Access Control (MAC) ist ein Teil der Netzwerktechnologie, der die physische Adressierung und den Zugriff auf gemeinsam genutzte Medien wie Ethernet regelt. Die MAC-Adresse ist eine eindeutige Kennung für Netzwerkgeräte. Das MAC-Protokoll verwaltet den Zugriff auf das Medium, um Kollisionen zu verhindern und eine geordnete Datenübertragung sicherzustellen."
    },
    {
        abbreviation: "PC",
        meaning: "Personal Computer",
        explanation: "Ein Personal Computer (PC) ist ein eigenständiges elektronisches Gerät, das individuell genutzt wird. Er umfasst Hardware und ermöglicht vielfältige Aufgaben unter der Kontrolle eines Betriebssystems."
    },
    {
        abbreviation: "PNG",
        meaning: "Portable Network Graphics",
        explanation: "Portable Network Graphics (PNG) ist ein verlustfreies Bildformat mit Transparenzunterstützung und hoher Qualität, häufig für Webgrafiken verwendet."
    },
    {
        abbreviation: "UI",
        meaning: "User Interface",
        explanation: "Die Benutzeroberfläche (User Interface, UI) ist der Punkt der Interaktion zwischen einem Benutzer und einem digitalen Gerät oder einer Software. Sie ermöglicht es Benutzern, mit dem System zu kommunizieren und Aufgaben auszuführen, indem sie grafische Elemente wie Schaltflächen, Menüs und Symbole verwendet. Eine gute Benutzeroberfläche strebt Benutzerfreundlichkeit, Effizienz und Ästhetik an."
    },
    {
        abbreviation: "USB",
        meaning: "Universal Serial Bus",
        explanation: "Universal Serial Bus (USB) ist eine weit verbreitete Schnittstelle, die es ermöglicht, verschiedene Geräte wie Computer, Peripheriegeräte und elektronische Gadgets miteinander zu verbinden. USB ermöglicht schnelle Datenübertragung, Stromversorgung und Plug-and-Play-Funktionalität. Es gibt verschiedene USB-Versionen, die sich in Geschwindigkeit und Funktionen unterscheiden, wie z.B. USB 2.0, USB 3.0, USB-C usw."
    },
    {
        abbreviation: "VPN",
        meaning: "Virtual Private Network",
        explanation: "Ein Virtual Private Network (VPN) ermöglicht sichere, verschlüsselte Verbindungen über das Internet, um Privatsphäre zu schützen und auf eingeschränkte Inhalte zuzugreifen."
    },
    {
        abbreviation: "SSD",
        meaning: "Solid State Drive ",
        explanation: "SSD (Solid State Drive) ist ein Flash-Speichergerät ohne bewegliche Teile. Es bietet höhere Geschwindigkeiten, Energieeffizienz und Haltbarkeit im Vergleich zu herkömmlichen Festplatten. In Computern, Laptops und Servern verbessert es die Leistung und beschleunigt den Datenzugriff."
    },
    {
        abbreviation: "SED",
        meaning: "Self Encrypting Drive",
        explanation: "SED (Self-Encrypting Drive) ist eine Festplatte oder SSD mit integrierter Hardware-Verschlüsselung. Sie schützt automatisch Daten durch Verschlüsselung und erfordert ein Passwort oder Schlüssel zur Entschlüsselung. Dies erhöht die Sicherheit von gespeicherten Daten."
    },
    {
        abbreviation: "HDMI",
        meaning: "High-Definition Multimedia Interface",
        explanation: "HDMI bezeichnet eine digitale Multimedia-Schnittstelle, die Audio- und Videosignale über ein einziges Kabel liefern kann. In HDMI ist ein zusammenhängendes Kopierschutz-Konzept (DRM) integriert."
    },
    {
        abbreviation: "WWW",
        meaning: "World Wide Web",
        explanation: "Das World Wide Web ist ein über das Internet abrufbares System von elektronischen Hypertext-Dokumenten, sogenannten Webseiten, welche mit HTML beschrieben werden. Sie sind durch Hyperlinks untereinander verknüpft und werden im Internet über die Protokolle HTTP oder HTTPS übertragen."
    },
    {
        abbreviation: "SVG",
        meaning: "Scalable Vector Graphics",
        explanation: "SVG ist die vom World Wide Web Consortium (W3C) empfohlene Spezifikation zur Beschreibung zweidimensionaler Vektorgrafiken. SVG, das auf XML basiert, wurde erstmals im September 2001 veröffentlicht."
    },
    {
        abbreviation: "QR-Code",
        meaning: "Quick Response Code",
        explanation: "Der QR-Code (englisch Quick Response, „schnelle Antwort“) ist ein zweidimensionaler Code, der von der japanischen Firma Denso Wave im Jahr 1994 entwickelt wurde."
    },
    {
        abbreviation: "TCP",
        meaning: "Transmission Control Protocol",
        explanation: "Das Transmission Control Protocol (TCP, englisch für „Übertragungssteuerungsprotokoll“) ist ein Netzwerkprotokoll, das definiert, auf welche Art und Weise Daten zwischen Netzwerkkomponenten ausgetauscht werden sollen. Es ist Teil der Internetprotokollfamilie, der Grundlage des Internets."
    },
    {
        abbreviation: "IP",
        meaning: "Internet Protocol",
        explanation: "Das Internet Protocol (IP) ist ein in Computernetzen weit verbreitetes Netzwerkprotokoll und stellt durch seine Funktion die Grundlage des Internets dar. Das IP ist die Implementierung der Internetschicht des TCP/IP-Modells bzw. der Vermittlungsschicht (englisch Network Layer) des OSI-Modells."
    },
    {
        abbreviation: "URL",
        meaning: "Uniform Resource Locator",
        explanation: "Ein Uniform Resource Locator (Abk. URL; englisch für „einheitlicher Ressourcenverorter“) identifiziert und lokalisiert eine Ressource, beispielsweise eine Webseite."
    },
    {
        abbreviation: "ROM",
        meaning: "Read-Only Memory",
        explanation: "Ein Festwertspeicher oder Nur-Lese-Speicher (englisch read-only memory, ROM) ist ein Datenspeicher, auf dem im normalen Betrieb nur lesend zugegriffen werden kann, nicht schreibend, und der nicht flüchtig ist. Das heißt: Er hält seine Daten auch im stromlosen Zustand."
    },
    {
        abbreviation: "SQL",
        meaning: "Structured Query Language",
        explanation: "SQL ist eine Datenbanksprache zur Definition von Datenstrukturen in relationalen Datenbanken sowie zum Bearbeiten (Einfügen, Verändern, Löschen) und Abfragen von darauf basierenden Datenbeständen."
    },
    {
        abbreviation: "HDD",
        meaning: "Hard Disk Drive",
        explanation: "Ein Festplattenlaufwerk ist ein magnetisches Speichermedium der Computertechnik, bei welchem Daten auf die Oberfläche rotierender Scheiben (auch englisch „Platter“ genannt) geschrieben werden."
    },
    {
        abbreviation: "RTFM",
        meaning: "Read the fucking manual",
        explanation: "Im IT-Bereich gilt es als unhöflich, sich bei Problemlösungen ausschließlich auf die Hilfe anderer zu verlassen. RTFM ist eine Aufforderung, bei einfachen Problemen zunächst selbst zu versuchen, diese zu lösen (eben mit Hilfe von Handbüchern, Dokumentationen etc.), bevor man andere um Rat fragt."
    },
    {
        abbreviation: "LCD",
        meaning: "Liquid Crystal Display",
        explanation: "Ein LC-Display ist eine Anzeige, dessen Funktion darauf beruht, dass Flüssigkristalle die Polarisationsrichtung von Licht beeinflussen, wenn ein bestimmtes Maß an elektrischer Spannung angelegt wird."
    },
    {
        abbreviation: "LED",
        meaning: "Light-Emitting Diode",
        explanation: "Eine Leuchtdiode ist ein Halbleiter-Bauelement, das Licht ausstrahlt, wenn elektrischer Strom in Durchlassrichtung fließt."
    },
    {
        abbreviation: "NAS",
        meaning: "Network Attached Storage",
        explanation: "Network Attached Storage (NAS, englisch für netzgebundener Speicher) bezeichnet einfach zu verwaltende Dateiserver."
    },
    {
        abbreviation: "DDoS",
        meaning: "Distributed-Denial-of-Service",
        explanation: "DDoS  ist eine Art Cyberangriff, bei dem versucht wird, eine Website oder Netzwerkressource durch Überflutung mit schädlichem Traffic zu überlasten, sodass sie nicht mehr betrieben werden kann."
    },
    {
        abbreviation: "JS",
        meaning: "JavaScript",
        explanation: "JavaScript ist eine Skriptsprache, die ursprünglich 1995 von Netscape für dynamisches HTML in Webbrowsern entwickelt wurde, um Benutzerinteraktionen auszuwerten, Inhalte zu verändern, nachzuladen oder zu generieren und so die Möglichkeiten von HTML zu erweitern."
    },
    {
        abbreviation: "NFC",
        meaning: "Near Field Communication",
        explanation: "NFC ist die kontaktlose Datenübertragung, die sich die Radio Frequenz Identification (RFID-) Technologie zu Nutze macht."
    },
    {
        abbreviation: "RFID",
        meaning: "Radio-Frequency Identification",
        explanation: "RFID bezeichnet eine Technologie für Sender-Empfänger-Systeme zum automatischen und berührungslosen Identifizieren und Lokalisieren von Objekten und Lebewesen mit Radiowellen."
    },
    {
        abbreviation: "COBOL",
        meaning: "Common Business Oriented Language",
        explanation: "COBOL ist eine Programmiersprache, die in der Frühzeit der Computerentwicklung, Ende der 1950er-Jahre, entstand und bis heute von Niels und Mika verwendet wird."
    },
    {
        abbreviation: "CAD",
        meaning: "Computer-Aided Design",
        explanation: "CAD bezeichnet die Erstellung von (dreidimensionalen) Designs am Computer. CAD-Software wird u.a. im Umfeld von 3D-Druckern verwendet."
    },
    {
        abbreviation: "CSV",
        meaning: "Comma-Separated Values",
        explanation: "Das Dateiformat CSV steht für englisch Comma-separated values und beschreibt den Aufbau einer Textdatei zur Speicherung oder zum Austausch einfach strukturierter Daten."
    },
    {
        abbreviation: "SDK",
        meaning: "Software Development Kit",
        explanation: "Ein Software Development Kit (SDK) ist eine Sammlung von Programmierwerkzeugen und Programmbibliotheken, die zur Entwicklung von Software dient."
    },
    {
        abbreviation: "JSON",
        meaning: "JavaScript Object Notation",
        explanation: "JSON ist ein kompaktes Datenformat in einer einfach lesbaren Textform für den Datenaustausch zwischen Anwendungen. JSON ist von Programmiersprachen unabhängig. Parser und Generatoren existieren in allen verbreiteten Sprachen."
    },
    {
        abbreviation: "SLA",
        meaning: "Service-Level-Agreement",
        explanation: "Ein SLA bezeichnet einen Rahmenvertrag zwischen Auftraggeber und Dienstleister für wiederkehrende (IT-)Dienstleistungen."
    },
    {
        abbreviation: "ASCII",
        meaning: "American Standard Code for Information Interchange",
        explanation: "ASCII ist eine 7-Bit-Zeichenkodierung für 128 Zeichen. Sie besteht aus 95 druckbaren und 33 nicht druckbaren Zeichen wie zum Beispiel dem Zeilenvorschub."
    },
    {
        abbreviation: "UTF-8",
        meaning: "Unicode Transformation Format – 8 Bits",
        explanation: "UTF-8 ist eine Zeichenkodierung mit variabler Breite, die jedes Zeichen des Unicode-Zeichensatzes darstellen kann. Zur Codierung eines Zeichens können 1 - 4 Bytes verwendet."
    },
    {
        abbreviation: "GIF",
        meaning: "Graphics Interchange Format",
        explanation: "GIF ist ein Grafikformat für Bilder mit Farbpalette (Farbpalette mit max. 256 Farben, inkl. einer „Transparenzfarbe“). Es kann mehrere Einzelbilder enthalten, welche als Animation abgespielt werden."
    },
    {
        abbreviation: "GPS",
        meaning: "Global Positioning System",
        explanation: "GPA ist ein globales Navigationssatellitensystem zur Positionsbestimmung. Es wurde seit den 1970er-Jahren vom US-Verteidigungsministerium entwickelt."
    },
    {
        abbreviation: "CI/CD",
        meaning: "Continuous Integration / Continuous Delivery",
        explanation: "CI/CD beschreibt den Prozess fortlaufenden Zusammenfügens von Komponenten zu einer Anwendung und fortlaufender Auslieferung von neuen Versionen der Anwendung."
    },
    {
        abbreviation: "MMORPG",
        meaning: "Massively Multiplayer Online Role-Playing Game",
        explanation: "Ein MMORPG ist ein Computerspiel, das Rollenspiel- und Online-Mehrspielerkomponenten miteinander verbindet. World of Warcraft (WoW) ist das bisher erfolgreichste MMORPG und wurde Anfang 2005 (in den USA Ende 2004) von Blizzard Entertainment veröffentlicht."
    },
    {
        abbreviation: "PPI",
        meaning: "Pixels per Inch",
        explanation: "PPI beschreibt die Punktdichte, genannt auch Auflösung, von Displays. Im Druck-Umfeld wird von DPI (Dots per Inch) gesprochen."
    },
    {
        abbreviation: "IPA",
        meaning: "Individuelle Praktische Arbeit",
        explanation: "Die IPA ist der Abschluss und das Highlight jeder Informatiker-Lehre."
    },
    {
        abbreviation: "HTML",
        meaning: "Hypertext Markup Language",
        explanation: "HTML ist eine textbasierte Auszeichnungssprache zur Strukturierung elektronischer Dokumente wie Texte mit Hyperlinks, Bildern und anderen Inhalten. HTML-Dokumente sind die Grundlage des World Wide Web und werden von Webbrowsern dargestellt. "
    },
    {
        abbreviation: "ICANN",
        meaning: "Internet Corporation for Assigned Names and Numbers",
        explanation: "Die Internet Corporation for Assigned Names and Numbers (kurz: ICANN) koordiniert die Vergabe von einmaligen Namen und Adressen im Internet. Dazu gehört die Koordination des Domain Name Systems und die Zuteilung von IP-Adressen."
    },
    {
        abbreviation: "DAU",
        meaning: "Dümmster anzunehmender User",
        explanation: "DAU ist ein Ausdruck für Computerbenutzer ohne Grundlagenwissen und Sachverständnis. Der Begriff spielt besonders in der Erstellung benutzertauglicher Hard- und Software (Usability) eine Rolle."
    },
    {
        abbreviation: "CRUD",
        meaning: "Create, Read, Update, Delete",
        explanation: "CRUD bezeichnet die vier grundlegenden Operationen persistenter Speichersysteme und Datenbanken."
    },
    {
        abbreviation: "DDL",
        meaning: "Data Definition Language",
        explanation: "DDL ist eine Komponente von SQL(Structured Query Language), welche zur Definition von Datenstrukturen verwendet wird, z. B. 'create table'"
    },
    {
        abbreviation: "IBM",
        meaning: "International Business Machines",
        explanation: "Die International Business Machines Corporation (IBM) ist ein börsennotiertes US-amerikanisches IT- und Beratungsunternehmen mit Sitz in Armonk im Bundesstaat New York. IBM ist eines der weltweit führenden Unternehmen insbesondere für branchenspezifische Produkte und Dienstleistungen im IT-Bereich sowie Software und Hardware."
    },
    {
        abbreviation: "DBMS",
        meaning: "Database Management System",
        explanation: "Das Datenbankmanagementsystem, abgekürzt DBMS, ist neben den eigentlichen Daten der wichtigste Bestandteil einer jeden Datenbank. Es übernimmt die Aufgabe der Organisation und Strukturierung der Daten. Gleichzeitig kontrolliert es lesende und schreibende Zugriffe."
    },
    {
        abbreviation: "ODBC",
        meaning: "Open Database Connectivity",
        explanation: "ODBC ist eine standardisierte Datenbankschnittstelle, die SQL als Datenbanksprache verwendet. Sie erlaubt, Anwendung relativ unabhängig vom verwendeten Datenbankmanagementsystem (DBMS) zu entwickeln."
    },
    {
        abbreviation: "API",
        meaning: "Application Programming Interface",
        explanation: "Eine API ist ein Programmteil, der von einem Softwaresystem anderen Programmen zur Anbindung zur Verfügung gestellt wird. Zur Bereitstellung solch einer Schnittstelle gehört meist die detaillierte Dokumentation der Schnittstellen-Funktionen mit ihren Parametern."
    },
    {
        abbreviation: "HERMES",
        meaning: "Handbuch der Elektronischen Rechenzentren des Bundes, eine Methode zur Entwicklung von Systemen",
        explanation: "HERMES ist ein offener Standard zur Führung und Abwicklung von IT-Projekten, welcher von der Bundesverwaltung der Schweiz entwickelt wird. Es ist seit 1975 im Einsatz."
    },
    {
        abbreviation: "CAPTCHA",
        meaning: "Completely Automated Public Turing test to tell Computers and Humans Apart",
        explanation: "CAPTCHAs werden verwendet, um festzustellen, ob ein Mensch oder eine Maschine (Roboter[programm], kurz Bot) an einer Kommunikation beteiligt ist."
    },
    {
        abbreviation: "GPU",
        meaning: "Graphics Processing Unit",
        explanation: "Ein Grafikprozessor ist ein auf die Berechnung von Grafiken spezialisierter und optimierter Prozessor für Computer, Spielkonsolen und Smartphones."
    },
    {
        abbreviation: "IoT",
        meaning: "Internet of Things",
        explanation: "IoT ist ein Sammelbegriff für Technologien einer globalen Infrastruktur der Informationsgesellschaften, die es ermöglicht, physische und virtuelle Objekte miteinander zu vernetzen und sie durch Informations- und Kommunikationstechniken zusammenarbeiten zu lassen."
    },
    {
        abbreviation: "LTE",
        meaning: "Long Term Evolution",
        explanation: "LTE ist eine Bezeichnung für den Mobilfunkstandard der dritten Generation."
    },
    {
        abbreviation: "NLP",
        meaning: "Natural Language Processing",
        explanation: "Die Verarbeitung natürlicher Sprache (Natural Language Processing, NLP) ist ein Teilbereich der Artificial Intelligence. Sie soll Computer in die Lage versetzen, menschliche Sprache zu verstehen, zu interpretieren und zu manipulieren."
    },
    {
        abbreviation: "OCR",
        meaning: "Optical Character Recognition",
        explanation: "OCR ist eine Technologie zur automatischen Texterkennung, die es ermöglicht, Buchstaben, Wörter und Zahlen in Bilddateien, wie etwa Scans, zu erfassen und diese in bearbeitbare und durchsuchbare Texte umzuwandeln."
    },
    {
        abbreviation: "PIN",
        meaning: "Personal Identification Number",
        explanation: "Ein PIN ist ein nur einer oder wenigen Personen bekannter numerischer Code, mit dem diese sich gegenüber einer Maschine authentisieren kann/können."
    },
    {
        abbreviation: "SEO",
        meaning: "Serch Engine Optimization",
        explanation: "Unter Suchmaschinenoptimierung (engl. Search Engine Optimization, Abkürzung: SEO) werden alle Maßnahmen technischer und inhaltlicher Natur verstanden, um die Rankings einer Website und damit deren Sichtbarkeit in den Ergebnislisten von Suchmaschinen zu verbessern."
    },
    {
        abbreviation: "SSL",
        meaning: "Secure Sockets Layer",
        explanation: "Secure Sockets Layer ist ein Protokoll für Web-Browser und Server, das die Authentifizierung sowie die Verschlüsselung und Entschlüsselung von Daten beim Senden über das Internet ermöglicht."
    },
    {
        abbreviation: "SSO",
        meaning: "Single Sign-on",
        explanation: "Single Sign-on (SSO) ist eine Authentifizierungsmethode, die es Benutzern ermöglicht, sich auf sichere Weise bei mehreren Anwendungen und Webseiten zu authentifizieren und dabei nur einmal ihre Anmeldeinformationen einzugeben."
    },
    {
        abbreviation: "VoIP",
        meaning: "Voice over Internet Protocol",
        explanation: "VoIP ist das Telefonieren über Rechnernetze, welche nach Internetstandards aufgebaut sind."
    }
];

// Abbreviations-Save/Cancel site variables
const returnToStartButton = document.getElementById("btn_reset_add");
const addAbbreviationButton = document.getElementById("btn_submit_add");

// Feedback array
const feedback = [
    "Es sieht so aus, als hättest du diese Runde verpasst. Gib nicht auf und versuche es erneut!",
    "Dein erster Punkt ist immer der schwerste. Lerne aus diesem Quiz und mach es beim nächsten Mal noch besser.",
    "Gut gemacht! Zwei Punkte sind besser als gar keine. Bleib am Ball und sieh zu, wie du dich steigerst.",
    "Drei Punkte sind ein gutes Ergebnis. Dein Wissen wächst mit jedem Quiz.",
    "Vier Punkte sind ein Grund zum Feiern. Du bist auf dem besten Weg zum Quiz-Champion.",
    "Gut gemacht! Mit 5 Punkten hast du dein Wissen unter Beweis gestellt."
];

// Input variables abbreviations site
const inpAbbreviation = document.getElementById("inp_abbreviation");
const inpDefinition = document.getElementById("inp_definition");
const inpExplanation = document.getElementById("inp_explanation");

let shuffledObjects = [];
let questionCounter = 0;
let score = 0;

const feedbackIcon = document.getElementById("img_icon");

// functions
/**
 * Displays a section and hides a section.
 * Parameter 1: section to display.
 * Parameter 2: section to hide.
 * No return value.
 */
const addAndRemoveSection = (sectionToShow, sectionToHide) => {
    setIntroductionText();
    sectionToShow.classList.remove("hidden");
    sectionToHide.classList.add("hidden");
};

/**
 * Selects a new question and adjusts the associated texts.
 * No parameter.
 * No return value.
 */
const nextQuestion = () => {
    questionTitle.innerText = "Frage " + (questionCounter + 1) + "/5";
    answerInput.value = "";
    questionLabel.innerText = "Was bedeutet " + shuffledObjects[questionCounter].abbreviation + "?";
};

/** Function to check if something already exists.
 * Parameter 1: Abbreviation, the abbreviation which should be checked.
 * Returns the new abbreviation.
 */
function isAbbreviationAlreadyExisting(abbreviation) {
    return abbreviations.some(item => checkWordEquality(abbreviation, item.abbreviation));
}

/** Checks if the input is likely to be abbreviations, definition & explanations are empty.
 * No parameter.
 * No return value.
 */
const checkUserInput = () => {
    const isAbbreviationEmpty = inpAbbreviation.value.trim() === "";
    const isDefinitionEmpty = inpDefinition.value.trim() === "";
    const isExplanationEmpty = inpExplanation.value.trim() === "";

    // Check if the input is already in the array
    const isAbbreviationExisting = isAbbreviationAlreadyExisting(inpAbbreviation.value.trim());

    // Abbreviation field must not be empty and must be present
    const newAbbreviation = inpAbbreviation.value.trim();
    if (isAbbreviationEmpty || isAbbreviationAlreadyExisting(newAbbreviation)) {
        inpAbbreviation.classList.add("error");
    } else {
        inpAbbreviation.classList.remove("error");
    }

    // Definition field must not be empty
    if (isDefinitionEmpty) {
        inpDefinition.classList.add("error");
    } else {
        inpDefinition.classList.remove("error");
    }

    // Explanation field must not be empty
    if (isExplanationEmpty) {
        inpExplanation.classList.add("error");
    } else {
        inpExplanation.classList.remove("error");
    }

    // The save button is disabled if either an abbreviation is already present in the array or if a field is empty.
    addAbbreviationButton.disabled = isAbbreviationEmpty || isDefinitionEmpty || isExplanationEmpty || isAbbreviationExisting;
}

/**
 * Switches to the start page and clears the entries of the new abbreviation
 * No parameter
 * No return value
 */
const quitAddTermScreen = () => {
    addAndRemoveSection(startPageSection, addTermSection);
    inpAbbreviation.value = "";
    inpDefinition.value = "";
    inpExplanation.value = "";
}

/**
 * Minimizes the word entered in the answer input
 * Parameter 1: word to minimize
 * Return value: minimized word
 */
const minimizeWord = (wordToMinimize) => {
    const wordToMinimizeLetters = wordToMinimize.toLowerCase().split("");

    let minimizedWord = "";
    for (let wordToMinimizeLetter of wordToMinimizeLetters) {
        // Looks if the previous letter is the same as the current one. In this case, equal following letters are ignored.
        if (minimizedWord.split("")[minimizedWord.length - 1] === wordToMinimizeLetter) {
            continue;
        }

        if (wordToMinimizeLetter === "y" || wordToMinimizeLetter === "j") {
            wordToMinimizeLetter = "i";
        } else if (wordToMinimizeLetter === "ä" || wordToMinimizeLetter === "a") {
            wordToMinimizeLetter = "ae";
        } else if (wordToMinimizeLetter === "ö" || wordToMinimizeLetter === "o") {
            wordToMinimizeLetter = "oe";
        } else if (wordToMinimizeLetter === "ü" || wordToMinimizeLetter === "u") {
            wordToMinimizeLetter = "ue";
        }

        if (wordToMinimizeLetter !== " " && wordToMinimizeLetter.match(/^[0-9a-z]+$/) || lettersToAllow.includes(wordToMinimizeLetter)) {
            minimizedWord += wordToMinimizeLetter;
        }
    }

    return minimizedWord;
};

/**
 * Checks one word with another.
 * Parameter 1: answerWord.
 * Parameter 2: correctWord.
 * Return value: true / false (boolean)
 */
const checkWordEquality = (answerWord, correctWord) => {

    answerWord = minimizeWord(answerWord);
    correctWord = minimizeWord(correctWord);

    if (answerWord === correctWord) {
        score += 1;
    }

    return answerWord === correctWord;
};

/**
 * Sets the content of the answer correctness page.
 * No parameter.
 * No return value.
 */
const setAnswerCorrectnessPage = () => {
    const answerCorrectness = checkWordEquality(answerInput.value, shuffledObjects[questionCounter].meaning);

    answerCorrectnessTitle.innerHTML = "Frage " + (questionCounter + 1) + "/5";
    yourAnswerParagraph.innerHTML = "Deine Eingabe: " + answerInput.value;

    // Sets the symbol and the color of the answer correctness
    answerCorrectnessParagraph.innerHTML = answerCorrectness ? "&#10003;" : "&#10006;";
    answerCorrectnessParagraph.classList.add("rotate", answerCorrectness ? "correct" : "incorrect");
    answerCorrectnessParagraph.classList.remove(!answerCorrectness ? "correct" : "incorrect");

    abbreviationTitle.innerHTML = shuffledObjects[questionCounter].abbreviation;
    meaningParagraph.innerHTML = shuffledObjects[questionCounter].meaning;
    explanationParagraph.innerHTML = shuffledObjects[questionCounter].explanation;
};

/**
 * Selects a feedback message and a corresponding photo based on the score.
 * No parameter.
 * Return value: string of feedback array
 */
const selectFeedbackByScore = () => {
    feedbackIcon.src = "images/feedback_icon_" + score + ".png";
    return feedback[score];
};

/**
 * Updates the table of terms.
 * No parameter.
 * No return value.
 */
const updateEditTermsTable = () => {
    abbreviationsTable.innerHTML = null;
    for (const abbreviationIndex in abbreviations) {
        abbreviationsTable.innerHTML +=
            `<tr data-index="${abbreviationIndex}">
                <td>
                    ${abbreviations[abbreviationIndex].abbreviation}
                </td>
                <td>
                    <span id="spa_edit_abbreviation_meaning_${abbreviationIndex}">${abbreviations[abbreviationIndex].meaning}</span>
                    <input id="inp_edit_abbreviation_meaning_${abbreviationIndex}" class="hidden editInput" value="${abbreviations[abbreviationIndex].meaning}">
                </td>
                <td>
                    <span id="spa_edit_abbreviation_explanation_${abbreviationIndex}">${abbreviations[abbreviationIndex].explanation}</span>
                    <textarea id="inp_edit_abbreviation_explanation_${abbreviationIndex}" class="hidden editInput">${abbreviations[abbreviationIndex].explanation}</textarea>
                </td>
                <td>
                    <button id="btn_edit_term_${abbreviationIndex}" onclick="editTerm('${abbreviations[abbreviationIndex].abbreviation}')">&#128393;</button>
                </td>
                <td>
                    <button id="btn_delete_term_${abbreviationIndex}" onclick="deleteTerm('${abbreviations[abbreviationIndex].abbreviation}')">&#128465;</button>
                </td>
            </tr>`;
    }
};

/**
 * Allows editing a term in the term table
 * Parameter 1: index of the term to edit
 * No return value.
 */
const editTerm = (abbreviation) => {
    const abbreviationIndex = abbreviations.findIndex((serverAbbreviation => serverAbbreviation.abbreviation === abbreviation));

    const termMeaningSpan = document.getElementById(`spa_edit_abbreviation_meaning_${abbreviationIndex}`);
    const termExplanationSpan = document.getElementById(`spa_edit_abbreviation_explanation_${abbreviationIndex}`);
    const editTermMeaningInput = document.getElementById(`inp_edit_abbreviation_meaning_${abbreviationIndex}`);
    const editTermExplanationInput = document.getElementById(`inp_edit_abbreviation_explanation_${abbreviationIndex}`);
    const editTermButton = document.getElementById(`btn_edit_term_${abbreviationIndex}`);

    // Disables other edit and delete buttons
    for (const index in abbreviations) {
        if (parseInt(index) !== abbreviationIndex) {
            document.getElementById(`btn_edit_term_${index}`).disabled = true;
        }
        document.getElementById(`btn_delete_term_${index}`).disabled = true;
    }

    // Replaces the text in the table with input fields
    termMeaningSpan.classList.add("hidden");
    termExplanationSpan.classList.add("hidden");
    editTermMeaningInput.classList.remove("hidden");
    editTermExplanationInput.classList.remove("hidden");

    editTermButton.innerHTML = "&#10003;";

    editTermButton.addEventListener("click", () => {
        // Saves the edited abbreviation and sends it to server
        abbreviations[abbreviationIndex] = {
            abbreviation: abbreviation,
            meaning: editTermMeaningInput.value,
            explanation: editTermExplanationInput.value
        };

        // Sends the new abbreviation to server
        if (typeof socket !== "undefined") {
            socket.emit("editAbbrev", abbreviations[abbreviationIndex].abbreviation, editTermMeaningInput.value, editTermExplanationInput.value);
        }

        pushAbbreviationsIntoLocalStorage();
        updateEditTermsTable();
        editTermButton.removeEventListener("click", () => {
        }, true);
    });
};

/**
 * Allows deleting a term in the term table
 * Parameter 1: index of the term to delete
 * No return value.
 */
const deleteTerm = (abbreviation) => {
    if (abbreviations.length > 5) {
        // Sends the new abbreviation to server
        if (typeof socket !== "undefined") {
            socket.emit("deleteAbbrev", abbreviation);
        }

        abbreviations = abbreviations.filter((abbrev) => abbrev.abbreviation !== abbreviation);

        pushAbbreviationsIntoLocalStorage();
        updateEditTermsTable();
    } else {
        alert(`${abbreviation} kann nicht gelöscht werden:\nZu wenig Abkürzungen`);
    }
};

/**
 * Moves the abbreviation array to the Local Storage
 * No parameter.
 * No return value.
 */
const pushAbbreviationsIntoLocalStorage = () => {
    // Stores the abbreviations array in the browser's local storage.
    localStorage.setItem("abbreviations", JSON.stringify(abbreviations));
};

/** Set text for introduction paragraph
 * No parameter.
 * No return value.
 */
const setIntroductionText = () => {
    introductionParagraph.innerHTML = `Teste dein Wissen von ${abbreviations.length} Abkürzungen mit dem einzigartigen Abkürzungsquiz`;
}
setIntroductionText();

if (typeof io !== "undefined") {
    socket = io("http://localhost:3000");

    socket.on("serverAbbreviations", (data) => {
        if (data && data.length > 0) {
            // Overwrites the local abbreviations array
            abbreviations = data;
            // Overwrites the client localstorage with the array from server
            localStorage.setItem("abbreviations", JSON.stringify(data));
        }
    });
}

//Event listeners
// Check if the abbreviation already exists, clear the fields & red color
inpAbbreviation.addEventListener("input", checkUserInput);
inpDefinition.addEventListener("input", checkUserInput);
inpExplanation.addEventListener("input", checkUserInput);

addAbbreviationButton.addEventListener("click", () => {
    const newAbbreviation = inpAbbreviation.value.trim();
    const newDefinition = inpDefinition.value.trim();
    const newExplanation = inpExplanation.value.trim();

    // If the abbreviation does not already exist, it will be added & stored on the website for the first time.
    if (!isAbbreviationAlreadyExisting(newAbbreviation)) {
        abbreviations.push({
            abbreviation: newAbbreviation,
            meaning: newDefinition,
            explanation: newExplanation
        });

        // Sends the new abbreviation to server
        if (typeof socket !== "undefined") {
            socket.emit("newAbbrev", newAbbreviation, newDefinition, newExplanation);
        }

        pushAbbreviationsIntoLocalStorage();
        quitAddTermScreen();
    }
});

addQuizTermButton.addEventListener("click", () => {
    addAndRemoveSection(addTermSection, startPageSection);
    addAbbreviationButton.disabled = true;
});

editTermsButton.addEventListener("click", () => {
    addAndRemoveSection(editTermsSection, startPageSection);
    updateEditTermsTable();
});

editTermsPageReturnToStartButton.addEventListener("click", () => {
    addAndRemoveSection(startPageSection, editTermsSection);
});

returnToStartButton.addEventListener("click", () => {
    quitAddTermScreen();
});

startQuizButton.addEventListener("click", () => {
    addAndRemoveSection(quizSection, startPageSection);

    // Randomly chooses five new abbreviations and stores them in shuffledObjects
    shuffledObjects = [];
    while (shuffledObjects.length < 5) {
        const randomNumber = parseInt((Math.random() * abbreviations.length).toString().split(".")[0]);
        if (!shuffledObjects.includes(abbreviations[randomNumber])) {
            shuffledObjects.push(abbreviations[randomNumber])
        }
    }

    nextQuestion();
});

questionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addAndRemoveSection(answerCorrectnessSection, quizSection);
    setAnswerCorrectnessPage();
});

continueButton.addEventListener("click", () => {
    questionCounter += 1;
    answerCorrectnessParagraph.classList.remove("rotate");

    // Continues with the next question or displays the end screen
    if (questionCounter >= 5) {
        feedbackParagraph.innerHTML = selectFeedbackByScore();
        addAndRemoveSection(endPageSection, answerCorrectnessSection);
        score === 5 ? pyroDiv.classList.remove("hidden") : pyroDiv.classList.add("hidden");
    } else {
        addAndRemoveSection(quizSection, answerCorrectnessSection);
        nextQuestion();
    }
});

startPageButton.addEventListener("click", () => {
    questionCounter = 0;
    score = 0;
    addAndRemoveSection(startPageSection, endPageSection);
});
