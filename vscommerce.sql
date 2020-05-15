-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 14, 2020 alle 20:11
-- Versione del server: 10.1.35-MariaDB
-- Versione PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vscommerce`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `categorie`
--

CREATE TABLE `categorie` (
  `ca_pk_id` int(11) NOT NULL,
  `ca_nome` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `categorie`
--

INSERT INTO `categorie` (`ca_pk_id`, `ca_nome`) VALUES
(1, 'ABBIGLIAMENTO'),
(2, 'ELETTRONICA'),
(3, 'INFORMATICA'),
(4, 'LIBRI'),
(5, 'CASA'),
(6, 'UFFICIO'),
(8, 'GIOCHI'),
(10, 'TEMPO LIBERO'),
(12, 'TV'),
(13, 'PC'),
(14, 'ARREDAMENTO'),
(15, 'CARTOLERIA'),
(16, 'SOFTWARE');

-- --------------------------------------------------------

--
-- Struttura della tabella `clienti`
--

CREATE TABLE `clienti` (
  `cl_pk_id` int(11) NOT NULL,
  `cl_nome` varchar(256) NOT NULL,
  `cl_cognome` varchar(256) NOT NULL,
  `cl_data_nascita` date NOT NULL,
  `cl_codice_fiscale` varchar(16) NOT NULL,
  `cl_email` varchar(256) NOT NULL,
  `cl_password` varchar(64) NOT NULL,
  `cl_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `clienti`
--

INSERT INTO `clienti` (`cl_pk_id`, `cl_nome`, `cl_cognome`, `cl_data_nascita`, `cl_codice_fiscale`, `cl_email`, `cl_password`, `cl_admin`) VALUES
(2, 'Singh', 'Karanveer', '1998-07-21', 'SNGKNV98L21Z222H', 'karan98.ks3@gmail.com', 'db068ce9f744fbb35eedc9a883f91085', 1),
(4, 'karanveer', 'singh', '1998-07-21', 'sngknv98l21z222L', 'karanveer.singh@studenti.unipr.it', 'af44fa73370bd50b721f9dcbdeb7e9bb', 0),
(5, 'Matteo', 'Vincenzi', '1998-05-21', 'mvtt210c5eo98', 'matteo.vincenzi@gmail.com', '150be5b860e60a7fc7c7d9b9815e93d1', 1),
(6, 'Pippo', 'Rossi', '1988-03-02', 'FRLZBZ38E22B447Q', 'utentestandard@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 0),
(8, 'Michele', 'Amoretti', '0000-00-00', 'mcmt00t2t155', 'micheleamoretti@unipr.it', '5f4dcc3b5aa765d61d8327deb882cf99', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `marche`
--

CREATE TABLE `marche` (
  `ma_pk_id` int(11) NOT NULL,
  `ma_nome` varchar(128) NOT NULL,
  `ma_img_src` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `marche`
--

INSERT INTO `marche` (`ma_pk_id`, `ma_nome`, `ma_img_src`) VALUES
(2, 'APPLE', ''),
(3, 'SAMSUNG', ''),
(4, 'SCONOSCIUTO', ''),
(5, 'KDE', ''),
(6, 'MODIANO', ''),
(7, 'MONDADORI', ''),
(12, 'COLUMBUS', NULL),
(13, 'RASPBERRY', NULL),
(14, 'ZANICHELLI', NULL),
(15, 'ANKER', NULL),
(16, 'BOSE', NULL),
(17, 'DJI', NULL),
(18, 'GOPRO', NULL),
(19, 'PHILIPS', NULL),
(20, 'ONEPLUS', NULL),
(21, 'DELL', NULL),
(22, 'DYSON', NULL),
(23, 'CARHARTT ', NULL),
(24, 'BICYCLE', NULL),
(26, 'PIGNA', NULL),
(27, 'IKEA', NULL),
(28, 'ASMODEE ITALIA', NULL),
(29, 'LG', NULL),
(30, 'AMAZON', NULL),
(31, 'MICROSOFT', NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `ordini`
--

CREATE TABLE `ordini` (
  `or_pk_id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `data_ordine` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `totale` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `ordini`
--

INSERT INTO `ordini` (`or_pk_id`, `id_cliente`, `data_ordine`, `totale`) VALUES
(3, 4, '2020-05-10 11:43:52', 1000),
(4, 4, '2020-05-10 13:30:31', 360),
(5, 4, '2020-05-10 13:31:25', 671.96);

-- --------------------------------------------------------

--
-- Struttura della tabella `prodotti`
--

CREATE TABLE `prodotti` (
  `pr_pk_id` int(11) NOT NULL,
  `pr_nome` varchar(128) NOT NULL,
  `pr_descrizione` text NOT NULL,
  `pr_iva` int(11) NOT NULL,
  `pr_prezzo` double(10,2) NOT NULL,
  `pr_quantita` int(11) NOT NULL,
  `pr_copertina` varchar(256) NOT NULL,
  `pr_barcode` varchar(64) NOT NULL,
  `pr_fk_marca` int(11) DEFAULT NULL,
  `pr_fk_categoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `prodotti`
--

INSERT INTO `prodotti` (`pr_pk_id`, `pr_nome`, `pr_descrizione`, `pr_iva`, `pr_prezzo`, `pr_quantita`, `pr_copertina`, `pr_barcode`, `pr_fk_marca`, `pr_fk_categoria`) VALUES
(5, 'LA COSCIENZA DI ZENO ITALO SVEVO', 'LA COSCIENZA DI ZENO ITALO SVEVO OSCAR MONDADORI', 22, 14.00, 2, 'zeno.png', '9788804668299', 7, 4),
(39, 'Manuale Cremonese Informatica', 'Manuale cremonese INFORMATICA e TELECOMUNICAZIONI', 22, 65.00, 1, 'manuale.jpg', '9788808151698', 14, 4),
(40, 'Powerbank ANKER 20000mAh', 'Caricabatteria portatile ANKER da 20000mAh', 22, 40.00, 5, 'caricatore.jpg', 'X000HG3HR3', 15, 2),
(41, 'Bose SoundLink Mini 2', 'Casse BOSE SoundLink Mini 2 Nero', 22, 220.00, 2, 'cassa.jpg', '017817686150', 16, 3),
(42, 'CUFFIE BOSE SOUNDLINK AROUND-EAR II WIRELESS', 'Goditi un’esperienza wireless straordinaria con le cuffie Bose Soundlink around-ear II wireless. L’esclusiva tecnologia offre un suono profondo e avvolgente a qualsiasi volume, mentre il sistema a doppio microfono assicura chiamate chiare e nitide anche in ambienti rumorosi o in presenza di vento. Passa da un dispositivo Bluetooth a un altro usando controlli Touch intuitivi studiati per gestire facilmente la musica e le chiamate.', 22, 230.00, 11, 'bose.jpg', '01781769174', 16, 3),
(45, 'Harry Potter e la Pietra Filosofale ', 'Harry Potter e la Pietra Filosofale - Prima Edizione, con copertina rigida ', 22, 10.50, 100, 'potter.jpg', '9788804649618', 7, 4),
(46, 'TV LG 28\"', 'Smart TV LG TV LED HD 24 E 28 POLLICI MONITOR CON NETFLIX AMAZON MEDIASETPLAY CON DIGITALE TERRESTRE T2', 22, 500.00, 3, 'lg.jpg', '5453151', 29, 12),
(47, 'iPhone 11 Pro', 'Inizia l’era del Pro.\n\nUn rivoluzionario sistema a tripla fotocamera con tantissime funzioni in più e la stessa facilità d’uso di sempre. Un passo avanti senza precedenti in fatto di autonomia. E un chip straordinario, che sfrutta ancora di più l’apprendimento automatico per ridefinire i limiti di ciò che uno smart­phone può fare. È nato il primo iPhone così potente da meritarsi il nome Pro.', 22, 929.00, 3, 'iphone.jpg', '2324324323', 2, 2),
(48, 'Apple AirPods Pro auricolare true wireless Bianco', 'Descrizione\nLa magia ha un nuovo suono\nCon gli AirPods Pro puoi immergerti nell’ascolto grazie alla cancellazione attiva del rumore, ma puoi anche sentire quello che succede intorno a te con la modalità Trasparenza. Scegli la taglia di cuscinetti che fa per te, e indossali comodamente tutto il giorno. Proprio come gli AirPods, anche gli AirPods Pro si collegano in un lampo al tuo iPhone o Apple Watch: li togli dalla custodia e sono già pronti.\n\nCancellazione attiva del rumore\nPur essendo leggerissimi, gli AirPods Pro ti isolano dall’ambiente, per un ascolto senza distrazioni. Merito della cancellazione attiva del rumore, una tecnologia capace di adattarsi continuamente alla forma interna dell’orecchio e alla posizione del cuscinetto. In questo modo il mondo esterno scompare e ti concentri al meglio su musica, podcast e chiamate.\n\nModalità Trasparenza\nAttivando la modalità Trasparenza, gli AirPods Pro lasciano passare i suoni circostanti mettendoti in contatto con il mondo. I microfoni ', 22, 215.00, 250, 'airpods.jpg', '16516316', 2, 2),
(49, 'DJI Mavic Air 2 Quadrirotore', 'Mavic Air 2 porta potenza e praticità a un livello superiore, offrendo funzionalità avanzate in formato compatto. Con le opzioni di ripresa intelligente e l’eccellente qualità dell’immagine, realizzare capolavori aerei sarà semplicissimo. Oltrepassa i limiti della tua creatività in voli più sicuri e intelligenti.', 22, 849.00, 50, 'drone.jpg', '', 17, 2),
(50, 'Apple iPad Pro', 'Ecco il nuovo iPad Pro.\n\nTutto nuovo. Tutto schermo. Pronto a tutto. Completamente ridisegnato per racchiudere le nostre tecnologie più evolute, cambierà la tua idea di quel che può fare un iPad.\nE di quel che può fare un computer.\n\nCon il suo design all?screen, iPad Pro è come uno specchio magico pronto a realizzare i tuoi desideri. E puoi tenerlo come ti è più comodo.\n\nCon i nuovi gesti ancora più intuitivi, ti muovi in tutta libertà.\nScorri verso l’alto ed è subito Home.\n\nIl nuovo display Liquid Retina si spinge fino ai bordi del dispositivo. Con i suoi colori ultrarealistici e la tecnologia ProMotion rende tutto più spettacolare e risponde al volo ai tuoi gesti.\nVedere (e toccare) per credere.\n\nFace ID arriva su iPad. È progettato per sbloccarlo in modo sicuro e per funzionare perfettamente sia in orizzontale che in verticale.\nÈ il sistema di ricono­scimento facciale più sicuro mai visto su un tablet. E su un computer.\n\nUsa Face ID per sbloccare il tuo iPad Pro, fare login nelle ap', 22, 789.00, 20, 'ipad.jpg', '', 2, 3),
(51, 'GoPro HERO8 Black', 'Design semplificato\nLa forma rivisitata è più tascabile e le guide pieghevoli alla base tipermettono disostituire i supporti in pochi attimi.Un nuovo sportellolaterale rende ancora più rapido cambiare le batterie, mentrel’obiettivo è 2 volte più resistente agli urti. \n	\nMod HERO8 Black\nVlogger, filmmaker professionisti e aspiranti creator possonosbizzarrirsi grazie ad accessori a caricamentorapidocome flash,microfoni, schermi LCD e altro ancora. Per elevare il livello diacquisizione della fotocamera, è sufficiente aggiungere l’Unitàmultimediale opzionale.\n\nHyperSmooth 2.0\nAncora più fluido.HERO8 Black ha oratre livelli di stabilizzazione (On,Alto e Boost), quindi puoi scegliere l’opzione migliore per te. Ottieni lavisuale più ampia possibile o aumenta il livello di stabilizzazione perottenere i video più fluidi mai offerti da una fotocamera HERO. Inoltre,HyperSmoothfunziona con tutte le risoluzioni e frequenze deifotogrammi e offrel’allineamento con l’orizzonte in-app.', 22, 372.00, 120, 'gopro.jpg', '3242141', 18, 2),
(52, 'Philips Hue White and Color', 'Philips Hue White and Color ambiance Luce portatile Go', 22, 49.00, 500, 'lampada.jpg', '', 19, 5),
(53, 'Apple MacBook Pro 2020', 'MacBook Pro\nPiù potenza.\nPiù performance.\nPiù pro.', 22, 2549.00, 23, 'mac.jpg', '', 2, 13),
(54, 'OnePlus 8 Pro', 'OnePlus 8 Pro, uno smartphone Android con caratteristiche uniche nel suo genere.', 22, 919.00, 70, 'oneplus.png', '', 20, 2),
(55, 'Dell 14 XPS', 'Il piu piccolo notebook di classe aziendale premium da 14 pollici al mondo, ma con una potenza ineguagliabile. ', 22, 1099.00, 34, 'pcdell.jpg', '', 21, 13),
(56, 'Dyson Pure Cool purificatore', 'Il solo purificatore-ventilatore che rigenera aria di tutto un intero ambiente domestico.', 22, 599.00, 120, 'purificatore.png', '', 22, 5),
(57, 'Raspberry PI 4 Modello B', 'Raspberry PI 4 Modello B con 4 gb di ram', 22, 65.00, 12, 'raspberry.jpg', '', 13, 2),
(58, 'Samsung Series 6 TV QLED 49 pollici', 'Samsung Series 6 TV QLED 4K da 49 pollici - serie nuova 2020 ', 22, 599.00, 85, 'tvsmart.jpg', '5163653', 3, 12),
(59, 'Carhartt Cappellino', 'Carhartt WIP\nBACKLEY - Cappellino\nComposizione e istruzioni di lavaggio\nComposizione: 100% cotone\nMateriale: Tela\nAvvertenze: Lavaggio a mano\nDettagli prodotto\nFantasia: Monocromo', 22, 35.00, 560, 'cappello.png', '15315616', 23, 1),
(60, 'Bicycle Playing Cards - Rosse e Blu', 'Si potevano migliorare le Bicycle Rider Back?… la risposta è SI!\n\nEcco a voi le Bicycle Supreme Line, le carte stampate dalla US Playing Card Company per venire incontro alle esigenze dei maghi e dei cardists di tutto il mondo. \n\nE sapete qual è la parte migliore?... costeranno solo poco più di un mazzo standard!', 22, 8.00, 5000, 'carte.jpg', '16541684', 24, 8),
(61, 'Dixit Classico', 'Trattenete il fiato! Le immagini sono state rivelate. Tutte hanno una cosa in comune: una frase enigmatica! Ora state attenti... solo una delle immagini è quella giusta! Usate fiuto e intuizione per trovarla, evitando le trappole degli altri giocatori!\n\nDixit è un gioco di carte e di narrazione che mette al centro la fantasia. Un gioco sorprendente, conviviale e divertente da giocare in famiglia e con gli amici.', 22, 39.00, 420, 'gioco.jpg', '56416465', 28, 8),
(62, 'Quaderni A4 set Colorazioni Miste', 'Set di 10 quaderni della PIGNA, con colorazione mista, formato A4 con varie tipologie di foglio, da bianco, a quadretti e anche a righe. ', 22, 8.00, 800, 'quaderni.jpg', '16516868', 26, 15),
(63, 'Sedia Camera Regolabile IKEA', 'Sedia di colorazione blu, con rifiniture in legno, regolabile sia in altezza che in pendenza, foderata in tessuto morbido e decorata nei minimi particolari', 22, 230.00, 250, 'sedia.jpg', '153151384', 27, 14),
(64, 'Lampada da tavolo Dyson Lightcycle Morph', 'Lampada da tavolo Dyson Lightcycle Morph (Nera)\n\nUltima tecnologia\n\nSi trasforma. Si adatta. E rileva in modo intelligente la luce del giorno.', 22, 549.00, 30, 'ufficio.jpg', '35165868', 22, 6),
(65, 'Kindle Amazon Standard', 'Kindle by Amazon, versione standard con luce frontale integrata  compreso di offerte speciali - Nero', 22, 75.00, 79, 'ereader.jpg', '32156168', 30, 4),
(66, 'Microsoft Office 365 Personale', 'Microsoft Office 365 Personal, P2 Microsoft Licenza (MVL) 1 licenza/e 1 anno/i Italiano', 22, 84.00, 1000, 'office.jpg', '165498498', 31, 16);

-- --------------------------------------------------------

--
-- Struttura della tabella `righe_ordine`
--

CREATE TABLE `righe_ordine` (
  `id_riga` int(11) NOT NULL,
  `id_prodotto` int(11) NOT NULL,
  `quantita` int(11) NOT NULL,
  `prezzo` float NOT NULL,
  `id_ordine` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `righe_ordine`
--

INSERT INTO `righe_ordine` (`id_riga`, `id_prodotto`, `quantita`, `prezzo`, `id_ordine`) VALUES
(4, 46, 2, 500, 3),
(5, 44, 2, 180, 4),
(6, 42, 4, 160, 5),
(7, 3, 4, 7.99, 5);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`ca_pk_id`);

--
-- Indici per le tabelle `clienti`
--
ALTER TABLE `clienti`
  ADD PRIMARY KEY (`cl_pk_id`);

--
-- Indici per le tabelle `marche`
--
ALTER TABLE `marche`
  ADD PRIMARY KEY (`ma_pk_id`);

--
-- Indici per le tabelle `ordini`
--
ALTER TABLE `ordini`
  ADD PRIMARY KEY (`or_pk_id`);

--
-- Indici per le tabelle `prodotti`
--
ALTER TABLE `prodotti`
  ADD PRIMARY KEY (`pr_pk_id`),
  ADD KEY `pr_fk_marca` (`pr_fk_marca`),
  ADD KEY `pr_fk_categoria` (`pr_fk_categoria`);

--
-- Indici per le tabelle `righe_ordine`
--
ALTER TABLE `righe_ordine`
  ADD PRIMARY KEY (`id_riga`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `categorie`
--
ALTER TABLE `categorie`
  MODIFY `ca_pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT per la tabella `clienti`
--
ALTER TABLE `clienti`
  MODIFY `cl_pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT per la tabella `marche`
--
ALTER TABLE `marche`
  MODIFY `ma_pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT per la tabella `ordini`
--
ALTER TABLE `ordini`
  MODIFY `or_pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la tabella `prodotti`
--
ALTER TABLE `prodotti`
  MODIFY `pr_pk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT per la tabella `righe_ordine`
--
ALTER TABLE `righe_ordine`
  MODIFY `id_riga` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `prodotti`
--
ALTER TABLE `prodotti`
  ADD CONSTRAINT `pr_fk_categoria_add_ca_pk_id` FOREIGN KEY (`pr_fk_categoria`) REFERENCES `categorie` (`ca_pk_id`),
  ADD CONSTRAINT `pr_fk_marca_add_ma_pk_id` FOREIGN KEY (`pr_fk_marca`) REFERENCES `marche` (`ma_pk_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
