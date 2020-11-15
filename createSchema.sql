-- MySQL Script generated by MySQL Workbench
-- Fri Sep 18 10:33:15 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema test
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema test
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8 ;
USE `test` ;

-- -----------------------------------------------------
-- Table `test`.`ENTREPRISE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test`.`ENTREPRISE` ;

CREATE TABLE IF NOT EXISTS `test`.`ENTREPRISE` (
  `id_entreprise` INT NOT NULL AUTO_INCREMENT,
  `nom_entreprse` VARCHAR(45) NOT NULL,
  `adresse_entreprise` VARCHAR(100) NULL,
  `site_web` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_entreprise`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`UTILISATEUR`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test`.`UTILISATEUR` ;

CREATE TABLE IF NOT EXISTS `test`.`UTILISATEUR` (
  `id_utilisateur` INT NOT NULL AUTO_INCREMENT,
  `nom_utilisateur` VARCHAR(45) NOT NULL,
  `prenom_utilisateur` VARCHAR(45) NOT NULL,
  `mot_de_passe` VARCHAR(45) NOT NULL,
  `email` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id_utilisateur`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`ETUDIANT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test`.`ETUDIANT` ;

CREATE TABLE IF NOT EXISTS `test`.`ETUDIANT` (
  `id_etudiant` INT NOT NULL AUTO_INCREMENT,
  `filiere` VARCHAR(45) NOT NULL,
  `nationalite_fr` TINYINT NOT NULL,
  `date_naissance` DATE NOT NULL,
  `date_obtention_stage` DATE NULL,
  `type_contrat` VARCHAR(45) NULL,
  `ENTREPRISE_id_entreprise` INT NOT NULL,
  `UTILISATEUR_id_utilisateur` INT NOT NULL,
  PRIMARY KEY (`id_etudiant`),
  INDEX `fk_ETUDIANT_ENTREPRISE1_idx` (`ENTREPRISE_id_entreprise` ASC)  ,
  INDEX `fk_ETUDIANT_UTILISATEUR1_idx` (`UTILISATEUR_id_utilisateur` ASC)  ,
  CONSTRAINT `fk_ETUDIANT_ENTREPRISE1`
    FOREIGN KEY (`ENTREPRISE_id_entreprise`)
    REFERENCES `test`.`ENTREPRISE` (`id_entreprise`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ETUDIANT_UTILISATEUR1`
    FOREIGN KEY (`UTILISATEUR_id_utilisateur`)
    REFERENCES `test`.`UTILISATEUR` (`id_utilisateur`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`CANDIDATURE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test`.`CANDIDATURE` ;

CREATE TABLE IF NOT EXISTS `test`.`CANDIDATURE` (
  `id_candidature` INT NULL AUTO_INCREMENT,
  `origine_offre` VARCHAR(45) NULL,
  `ETUDIANT_id_etudiant` INT NOT NULL,
  `ENTREPRISE_id_entreprise` INT NOT NULL,
  PRIMARY KEY (`id_candidature`),
  INDEX `fk_CANDIDATURE_ETUDIANT_idx` (`ETUDIANT_id_etudiant` ASC)  ,
  INDEX `fk_CANDIDATURE_ENTREPRISE1_idx` (`ENTREPRISE_id_entreprise` ASC)  ,
  CONSTRAINT `fk_CANDIDATURE_ETUDIANT`
    FOREIGN KEY (`ETUDIANT_id_etudiant`)
    REFERENCES `test`.`ETUDIANT` (`id_etudiant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CANDIDATURE_ENTREPRISE1`
    FOREIGN KEY (`ENTREPRISE_id_entreprise`)
    REFERENCES `test`.`ENTREPRISE` (`id_entreprise`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`INTERVENANT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test`.`INTERVENANT` ;

CREATE TABLE IF NOT EXISTS `test`.`INTERVENANT` (
  `id_intervanant` INT NOT NULL AUTO_INCREMENT,
  `nom_intervenant` VARCHAR(45) NOT NULL,
  `prenom_intervenant` VARCHAR(45) NOT NULL,
  `ENTREPRISE_id_entreprise` INT NOT NULL,
  PRIMARY KEY (`id_intervanant`),
  INDEX `fk_INTERVENANT_ENTREPRISE1_idx` (`ENTREPRISE_id_entreprise` ASC)  ,
  CONSTRAINT `fk_INTERVENANT_ENTREPRISE1`
    FOREIGN KEY (`ENTREPRISE_id_entreprise`)
    REFERENCES `test`.`ENTREPRISE` (`id_entreprise`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`ENTRETIEN`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test`.`ENTRETIEN` ;

CREATE TABLE IF NOT EXISTS `test`.`ENTRETIEN` (
  `id_entretien` INT NOT NULL AUTO_INCREMENT,
  `date_entretien` DATE NOT NULL,
  `est_annule` TINYINT NOT NULL DEFAULT 0,
  `ETUDIANT_id_etudiant` INT NOT NULL,
  `INTERVENANT_id_intervanant` INT NOT NULL,
  PRIMARY KEY (`id_entretien`),
  INDEX `fk_ENTRETIEN_ETUDIANT1_idx` (`ETUDIANT_id_etudiant` ASC)  ,
  INDEX `fk_ENTRETIEN_INTERVENANT1_idx` (`INTERVENANT_id_intervanant` ASC)  ,
  CONSTRAINT `fk_ENTRETIEN_ETUDIANT1`
    FOREIGN KEY (`ETUDIANT_id_etudiant`)
    REFERENCES `test`.`ETUDIANT` (`id_etudiant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ENTRETIEN_INTERVENANT1`
    FOREIGN KEY (`INTERVENANT_id_intervanant`)
    REFERENCES `test`.`INTERVENANT` (`id_intervanant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`DOCUMENT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test`.`DOCUMENT` ;

CREATE TABLE IF NOT EXISTS `test`.`DOCUMENT` (
  `id_document` INT NOT NULL AUTO_INCREMENT,
  `valide` TINYINT NULL DEFAULT 0,
  `lien` VARCHAR(45) NOT NULL,
  `ETUDIANT_id_etudiant` INT NOT NULL,
  PRIMARY KEY (`id_document`),
  INDEX `fk_DOCUMENT_ETUDIANT1_idx` (`ETUDIANT_id_etudiant` ASC)  ,
  CONSTRAINT `fk_DOCUMENT_ETUDIANT1`
    FOREIGN KEY (`ETUDIANT_id_etudiant`)
    REFERENCES `test`.`ETUDIANT` (`id_etudiant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`CV`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test`.`CV` ;

CREATE TABLE IF NOT EXISTS `test`.`CV` (
  `id_CV` INT NOT NULL AUTO_INCREMENT,
  `DOCUMENT_id_document` INT NOT NULL,
  PRIMARY KEY (`id_CV`),
  INDEX `fk_CV_DOCUMENT1_idx` (`DOCUMENT_id_document` ASC)  ,
  CONSTRAINT `fk_CV_DOCUMENT1`
    FOREIGN KEY (`DOCUMENT_id_document`)
    REFERENCES `test`.`DOCUMENT` (`id_document`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`LETTRE_MOTIVATION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test`.`LETTRE_MOTIVATION` ;

CREATE TABLE IF NOT EXISTS `test`.`LETTRE_MOTIVATION` (
  `id_lettre_motivation` INT NOT NULL AUTO_INCREMENT,
  `DOCUMENT_id_document` INT NOT NULL,
  `CANDIDATURE_id_candidature` INT NOT NULL,
  PRIMARY KEY (`id_lettre_motivation`),
  INDEX `fk_LETTRE_MOTIVATION_DOCUMENT1_idx` (`DOCUMENT_id_document` ASC)  ,
  INDEX `fk_LETTRE_MOTIVATION_CANDIDATURE1_idx` (`CANDIDATURE_id_candidature` ASC)  ,
  CONSTRAINT `fk_LETTRE_MOTIVATION_DOCUMENT1`
    FOREIGN KEY (`DOCUMENT_id_document`)
    REFERENCES `test`.`DOCUMENT` (`id_document`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_LETTRE_MOTIVATION_CANDIDATURE1`
    FOREIGN KEY (`CANDIDATURE_id_candidature`)
    REFERENCES `test`.`CANDIDATURE` (`id_candidature`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`ENSEIGNANT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test`.`ENSEIGNANT` ;

CREATE TABLE IF NOT EXISTS `test`.`ENSEIGNANT` (
  `id_enseignant` INT NOT NULL AUTO_INCREMENT,
  `UTILISATEUR_id_utilisateur` INT NOT NULL,
  PRIMARY KEY (`id_enseignant`),
  INDEX `fk_ENSEIGNANT_UTILISATEUR1_idx` (`UTILISATEUR_id_utilisateur` ASC)  ,
  CONSTRAINT `fk_ENSEIGNANT_UTILISATEUR1`
    FOREIGN KEY (`UTILISATEUR_id_utilisateur`)
    REFERENCES `test`.`UTILISATEUR` (`id_utilisateur`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`ADMINISTRATEUR`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test`.`ADMINISTRATEUR` ;

CREATE TABLE IF NOT EXISTS `test`.`ADMINISTRATEUR` (
  `id_administrateur` INT NOT NULL AUTO_INCREMENT,
  `UTILISATEUR_id_utilisateur` INT NOT NULL,
  PRIMARY KEY (`id_administrateur`),
  INDEX `fk_ADMINISTRATEUR_UTILISATEUR1_idx` (`UTILISATEUR_id_utilisateur` ASC)  ,
  CONSTRAINT `fk_ADMINISTRATEUR_UTILISATEUR1`
    FOREIGN KEY (`UTILISATEUR_id_utilisateur`)
    REFERENCES `test`.`UTILISATEUR` (`id_utilisateur`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`ENTRETIEN_UBO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test`.`ENTRETIEN_UBO` ;

CREATE TABLE IF NOT EXISTS `test`.`ENTRETIEN_UBO` (
  `id_entretien_ubo` INT NOT NULL AUTO_INCREMENT,
  `ENTRETIEN_id_entretien` INT NOT NULL,
  `ENSEIGNANT_id_enseignant` INT NOT NULL,
  PRIMARY KEY (`id_entretien_ubo`),
  INDEX `fk_ENTRETIEN_UBO_ENTRETIEN1_idx` (`ENTRETIEN_id_entretien` ASC)  ,
  INDEX `fk_ENTRETIEN_UBO_ENSEIGNANT1_idx` (`ENSEIGNANT_id_enseignant` ASC)  ,
  CONSTRAINT `fk_ENTRETIEN_UBO_ENTRETIEN1`
    FOREIGN KEY (`ENTRETIEN_id_entretien`)
    REFERENCES `test`.`ENTRETIEN` (`id_entretien`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ENTRETIEN_UBO_ENSEIGNANT1`
    FOREIGN KEY (`ENSEIGNANT_id_enseignant`)
    REFERENCES `test`.`ENSEIGNANT` (`id_enseignant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`ENTRTIEN_PERSO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `test`.`ENTRTIEN_PERSO` ;

CREATE TABLE IF NOT EXISTS `test`.`ENTRTIEN_PERSO` (
  `id_entretien_perso` INT NOT NULL AUTO_INCREMENT,
  `ENTRETIEN_id_entretien` INT NOT NULL,
  `CANDIDATURE_id_candidature` INT NOT NULL,
  PRIMARY KEY (`id_entretien_perso`),
  INDEX `fk_ENTRTIEN_PERSO_ENTRETIEN1_idx` (`ENTRETIEN_id_entretien` ASC)  ,
  INDEX `fk_ENTRTIEN_PERSO_CANDIDATURE1_idx` (`CANDIDATURE_id_candidature` ASC)  ,
  CONSTRAINT `fk_ENTRTIEN_PERSO_ENTRETIEN1`
    FOREIGN KEY (`ENTRETIEN_id_entretien`)
    REFERENCES `test`.`ENTRETIEN` (`id_entretien`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ENTRTIEN_PERSO_CANDIDATURE1`
    FOREIGN KEY (`CANDIDATURE_id_candidature`)
    REFERENCES `test`.`CANDIDATURE` (`id_candidature`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
