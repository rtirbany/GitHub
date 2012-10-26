-- keyword in query is not 1:M..it is s 1:1 and captured within query table
-- it only applies to entry within textbox -- change this to be smart
-- in that keyword may be a filterKey
//TODO - change to 1:M and/or map to filters if keywords used
//TODO - determine how to save 1:M keywords for refining query
   -- add or append?  new record?
   
-- identical query may exist >1 time under diff authors and/or names
-- this applies to pre-canned queries (a user-authored query can 
-- already exist as a pre-canned and/or another users query (diff name) 
-- and/or same user query (if using diff name)
-- can support Dept or Org or team-originated query :)

//TODO - ask Scott if should overwrite or warn user if overwriting & ask to rename
//TODO - sort saved queries by name, date created

-- query 
-- share is boolean - if enabled, will enable subscriptions; else disabled
-- share false is default
-- query stats will record running history (show trending)
-- numResults always recorded
-- numResults for author runs
-- numResults for by subscriber
-- date and time of the run, regardless of runner 
-- (usage trends - time of day, day of week, week of month, quarter, etc)
-- num of times it was run (total)
-- num of times it was run by author (or org author, dept author, team author)
-- num of times it was run by subscribers (identical queries unphased)

-- a username can be an author and/or subscriber
-- list of authors (via username) (may or may not be subscribers)
-- list of subscribers (via username) (may or may not be authors)

-- AUTHOR, QUERYTYPE, QUERYSTATS, QUERY
CREATE  TABLE IF NOT EXISTS `mydb`.`Author` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `username` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) ) 

CREATE  TABLE IF NOT EXISTS `mydb`.`QueryType` (
  `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT ,
  -- `description` VARCHAR(25) NOT NULL ,
  `description` ENUM('system','user') NOT NULL,
  PRIMARY KEY (`id`) )
  
CREATE  TABLE IF NOT EXISTS `mydb`.`QueryStats` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `idQuery` INT UNSIGNED NOT NULL ,
  `dtRunDate` DATETIME NOT NULL ,
  `idRunBy` INT NOT NULL ,
  `numResults` BIGINT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX idxIdQuery (`idQuery`),
  UNIQUE INDEX `numResults_UNIQUE` (`numResults` ASC) ,
  INDEX `fk_QueryStats_Query1_idx` (`idQuery` ASC) ,
  CONSTRAINT `fk_QueryStats_Query1`
    FOREIGN KEY (`idQuery` )
    REFERENCES `mydb`.`Query` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    
CREATE  TABLE IF NOT EXISTS `mydb`.`Query` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(60) NOT NULL ,
  `description` VARCHAR(100) NOT NULL ,
  `keyword` VARCHAR(100) NULL ,
  `idQueryType` TINYINT NOT NULL ,
  `idAuthor` INT NOT NULL ,
  `dtCreated` DATETIME NOT NULL ,
  `boolShare` TINYINT(1) NOT NULL DEFAULT 0 ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Query_QueryAuthor1_idx` (`idAuthor` ASC) ,
  INDEX `fk_Query_QueryType1_idx` (`idQueryType` ASC) ,
  CONSTRAINT `fk_Query_QueryAuthor1`
    FOREIGN KEY (`idAuthor` )
    REFERENCES `mydb`.`Author` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Query_QueryType1`
    FOREIGN KEY (`idQueryType` )
    REFERENCES `mydb`.`QueryType` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    
    
-------------------------------------------------
-- SUBSCRIBER, QUERY_SUBSCRIBER
CREATE  TABLE IF NOT EXISTS `mydb`.`Subscriber` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `username` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) ) 
  
CREATE  TABLE IF NOT EXISTS `mydb`.`Query_Subscriber` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `idSubscriber` INT NOT NULL ,
  `idQuery` INT NOT NULL ,
  `dtSubscribed` DATETIME NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Query_Subscriber_Query1_idx` (`idQuery` ASC) ,
  INDEX `fk_Query_Subscriber_Subscriber1_idx` (`idSubscriber` ASC) ,
  INDEX idxIdQuery (`idQuery`),
  CONSTRAINT `fk_Query_Subscriber_Query1`
    FOREIGN KEY (`idQuery` )
    REFERENCES `mydb`.`Query` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Query_Subscriber_Subscriber1`
    FOREIGN KEY (`idSubscriber` )
    REFERENCES `mydb`.`Subscriber` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
---------------------------------------------------
-- FILTERKEY, FILTEROPERATOR, QUERY_FILTERS
CREATE  TABLE IF NOT EXISTS `mydb`.`FilterKey` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) 
  
CREATE  TABLE IF NOT EXISTS `mydb`.`FilterOperator` (
  `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `description` VARCHAR(45) NOT NULL ,
 -- `operation` VARCHAR(5) NOT NULL ,
  `operation` ENUM(' = ',' != ',' > ',' < ',' >= ',' <= ') NOT NULL ,
  PRIMARY KEY (`id`) )
  
CREATE  TABLE IF NOT EXISTS `mydb`.`Query_Filters` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `idQuery` INT NOT NULL ,
  `idFilterKey` INT NOT NULL ,
  `idFilterOperator` TINYINT NOT NULL ,
  `filterValue` VARCHAR(50) NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_Query_Filters_FilterOperator1_idx` (`idFilterOperator` ASC) ,
  INDEX `fk_Query_Filters_Query1_idx` (`idQuery` ASC) ,
  INDEX `fk_Query_Filters_FilterKey1_idx` (`idFilterKey` ASC) ,
  CONSTRAINT `fk_Query_Filters_FilterOperator1`
    FOREIGN KEY (`idFilterOperator` )
    REFERENCES `mydb`.`FilterOperator` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Query_Filters_Query1`
    FOREIGN KEY (`idQuery` )
    REFERENCES `mydb`.`Query` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Query_Filters_FilterKey1`
    FOREIGN KEY (`idFilterKey` )
    REFERENCES `mydb`.`FilterKey` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    