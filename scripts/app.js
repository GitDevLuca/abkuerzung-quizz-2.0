// Initial variables
const startQuizButton = document.getElementById("btn_start_quiz");
const addQuizTermButton = document.getElementById("btn_add_term");
const continueButton = document.getElementById("btn_continue");
const startPageButton = document.getElementById("btn_start_page");

const answerInput = document.getElementById("inp_answer");

const startPageSection = document.getElementById("sec_start_page");
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

const lettersToAllow = ["é", "ô", "è", "î", "à", "ï", "ë", "û", "ù", "ò", "ê", "â"];

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
        meaning: "Dynamic HTML",
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
    shuffledObjects = abbreviations.sort(function () {
        return Math.random() - .5;
    });
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
const quitAddQuiz = () => {
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
        socket.emit("newAbbrev", newAbbreviation, newDefinition, newExplanation);

        // Stores the abbreviations array in the browser's local storage.
        localStorage.setItem("abbreviations", JSON.stringify(abbreviations));
        quitAddQuiz();
    }
});

addQuizTermButton.addEventListener("click", () => {
    addAndRemoveSection(addTermSection, startPageSection);
    addAbbreviationButton.disabled = true;
});
returnToStartButton.addEventListener("click", () => {
    quitAddQuiz();
});
startQuizButton.addEventListener("click", () => {
    addAndRemoveSection(quizSection, startPageSection);
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
returnToStartButton.addEventListener("click", () => {
    addAndRemoveSection(startPageSection, addTermSection);
});

// Set text for introduction paragraph
introductionParagraph.innerHTML = `Teste dein Wissen von ${abbreviations.length} Abkürzungen mit dem einzigartigen Abkürzungsquiz`;


const socket = io("http://localhost:3000");

socket.on("serverAbbreviations", (data) => {
    if (data && data.length > 0) {
        // Overwrites the local abbreviations array
        abbreviations = data;
        // Overwrites the client localstorage with the array from server
        localStorage.setItem("abbreviations", JSON.stringify(data));
    }
});
