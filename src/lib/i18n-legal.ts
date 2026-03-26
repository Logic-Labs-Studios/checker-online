import { Language } from './i18n';

interface LegalSection {
  heading: string;
  text: string;
}

interface LegalTranslation {
  cookieTitle: string;
  cookieText: string;
  accept: string;
  decline: string;
  seo1Title: string;
  seo1Text: string;
  seo2Title: string;
  seo2Text: string;
  footerPrivacy: string;
  footerTerms: string;
  footerCookies: string;
  privacyTitle: string;
  privacySections: LegalSection[];
  termsTitle: string;
  termsSections: LegalSection[];
}

export const legalTranslations: Record<Language, LegalTranslation> = {
  pt: {
    cookieTitle: 'Consentimento de Cookies',
    cookieText: 'Utilizamos cookies para personalizar conteúdo, apresentar anúncios relevantes (Google AdSense) e analisar o nosso tráfego. Ao continuar, concorda com a nossa política.',
    accept: 'Aceitar',
    decline: 'Recusar',
    seo1Title: 'Como Jogar Damas Online',
    seo1Text: 'Bem-vindo ao melhor jogo de Damas multiplayer! O objetivo é capturar todas as peças do adversário. As peças movem-se na diagonal e as capturas são obrigatórias. Chegue ao fim do tabuleiro para promover a sua peça a Dama.',
    seo2Title: 'Estratégia e P2P',
    seo2Text: 'Jogue instantaneamente com amigos através da nossa tecnologia P2P descentralizada sem qualquer atraso. Controle o centro do tabuleiro e não deixe as suas peças isoladas para garantir a vitória.',
    footerPrivacy: 'Política de Privacidade',
    footerTerms: 'Termos e Condições',
    footerCookies: 'Política de Cookies',
    privacyTitle: 'Política de Privacidade',
    privacySections: [
      {
        heading: '1. Responsável pelo Tratamento',
        text: 'Damas Online é um serviço operado de forma independente. Para questões relacionadas com privacidade, pode entrar em contacto connosco através das redes sociais ou dos canais indicados neste site.',
      },
      {
        heading: '2. Dados Recolhidos',
        text: 'Este site não armazena dados pessoais nos nossos servidores. O nome introduzido pelo utilizador é usado apenas localmente durante a sessão de jogo e não é transmitido nem guardado. O jogo opera em tecnologia Peer-to-Peer (P2P) através do PeerJS, o que significa que a comunicação é direta entre os jogadores.',
      },
      {
        heading: '3. Cookies e Publicidade',
        text: 'Utilizamos o Google AdSense para apresentar anúncios. O Google, enquanto fornecedor terceiro, utiliza cookies para apresentar anúncios com base nas visitas anteriores do utilizador a este e a outros sites. O utilizador pode desativar os anúncios personalizados através das Definições de Anúncios do Google. Em alternativa, pode visitar www.aboutads.info para desativar os cookies de terceiros para publicidade personalizada.',
      },
      {
        heading: '4. Armazenamento Local (localStorage)',
        text: 'Guardamos as suas preferências localmente no seu browser (tema de cores, idioma preferido e consentimento de cookies). Estes dados não são transmitidos para qualquer servidor e permanecem exclusivamente no seu dispositivo.',
      },
      {
        heading: '5. Direitos do Utilizador (RGPD)',
        text: 'Ao abrigo do Regulamento Geral de Proteção de Dados (RGPD), tem o direito de aceder, retificar ou apagar os seus dados. Uma vez que não recolhemos dados pessoais nos nossos servidores, o direito de apagamento pode ser exercido diretamente no seu browser limpando os dados de sites.',
      },
      {
        heading: '6. Utilizadores da Califórnia (CCPA)',
        text: 'Ao abrigo da Lei de Privacidade do Consumidor da Califórnia (CCPA), os residentes da Califórnia têm o direito de saber que informações pessoais são recolhidas. Confirmamos que não vendemos informações pessoais a terceiros.',
      },
      {
        heading: '7. Alterações a esta Política',
        text: 'Reservamo-nos o direito de atualizar esta política de privacidade a qualquer momento. As alterações serão publicadas nesta página com a respetiva data de revisão.',
      },
    ],
    termsTitle: 'Termos e Condições',
    termsSections: [
      {
        heading: '1. Aceitação dos Termos',
        text: 'Ao aceder e utilizar o Damas Online, aceita ficar vinculado a estes Termos e Condições. Se não concordar com alguma parte dos termos, não deverá utilizar o serviço.',
      },
      {
        heading: '2. Serviço Gratuito',
        text: 'O uso do Damas Online é totalmente gratuito. O serviço é financiado por publicidade contextual. Reservamo-nos o direito de alterar, suspender ou descontinuar o serviço a qualquer momento sem aviso prévio.',
      },
      {
        heading: '3. Limitação de Responsabilidade',
        text: 'Não nos responsabilizamos por perdas de conexão, interrupções de jogo ou qualquer otro inconveniente decorrente da natureza descentralizada do serviço P2P. O jogo é fornecido "tal como está", sem quaisquer garantias de disponibilidade ou desempenho.',
      },
      {
        heading: '4. Conduta do Utilizador',
        text: 'O utilizador compromete-se a não utilizar o serviço para fins ilegais, a não tentar manipular ou explorar vulnerabilidades do sistema, e a não assediar outros utilizadores. O uso abusivo poderá resultar no bloqueio do acesso ao serviço.',
      },
      {
        heading: '5. Propriedade Intelectual',
        text: 'Todo o código, design e conteúdo do Damas Online são propriedade dos respetivos autores. É proibida a reprodução ou uso comercial sem autorização expressa.',
      },
      {
        heading: '6. Lei Aplicável',
        text: 'Estes termos são regidos pela legislação portuguesa e da União Europeia. Qualquer litígio será submetido à jurisdição exclusiva dos tribunais competentes de Portugal.',
      },
    ],
  },
  en: {
    cookieTitle: 'Cookie Consent',
    cookieText: 'We use cookies to personalize content, deliver relevant ads (Google AdSense), and analyze our traffic. By continuing, you agree to our policy.',
    accept: 'Accept',
    decline: 'Decline',
    seo1Title: 'How to Play Checkers Online',
    seo1Text: 'Welcome to the best multiplayer Checkers game! The goal is to capture all opponent pieces. Pieces move diagonally and captures are mandatory. Reach the opposite end to promote your piece to a King.',
    seo2Title: 'Strategy and P2P',
    seo2Text: 'Play instantly with friends through our seamless P2P technology. Control the center of the board and keep your pieces connected to ensure victory.',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms and Conditions',
    footerCookies: 'Cookie Policy',
    privacyTitle: 'Privacy Policy',
    privacySections: [
      {
        heading: '1. Data Controller',
        text: 'Checkers Online is operated independently. For privacy-related inquiries, you may contact us through the social channels listed on this site.',
      },
      {
        heading: '2. Data Collected',
        text: 'This site does not store personal data on our servers. The name entered by the user is only used locally during the game session and is never transmitted or stored. Gameplay operates via Peer-to-Peer (P2P) technology through PeerJS, meaning communication is direct between players.',
      },
      {
        heading: '3. Cookies and Advertising',
        text: 'We use Google AdSense to display advertisements. Google, as a third-party vendor, uses cookies to serve ads based on prior visits to this and other websites. Users may opt out of personalized advertising by visiting Google\'s Ad Settings, or www.aboutads.info to opt out of third-party cookies for personalized advertising.',
      },
      {
        heading: '4. Local Storage',
        text: 'We store your preferences locally in your browser (color theme, preferred language, and cookie consent). This data is never transmitted to any server and remains exclusively on your device.',
      },
      {
        heading: '5. Your Rights (GDPR)',
        text: 'Under the General Data Protection Regulation (GDPR), you have the right to access, rectify, or erase your data. Since we do not collect personal data on our servers, the right to erasure can be exercised directly in your browser by clearing site data.',
      },
      {
        heading: '6. California Users (CCPA)',
        text: 'Under the California Consumer Privacy Act (CCPA), California residents have the right to know what personal information is collected. We confirm that we do not sell personal information to third parties.',
      },
      {
        heading: '7. Changes to This Policy',
        text: 'We reserve the right to update this privacy policy at any time. Changes will be posted on this page with the corresponding revision date.',
      },
    ],
    termsTitle: 'Terms and Conditions',
    termsSections: [
      {
        heading: '1. Acceptance of Terms',
        text: 'By accessing and using Checkers Online, you agree to be bound by these Terms and Conditions. If you do not agree with any part of the terms, you should not use the service.',
      },
      {
        heading: '2. Free Service',
        text: 'Checkers Online is completely free to use. The service is funded by contextual advertising. We reserve the right to modify, suspend, or discontinue the service at any time without notice.',
      },
      {
        heading: '3. Limitation of Liability',
        text: 'We are not responsible for connection drops, game interruptions, or any other inconvenience arising from the decentralized nature of the P2P service. The game is provided "as is", without any guarantees of availability or performance.',
      },
      {
        heading: '4. User Conduct',
        text: 'Users agree not to use the service for illegal purposes, not to attempt to exploit or manipulate system vulnerabilities, and not to harass other users. Abusive use may result in access being blocked.',
      },
      {
        heading: '5. Intellectual Property',
        text: 'All code, design, and content of Checkers Online is the property of the respective authors. Reproduction or commercial use without express permission is prohibited.',
      },
      {
        heading: '6. Applicable Law',
        text: 'These terms are governed by Portuguese and European Union law. Any dispute shall be submitted to the exclusive jurisdiction of the competent courts of Portugal.',
      },
    ],
  },
  es: {
    cookieTitle: 'Consentimiento de Cookies',
    cookieText: 'Utilizamos cookies para personalizar contenido, mostrar anuncios relevantes (Google AdSense) y analizar nuestro tráfico. Al continuar, aceptas nuestra política.',
    accept: 'Aceptar',
    decline: 'Rechazar',
    seo1Title: 'Cómo Jugar a las Damas Online',
    seo1Text: '¡Bienvenido al mejor juego de Damas multijugador! El objetivo es capturar todas las fichas del oponente. Las piezas se mueven en diagonal y las capturas son obligatorias. Llega al extremo opuesto para coronar tu pieza como Reina.',
    seo2Title: 'Estrategia y P2P',
    seo2Text: 'Juega al instante con amigos gracias a nuestra tecnología P2P sin lag. Controla el centro del tablero y mantén tus fichas conectadas para asegurar la victoria.',
    footerPrivacy: 'Política de Privacidad',
    footerTerms: 'Términos y Condiciones',
    footerCookies: 'Política de Cookies',
    privacyTitle: 'Política de Privacidad',
    privacySections: [
      { heading: '1. Responsable del Tratamiento', text: 'Damas Online es un servicio independiente. Para consultas de privacidad, contáctanos a través de nuestros canales sociales.' },
      { heading: '2. Datos Recopilados', text: 'No almacenamos datos personales en nuestros servidores. El nombre del usuario solo se usa localmente durante la sesión de juego. El juego opera vía P2P con PeerJS.' },
      { heading: '3. Cookies y Publicidad', text: 'Usamos Google AdSense. Google usa cookies para mostrar anuncios personalizados. Puedes desactivarlos en la Configuración de Anuncios de Google o en www.aboutads.info.' },
      { heading: '4. Almacenamiento Local', text: 'Guardamos preferencias (tema, idioma, consentimiento de cookies) en tu navegador. Estos datos nunca se transmiten a ningún servidor.' },
      { heading: '5. Tus Derechos (RGPD)', text: 'Bajo el RGPD tienes derecho a acceder, rectificar o eliminar tus datos. Al no almacenar datos personales, puedes ejercer este derecho limpiando los datos de sitio en tu navegador.' },
      { heading: '6. Usuarios de California (CCPA)', text: 'Confirmamos que no vendemos información personal a terceros.' },
      { heading: '7. Cambios en esta Política', text: 'Nos reservamos el derecho de actualizar esta política. Los cambios se publicarán en esta página.' },
    ],
    termsTitle: 'Términos y Condiciones',
    termsSections: [
      { heading: '1. Aceptación', text: 'Al usar Damas Online, aceptas estos Términos y Condiciones.' },
      { heading: '2. Servicio Gratuito', text: 'Damas Online es completamente gratuito y financiado por publicidad. Podemos modificar o suspender el servicio sin previo aviso.' },
      { heading: '3. Limitación de Responsabilidad', text: 'No somos responsables de caídas de conexión ni interrupciones del juego P2P. El servicio se proporciona "tal cual".' },
      { heading: '4. Conducta del Usuario', text: 'Queda prohibido usar el servicio para fines ilegales, explotar vulnerabilidades o acosar a otros usuarios.' },
      { heading: '5. Propiedad Intelectual', text: 'Todo el contenido y código es propiedad de sus autores. Queda prohibida la reproducción comercial sin autorización.' },
      { heading: '6. Ley Aplicable', text: 'Estos términos se rigen por la legislación portuguesa y europea.' },
    ],
  },
  fr: {
    cookieTitle: 'Consentement aux Cookies',
    cookieText: 'Nous utilisons des cookies pour personnaliser le contenu, diffuser des annonces pertinentes (Google AdSense) et analyser notre trafic. En continuant, vous acceptez notre politique.',
    accept: 'Accepter',
    decline: 'Refuser',
    seo1Title: 'Comment Jouer aux Dames en Ligne',
    seo1Text: 'Bienvenue dans le meilleur jeu de Dames multijoueur ! Le but est de capturer toutes les pièces de l\'adversaire. Atteignez le bout du plateau pour promouvoir votre pièce en Dame.',
    seo2Title: 'Stratégie et P2P',
    seo2Text: 'Jouez instantanément avec vos amis grâce à notre technologie P2P sans latence. Contrôlez le centre du plateau pour vous assurer la victoire.',
    footerPrivacy: 'Politique de Confidentialité',
    footerTerms: 'Conditions Générales',
    footerCookies: 'Politique relative aux Cookies',
    privacyTitle: 'Politique de Confidentialité',
    privacySections: [
      { heading: '1. Responsable du traitement', text: 'Jeu de Dames en Ligne est un service indépendant. Pour toute question de confidentialité, contactez-nous via nos réseaux sociaux.' },
      { heading: '2. Données collectées', text: 'Nous ne stockons pas de données personnelles sur nos serveurs. Le nom saisi est utilisé uniquement localement. Le jeu fonctionne en P2P via PeerJS.' },
      { heading: '3. Cookies et publicité', text: 'Nous utilisons Google AdSense. Google utilise des cookies pour des annonces personnalisées. Vous pouvez les désactiver sur www.aboutads.info.' },
      { heading: '4. Stockage local', text: 'Nous stockons vos préférences (thème, langue, consentement) dans votre navigateur. Ces données ne sont jamais transmises à un serveur.' },
      { heading: '5. Vos droits (RGPD)', text: 'Vous avez le droit d\'accéder, rectifier ou effacer vos données. Exercez ce droit en effaçant les données de site dans votre navigateur.' },
      { heading: '6. Utilisateurs de Californie (CCPA)', text: 'Nous ne vendons pas d\'informations personnelles à des tiers.' },
      { heading: '7. Modifications', text: 'Nous nous réservons le droit de mettre à jour cette politique. Les modifications seront publiées sur cette page.' },
    ],
    termsTitle: 'Conditions Générales',
    termsSections: [
      { heading: '1. Acceptation', text: 'En utilisant Jeu de Dames en Ligne, vous acceptez ces conditions.' },
      { heading: '2. Service gratuit', text: 'Le service est gratuit et financé par la publicité. Nous pouvons le modifier ou le suspendre sans préavis.' },
      { heading: '3. Limitation de responsabilité', text: 'Nous ne sommes pas responsables des déconnexions. Le service est fourni "tel quel".' },
      { heading: '4. Conduite de l\'utilisateur', text: 'Il est interdit d\'utiliser le service à des fins illégales ou de harceler d\'autres utilisateurs.' },
      { heading: '5. Propriété intellectuelle', text: 'Tout le contenu est protégé. Toute reproduction commerciale est interdite sans autorisation.' },
      { heading: '6. Loi applicable', text: 'Ces conditions sont régies par le droit portugais et européen.' },
    ],
  },
  de: {
    cookieTitle: 'Cookie-Zustimmung',
    cookieText: 'Wir verwenden Cookies zur Personalisierung von Inhalten und Anzeigen (Google AdSense) sowie zur Analyse unseres Traffics. Durch die weitere Nutzung stimmen Sie unserer Richtlinie zu.',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
    seo1Title: 'Wie man Dame Online spielt',
    seo1Text: 'Willkommen beim besten Multiplayer-Dame-Spiel! Ziel ist es, alle gegnerischen Figuren zu schlagen. Figuren bewegen sich diagonal und das Schlagen ist Pflicht. Erreichen Sie das andere Ende, um Ihre Figur zur Dame zu machen.',
    seo2Title: 'Strategie und P2P',
    seo2Text: 'Spielen Sie sofort mit Freunden über unsere P2P-Technologie. Kontrollieren Sie das Zentrum des Bretts, um den Sieg zu sichern.',
    footerPrivacy: 'Datenschutzrichtlinie',
    footerTerms: 'Allgemeine Geschäftsbedingungen',
    footerCookies: 'Cookie-Richtlinie',
    privacyTitle: 'Datenschutzrichtlinie',
    privacySections: [
      { heading: '1. Verantwortlicher', text: 'Dame Online ist ein unabhängiger Dienst. Für Datenschutzanfragen kontaktieren Sie uns über unsere sozialen Kanäle.' },
      { heading: '2. Erhobene Daten', text: 'Wir speichern keine personenbezogenen Daten auf unseren Servern. Der eingegebene Name wird nur lokal während der Spielsitzung verwendet. Das Spiel läuft über P2P mit PeerJS.' },
      { heading: '3. Cookies und Werbung', text: 'Wir verwenden Google AdSense. Google verwendet Cookies für personalisierte Anzeigen. Sie können diese unter www.aboutads.info deaktivieren.' },
      { heading: '4. Lokaler Speicher', text: 'Wir speichern Ihre Einstellungen (Design, Sprache, Cookie-Zustimmung) in Ihrem Browser. Diese Daten werden niemals übertragen.' },
      { heading: '5. Ihre Rechte (DSGVO)', text: 'Sie haben das Recht auf Zugang, Berichtigung oder Löschung Ihrer Daten. Löschen Sie die Website-Daten in Ihrem Browser, um dieses Recht auszuüben.' },
      { heading: '6. Kalifornische Nutzer (CCPA)', text: 'Wir verkaufen keine personenbezogenen Daten an Dritte.' },
      { heading: '7. Änderungen', text: 'Wir behalten uns das Recht vor, diese Richtlinie jederzeit zu aktualisieren.' },
    ],
    termsTitle: 'Allgemeine Geschäftsbedingungen',
    termsSections: [
      { heading: '1. Annahme der Bedingungen', text: 'Durch die Nutzung von Dame Online akzeptieren Sie diese Bedingungen.' },
      { heading: '2. Kostenloser Dienst', text: 'Dame Online ist kostenlos und wird durch Werbung finanziert. Wir können den Dienst jederzeit ändern oder einstellen.' },
      { heading: '3. Haftungsbeschränkung', text: 'Wir haften nicht für Verbindungsabbrüche. Der Dienst wird "wie besehen" bereitgestellt.' },
      { heading: '4. Nutzerverhalten', text: 'Die Nutzung für illegale Zwecke oder die Belästigung anderer Nutzer ist verboten.' },
      { heading: '5. Geistiges Eigentum', text: 'Alle Inhalte sind urheberrechtlich geschützt. Kommerzielle Nutzung ist ohne Genehmigung verboten.' },
      { heading: '6. Anwendbares Recht', text: 'Diese Bedingungen unterliegen portugiesischem und europäischem Recht.' },
    ],
  },
  pl: {
    cookieTitle: 'Zgoda na Pliki Cookie',
    cookieText: 'Używamy plików cookie do personalizacji treści, wyświetlania reklam (Google AdSense) i analizy ruchu. Kontynuując, akceptujesz naszą politykę.',
    accept: 'Akceptuj',
    decline: 'Odrzuć',
    seo1Title: 'Jak Grać w Warcaby Online',
    seo1Text: 'Witamy w najlepszej wieloosobowej grze w Warcaby! Celem jest zbicie wszystkich pionków przeciwnika. Zdobądź przeciwny koniec planszy, aby promować swój pionek na damkę.',
    seo2Title: 'Strategia i P2P',
    seo2Text: 'Graj natychmiast ze znajomymi dzięki technologii P2P. Kontroluj środek planszy, aby zapewnić sobie zwycięstwo.',
    footerPrivacy: 'Polityka Prywatności',
    footerTerms: 'Zasady i Warunki',
    footerCookies: 'Polityka Plików Cookie',
    privacyTitle: 'Polityka Prywatności',
    privacySections: [
      { heading: '1. Administrator danych', text: 'Warcaby Online to niezależna usługa. W sprawach prywatności skontaktuj się z nami przez nasze kanały społecznościowe.' },
      { heading: '2. Zbierane dane', text: 'Nie przechowujemy danych osobowych na naszych serwerach. Imię użytkownika jest używane tylko lokalnie podczas sesji gry. Gra działa w trybie P2P przez PeerJS.' },
      { heading: '3. Pliki cookie i reklamy', text: 'Używamy Google AdSense. Google używa plików cookie do wyświetlania spersonalizowanych reklam. Możesz je wyłączyć na www.aboutads.info.' },
      { heading: '4. Lokalne przechowywanie', text: 'Przechowujemy Twoje preferencje (motyw, język, zgoda na cookies) w przeglądarce. Dane te nigdy nie są przesyłane na serwer.' },
      { heading: '5. Twoje prawa (RODO)', text: 'Masz prawo dostępu, sprostowania lub usunięcia swoich danych. Skorzystaj z tego prawa, czyszcząc dane strony w przeglądarce.' },
      { heading: '6. Użytkownicy z Kalifornii (CCPA)', text: 'Nie sprzedajemy danych osobowych stronom trzecim.' },
      { heading: '7. Zmiany', text: 'Zastrzegamy sobie prawo do aktualizacji tej polityki. Zmiany będą publikowane na tej stronie.' },
    ],
    termsTitle: 'Zasady i Warunki',
    termsSections: [
      { heading: '1. Akceptacja warunków', text: 'Korzystając z Warcaby Online, akceptujesz niniejsze Zasady i Warunki.' },
      { heading: '2. Bezpłatna usługa', text: 'Warcaby Online jest bezpłatne i finansowane z reklam. Możemy zmienić lub zawiesić usługę bez powiadomienia.' },
      { heading: '3. Ograniczenie odpowiedzialności', text: 'Nie ponosimy odpowiedzialności za przerwy połączenia. Usługa jest świadczona "tak jak jest".' },
      { heading: '4. Zachowanie użytkownika', text: 'Zabrania się korzystania z usługi w celach nielegalnych lub nękania innych użytkowników.' },
      { heading: '5. Własność intelektualna', text: 'Wszystkie treści są chronione prawem autorskim. Komercyjne użycie bez zezwolenia jest zabronione.' },
      { heading: '6. Prawo właściwe', text: 'Niniejsze warunki podlegają prawu portugalskiemu i unijnemu.' },
    ],
  },
};

export function getLegalTranslation(lang: Language): LegalTranslation {
  return legalTranslations[lang] || legalTranslations.en;
}
