-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.7.11 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for clinica
CREATE DATABASE IF NOT EXISTS `clinica` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `clinica`;

-- Dumping structure for table clinica.cita
CREATE TABLE IF NOT EXISTS `cita` (
  `id_cita` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_cita` datetime DEFAULT NULL,
  `telefono` varchar(120) DEFAULT NULL,
  `hora_minuto` varchar(30) DEFAULT NULL,
  `asunto` text,
  `id_doctor` int(11) DEFAULT NULL,
  `id_procedimiento` int(11) DEFAULT NULL,
  `paciente` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id_cita`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Dumping data for table clinica.cita: 6 rows
/*!40000 ALTER TABLE `cita` DISABLE KEYS */;
INSERT INTO `cita` (`id_cita`, `fecha_cita`, `telefono`, `hora_minuto`, `asunto`, `id_doctor`, `id_procedimiento`, `paciente`) VALUES
	(1, '2018-04-29 15:49:45', '8096093350', '5PM', 'Cirujia', 2, NULL, 'David Gonzales'),
	(2, '2018-04-29 19:52:23', '8096093310', '4PM', 'Poner otro diente', 1, NULL, 'Ana Abreu'),
	(3, '2018-04-29 20:03:18', '8095605148', '5PM', 'Perdio dentadura jugando futbol', 1, NULL, 'Papi juan'),
	(4, '2018-05-06 00:10:41', '8096543310', '8pm ', 'Problemas sexuales', 4, NULL, 'Rafael martinez'),
	(5, '2018-05-06 18:33:45', '854648641', '8pm', 'diente', 1, NULL, 'Lenin Ruben soto rodriguz'),
	(6, '2018-05-06 15:03:42', '80956251', '5PM', 'Diario', 2, NULL, 'Rene garcia'),
	(7, '2018-05-06 20:54:09', '8095561', '5pm', 'problema en molares', 1, NULL, 'Ramon garcia'),
	(8, '2018-05-06 21:04:01', '829-870-2814', '8', 'pro', 1, NULL, 'noelia feliz'),
	(9, '2018-05-06 21:00:52', '', '', '', 0, NULL, ''),
	(10, '2018-05-06 21:29:37', '809564114', '9AM', 'Problema en molares', 1, NULL, 'David contreraz'),
	(11, '2018-05-06 21:33:27', '76475247', '9am', 'caries', 2, NULL, 'maria montes'),
	(12, '2018-05-06 21:47:25', '549734853', '3pm', 'profilaxis', 2, NULL, 'julia almonte');
/*!40000 ALTER TABLE `cita` ENABLE KEYS */;

-- Dumping structure for table clinica.doctor
CREATE TABLE IF NOT EXISTS `doctor` (
  `id_doctor` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `dni` varchar(200) DEFAULT NULL,
  `especialidad` varchar(50) DEFAULT NULL,
  `clave` varchar(200) DEFAULT NULL,
  `foto_doctor` varchar(200) DEFAULT NULL,
  `descripcion` text,
  PRIMARY KEY (`id_doctor`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table clinica.doctor: 3 rows
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` (`id_doctor`, `nombre`, `apellido`, `dni`, `especialidad`, `clave`, `foto_doctor`, `descripcion`) VALUES
	(1, 'Goro', 'De jesus', '54654s-dsd', 'Dentista', 'meteoro2412', 'http://dreamstop.com/wp-content/uploads/2013/06/doctor-dream-meaning.jpg', NULL),
	(2, 'Noelia', 'Almonte', '54-54645-80', 'Dentista', 'meteiri2412', 'https://www.carwreckdoctor.com/hubfs/Car_Accident_Doctor.png', ''),
	(4, 'Jack ', 'Michael', '848fas848dw', 'POPO', 'FDSFKJSDFLJ', 'imagenes/180314530514484669_1161686410567576_1972410811891379646_n.jpg', 'Follador intercional');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;

-- Dumping structure for table clinica.estatus
CREATE TABLE IF NOT EXISTS `estatus` (
  `id_estatus` int(11) NOT NULL AUTO_INCREMENT,
  `id_cita` int(11) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  PRIMARY KEY (`id_estatus`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

-- Dumping data for table clinica.estatus: 17 rows
/*!40000 ALTER TABLE `estatus` DISABLE KEYS */;
INSERT INTO `estatus` (`id_estatus`, `id_cita`, `precio`) VALUES
	(1, NULL, NULL),
	(2, NULL, NULL),
	(3, 1, 500),
	(4, 2, 0),
	(5, 3, 0),
	(6, 4, 7300),
	(7, 5, 2500),
	(8, NULL, NULL),
	(9, NULL, NULL),
	(10, NULL, NULL),
	(11, NULL, NULL),
	(12, NULL, NULL),
	(13, NULL, NULL),
	(14, NULL, NULL),
	(15, NULL, NULL),
	(16, NULL, NULL),
	(17, 6, 0),
	(18, 7, 200),
	(19, 8, 0),
	(20, 10, 2150),
	(21, 11, 0),
	(22, 12, 350);
/*!40000 ALTER TABLE `estatus` ENABLE KEYS */;

-- Dumping structure for table clinica.factura
CREATE TABLE IF NOT EXISTS `factura` (
  `id_factura` int(11) NOT NULL AUTO_INCREMENT,
  `ganancia_doctor` float NOT NULL DEFAULT '0',
  `ganancia_clinica` float NOT NULL DEFAULT '0',
  `concepto_pago` varchar(50) DEFAULT NULL,
  `monto` float DEFAULT NULL,
  `fecha_pago` datetime DEFAULT NULL,
  `id_estatus` int(11) DEFAULT NULL,
  `dia` date DEFAULT NULL,
  PRIMARY KEY (`id_factura`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

-- Dumping data for table clinica.factura: 20 rows
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` (`id_factura`, `ganancia_doctor`, `ganancia_clinica`, `concepto_pago`, `monto`, `fecha_pago`, `id_estatus`, `dia`) VALUES
	(1, 1200, 1800, 'completo', 3000, '2018-04-29 19:53:10', 4, NULL),
	(2, 480, 720, 'abono', 1200, '2018-04-29 20:25:08', 3, NULL),
	(3, 920, 1380, 'completo', 2300, '2018-04-29 20:33:17', 3, NULL),
	(4, 400, 600, 'abono', 1000, '2018-04-29 20:36:24', 5, NULL),
	(5, 320, 480, 'abono', 800, '2018-05-02 04:51:49', 5, '2018-05-05'),
	(6, 480, 720, 'completo', 1200, '2018-05-02 04:52:24', 5, NULL),
	(7, 0, 0, 'completo', 0, '2018-05-02 04:52:40', 5, NULL),
	(8, 1000, 1500, 'abono', 2500, '2018-05-02 04:52:46', 5, '2018-05-02'),
	(9, 1000, 1500, 'completo', 2500, '2018-05-02 04:56:09', 5, '2018-05-02'),
	(10, 1000, 1500, 'abono', 2500, '2018-05-03 05:50:24', 4, '2018-05-03'),
	(11, 480, 720, 'abono', 1200, '2018-05-06 00:13:57', 6, '2018-05-06'),
	(12, -200, -300, 'completo', -500, '2018-05-06 05:19:09', 4, '2018-05-06'),
	(13, -1000, -1500, 'completo', -2500, '2018-05-06 05:24:47', 5, '2018-05-06'),
	(14, 0, 0, 'completo', 0, '2018-05-06 05:26:50', 7, '2018-05-06'),
	(15, 1000, 1500, 'completo', 2500, '2018-05-06 05:26:59', 7, '2018-05-06'),
	(16, 0, 0, 'completo', 0, '2018-05-06 05:27:00', 7, '2018-05-06'),
	(17, 880, 1320, 'abono', 2200, '2018-05-06 05:34:52', 7, '2018-05-06'),
	(18, 120, 180, 'abono', 300, '2018-05-06 05:35:52', 7, '2018-05-06'),
	(19, -1000, -1500, 'completo', -2500, '2018-05-06 05:36:58', 7, '2018-05-06'),
	(20, 380, 570, 'abono', 950, '2018-05-06 15:04:51', 17, '2018-05-06'),
	(21, 620, 930, 'completo', 1550, '2018-05-06 18:26:06', 17, '2018-05-06'),
	(22, 1000, 1500, 'completo', 2500, '2018-05-06 18:52:07', 17, '2018-05-06'),
	(23, 120, 180, 'abono', 300, '2018-05-06 20:54:50', 18, '2018-05-06'),
	(24, 800, 1200, 'abono', 2000, '2018-05-06 20:58:41', 19, '2018-05-06'),
	(25, 400, 600, 'completo', 1000, '2018-05-06 21:02:42', 19, '2018-05-06'),
	(26, 360, 540, 'abono', 900, '2018-05-06 21:30:46', 20, '2018-05-06'),
	(27, 80, 120, 'abono', 200, '2018-05-06 21:38:03', 22, '2018-05-06'),
	(28, 1000, 1500, 'completo', 2500, '2018-05-06 21:41:46', 21, '2018-05-06');
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;

-- Dumping structure for table clinica.historial_p
CREATE TABLE IF NOT EXISTS `historial_p` (
  `id_hostorial` int(11) NOT NULL AUTO_INCREMENT,
  `id_estatus` int(11) DEFAULT NULL,
  `id_procedimiento` int(11) DEFAULT NULL,
  `fecha_agregado` datetime DEFAULT NULL,
  PRIMARY KEY (`id_hostorial`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

-- Dumping data for table clinica.historial_p: 19 rows
/*!40000 ALTER TABLE `historial_p` DISABLE KEYS */;
INSERT INTO `historial_p` (`id_hostorial`, `id_estatus`, `id_procedimiento`, `fecha_agregado`) VALUES
	(36, 17, 2, '2018-05-06 00:00:00'),
	(33, NULL, NULL, '2018-05-06 00:00:00'),
	(3, 3, 2, '2018-04-29 00:00:00'),
	(4, 3, 3, '2018-04-29 00:00:00'),
	(5, 3, 1, '2018-04-29 00:00:00'),
	(27, 7, 2, '2018-05-06 00:00:00'),
	(7, 5, 3, '2018-05-02 00:00:00'),
	(8, 5, 2, '2018-05-02 00:00:00'),
	(9, 5, 2, '2018-05-02 00:00:00'),
	(10, 5, 3, '2018-05-02 00:00:00'),
	(11, 5, 2, '2018-05-02 00:00:00'),
	(12, 5, 2, '2018-05-02 00:00:00'),
	(35, 17, 2, '2018-05-06 00:00:00'),
	(14, 6, 1, '2018-05-06 00:00:00'),
	(15, 6, 2, '2018-05-06 00:00:00'),
	(16, 6, 3, '2018-05-06 00:00:00'),
	(17, 6, 2, '2018-05-06 00:00:00'),
	(18, 6, 2, '2018-05-06 00:00:00'),
	(34, 3, 4, '2018-05-06 00:00:00'),
	(31, 4, 2, '2018-05-06 00:00:00'),
	(37, 7, 2, '2018-05-06 00:00:00'),
	(38, 18, 6, '2018-05-06 00:00:00'),
	(39, 19, 2, '2018-05-06 00:00:00'),
	(40, 19, 6, '2018-05-06 00:00:00'),
	(41, 20, 8, '2018-05-06 00:00:00'),
	(42, 20, 7, '2018-05-06 00:00:00'),
	(43, 22, 8, '2018-05-06 00:00:00'),
	(44, 21, 7, '2018-05-06 00:00:00');
/*!40000 ALTER TABLE `historial_p` ENABLE KEYS */;

-- Dumping structure for table clinica.procedimiento
CREATE TABLE IF NOT EXISTS `procedimiento` (
  `id_procedimiento` int(11) NOT NULL AUTO_INCREMENT,
  `procedimiento` varchar(30) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  PRIMARY KEY (`id_procedimiento`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Dumping data for table clinica.procedimiento: 3 rows
/*!40000 ALTER TABLE `procedimiento` DISABLE KEYS */;
INSERT INTO `procedimiento` (`id_procedimiento`, `procedimiento`, `precio`) VALUES
	(8, 'Profilaxis', 550),
	(7, 'Tratamiento de canales', 2500),
	(6, 'Extraccion de molar', 500);
/*!40000 ALTER TABLE `procedimiento` ENABLE KEYS */;

-- Dumping structure for table clinica.sub_cita
CREATE TABLE IF NOT EXISTS `sub_cita` (
  `id_sub_cita` int(11) NOT NULL AUTO_INCREMENT,
  `dia` date DEFAULT NULL,
  `hora` varchar(30) DEFAULT NULL,
  `id_estatus` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_sub_cita`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Dumping data for table clinica.sub_cita: 0 rows
/*!40000 ALTER TABLE `sub_cita` DISABLE KEYS */;
INSERT INTO `sub_cita` (`id_sub_cita`, `dia`, `hora`, `id_estatus`) VALUES
	(1, NULL, '9PM', 17),
	(2, '2018-05-30', '9AM', 17),
	(3, '2018-05-31', '5 AM', 17),
	(4, '2018-10-20', '4pm', 7),
	(5, '2018-05-20', '9am', 7),
	(6, '2018-05-10', '5pm', 19),
	(7, '2018-09-30', '10am', 22);
/*!40000 ALTER TABLE `sub_cita` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
