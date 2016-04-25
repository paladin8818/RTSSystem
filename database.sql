-- --------------------------------------------------------
-- Хост:                         mysql85.1gb.ru
-- Версия сервера:               5.5.35-rel33.0-log - Percona Server with XtraDB (GPL), Release rel33.0, Revision 611
-- ОС Сервера:                   Linux
-- HeidiSQL Версия:              9.1.0.4867
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Дамп структуры для таблица gb_appsdb.passengers
CREATE TABLE IF NOT EXISTS `passengers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_type` text NOT NULL,
  `fio` text NOT NULL,
  `sex` text NOT NULL,
  `date_birth` text NOT NULL,
  `place` text NOT NULL,
  `tier` text NOT NULL,
  `rate` text NOT NULL,
  `amount` text NOT NULL,
  `id_route` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_route` (`id_route`),
  CONSTRAINT `passengers_ibfk_1` FOREIGN KEY (`id_route`) REFERENCES `routes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- Дамп данных таблицы gb_appsdb.passengers: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `passengers` DISABLE KEYS */;
/*!40000 ALTER TABLE `passengers` ENABLE KEYS */;


-- Дамп структуры для таблица gb_appsdb.routes
CREATE TABLE IF NOT EXISTS `routes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tr_num` text NOT NULL,
  `depart_place` text NOT NULL,
  `wagon_class` text NOT NULL,
  `depart_date` text NOT NULL,
  `depart_time` text NOT NULL,
  `arrival_date` text NOT NULL,
  `arrival_time` text NOT NULL,
  `wagon_num` text NOT NULL,
  `wagon_type` text NOT NULL,
  `arrival_place` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=cp1251;

-- Дамп данных таблицы gb_appsdb.routes: ~3 rows (приблизительно)
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
INSERT INTO `routes` (`id`, `tr_num`, `depart_place`, `wagon_class`, `depart_date`, `depart_time`, `arrival_date`, `arrival_time`, `wagon_num`, `wagon_type`, `arrival_place`) VALUES
	(1, '132УФПК', 'МОСКВА', 'ПЕНЗА 1', '19.04.2016', '15:10', '20.04.2016', '05:26', '10', 'КУПЕ', '2Л'),
	(2, '132УФПК', 'МОСКВА', 'ПЕНЗА 1', '19.04.2016', '15:10', '20.04.2016', '05:26', '10', 'КУПЕ', '2Л'),
	(3, '069ЯФПК', 'ПЕРМЬ 2', 'МОСКВА', '19.04.2016', '03:02', '20.04.2016', '04:11', '02', 'ПЛАЦКАРТ', '3Л');
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;


-- Дамп структуры для таблица gb_appsdb.tickets_order
CREATE TABLE IF NOT EXISTS `tickets_order` (
  `id` varchar(36) NOT NULL,
  `phone` text NOT NULL,
  `full_amount` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;

-- Дамп данных таблицы gb_appsdb.tickets_order: ~1 rows (приблизительно)
/*!40000 ALTER TABLE `tickets_order` DISABLE KEYS */;
INSERT INTO `tickets_order` (`id`, `phone`, `full_amount`) VALUES
	('d81cacea-5b55-48dc-9b33-82501d04d32a', '8 (960) 432-1244', 1778.5);
/*!40000 ALTER TABLE `tickets_order` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
