-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           10.5.8-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Listage de la structure de la base pour test
CREATE DATABASE IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `test`;

-- Listage de la structure de la table test. administrateur
CREATE TABLE IF NOT EXISTS `administrateur` (
  `id_administrateur` int(11) NOT NULL AUTO_INCREMENT,
  `UTILISATEUR_id_utilisateur` int(11) NOT NULL,
  PRIMARY KEY (`id_administrateur`),
  KEY `fk_ADMINISTRATEUR_UTILISATEUR1_idx` (`UTILISATEUR_id_utilisateur`),
  CONSTRAINT `fk_ADMINISTRATEUR_UTILISATEUR1` FOREIGN KEY (`UTILISATEUR_id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Listage des données de la table test.administrateur : ~1 rows (environ)
/*!40000 ALTER TABLE `administrateur` DISABLE KEYS */;
INSERT INTO `administrateur` (`id_administrateur`, `UTILISATEUR_id_utilisateur`) VALUES
	(1, 38);
/*!40000 ALTER TABLE `administrateur` ENABLE KEYS */;

-- Listage de la structure de la table test. candidature
CREATE TABLE IF NOT EXISTS `candidature` (
  `id_candidature` int(11) NOT NULL AUTO_INCREMENT,
  `origine_offre` varchar(45) DEFAULT NULL,
  `ETUDIANT_id_etudiant` int(11) NOT NULL,
  `ENTREPRISE_id_entreprise` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_candidature`),
  KEY `fk_CANDIDATURE_ETUDIANT_idx` (`ETUDIANT_id_etudiant`),
  KEY `fk_CANDIDATURE_ENTREPRISE1_idx` (`ENTREPRISE_id_entreprise`),
  CONSTRAINT `fk_CANDIDATURE_ENTREPRISE1` FOREIGN KEY (`ENTREPRISE_id_entreprise`) REFERENCES `entreprise` (`id_entreprise`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_CANDIDATURE_ETUDIANT` FOREIGN KEY (`ETUDIANT_id_etudiant`) REFERENCES `etudiant` (`id_etudiant`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Listage des données de la table test.candidature : ~1 rows (environ)
/*!40000 ALTER TABLE `candidature` DISABLE KEYS */;
INSERT INTO `candidature` (`id_candidature`, `origine_offre`, `ETUDIANT_id_etudiant`, `ENTREPRISE_id_entreprise`) VALUES
	(4, 'Oncle Stan', 5, 2);
/*!40000 ALTER TABLE `candidature` ENABLE KEYS */;

-- Listage de la structure de la table test. cv
CREATE TABLE IF NOT EXISTS `cv` (
  `id_CV` int(11) NOT NULL AUTO_INCREMENT,
  `DOCUMENT_id_document` int(11) NOT NULL,
  PRIMARY KEY (`id_CV`),
  KEY `fk_CV_DOCUMENT1_idx` (`DOCUMENT_id_document`),
  CONSTRAINT `fk_CV_DOCUMENT1` FOREIGN KEY (`DOCUMENT_id_document`) REFERENCES `document` (`id_document`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Listage des données de la table test.cv : ~1 rows (environ)
/*!40000 ALTER TABLE `cv` DISABLE KEYS */;
INSERT INTO `cv` (`id_CV`, `DOCUMENT_id_document`) VALUES
	(1, 2);
/*!40000 ALTER TABLE `cv` ENABLE KEYS */;

-- Listage de la structure de la table test. document
CREATE TABLE IF NOT EXISTS `document` (
  `id_document` int(11) NOT NULL AUTO_INCREMENT,
  `valide` tinyint(4) DEFAULT 0,
  `lien` varchar(45) NOT NULL,
  `ETUDIANT_id_etudiant` int(11) NOT NULL,
  `date_depot` date NOT NULL,
  `date_consultation` date DEFAULT NULL,
  `commentaire` varchar(280) DEFAULT NULL,
  `ENSEIGNANT_id_enseignant` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_document`),
  KEY `fk_DOCUMENT_ETUDIANT1_idx` (`ETUDIANT_id_etudiant`),
  KEY `fk_DOCUMENT_ENSEIGNANT1` (`ENSEIGNANT_id_enseignant`),
  CONSTRAINT `fk_DOCUMENT_ENSEIGNANT1` FOREIGN KEY (`ENSEIGNANT_id_enseignant`) REFERENCES `enseignant` (`id_enseignant`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_DOCUMENT_ETUDIANT1` FOREIGN KEY (`ETUDIANT_id_etudiant`) REFERENCES `etudiant` (`id_etudiant`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Listage des données de la table test.document : ~2 rows (environ)
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` (`id_document`, `valide`, `lien`, `ETUDIANT_id_etudiant`, `date_depot`, `date_consultation`, `commentaire`, `ENSEIGNANT_id_enseignant`) VALUES
	(2, 0, 'cv.pdf', 5, '2020-12-09', NULL, NULL, 1),
	(3, 0, 'lettre', 5, '2020-12-09', NULL, NULL, NULL);
/*!40000 ALTER TABLE `document` ENABLE KEYS */;

-- Listage de la structure de la table test. enseignant
CREATE TABLE IF NOT EXISTS `enseignant` (
  `id_enseignant` int(11) NOT NULL AUTO_INCREMENT,
  `UTILISATEUR_id_utilisateur` int(11) NOT NULL,
  PRIMARY KEY (`id_enseignant`),
  KEY `fk_ENSEIGNANT_UTILISATEUR1_idx` (`UTILISATEUR_id_utilisateur`),
  CONSTRAINT `fk_ENSEIGNANT_UTILISATEUR1` FOREIGN KEY (`UTILISATEUR_id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Listage des données de la table test.enseignant : ~1 rows (environ)
/*!40000 ALTER TABLE `enseignant` DISABLE KEYS */;
INSERT INTO `enseignant` (`id_enseignant`, `UTILISATEUR_id_utilisateur`) VALUES
	(1, 38);
/*!40000 ALTER TABLE `enseignant` ENABLE KEYS */;

-- Listage de la structure de la table test. entreprise
CREATE TABLE IF NOT EXISTS `entreprise` (
  `id_entreprise` int(11) NOT NULL AUTO_INCREMENT,
  `nom_entreprse` varchar(45) NOT NULL,
  `adresse_entreprise` varchar(100) DEFAULT NULL,
  `site_web` varchar(100) NOT NULL,
  PRIMARY KEY (`id_entreprise`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Listage des données de la table test.entreprise : ~5 rows (environ)
/*!40000 ALTER TABLE `entreprise` DISABLE KEYS */;
INSERT INTO `entreprise` (`id_entreprise`, `nom_entreprse`, `adresse_entreprise`, `site_web`) VALUES
	(2, 'Mystery Shack', 'Gravity Falls', 'https://themysteryshack.com/'),
	(7, 'Senat', 'Corruscant senat', 'https://starwars.fandom.com/fr/wiki/Accueil'),
	(8, 'Capgemini', 'Nantes', 'https://www.capgemini.com/fr-fr/'),
	(9, 'DCT', '3eme univers a droite', 'bblblbl'),
	(10, 'ProntoPizza', '24 rue monteglier Dignes', 'https://www.pizzeria-decazeville.fr/');
/*!40000 ALTER TABLE `entreprise` ENABLE KEYS */;

-- Listage de la structure de la table test. entretien
CREATE TABLE IF NOT EXISTS `entretien` (
  `id_entretien` int(11) NOT NULL AUTO_INCREMENT,
  `date_entretien` date NOT NULL,
  `est_annule` tinyint(4) NOT NULL DEFAULT 0,
  `ETUDIANT_id_etudiant` int(11) NOT NULL,
  `INTERVENANT_id_intervanant` int(11) NOT NULL,
  PRIMARY KEY (`id_entretien`),
  KEY `fk_ENTRETIEN_ETUDIANT1_idx` (`ETUDIANT_id_etudiant`),
  KEY `fk_ENTRETIEN_INTERVENANT1_idx` (`INTERVENANT_id_intervanant`),
  CONSTRAINT `fk_ENTRETIEN_ETUDIANT1` FOREIGN KEY (`ETUDIANT_id_etudiant`) REFERENCES `etudiant` (`id_etudiant`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ENTRETIEN_INTERVENANT1` FOREIGN KEY (`INTERVENANT_id_intervanant`) REFERENCES `intervenant` (`id_intervanant`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Listage des données de la table test.entretien : ~1 rows (environ)
/*!40000 ALTER TABLE `entretien` DISABLE KEYS */;
INSERT INTO `entretien` (`id_entretien`, `date_entretien`, `est_annule`, `ETUDIANT_id_etudiant`, `INTERVENANT_id_intervanant`) VALUES
	(1, '2020-12-09', 0, 5, 1);
/*!40000 ALTER TABLE `entretien` ENABLE KEYS */;

-- Listage de la structure de la table test. entretien_ubo
CREATE TABLE IF NOT EXISTS `entretien_ubo` (
  `id_entretien_ubo` int(11) NOT NULL AUTO_INCREMENT,
  `ENTRETIEN_id_entretien` int(11) NOT NULL,
  `ENSEIGNANT_id_enseignant` int(11) NOT NULL,
  PRIMARY KEY (`id_entretien_ubo`),
  KEY `fk_ENTRETIEN_UBO_ENTRETIEN1_idx` (`ENTRETIEN_id_entretien`),
  KEY `fk_ENTRETIEN_UBO_ENSEIGNANT1_idx` (`ENSEIGNANT_id_enseignant`),
  CONSTRAINT `fk_ENTRETIEN_UBO_ENSEIGNANT1` FOREIGN KEY (`ENSEIGNANT_id_enseignant`) REFERENCES `enseignant` (`id_enseignant`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ENTRETIEN_UBO_ENTRETIEN1` FOREIGN KEY (`ENTRETIEN_id_entretien`) REFERENCES `entretien` (`id_entretien`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table test.entretien_ubo : ~0 rows (environ)
/*!40000 ALTER TABLE `entretien_ubo` DISABLE KEYS */;
/*!40000 ALTER TABLE `entretien_ubo` ENABLE KEYS */;

-- Listage de la structure de la table test. entrtien_perso
CREATE TABLE IF NOT EXISTS `entrtien_perso` (
  `id_entretien_perso` int(11) NOT NULL AUTO_INCREMENT,
  `ENTRETIEN_id_entretien` int(11) NOT NULL,
  `CANDIDATURE_id_candidature` int(11) NOT NULL,
  PRIMARY KEY (`id_entretien_perso`),
  KEY `fk_ENTRTIEN_PERSO_ENTRETIEN1_idx` (`ENTRETIEN_id_entretien`),
  KEY `fk_ENTRTIEN_PERSO_CANDIDATURE1_idx` (`CANDIDATURE_id_candidature`),
  CONSTRAINT `fk_ENTRTIEN_PERSO_CANDIDATURE1` FOREIGN KEY (`CANDIDATURE_id_candidature`) REFERENCES `candidature` (`id_candidature`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ENTRTIEN_PERSO_ENTRETIEN1` FOREIGN KEY (`ENTRETIEN_id_entretien`) REFERENCES `entretien` (`id_entretien`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table test.entrtien_perso : ~0 rows (environ)
/*!40000 ALTER TABLE `entrtien_perso` DISABLE KEYS */;
/*!40000 ALTER TABLE `entrtien_perso` ENABLE KEYS */;

-- Listage de la structure de la table test. etudiant
CREATE TABLE IF NOT EXISTS `etudiant` (
  `id_etudiant` int(11) NOT NULL AUTO_INCREMENT,
  `filiere` varchar(45) DEFAULT NULL,
  `nationalite_fr` tinyint(4) NOT NULL,
  `date_naissance` date NOT NULL,
  `date_obtention_stage` date DEFAULT NULL,
  `type_contrat` varchar(45) DEFAULT NULL,
  `ENTREPRISE_id_entreprise` int(11) DEFAULT NULL,
  `UTILISATEUR_id_utilisateur` int(11) NOT NULL,
  `alternance` tinyint(4) NOT NULL,
  `email_perso` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id_etudiant`),
  KEY `fk_ETUDIANT_ENTREPRISE1_idx` (`ENTREPRISE_id_entreprise`),
  KEY `fk_ETUDIANT_UTILISATEUR1_idx` (`UTILISATEUR_id_utilisateur`),
  CONSTRAINT `fk_ETUDIANT_ENTREPRISE1` FOREIGN KEY (`ENTREPRISE_id_entreprise`) REFERENCES `entreprise` (`id_entreprise`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ETUDIANT_UTILISATEUR1` FOREIGN KEY (`UTILISATEUR_id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Listage des données de la table test.etudiant : ~6 rows (environ)
/*!40000 ALTER TABLE `etudiant` DISABLE KEYS */;
INSERT INTO `etudiant` (`id_etudiant`, `filiere`, `nationalite_fr`, `date_naissance`, `date_obtention_stage`, `type_contrat`, `ENTREPRISE_id_entreprise`, `UTILISATEUR_id_utilisateur`, `alternance`, `email_perso`) VALUES
	(2, NULL, 1, '2000-11-06', NULL, NULL, NULL, 32, 0, 'chiara.relevat@outlook.fr'),
	(3, NULL, 1, '1999-10-05', NULL, NULL, NULL, 33, 0, 'jpDup@gmail.com'),
	(5, NULL, 1, '2001-08-30', '2020-12-04', 'Option 1', 2, 35, 0, 'dandinou@yahoo.fr'),
	(6, NULL, 0, '2001-08-30', NULL, NULL, NULL, 36, 0, 'DiPines@bill.cipher'),
	(8, NULL, 1, '1997-01-29', NULL, NULL, NULL, 39, 0, 'soooos@gmail.com'),
	(9, NULL, 1, '1971-01-05', NULL, NULL, NULL, 42, 0, 'vero.sawyer@yahoo.fr');
/*!40000 ALTER TABLE `etudiant` ENABLE KEYS */;

-- Listage de la structure de la table test. intervenant
CREATE TABLE IF NOT EXISTS `intervenant` (
  `id_intervanant` int(11) NOT NULL AUTO_INCREMENT,
  `nom_intervenant` varchar(45) NOT NULL,
  `prenom_intervenant` varchar(45) NOT NULL,
  `ENTREPRISE_id_entreprise` int(11) NOT NULL,
  PRIMARY KEY (`id_intervanant`),
  KEY `fk_INTERVENANT_ENTREPRISE1_idx` (`ENTREPRISE_id_entreprise`),
  CONSTRAINT `fk_INTERVENANT_ENTREPRISE1` FOREIGN KEY (`ENTREPRISE_id_entreprise`) REFERENCES `entreprise` (`id_entreprise`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Listage des données de la table test.intervenant : ~2 rows (environ)
/*!40000 ALTER TABLE `intervenant` DISABLE KEYS */;
INSERT INTO `intervenant` (`id_intervanant`, `nom_intervenant`, `prenom_intervenant`, `ENTREPRISE_id_entreprise`) VALUES
	(1, 'Chépas', 'Soos', 2),
	(2, 'Prout', 'Wendy', 2);
/*!40000 ALTER TABLE `intervenant` ENABLE KEYS */;

-- Listage de la structure de la table test. lettre_motivation
CREATE TABLE IF NOT EXISTS `lettre_motivation` (
  `id_lettre_motivation` int(11) NOT NULL AUTO_INCREMENT,
  `DOCUMENT_id_document` int(11) NOT NULL,
  `CANDIDATURE_id_candidature` int(11) NOT NULL,
  PRIMARY KEY (`id_lettre_motivation`),
  KEY `fk_LETTRE_MOTIVATION_DOCUMENT1_idx` (`DOCUMENT_id_document`),
  KEY `fk_LETTRE_MOTIVATION_CANDIDATURE1_idx` (`CANDIDATURE_id_candidature`),
  CONSTRAINT `fk_LETTRE_MOTIVATION_CANDIDATURE1` FOREIGN KEY (`CANDIDATURE_id_candidature`) REFERENCES `candidature` (`id_candidature`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_LETTRE_MOTIVATION_DOCUMENT1` FOREIGN KEY (`DOCUMENT_id_document`) REFERENCES `document` (`id_document`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Listage des données de la table test.lettre_motivation : ~1 rows (environ)
/*!40000 ALTER TABLE `lettre_motivation` DISABLE KEYS */;
INSERT INTO `lettre_motivation` (`id_lettre_motivation`, `DOCUMENT_id_document`, `CANDIDATURE_id_candidature`) VALUES
	(1, 3, 4);
/*!40000 ALTER TABLE `lettre_motivation` ENABLE KEYS */;

-- Listage de la structure de la table test. utilisateur
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT,
  `nom_utilisateur` varchar(45) NOT NULL,
  `prenom_utilisateur` varchar(45) NOT NULL,
  `mot_de_passe` varchar(45) NOT NULL,
  `email` varchar(80) NOT NULL,
  PRIMARY KEY (`id_utilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

-- Listage des données de la table test.utilisateur : ~9 rows (environ)
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` (`id_utilisateur`, `nom_utilisateur`, `prenom_utilisateur`, `mot_de_passe`, `email`) VALUES
	(32, 'Relevat', 'Chiara', 'ytutyuyt', 'chiara.relevat@etudiant.univ-brest.fr'),
	(33, 'Dupont', 'Jean-Paul', 'jpDup29200&*', 'Jean-Paul.Dupont@etudiant.univ-brest.fr'),
	(35, 'Pines', 'Mabel', 'dandiiiiinou666***', 'mabel.pines@etudiant.univ-brest.fr'),
	(36, 'Pines', 'Dipper', 'auteurOncleFord&*', 'Dipper.Pines@etudiant.univ-brest.fr'),
	(38, 'Skywalker', 'Luc', 'admin_*', 'admin'),
	(39, 'Interogation', 'Soos', 'hskjdz356&é', 'Soos.Interogation@etudiant.univ-brest.fr'),
	(42, 'Sawyer', 'Veronica', 'CandyStore1989**', 'Veronica.Sawyer@etudiant.univ-brest.fr'),
	(43, 'Pines', 'Ford', 'billCipher1989', 'Ford.Pines@univ-brest.fr'),
	(45, 'Butterfly', 'Star', 'staaaarBUtt195', 'Star.Butterfly@etuidant.univ-brest.fr');
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
